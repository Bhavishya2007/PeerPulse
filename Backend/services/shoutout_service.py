from datetime import (
    datetime,
    timezone
)

from sqlalchemy.orm import Session

from models.user import User
from models.shoutout import Shoutout

from schemas.shoutout_schema import (
    ShoutoutCreate
)


SHOUTOUT_LIMIT = 16


# --------------------------------------------------
# COUNT SHOUTOUTS
# --------------------------------------------------

def get_sent_count(
    db: Session,
    sender_id: int
) -> int:

    now = datetime.now(
        timezone.utc
    )


    start = now.replace(

        day=1,

        hour=0,

        minute=0,

        second=0,

        microsecond=0

    )


    return (

        db.query(Shoutout)

        .filter(

            Shoutout.sender_id ==
            sender_id,

            Shoutout.created_at >=
            start.replace(
                tzinfo=None
            )

        )

        .count()

    )


# --------------------------------------------------
# CREATE SHOUTOUT
# --------------------------------------------------

def create_shoutout(
    db: Session,
    sender: User,
    payload: ShoutoutCreate
):

    # Prevent self-recognition

    if payload.receiver_id == sender.id:

        raise ValueError(
            "You cannot send a shoutout to yourself"
        )


    # Find receiver

    receiver = (

        db.query(User)

        .filter(

            User.id ==
            payload.receiver_id,

            User.is_active == True

        )

        .first()

    )


    if not receiver:

        raise ValueError(
            "Receiver not found"
        )


    # Check quota

    used = get_sent_count(
        db,
        sender.id
    )


    if used >= SHOUTOUT_LIMIT:

        raise ValueError(
            "You have reached the 16-shoutout monthly quota"
        )


    message = payload.message.strip()


    if len(message) < 10:

        raise ValueError(
            "Shoutout should contain meaningful evidence"
        )


    row = Shoutout(

        sender_id=sender.id,

        receiver_id=
            receiver.id,

        message=message,

        competency=
            payload.competency,

        points=1

    )


    db.add(row)

    db.commit()

    db.refresh(row)


    return row


# --------------------------------------------------
# RECEIVED SHOUTOUTS
# --------------------------------------------------

def get_received_shoutouts(
    db: Session,
    receiver_id: int
):

    return (

        db.query(Shoutout)

        .filter(

            Shoutout.receiver_id ==
            receiver_id

        )

        .order_by(

            Shoutout.created_at.desc()

        )

        .all()

    )