from pydantic import BaseModel


class UserCreate(BaseModel):
    email: str
    full_name: str
    graduation_year: int | None = None
    program: str | None = None