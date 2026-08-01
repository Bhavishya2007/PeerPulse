from pydantic import BaseModel


class DailyUpdateRequest(BaseModel):

    employee_id: int

    description: str


class DailyUpdateResponse(BaseModel):

    id: int

    employee_id: int

    description: str

    class Config:
        from_attributes = True