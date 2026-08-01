from datetime import (
    datetime,
    timezone
)

from sqlalchemy.orm import Session

from models.shoutout import Shoutout


MAX_SHOUTOUTS = 16


def current_cycle_shoutouts(
    db: Session,
    sender_id: int
) -> int:

    now = datetime.now(
        timezone.utc
    )


    cycle_start = now.replace(

        day=1,

        hour=0,

        minute=0,

        second=0,

        microsecond=0

    ).replace(
        tzinfo=None
    )


    return (

        db.query(Shoutout)

        .filter(

            Shoutout.from_employee ==
            sender_id,

            Shoutout.created_at >=
            cycle_start

        )

        .count()

    )


def remaining_quota(
    db: Session,
    sender_id: int
) -> int:

    used = current_cycle_shoutouts(
        db,
        sender_id
    )


    return max(

        0,

        MAX_SHOUTOUTS - used

    )


# Aliases used by routers/employee.py
def get_shoutout_count(
    db: Session,
    sender_id: int
) -> int:
    return current_cycle_shoutouts(db, sender_id)


def can_give_shoutout(
    db: Session,
    sender_id: int
) -> bool:
    return current_cycle_shoutouts(db, sender_id) < MAX_SHOUTOUTS