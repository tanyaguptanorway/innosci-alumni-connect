from fastapi import FastAPI

from backend import services


app = FastAPI()


@app.get("/")
def home():
    print("Home endpoint called")
    return {
        "message": "Alumni Connect Backend Running"
    }


@app.post("/users")
def register_user():

    return services.register_user()


@app.get("/users")
def get_users():

    return services.get_users()