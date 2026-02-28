from sqlalchemy import Column, Integer, String, Boolean, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String)
    image_url = Column(String)
    description = Column(String)
    upvotes = Column(Integer, default=0)
    bid = Column(Float, default=0.0)
    is_completed = Column(Boolean, default=False)