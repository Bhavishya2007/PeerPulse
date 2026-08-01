from sqlalchemy import Column, Integer, String, Text
from database.database import Base


class Training(Base):

    __tablename__ = "trainings"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    employee_id = Column(
        Integer
    )

    skill_gap = Column(
        String
    )

    course_name = Column(
        String
    )

    reason = Column(
        Text
    )