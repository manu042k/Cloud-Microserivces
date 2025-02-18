from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class WorkOutRequest(BaseModel):
    query: str

class MacrosModel(BaseModel):
    Protein: str
    Carbs: str
    Fats: str

class DietPlanRequest(BaseModel):
    age: int
    gender: str
    height_cm: float
    weight_kg: float
    activity_level: str
    goal: str
    diet_type: str
    allergies: List[str]
    disliked_foods: List[str]
    preferred_cuisine: List[str]
    meal_count_per_day: int
    cooking_time_limit: int
    caloric_intake: int
    macros: MacrosModel
    detailed_recipe: bool
    shopping_list: bool
    include_snacks: bool

class ImageRequest(BaseModel):
    base64Image: str