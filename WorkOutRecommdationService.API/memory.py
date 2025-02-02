from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate,ChatPromptTemplate
from models import DietPlanRequest
from config import load_environment
import base64
load_environment()

class BaseGroqChat:
    """
    Base chatbot class to handle interaction with the Groq model.
    This class handles generating responses based on different context.
    """

    def __init__(self, model_name="llama-3.1-8b-instant"):
        """
        Initialize the chatbot with the given model name.
        
        Args:
            model_name (str): Name of the Groq model to be used.
        """
        self.model = ChatGroq(model=model_name)

    def _create_prompt(self, prompt_template: str) -> PromptTemplate:
        """
        Creates a customized prompt template.

        Args:
            prompt_template (str): The template string for the prompt.

        Returns:
            PromptTemplate: A formatted prompt template.
        """
        return PromptTemplate(template=prompt_template, input_variables=["context"])

    def _generate_response(self, context: str, prompt_template: str) -> str:
        """
        Generates a response from the chatbot using the specified prompt.

        Args:
            context (str): The client-provided details.
            prompt_template (str): The prompt template.

        Returns:
            str: The chatbot's response.
        """
        try:
            prompt = self._create_prompt(prompt_template)
            chain = prompt | self.model
            response = chain.invoke({"context": context})
            return response.content
        except Exception as e:
            return f"An error occurred while generating the response: {str(e)}"


class WorkoutChat(BaseGroqChat):
    """
    A chatbot class specifically for generating personalized workout plans.
    """

    WORKOUT_PROMPT = """
    You are a professional fitness coach. Your client has shared the following details:

    {context}

    Based on this, create a **personalized workout plan**, including:
    1. **Warm-up Routine** - Duration and specific exercises.
    2. **Strength Training** - Exercise sets, reps, rest time.
    3. **Cardio Plan** - Best suited activities (running, HIIT, etc.).
    4. **Cool-down & Stretching** - Recovery techniques.
    5. **Weekly Progress Tracking Tips**.
    """

    def get_plan(self, context: str) -> str:
        """
        Generates a personalized workout plan.

        Args:
            context (str): Client-provided fitness details.

        Returns:
            str: The generated workout plan.
        """
        return self._generate_response(context, self.WORKOUT_PROMPT)


class DietChat(BaseGroqChat):
    """
    A chatbot class to generate a customized diet plan based on client input.
    """

    DIET_PROMPT = """
        You are a **certified nutritionist** helping a client create a **custom diet plan**.
        Below are the client's details:
        {context}
         Based on this, create a **detailed meal plan** that includes:
        1. **Daily calorie & macro breakdown** ({{'Protein'}}, {{'Carbs'}}, {{'Fats'}}).
        2. **Breakfast, Lunch, Dinner, and Snacks** with portion sizes.
        3. **Nutrient-rich food recommendations** based on goals.
        4. **Hydration & Supplement Advice**.
        5. **Easy meal prep tips** for efficiency
        """ 
    
    def get_plan(self,request: DietPlanRequest) -> str:
        """
        Generates a personalized diet plan based on the client's details.

        Args:
            request (DietPlanRequest): Client's dietary preferences and goals.

        Returns:
            str: The chatbot's response. 
        """
        context = f""" - **Age**: {request.age}
        - **Gender**: {request.gender}
        - **Height**: {request.height_cm} cm
        - **Weight**: {request.weight_kg} kg
        - **Activity Level**: {request.activity_level}
        - **Goal**: {request.goal}
        - **Diet Type**: {request.diet_type}
        - **Allergies**: {', '.join(request.allergies) if request.allergies else 'None'}
        - **Disliked Foods**: {', '.join(request.disliked_foods) if request.disliked_foods else 'None'}
        - **Preferred Cuisine**: {', '.join(request.preferred_cuisine) if request.preferred_cuisine else 'No preference'}
        - **Meals per Day**: {request.meal_count_per_day}
        - **Cooking Time Limit**: {request.cooking_time_limit} minutes
        - **Caloric Intake Goal**: {request.caloric_intake} kcal
        - **Macronutrient Preferences**: {request.macros if request.macros else 'Not specified'}
        - **Detailed Recipes Needed**: {'Yes' if request.detailed_recipe else 'No'}
        - **Shopping List Needed**: {'Yes' if request.shopping_list else 'No'}
        - **Include Snacks**: {'Yes' if request.include_snacks else 'No'}"""

        return self._generate_response(context, self.DIET_PROMPT)     


class GetCaloriesByImage:
    def __init__(self, model_name="llama-3.2-90b-vision-preview"):
        """Initialize the chatbot with environment variables and model."""
        self.model = ChatGroq(model=model_name)

    def encode_image(self, image_path: str) -> str:
        """Encode an image to a base64 string asynchronously."""
        try:
            with open(image_path, "rb") as image_file:
                encoded = base64.b64encode(image_file.read()).decode("utf-8")
            return encoded
        except Exception as e:
            raise RuntimeError(f"Error encoding image: {str(e)}")

    def create_prompt(self, base64_image: str):
        """Create a chat prompt template for the image query asynchronously."""
        messages = [
            ("user", "Identify the food items in the image and provide a structured list with details on calories, protein, carbohydrates, fats, fiber, sugar, sodium, cholesterol, vitamins, and minerals. No additional text, only the data."),
            (
                "user",
                [
                    {
                        "type": "image_url",
                        "image_url": {"url": f"{base64_image}"},
                    }
                ],
            ),
        ]
        return ChatPromptTemplate.from_messages(messages)

    def get_response(self, base64_image: str) -> str:
        """Generate a response for the given query and image asynchronously."""
        prompt =  self.create_prompt(base64_image)
        chain = prompt | self.model
        response =  chain.invoke({"base64_image": base64_image})  # Async invocation
        print(response.content)
        return response.content

    async def stream_response(self, base64_image: str) -> str:
        """Stream the response for the given query and image asynchronously."""
        prompt = await self.create_prompt(base64_image)
        chain = prompt | self.model

        response_text = ""
        async for chunk in chain.astream({"base64_image": base64_image}):  # Async streaming
            response_text += chunk.content
        return response_text