from pydantic import BaseModel


class AIAnalysisRequest(BaseModel):

    employee_id: int

    month: str


class AIAnalysisResponse(BaseModel):

    employee_id: int

    month: str

    result: dict