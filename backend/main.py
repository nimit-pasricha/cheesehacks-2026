import os
import shutil
import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import (
    Depends,
    FastAPI,
    File,
    HTTPException,
    Query,
    UploadFile,
    status,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from fastapi.staticfiles import StaticFiles
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session, selectinload

import models
import schemas
from database import Base, SessionLocal, engine

# ── DB init ───────────────────────────────────────────────────────────────────

Base.metadata.create_all(bind=engine)

# ── Constants ─────────────────────────────────────────────────────────────────

SECRET_KEY = "CHANGE_ME_IN_PRODUCTION_supersecretkey12345"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

SUSTAINABILITY_TAGS = ["Trash", "Graffiti", "Homeless", "Misc", "Stray Animals"]

IMAGES_DIR = "static/images"
os.makedirs(IMAGES_DIR, exist_ok=True)

# ── Auth helpers ──────────────────────────────────────────────────────────────

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_access_token(user_id: int) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    payload = {"sub": str(user_id), "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(lambda: next(get_db()))
) -> models.User:
    credentials_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: Optional[str] = payload.get("sub")
        if user_id is None:
            raise credentials_exc
    except JWTError:
        raise credentials_exc

    user = db.query(models.User).filter(models.User.id == int(user_id)).first()
    if user is None:
        raise credentials_exc
    return user


# ── App ───────────────────────────────────────────────────────────────────────

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.on_event("startup")
def startup_populate_tags():
    db = SessionLocal()
    try:
        for tag_name in SUSTAINABILITY_TAGS:
            existing = db.query(models.Tag).filter(models.Tag.name == tag_name).first()
            if not existing:
                db.add(models.Tag(name=tag_name))
        db.commit()
        print("Tags autopopulated.")
    except Exception as e:
        print(f"Error autopopulating tags: {e}")
        db.rollback()
    finally:
        db.close()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ── Auth endpoints ────────────────────────────────────────────────────────────


@app.post("/auth/signup", response_model=schemas.UserResponse, status_code=201)
def signup(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.username == user_data.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")
    if db.query(models.User).filter(models.User.email == user_data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = models.User(
        username=user_data.username,
        email=user_data.email,
        password_hash=hash_password(user_data.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.post("/auth/login", response_model=schemas.Token)
def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = (
        db.query(models.User)
        .filter(models.User.username == credentials.username)
        .first()
    )
    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {"access_token": create_access_token(user.id), "token_type": "bearer"}


@app.get("/auth/me", response_model=schemas.UserResponse)
def get_me(current_user: models.User = Depends(get_current_user)):
    return current_user


# ── Image upload ──────────────────────────────────────────────────────────────


@app.post("/upload-image/")
async def upload_image(
    file: UploadFile = File(...),
    _: models.User = Depends(get_current_user),
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    ext = os.path.splitext(file.filename or "image.jpg")[1] or ".jpg"
    filename = f"{uuid.uuid4().hex}{ext}"
    dest = os.path.join(IMAGES_DIR, filename)

    with open(dest, "wb") as f:
        shutil.copyfileobj(file.file, f)

    return {"image_url": f"/static/images/{filename}"}


# ── Report endpoints ──────────────────────────────────────────────────────────


@app.post("/reports/", response_model=schemas.ReportResponse, status_code=201)
def create_report(
    report_data: schemas.ReportCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    new_report = models.Report(
        latitude=report_data.latitude,
        longitude=report_data.longitude,
        description=report_data.description,
        image_url=report_data.image_url,
        bid=report_data.bid,
        owner_id=current_user.id,
    )

    if report_data.tag_names:
        tags = (
            db.query(models.Tag)
            .filter(models.Tag.name.in_(report_data.tag_names))
            .all()
        )
        new_report.tags = tags

    db.add(new_report)
    db.commit()
    db.refresh(new_report)

    # Re-fetch with tags loaded to avoid lazy-load issues during serialisation
    return (
        db.query(models.Report)
        .options(selectinload(models.Report.tags))
        .filter(models.Report.id == new_report.id)
        .first()
    )


@app.get("/reports/", response_model=list[schemas.ReportResponse])
def get_reports(
    # owner filter
    owner_id: Optional[int] = None,
    # tag filter (exact name)
    tag_name: Optional[str] = None,
    # location range
    lat_min: Optional[float] = Query(None),
    lat_max: Optional[float] = Query(None),
    lon_min: Optional[float] = Query(None),
    lon_max: Optional[float] = Query(None),
    # bid range
    bid_min: Optional[float] = Query(None),
    bid_max: Optional[float] = Query(None),
    # upvotes range
    upvotes_min: Optional[int] = Query(None),
    upvotes_max: Optional[int] = Query(None),
    # interested range
    interested_min: Optional[int] = Query(None),
    interested_max: Optional[int] = Query(None),
    # completion status
    is_completed: Optional[bool] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(models.Report).options(selectinload(models.Report.tags))

    if owner_id is not None:
        query = query.filter(models.Report.owner_id == owner_id)

    if tag_name is not None:
        query = query.join(models.Report.tags).filter(
            models.Tag.name == tag_name
        ).distinct()

    if lat_min is not None:
        query = query.filter(models.Report.latitude >= lat_min)
    if lat_max is not None:
        query = query.filter(models.Report.latitude <= lat_max)
    if lon_min is not None:
        query = query.filter(models.Report.longitude >= lon_min)
    if lon_max is not None:
        query = query.filter(models.Report.longitude <= lon_max)

    if bid_min is not None:
        query = query.filter(models.Report.bid >= bid_min)
    if bid_max is not None:
        query = query.filter(models.Report.bid <= bid_max)

    if upvotes_min is not None:
        query = query.filter(models.Report.upvotes >= upvotes_min)
    if upvotes_max is not None:
        query = query.filter(models.Report.upvotes <= upvotes_max)

    if interested_min is not None:
        query = query.filter(models.Report.interested_count >= interested_min)
    if interested_max is not None:
        query = query.filter(models.Report.interested_count <= interested_max)

    if is_completed is not None:
        query = query.filter(models.Report.is_completed == is_completed)

    return query.all()


@app.get("/reports/{report_id}", response_model=schemas.ReportResponse)
def get_report(report_id: int, db: Session = Depends(get_db)):
    report = (
        db.query(models.Report)
        .options(selectinload(models.Report.tags))
        .filter(models.Report.id == report_id)
        .first()
    )
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report


@app.patch("/reports/{report_id}/interested", response_model=schemas.ReportResponse)
def toggle_interested(
    report_id: int,
    db: Session = Depends(get_db),
    _: models.User = Depends(get_current_user),
):
    report = (
        db.query(models.Report)
        .options(selectinload(models.Report.tags))
        .filter(models.Report.id == report_id)
        .first()
    )
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    report.interested_count += 1
    db.commit()
    db.refresh(report)
    return report


@app.patch("/reports/{report_id}/upvote", response_model=schemas.ReportResponse)
def upvote_report(
    report_id: int,
    db: Session = Depends(get_db),
    _: models.User = Depends(get_current_user),
):
    report = (
        db.query(models.Report)
        .options(selectinload(models.Report.tags))
        .filter(models.Report.id == report_id)
        .first()
    )
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    report.upvotes += 1
    db.commit()
    db.refresh(report)
    return report


@app.patch("/reports/{report_id}/complete", response_model=schemas.ReportResponse)
def complete_report(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    report = (
        db.query(models.Report)
        .options(selectinload(models.Report.tags))
        .filter(models.Report.id == report_id)
        .first()
    )
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    if report.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not the owner of this report")
    report.is_completed = True
    db.commit()
    db.refresh(report)
    return report


# ── Tag endpoints ─────────────────────────────────────────────────────────────


@app.get("/tags/", response_model=list[schemas.TagResponse])
def get_tags(db: Session = Depends(get_db)):
    return db.query(models.Tag).all()


# ── User endpoints ────────────────────────────────────────────────────────────


@app.get("/users/", response_model=list[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

