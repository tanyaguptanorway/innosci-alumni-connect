import boto3
import json


bedrock_client = boto3.client(
    "bedrock-runtime",
    region_name="eu-north-1"
)


def recommend_mentors(user_profile, mentors):

    prompt = f"""
You are an alumni mentoring assistant.

Analyze the user's profile and find the best mentors.

User Profile:
{json.dumps(user_profile, indent=2)}

Available Mentors:
{json.dumps(mentors, indent=2)}

Return ONLY JSON.

Format:

[
  {{
    "mentor_name": "",
    "match_score": integer between 0 and 100,
    "reason": "",
    "matched_skills": []
  }}
]

Calculate the score based on:
- 40% skill similarity
- 30% career goal alignment
- 20% industry experience
- 10% location or availability
"""

    response = bedrock_client.invoke_model(
        modelId="amazon.nova-lite-v1:0",
        body=json.dumps({
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ]
        }),
        contentType="application/json",
        accept="application/json"
    )

    result = json.loads(response["body"].read())

    # Extract Bedrock text response
    text = result["output"]["message"]["content"][0]["text"]

    # Remove markdown JSON wrapper if Bedrock adds it
    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    # Convert AI text into real JSON
    return json.loads(text)