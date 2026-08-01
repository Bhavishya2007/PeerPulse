from datetime import datetime
import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db

from models.user import User
from models.daily_update import DailyUpdate
from models.shoutout import Shoutout
from models.weekly_report import WeeklyReport
from models.appraisal import AIAppraisal

from services.ai_service import analyze_employee


router = APIRouter(
    prefix="/api/ai",
    tags=["AI"]
)


@router.post("/analyze/{employee_id}")
async def analyze_performance(
    employee_id: int,
    db: Session = Depends(get_db)
):

    employee = (
        db.query(User)
        .filter(
            User.id == employee_id
        )
        .first()
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )


    updates = (
        db.query(DailyUpdate)
        .filter(
            DailyUpdate.employee_id == employee_id
        )
        .all()
    )


    shoutouts = (
        db.query(Shoutout)
        .filter(
            Shoutout.to_employee == employee_id
        )
        .all()
    )


    reports = (
        db.query(WeeklyReport)
        .filter(
            WeeklyReport.employee_id == employee_id,
            WeeklyReport.status == "APPROVED"
        )
        .all()
    )


    if not updates and not shoutouts and not reports:
        raise HTTPException(
            status_code=400,
            detail="Not enough performance data for AI analysis"
        )


    daily_updates_text = [
        update.description
        for update in updates
    ]


    shoutouts_text = [
        shoutout.message
        for shoutout in shoutouts
    ]


    weekly_reports_text = [
        report.summary or ""
        for report in reports
    ]


    result = await analyze_employee(

        employee_name=employee.username,

        daily_updates=daily_updates_text,

        shoutouts=shoutouts_text,

        weekly_reports=weekly_reports_text
    )


    month = datetime.now().strftime("%Y-%m")


    appraisal = AIAppraisal(

        employee_id=employee_id,

        month=month,

        overall_score=result.get(
            "overall_score"
        ),

        competencies=json_string(
            result.get(
                "competencies",
                {}
            )
        ),

        strengths=json_string(
            result.get(
                "strengths",
                []
            )
        ),

        skill_gaps=json_string(
            result.get(
                "skill_gaps",
                []
            )
        ),

        badge=result.get(
            "badge",
            ""
        ),

        training=result.get(
            "training",
            ""
        ),

        career_path=result.get(
            "career_path",
            ""
        ),

        appraisal=result.get(
            "appraisal",
            ""
        )
    )


    db.add(appraisal)

    db.commit()

    db.refresh(appraisal)


    return {
        "message": "AI analysis completed",
        "employee_id": employee_id,
        "analysis": result
    }



def json_string(value):

    return json.dumps(
        value,
        ensure_ascii=False
    )