from typing import List

from pydantic import BaseModel

# schemas.py
class PostCreate(BaseModel):
    location: str
    description: str
    image_url: str
    bid: float
    owner_id: int
    tag_names: List[str]
    # We don't include 'upvotes' or 'is_completed' here 
    # because they should start at 0/False by default.

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

from pydantic import BaseModel
from typing import List


class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True


class TagResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

class PostResponse(BaseModel):
    id: int
    location: str
    description: str
    image_url: str
    upvotes: int
    bid: float
    is_completed: bool
    owner_id: int
    tags: List[TagResponse]

    class Config:
        from_attributes = True