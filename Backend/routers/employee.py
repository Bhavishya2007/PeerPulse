from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db

from models.user import User
from models.daily_update import DailyUpdate
from models.shoutout import Shoutout

from schemas.update_schema import DailyUpdateRequest
from schemas.shoutout_schema import ShoutoutRequest

from utils.quota import (
    get_shoutout_count,
    can_give_shoutout,
    MAX_SHOUTOUTS
)

router = APIRouter(
    prefix="/api/employee",
    tags=["Employee"]
)


@router.post("/daily-update")
def create_daily_update(
    request: DailyUpdateRequest,
    db: Session = Depends(get_db)
):

    employee = (
        db.query(User)
        .filter(User.id == request.employee_id)
        .first()
    )

    if not employee:

        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    update = DailyUpdate(
        employee_id=request.employee_id,
        description=request.description
    )

    db.add(update)

    db.commit()

    db.refresh(update)

    return {
        "message": "Daily update submitted successfully",
        "update": update
    }


@router.post("/shoutout")
def create_shoutout(
    request: ShoutoutRequest,
    db: Session = Depends(get_db)
):

    sender = (
        db.query(User)
        .filter(User.id == request.from_employee)
        .first()
    )

    receiver = (
        db.query(User)
        .filter(User.id == request.to_employee)
        .first()
    )

    if not sender:

        raise HTTPException(
            status_code=404,
            detail="Sender not found"
        )

    if not receiver:

        raise HTTPException(
            status_code=404,
            detail="Receiver not found"
        )

    if sender.id == receiver.id:

        raise HTTPException(
            status_code=400,
            detail="You cannot give a shoutout to yourself"
        )

    if not can_give_shoutout(
        db,
        request.from_employee
    ):

        raise HTTPException(
            status_code=400,
            detail=f"Shoutout quota reached. Maximum {MAX_SHOUTOUTS} allowed."
        )

    shoutout = Shoutout(
        from_employee=request.from_employee,
        to_employee=request.to_employee,
        message=request.message
    )

    db.add(shoutout)

    db.commit()

    db.refresh(shoutout)

    return {
        "message": "Shoutout sent successfully",
        "remaining": MAX_SHOUTOUTS - get_shoutout_count(
            db,
            request.from_employee
        ),
        "shoutout": shoutout
    }


@router.get("/{employee_id}/dashboard")
def employee_dashboard(
    employee_id: int,
    db: Session = Depends(get_db)
):

    employee = (
        db.query(User)
        .filter(User.id == employee_id)
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
        .order_by(
            DailyUpdate.id.desc()
        )
        .all()
    )

    received = (
        db.query(Shoutout)
        .filter(
            Shoutout.to_employee == employee_id
        )
        .order_by(
            Shoutout.id.desc()
        )
        .all()
    )

    given_count = get_shoutout_count(
        db,
        employee_id
    )

    return {

        "employee": {
            "id": employee.id,
            "name": employee.name,
            "email": employee.email,
            "department": employee.department
        },

        "shoutouts": {
            "used": given_count,
            "remaining": MAX_SHOUTOUTS - given_count,
            "limit": MAX_SHOUTOUTS
        },

        "daily_updates": updates,

        "recognition_received": received
    }