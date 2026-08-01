from sqlalchemy import Column, Integer, Text, DateTime
from sqlalchemy.sql import func

from database.database import Base


class DailyUpdate(Base):

    __tablename__ = "daily_updates"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    employee_id = Column(
        Integer,
        nullable=False,
        index=True
    )

    description = Column(
        Text,
        nullable=False
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )