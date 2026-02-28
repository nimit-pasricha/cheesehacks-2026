from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models, schemas
from database import engine, SessionLocal, Base
from typing import Optional

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
def create_post(post_data: schemas.PostCreate, db: Session = Depends(get_db)):
    new_post = models.Post(
        location=post_data.location,
        description=post_data.description,
        image_url=post_data.image_url,
        bid=post_data.bid,
        is_completed=False,
        upvotes=0,
        owner_id=post_data.owner_id,
    )

    actual_tags = (
        db.query(models.Tag).filter(models.Tag.name.in_(post_data.tag_names)).all()
    )

    new_post.tags = actual_tags

    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


@app.post("/users/")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = models.User(
        username=user.username,
        email=user.email,
        password_hash=user.password,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.get("/users/")
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()


@app.get("/posts/")
def get_posts(
    user_id: Optional[int] = None,
    tag_name: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(models.Post)

    if user_id:
        query = query.filter(models.Post.owner_id == user_id)

    if tag_name:
        query = query.join(models.Post.tags).filter(models.Tag.name == tag_name)

    return query.all()
