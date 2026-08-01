from sqlalchemy import Column, Integer, Text, String, DateTime
from sqlalchemy.sql import func

from database.database import Base


class WeeklyReport(Base):

    __tablename__ = "weekly_reports"

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

    week = Column(
        String(20),
        nullable=False
    )

    summary = Column(
        Text,
        nullable=True
    )

    status = Column(
        String(20),
        default="PENDING"
    )

    tl_comment = Column(
        Text,
        nullable=True
    )

    approved_by = Column(
        Integer,
        nullable=True
    )

    approved_at = Column(
        DateTime,
        nullable=True
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )