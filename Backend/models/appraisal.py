from sqlalchemy import Column, Integer, Float, Text, String, DateTime
from sqlalchemy.sql import func

from database.database import Base


class AIAppraisal(Base):

    __tablename__ = "ai_appraisals"

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

    month = Column(
        String(20),
        nullable=False
    )

    overall_score = Column(
        Float,
        nullable=True
    )

    competencies = Column(
        Text,
        nullable=True
    )

    strengths = Column(
        Text,
        nullable=True
    )

    skill_gaps = Column(
        Text,
        nullable=True
    )

    badge = Column(
        String(100),
        nullable=True
    )

    training = Column(
        Text,
        nullable=True
    )

    career_path = Column(
        Text,
        nullable=True
    )

    appraisal = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )