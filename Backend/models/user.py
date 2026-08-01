from sqlalchemy import Column, Integer, String
from database.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String,
        unique=True
    )

    email = Column(
        String,
        unique=True
    )

    hashed_password = Column(
        String
    )

    name = Column(
        String
    )

    department = Column(
        String
    )

    job_title = Column(
        String
    )

    role = Column(
        String,
        default="EMPLOYEE"
    )