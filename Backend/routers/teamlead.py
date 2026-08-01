from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db

from models.user import User
from models.weekly_report import WeeklyReport

router = APIRouter(
    prefix="/api/teamlead",
    tags=["Team Lead"]
)


@router.get("/dashboard")
def teamlead_dashboard(
    db: Session = Depends(get_db)
):

    employees = (
        db.query(User)
        .filter(User.role == "EMPLOYEE")
        .all()
    )

    pending_reports = (
        db.query(WeeklyReport)
        .filter(
            WeeklyReport.status == "PENDING"
        )
        .count()
    )

    return {
        "total_employees": len(employees),
        "pending_reports": pending_reports
    }


@router.get("/reports")
def get_reports(
    db: Session = Depends(get_db)
):

    reports = (
        db.query(WeeklyReport)
        .order_by(
            WeeklyReport.id.desc()
        )
        .all()
    )

    return reports


@router.get("/report/{report_id}")
def get_report(
    report_id: int,
    db: Session = Depends(get_db)
):

    report = (
        db.query(WeeklyReport)
        .filter(
            WeeklyReport.id == report_id
        )
        .first()
    )

    if not report:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return report


@router.post("/report/{report_id}/approve")
def approve_report(
    report_id: int,
    db: Session = Depends(get_db)
):

    report = (
        db.query(WeeklyReport)
        .filter(
            WeeklyReport.id == report_id
        )
        .first()
    )

    if not report:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    report.status = "APPROVED"

    report.approved_at = datetime.utcnow()

    db.commit()

    return {
        "message": "Report approved successfully"
    }


@router.post("/report/{report_id}/request-change")
def request_change(
    report_id: int,
    db: Session = Depends(get_db)
):

    report = (
        db.query(WeeklyReport)
        .filter(
            WeeklyReport.id == report_id
        )
        .first()
    )

    if not report:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    report.status = "CHANGES_REQUIRED"

    db.commit()

    return {
        "message": "Changes requested"
    }