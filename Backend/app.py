from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import engine, Base

from routers import (
    auth_router,
    post_router,
    user_router,
    ai_router,
    employee_router,
    hr_router,
    teamlead_router
)


# Import models so SQLAlchemy creates all tables
from models import User, Post, DailyUpdate, Shoutout, WeeklyReport, AIAppraisal, Training



Base.metadata.create_all(
    bind=engine
)



app = FastAPI(
    title="PeerPulse API",
    version="1.0"
)



app.add_middleware(
    CORSMiddleware,

   allow_origins=[
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:5177"
],
    allow_credentials=True,

    allow_methods=[
        "*"
    ],

    allow_headers=[
        "*"
    ]
)



app.include_router(auth_router)
app.include_router(post_router)
app.include_router(user_router)
app.include_router(ai_router)
app.include_router(employee_router)
app.include_router(hr_router)
app.include_router(teamlead_router)



@app.get("/")
def home():

    return {
        "message": "PeerPulse backend running"
    }