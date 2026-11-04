import os
import requests

from jose import jwt
from dotenv import load_dotenv


load_dotenv()


REGION = os.getenv("COGNITO_REGION")
USER_POOL_ID = os.getenv("COGNITO_USER_POOL_ID")
CLIENT_ID = os.getenv("COGNITO_CLIENT_ID")


ISSUER = (
    f"https://cognito-idp.{REGION}.amazonaws.com/{USER_POOL_ID}"
)


JWKS_URL = f"{ISSUER}/.well-known/jwks.json"


jwks = requests.get(JWKS_URL).json()


def verify_token(token: str):

    headers = jwt.get_unverified_header(token)

    kid = headers["kid"]


    key = None

    for item in jwks["keys"]:
        if item["kid"] == kid:
            key = item
            break


    if key is None:
        raise Exception("Public key not found")


    payload = jwt.decode(
        token,
        key,
        algorithms=["RS256"],
        audience=CLIENT_ID,
        issuer=ISSUER
    )


    return payload