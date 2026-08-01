from sqlalchemy.orm import Session

from models.user import User
from utils.security import (
    hash_password,
    verify_password
)



def create_user(
    db: Session,
    username,
    email,
    password
):

    user = User(
        username=username,
        email=email,
        hashed_password=hash_password(password)
    )


    db.add(user)

    db.commit()

    db.refresh(user)

    return user



def authenticate_user(
    db: Session,
    email,
    password
):

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )


    if not user:
        return None


    if not verify_password(
        password,
        user.hashed_password
    ):
        return None


    return user