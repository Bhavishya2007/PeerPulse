from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

from database.database import settings


SECRET_KEY = settings.secret_key

ALGORITHM = "HS256"


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)



def hash_password(password: str):

    return pwd_context.hash(password)



def verify_password(
    plain_password,
    hashed_password
):

    return pwd_context.verify(
        plain_password,
        hashed_password
    )



def create_token(data: dict):

    expire = datetime.utcnow() + timedelta(
        minutes=60
    )

    data.update(
        {
            "exp": expire
        }
    )


    return jwt.encode(
        data,
        SECRET_KEY,
        algorithm=ALGORITHM
    )