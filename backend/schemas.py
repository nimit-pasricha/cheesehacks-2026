from pydantic import BaseModel

class PostCreate(BaseModel):
    location: str
    image_url: str
    description: str
    # We don't include 'upvotes' or 'is_completed' here 
    # because they should start at 0/False by default.