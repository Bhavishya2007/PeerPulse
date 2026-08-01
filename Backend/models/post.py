from sqlalchemy import Column, Integer, String, Text, ForeignKey
from database.database import Base


class Post(Base):

    __tablename__ = "posts"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    content = Column(
        Text
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )