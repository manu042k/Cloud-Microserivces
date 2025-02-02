
from pydantic import BaseModel, Field
from typing import List, Optional

class WorkOutRequest(BaseModel):
    query: str

class DietPlanRequest(BaseModel):
    age: int
    gender: str
    height_cm: float
    weight_kg: float
    activity_level: str
    goal: str
    diet_type: str
    allergies: list[str]
    disliked_foods: list[str]
    preferred_cuisine: list[str]
    meal_count_per_day: int
    cooking_time_limit: int 
    caloric_intake: int 
    macros: dict 
    detailed_recipe: bool
    shopping_list: bool
    include_snacks: bool 


class ImageRequest(BaseModel):
    base64Image: str