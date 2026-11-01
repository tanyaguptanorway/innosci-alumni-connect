from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .cognito import verify_token


security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    try:
        user = verify_token(token)
        return user

    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=f"Invalid token: {str(e)}"
        )


def require_admin(
    user=Depends(get_current_user)
):

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