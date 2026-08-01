from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from database.database import get_db

from models.post import Post

from schemas.post import (
    PostCreate,
    PostResponse
)

from services.llama_service import ask_llama


router = APIRouter(
    prefix="/posts",
    tags=["Posts"]
)



@router.post(
    "/",
    response_model=PostResponse
)
def create_post(
    post: PostCreate,
    db: Session = Depends(get_db)
):

    new_post = Post(
        content=post.content,
        user_id=1
    )


    db.add(new_post)

    db.commit()

    db.refresh(new_post)


    return new_post



@router.post("/ai")
async def ai_reply(
    post: PostCreate
):

    response = await ask_llama(
        post.content
    )


    return {
        "reply": response
    }