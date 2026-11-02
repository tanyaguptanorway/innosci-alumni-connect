from fastapi import FastAPI, Depends

from backend import services

from backend.schemas import (
    UserCreate,
    UserResponse,
    RegisterUserResponse,
)

from backend.auth import (
    get_current_user,
    require_admin
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
def approve_user(
    user_id: str,
    current_user = Depends(require_admin)
):
    return services.approve_user(user_id)


@app.get("/me")
def get_me(
    user=Depends(get_current_user)
):
    cognito_sub = user["sub"]

    return services.get_user_profile(
        cognito_sub
    )