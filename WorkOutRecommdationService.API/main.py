from http.client import HTTPException
from fastapi import FastAPI # type: ignore
from config import load_environment
from memory import DietChat, GetCaloriesByImage, WorkoutChat
from models import ImageRequest, WorkOutRequest, DietPlanRequest


app = FastAPI()
load_environment()


@app.post("/workout")
async def generate_workout_plan(request: WorkOutRequest):
    try:
        chatbot = WorkoutChat()  # Use the specific WorkoutChat class
        response = chatbot.get_plan(request)
        return {"message": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")
    
    
@app.post("/dietplan")
async def generate_diet_plan(request: DietPlanRequest):
    try:
        chatbot = DietChat()  # Use the specific DietChat class
        response = chatbot.get_plan(request)
        return {"message": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

@app.post("/get-calories/")
async def chat(request: ImageRequest):
    """Process chat request with image and query asynchronously."""
    try:
        chat = GetCaloriesByImage()
        response = chat.get_response(request.base64Image)
        return {"response": response}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

