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


def get_users(
    search=None,
    company=None,
    graduation_year=None,
    program=None,
    skill=None
):

    print("Service: Getting approved users")

    users = repository.get_all_users(
        search=search,
        company=company,
        graduation_year=graduation_year,
        program=program,
        skill=skill
    )

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
                "company": user["company"],
                "job_title": user["job_title"],
                "location": user["location"],
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

def get_user_profile(cognito_sub):

    user = repository.get_user_by_cognito_sub(
        cognito_sub
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User profile not found"
        )

    return {
        "user_id": user["user_id"],
        "email": user["email"],
        "full_name": user["full_name"],
        "role": user["role"],
        "status": user["status"],
        "graduation_year": user["graduation_year"],
        "program": user["program"],
        "skills": user["skills"],
        "bio": user["bio"],
    }

def update_profile(cognito_sub: str, user):

    repository.update_user(
        cognito_sub,
        user.model_dump()
    )

    return {
        "message": "Profile updated successfully"
    }

def get_user_by_id(user_id: str):

    print("Service: Getting user profile")

    user = repository.get_user_by_id(user_id)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
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
        "company": user["company"],
        "job_title": user["job_title"],
        "location": user["location"],
        "interests": user["interests"],
        "profile_picture_url": user["profile_picture_url"]
    }

def get_pending_users():

    print("Service: Getting pending users")

    users = repository.get_pending_users()

    return {
        "users": [
            {
                "user_id": user["user_id"],
                "email": user["email"],
                "full_name": user["full_name"],
                "graduation_year": user["graduation_year"],
                "program": user["program"],
                "skills": user["skills"],
                "bio": user["bio"],
                "status": user["status"],
            }
            for user in users
        ]
    }

def reject_user(user_id: str):

    print("Service: Rejecting user")

    rows_updated = repository.reject_user(user_id)

    if rows_updated == 0:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "message": "User rejected successfully"
    }

def get_admin_stats():

    print("Service: Getting dashboard stats")

    stats = repository.get_admin_stats()

    return {
        "total_users": stats["total_users"],
        "approved_users": stats["approved_users"],
        "pending_users": stats["pending_users"],
        "rejected_users": stats["rejected_users"],
        "admins": stats["admins"]
    }

def get_spotlights():

    print("Service: Getting spotlight stories")

    spotlights = repository.get_spotlights()

    return {
        "spotlights": [
            {
                "slide_id": item["slide_id"],
                "title": item["title"],
                "alumni_name": item["alumni_name"],
                "summary": item["summary"],
                "image_url": item["image_url"],
                "podcast_url": item["podcast_url"],
            }
            for item in spotlights
        ]
    }


def create_spotlight(data):

    print("Service: Creating spotlight")

    spotlight_id = repository.create_spotlight(data)

    return {
        "message": "Spotlight created successfully",
        "slide_id": spotlight_id
    }


def update_spotlight(slide_id, data):

    print("Service: Updating spotlight")

    rows_updated = repository.update_spotlight(
        slide_id,
        data
    )

    if rows_updated == 0:
        raise HTTPException(
            status_code=404,
            detail="Spotlight not found"
        )

    return {
        "message": "Spotlight updated successfully"
    }


def delete_spotlight(slide_id):

    print("Service: Deleting spotlight")

    rows_deleted = repository.delete_spotlight(
        slide_id
    )

    if rows_deleted == 0:
        raise HTTPException(
            status_code=404,
            detail="Spotlight not found"
        )

    return {
        "message": "Spotlight deleted successfully"
    }