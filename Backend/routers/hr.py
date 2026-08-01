from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db

from models.user import User
from models.appraisal import AIAppraisal

router = APIRouter(
    prefix="/api/hr",
    tags=["HR"]
)


@router.get("/dashboard")
def hr_dashboard(
    db: Session = Depends(get_db)
):

    employees = (
        db.query(User)
        .filter(
            User.role == "EMPLOYEE"
        )
        .count()
    )

    appraisals = (
        db.query(AIAppraisal)
        .count()
    )

    return {

        "total_employees": employees,

        "total_ai_appraisals": appraisals
    }


@router.get("/employees")
def get_employees(
    db: Session = Depends(get_db)
):

    employees = (
        db.query(User)
        .filter(
            User.role == "EMPLOYEE"
        )
        .all()
    )

    return employees


@router.get(
    "/employee/{employee_id}/appraisal"
)
def get_employee_appraisal(
    employee_id: int,
    db: Session = Depends(get_db)
):

    appraisal = (
        db.query(AIAppraisal)
        .filter(
            AIAppraisal.employee_id == employee_id
        )
        .order_by(
            AIAppraisal.id.desc()
        )
        .first()
    )

    if not appraisal:

        raise HTTPException(
            status_code=404,
            detail="No AI appraisal found"
        )

    return appraisal