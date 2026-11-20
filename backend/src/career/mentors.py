"""Finds mentor candidates from approved alumni in the database."""
import re

import repository

from .schemas import CareerRequest


def find_candidates(req: CareerRequest, user_id: str, limit: int = 6) -> list[dict]:
    words = " ".join([req.target_role, *req.skills, *req.interests]).lower()
    tokens = {t for t in re.findall(r"[a-z0-9+#.]+", words) if len(t) > 2}

    scored = []
    for row in repository.get_dashboard_candidates(user_id):  # approved, excludes the user
        text = " ".join(
            str(row.get(k) or "")
            for k in ("job_title", "company", "program", "skills", "interests")
        ).lower()
        score = sum(1 for t in tokens if t in text)
        scored.append((score, row))

    scored.sort(key=lambda s: s[0], reverse=True)

    out = []
    for _, row in scored[:limit]:
        details = ", ".join(
            f"{k}: {row[k]}" for k in ("program", "skills", "interests") if row.get(k)
        )
        out.append({
            "name": row["full_name"],
            "role": row.get("job_title") or "",
            "company": row.get("company") or "",
            "details": details[:400],
        })
    return out