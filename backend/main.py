from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models, schemas
from database import engine, SessionLocal, Base

# creates the actual table in your database file
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency to get a database connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/posts/")
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    new_post = models.Post(
        location=post.location,
        image_url=post.image_url,
        description=post.description
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


@app.post("/users/")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = models.User(
        username=user.username,
        email=user.email,
        password_hash=user.password  # later you should hash this
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.get("/users/")
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()