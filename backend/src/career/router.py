import time

from botocore.exceptions import BotoCoreError, ClientError
from fastapi import APIRouter, Depends, HTTPException
from pydantic import ValidationError

import repository
from auth import get_current_user

from .bedrock_client import MODEL_ID, generate_guidance
from .mentors import find_candidates
from .schemas import CareerRequest, CareerResponse

LIMIT_PER_HOUR = 5
_recent: dict[str, list[float]] = {}


def require_alumni(current_user=Depends(get_current_user)):
    user = repository.get_user_by_cognito_sub(current_user["sub"])
    if not user or user["status"] != "APPROVED" or user["role"] != "ALUMNI":
        raise HTTPException(403, "The career assistant is available to approved alumni only.")
    return user


def _check_rate(user_id: str):
    now = time.time()
    hits = [t for t in _recent.get(user_id, []) if now - t < 3600]
    if len(hits) >= LIMIT_PER_HOUR:
        raise HTTPException(429, "You've reached the hourly limit. Please try again later.")
    hits.append(now)
    _recent[user_id] = hits


router = APIRouter(prefix="/api/career", tags=["career-assistant"])


@router.get("/health")
def health(user=Depends(require_alumni)):
    return {"status": "ok", "model": MODEL_ID}


@router.post("/recommend", response_model=CareerResponse)
def recommend(req: CareerRequest, user=Depends(require_alumni)):
    _check_rate(user["user_id"])
    candidates = find_candidates(req, user["user_id"])
    try:
        return generate_guidance(req, candidates)
    except (ClientError, BotoCoreError) as e:
        print("Bedrock error:", e)
        raise HTTPException(502, "The AI service is unavailable right now. Please try again.")
    except (ValueError, ValidationError):
        raise HTTPException(502, "AI returned an unreadable answer. Please try again.")