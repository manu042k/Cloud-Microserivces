from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from config import load_environment
load_environment()

class GroqChat:
    """
    A chatbot class to generate fitness workout plans based on client input 
    using the specified Groq model.
    """

    def __init__(self, model_name="llama-3.1-8b-instant"):
        """
        Initialize the chatbot with the given model name.
        
        Args:
            model_name (str): Name of the Groq model to be used.
        """
        self.model = ChatGroq(model=model_name)
        self.messages = []  # To keep track of chat history

    def create_prompt(self, context):
        """
        Create a customized prompt template for generating a workout plan.
        
        Args:
            context (str): The context or client-provided information for creating a workout plan.
        
        Returns:
            str: Rendered prompt string.
        """
        task_prompt = PromptTemplate(
            input_variables=["context"],
            template="""
            You are a fitness trainer for a client. The client has asked you to create a workout plan for them. 
            The client has provided you with the following information:
            
            {context}
            
            Create a comprehensive workout plan for the client, including:
            1. Warm-up routine
            2. Strength training exercises
            3. Cardio recommendations
            4. Cool-down and stretching activities
            """
        )
        return  task_prompt

    def get_response(self, context):
        """
        Generate a response from the chatbot based on the provided client information.
        
        Args:
            context (str): The context or client-provided details for generating a workout plan.
        
        Returns:
            str: The chatbot's response.
        """
        try:
            # Generate the prompt
            prompt = self.create_prompt(context)
            # Get the response from the model
            chain = prompt | self.model

            response = chain.invoke({"context": context})
            return response.content
        except Exception as e:
            return f"An error occurred while generating the response: {str(e)}"

    def get_chat_history(self):
        """
        Retrieve the chat history for reference or debugging purposes.
        
        Returns:
            list: A list of dictionaries containing user and assistant messages.
        """
        return self.messages



