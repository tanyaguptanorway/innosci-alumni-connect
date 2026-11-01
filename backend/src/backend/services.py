import uuid
import pymysql

from fastapi import HTTPException

from backend import repository
from backend.schemas import UserCreate


def register_user(user: UserCreate):

    print("Service: Register User")

    user_data = {
        "user_id": str(uuid.uuid4()),
        "email": user.email,
        "full_name": user.full_name,
        "graduation_year": user.graduation_year,
        "program": user.program,
        "linkedin_url": user.linkedin_url,
        "skills": user.skills,
        "bio": user.bio,
        "role": "ALUMNI",
        "status": "PENDING",
    }

    try:
        repository.create_user(user_data)

    except pymysql.IntegrityError:

        print("Service: Email already exists")

        raise HTTPException(
            status_code=409,
            detail="Email already registered"
        )

    return {
        "message": "User registered successfully",
        "user_id": user_data["user_id"]
    }


def get_users():

    print("Service: Getting approved users")

    users = repository.get_all_users()

    return {
        "users": [
            {
                "user_id": user["user_id"],
                "email": user["email"],
                "full_name": user["full_name"],
                "graduation_year": user["graduation_year"],
                "program": user["program"],
                "linkedin_url": user["linkedin_url"],
                "skills": user["skills"],
                "bio": user["bio"],
                "role": user["role"],
                "status": user["status"],
            }
            for user in users
        ]
    }


def approve_user(user_id: str):

    print("Service: Approving user")

    rows_updated = repository.approve_user(user_id)

    if rows_updated == 0:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "message": "User approved successfully"
    }