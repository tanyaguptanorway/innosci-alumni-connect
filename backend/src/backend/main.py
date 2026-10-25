from fastapi import FastAPI

from backend import services
from backend.schemas import UserCreate
from backend import database


app = FastAPI()


@app.get("/")
def home():
    print("Home endpoint called")
    return {
        "message": "Alumni Connect Backend Running"
    }


@app.post("/users")
def register_user(user: UserCreate):

    return services.register_user(user)


@app.get("/users")
def get_users():

    return services.get_users()

@app.get("/database-test")
def database_test():

    connection = database.get_connection()

    connection.close()

    return {
        "message": "Database connection worked"
    }