import json
from services.llama_service import ask_llama


async def analyze_employee(
    employee_name: str,
    daily_updates: list[str],
    shoutouts: list[str],
    weekly_reports: list[str]
) -> dict:

    updates_text = "\n".join(
        f"- {u}" for u in daily_updates
    ) or "None"

    shoutouts_text = "\n".join(
        f"- {s}" for s in shoutouts
    ) or "None"

    reports_text = "\n".join(
        f"- {r}" for r in weekly_reports
    ) or "None"

    prompt = f"""You are an HR AI assistant. Analyze the following employee performance data and return a JSON object.

Employee: {employee_name}

Daily Updates:
{updates_text}

Peer Shoutouts Received:
{shoutouts_text}

Approved Weekly Reports:
{reports_text}

Return ONLY a valid JSON object with these exact keys:
{{
  "overall_score": <float 0-10>,
  "competencies": {{"key_competency": <score 0-10>, ...}},
  "strengths": ["strength1", "strength2"],
  "skill_gaps": ["gap1", "gap2"],
  "badge": "<badge title>",
  "training": "<training recommendation>",
  "career_path": "<suggested career path>",
  "appraisal": "<narrative appraisal paragraph>"
}}"""

    raw = await ask_llama(prompt)

    # Extract JSON from the response
    start = raw.find("{")
    end = raw.rfind("}") + 1

    if start == -1 or end == 0:
        return {
            "overall_score": None,
            "competencies": {},
            "strengths": [],
            "skill_gaps": [],
            "badge": "",
            "training": "",
            "career_path": "",
            "appraisal": raw
        }

    try:
        return json.loads(raw[start:end])
    except json.JSONDecodeError:
        return {
            "overall_score": None,
            "competencies": {},
            "strengths": [],
            "skill_gaps": [],
            "badge": "",
            "training": "",
            "career_path": "",
            "appraisal": raw
        }