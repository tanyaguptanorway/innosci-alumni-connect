import os
import json

from dotenv import load_dotenv
from openai import OpenAI


load_dotenv()


client = OpenAI(
    api_key=os.getenv("BEDROCK_OPENAI_API_KEY"),
    base_url=os.getenv("BEDROCK_OPENAI_BASE_URL")
)


MODEL = "openai.gpt-oss-120b"


def recommend_mentors(user_profile, mentors):

    prompt = f"""
You are an alumni mentoring assistant.

User Profile:
{json.dumps(user_profile, indent=2)}

Available Mentors:
{json.dumps(mentors, indent=2)}

Return ONLY JSON.

Format:

[
  {{
    "mentor_name": "",
    "match_score": 0,
    "reason": "",
    "matched_skills": []
  }}
]
"""

    response = client.responses.create(
        model=MODEL,
        input=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    text = response.output_text

    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    return json.loads(text)