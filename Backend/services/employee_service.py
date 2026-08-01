from sqlalchemy.orm import Session

from models.daily_update import DailyUpdate

from schemas.update_schema import (
    DailyUpdateCreate
)


def create_daily_update(
    db: Session,
    employee_id: int,
    payload: DailyUpdateCreate
):

    row = DailyUpdate(

        employee_id=employee_id,

        work_date=
            payload.work_date,

        achievement=
            payload.achievement,

        blockers=
            payload.blockers,

        assistance=
            payload.assistance

    )


    db.add(row)

    db.commit()

    db.refresh(row)


    return row


def get_employee_updates(
    db: Session,
    employee_id: int
):

    return (

        db.query(DailyUpdate)

        .filter(
            DailyUpdate.employee_id ==
            employee_id
        )

        .order_by(

            DailyUpdate.work_date.desc(),

            DailyUpdate.created_at.desc()

        )

        .all()

    )