from fastapi import FastAPI
from config import load_environment
from memory import GroqChat
from pydantic import BaseModel

class WorkOutRequest(BaseModel):
    query: str

app = FastAPI()
load_environment()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.post("/workout")
async def generate_workout_plan(request:WorkOutRequest):
    try:
        chatbot = GroqChat()
        response =  chatbot.get_response(request.query)
        return {"message": response}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}
    

