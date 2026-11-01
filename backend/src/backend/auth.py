import os
import httpx

from fastapi import HTTPException, Request
from jose import jwt
from dotenv import load_dotenv

load_dotenv()

COGNITO_REGION = os.getenv("COGNITO_REGION")

COGNITO_USER_POOL_ID = os.getenv(
    "COGNITO_USER_POOL_ID"
)

COGNITO_CLIENT_ID = os.getenv(
    "COGNITO_CLIENT_ID"
)


JWKS_URL = (
    f"https://cognito-idp.{COGNITO_REGION}.amazonaws.com/"
    f"{COGNITO_USER_POOL_ID}/.well-known/jwks.json"
)


def get_cognito_keys():

    response = httpx.get(JWKS_URL)

    return response.json()["keys"]



def get_current_user(request: Request):

    auth_header = request.headers.get(
        "Authorization"
    )


    if not auth_header:

        raise HTTPException(
            status_code=401,
            detail="Authorization token missing"
        )


    try:

        token = auth_header.split(" ")[1]


        keys = get_cognito_keys()


        header = jwt.get_unverified_header(token)


        key = next(
            key for key in keys
            if key["kid"] == header["kid"]
        )


        payload = jwt.decode(
            token,
            key,
            algorithms=["RS256"],
            audience=COGNITO_CLIENT_ID
        )


        return payload


    except Exception:

        raise HTTPException(
            status_code=401,
            detail="Invalid authentication token"
        )

from fastapi import HTTPException


def require_admin(user):

    groups = user.get(
        "cognito:groups",
        []
    )

    if "ADMIN" not in groups:

        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return user