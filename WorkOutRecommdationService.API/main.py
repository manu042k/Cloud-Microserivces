from http.client import HTTPException
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from config import load_environment
from memory import DietChat, GetCaloriesByImage, WorkoutChat
from models import ImageRequest, WorkOutRequest, DietPlanRequest
from auth_middleware import AuthMiddleware
from fastapi.middleware.cors import CORSMiddleware
from pydantic import ValidationError

app = FastAPI()
load_environment()

app.add_middleware(AuthMiddleware)

@app.post("/workout")
def generate_workout_plan(request: WorkOutRequest):
    try:
        chatbot = WorkoutChat()  # Use the specific WorkoutChat class
        response = chatbot.get_plan(request)
        print(request,response)
        return {"message": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")
    
    
@app.post("/dietplan")
async def generate_diet_plan(request: DietPlanRequest):
    try:
        print("Received request data:", jsonable_encoder(request))
        chatbot = DietChat()
        response = chatbot.get_plan(request)
        return {"message": response}
    except ValidationError as e:
        print("Validation error details:", e.errors())
        return JSONResponse(
            status_code=422,
            content={"detail": e.errors(), "body": jsonable_encoder(request)}
        )
    except Exception as e:
        print("General error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/get-calories")
async def chat(request: ImageRequest):
    """Process chat request with image and query asynchronously."""
    try:
        chat = GetCaloriesByImage()
        response = chat.get_response(request.base64Image)
        return {"response": response}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

