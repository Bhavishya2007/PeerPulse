from pydantic import BaseModel


class WeeklyReportResponse(BaseModel):

    id: int

    employee_id: int

    week: str

    summary: str | None

    status: str

    tl_comment: str | None

    class Config:
        from_attributes = True