from fastapi import FastAPI

from backend import services
from backend.schemas import (
    UserCreate,
    UserResponse,
    RegisterUserResponse,
)

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "Innosci Alumni Backend is running"
    }

@app.get("/users", response_model=dict[str, list[UserResponse]])
def get_users():
    return services.get_users()


@app.post("/users", response_model=RegisterUserResponse)
def register_user(user: UserCreate):
    return services.register_user(user)


@app.put("/users/{user_id}/approve")
def approve_user(user_id: str):
    return services.approve_user(user_id)