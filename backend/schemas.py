from pydantic import BaseModel
from typing import List, Optional


# ── Auth ──────────────────────────────────────────────────────────────────────

class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: Optional[int] = None


class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True


# ── Tags ──────────────────────────────────────────────────────────────────────

class TagResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


# ── Reports ───────────────────────────────────────────────────────────────────

class ReportCreate(BaseModel):
    latitude: float
    longitude: float
    description: str
    image_url: Optional[str] = None
    bid: float = 0.0
    tag_names: List[str] = []


class ReportResponse(BaseModel):
    id: int
    latitude: float
    longitude: float
    description: str
    image_url: Optional[str]
    upvotes: int
    interested_count: int
    bid: float
    is_completed: bool
    owner_id: int
    tags: List[TagResponse]

    class Config:
        from_attributes = True