from pydantic import BaseModel


class ShoutoutRequest(BaseModel):

    from_employee: int

    to_employee: int

    message: str


class ShoutoutResponse(BaseModel):

    id: int

    from_employee: int

    to_employee: int

    message: str

    class Config:
        from_attributes = True