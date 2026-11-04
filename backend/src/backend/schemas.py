from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserCreate(BaseModel):

    email: EmailStr

    full_name: str = Field(
        min_length=2,
        max_length=150
    )

    graduation_year: int | None = Field(
        default=None,
        ge=1950,
        le=2035
    )

    program: str | None = Field(
        default=None,
        max_length=150
    )

    linkedin_url: str | None = Field(
        default=None,
        max_length=255
    )

    skills: str | None = Field(
        default=None,
        max_length=500
    )

    bio: str | None = None



class UserResponse(BaseModel):

    user_id: str
    email: EmailStr
    full_name: str

    graduation_year: int | None = None
    program: str | None = None
    linkedin_url: str | None = None
    skills: str | None = None
    bio: str | None = None

    role: str
    status: str



class RegisterUserResponse(BaseModel):

    message: str
    user_id: str


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    graduation_year: Optional[int] = None
    program: Optional[str] = None
    linkedin_url: Optional[str] = None
    skills: Optional[str] = None
    bio: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    job_title: Optional[str] = None
    company: Optional[str] = None
    interests: Optional[str] = None
    profile_picture_url: Optional[str] = None


class SpotlightCreate(BaseModel):

    title: str
    alumni_name: Optional[str] = None
    summary: Optional[str] = None
    image_url: Optional[str] = None
    podcast_url: Optional[str] = None
    sort_order: int = 0