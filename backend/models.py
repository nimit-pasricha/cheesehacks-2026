from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, Table
from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy import DateTime, func


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    reports = relationship("Report", back_populates="owner")

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', email='{self.email}')>"


report_tags = Table(
    "report_tags",
    Base.metadata,
    Column("report_id", Integer, ForeignKey("reports.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id"), primary_key=True),
)


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    image_url = Column(String, nullable=True)
    description = Column(String)
    upvotes = Column(Integer, default=0)
    interested_count = Column(Integer, default=0)
    bid = Column(Float, default=0.0)
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="reports")
    tags = relationship("Tag", secondary=report_tags, back_populates="reports")


class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    reports = relationship("Report", secondary=report_tags, back_populates="tags")
