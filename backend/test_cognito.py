import os
import hmac
import hashlib
import base64

import boto3
from dotenv import load_dotenv


load_dotenv()


# Cognito configuration from .env
COGNITO_REGION = os.getenv("COGNITO_REGION")

CLIENT_ID = os.getenv("COGNITO_CLIENT_ID")

CLIENT_SECRET = os.getenv(
    "COGNITO_CLIENT_SECRET"
)


# Test user
USERNAME = "admin@innosci.com"
TEMP_PASSWORD = "Admin@12345New"

# New permanent password
NEW_PASSWORD = "Admin@12345New"


def get_secret_hash(
    username: str,
    client_id: str,
    client_secret: str
):

    message = username + client_id

    digest = hmac.new(
        client_secret.encode("utf-8"),
        message.encode("utf-8"),
        hashlib.sha256
    ).digest()

    return base64.b64encode(digest).decode()



client = boto3.client(
    "cognito-idp",
    region_name=COGNITO_REGION
)



print("Starting Cognito authentication...")


# First login attempt
response = client.initiate_auth(

    ClientId=CLIENT_ID,

    AuthFlow="USER_PASSWORD_AUTH",

    AuthParameters={

        "USERNAME": USERNAME,

        "PASSWORD": TEMP_PASSWORD,

        "SECRET_HASH": get_secret_hash(
            USERNAME,
            CLIENT_ID,
            CLIENT_SECRET
        )
    }
)



# Handle temporary password
if response.get("ChallengeName") == "NEW_PASSWORD_REQUIRED":

    print(
        "Temporary password detected. Setting new password..."
    )


    challenge_response = client.respond_to_auth_challenge(

        ClientId=CLIENT_ID,

        ChallengeName="NEW_PASSWORD_REQUIRED",

        Session=response["Session"],

        ChallengeResponses={

            "USERNAME": USERNAME,

            "NEW_PASSWORD": NEW_PASSWORD,

            "SECRET_HASH": get_secret_hash(
                USERNAME,
                CLIENT_ID,
                CLIENT_SECRET
            )
        }
    )


    response = challenge_response



# Successful login

if "AuthenticationResult" in response:

    tokens = response["AuthenticationResult"]


    print("\n========== SUCCESS ==========\n")


    print("Access Token:")
    print(tokens["AccessToken"])


    print("\nID Token:")
    print(tokens["IdToken"])


    print("\nRefresh Token:")
    print(tokens["RefreshToken"])


else:

    print("\nAuthentication failed:")
    print(response)
    