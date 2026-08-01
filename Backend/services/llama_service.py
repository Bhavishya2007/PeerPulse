import httpx

from database.database import settings



async def ask_llama(prompt: str):

    payload = {

        "model": settings.llama_model,

        "prompt": prompt,

        "stream": False
    }


    async with httpx.AsyncClient() as client:

        response = await client.post(

            settings.llama_api_url,

            json=payload

        )


    data = response.json()


    return data.get(
        "response",
        ""
    )