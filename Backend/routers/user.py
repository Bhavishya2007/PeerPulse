from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db

from models.user import User

from schemas.user_schema import (
    UserCreate,
    UserLogin,
    UserResponse
)


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/")
def get_users(
    db: Session = Depends(get_db)
):

    users = db.query(User).all()

    return users