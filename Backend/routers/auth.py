
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db

from schemas.user_schema import (
    UserCreate,
    UserLogin,
    UserResponse
)

from services.auth_service import (
    create_user,
    authenticate_user
)

from utils.security import create_token


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)



@router.post(
    "/register",
    response_model=UserResponse
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    return create_user(
        db,
        user.username,
        user.email,
        user.password
    )



@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    db_user = authenticate_user(
        db,
        user.email,
        user.password
    )


    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )


    token = create_token(
        {
            "user_id": db_user.id
        }
    )


    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "username": db_user.username,
            "email": db_user.email,
            "name": db_user.name,
            "role": db_user.role
        }
    }
