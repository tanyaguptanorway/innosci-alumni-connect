from fastapi import FastAPI, Depends, Query
from backend.schemas import UserUpdate
from backend import services

from backend.schemas import (
    UserCreate,
    UserResponse,
    RegisterUserResponse,
    SpotlightCreate,
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
def get_users(
    search: str | None = Query(None),
    company: str | None = Query(None),
    graduation_year: int | None = Query(None),
    program: str | None = Query(None),
    skill: str | None = Query(None),
):

    return services.get_users(
        search=search,
        company=company,
        graduation_year=graduation_year,
        program=program,
        skill=skill
    )


@app.post("/users", response_model=RegisterUserResponse)
def register_user(user: UserCreate):
    return services.register_user(user)

@app.put("/admin/users/{user_id}/approve")
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

@app.put("/me")
def update_me(
    profile: UserUpdate,
    current_user=Depends(get_current_user)
):

    services.update_profile(
        current_user["sub"],
        profile
    )

    return {
        "message": "Profile updated successfully"
    }

@app.get("/users/{user_id}")
def get_user_profile(user_id: str):

    return services.get_user_by_id(user_id)

@app.get("/admin/users/pending")
def get_pending_users(
    current_user=Depends(get_current_user)
):

    require_admin(current_user)

    return services.get_pending_users()

@app.put("/admin/users/{user_id}/reject")
def reject_user(
    user_id: str,
    current_user=Depends(get_current_user)
):

    require_admin(current_user)

    return services.reject_user(user_id)

@app.get("/admin/stats")
def admin_stats(
    current_user=Depends(get_current_user)
):

    require_admin(current_user)

    return services.get_admin_stats()

@app.get("/spotlights")
def get_spotlights():

    return services.get_spotlights()

@app.post("/admin/spotlights")
def create_spotlight(
    data: SpotlightCreate,
    current_user=Depends(get_current_user)
):

    require_admin(current_user)

    return services.create_spotlight(
        data.model_dump()
    )

@app.put("/admin/spotlights/{slide_id}")
def update_spotlight(
    slide_id: int,
    data: SpotlightCreate,
    current_user=Depends(get_current_user)
):

    require_admin(current_user)

    return services.update_spotlight(
        slide_id,
        data.model_dump()
    )

@app.delete("/admin/spotlights/{slide_id}")
def delete_spotlight(
    slide_id: int,
    current_user=Depends(get_current_user)
):

    require_admin(current_user)

    return services.delete_spotlight(
        slide_id
    )