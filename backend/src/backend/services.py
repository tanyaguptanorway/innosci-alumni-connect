from backend.schemas import UserCreate


def register_user(user: UserCreate):

    print("Register user function called")

    print(user)

    return {
        "message": "User received",
        "email": user.email,
        "name": user.full_name
    }


def get_users():

    print("Get users function called")

    return {
        "users": []
    }

