from sqlalchemy import Column, Integer, Text, DateTime
from sqlalchemy.sql import func

from database.database import Base


class Shoutout(Base):

    __tablename__ = "shoutouts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    from_employee = Column(
        Integer,
        nullable=False,
        index=True
    )

    to_employee = Column(
        Integer,
        nullable=False,
        index=True
    )

    message = Column(
        Text,
        nullable=False
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )