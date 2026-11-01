from pydantic import BaseModel, EmailStr, Field


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