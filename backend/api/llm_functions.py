from groq import Groq
from dotenv import load_dotenv
import os
load_dotenv()

groq_api_key = os.environ.get("Groq_api_key")

groq_client = Groq(api_key=groq_api_key)

def groq_response_demo(model , prompt , language , summary):
    try:
        system_instruction = (
    "You are a helpful assistant. Always provide accurate and well-structured responses. "
    "You will be given the summary of previous conversation with user and the current promt by user and you will have to respond accordingly"
    "Your responses will be rendered using Markdown on the frontend, so format accordingly: "
    "- Use proper Markdown syntax (e.g., # for headings, **bold**, `code`, etc.). "
    "format all code using triple backticks. For example:\n"
    "```python\n"
    "def my_function():\n"
    "    pass\n"
    "```\n"
    "Do not use HTML tags. Keep the formatting clean, with no extra spaces or blank lines."
    "- Avoid excessive spacing, blank lines, or unnecessary indentation. "
    "- Do not include raw HTML tags. "
    "- Keep the formatting clean and readable."
)
        groq_convo = [
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": f"Previous Summary : {summary} , User Prompt : {prompt}"}
        ]
        stream = groq_client.chat.completions.create(
            messages=groq_convo , model=model ,stream=True
        )
        response = ""
        for chunk in stream:
            chunk_content = chunk.choices[0].delta.content
            if chunk_content:
                response += chunk_content
        return response
    except Exception as e:
        return f"Error : {str(e)}"
    
    
def chat_summary_demo(user_message , ai_message , current_summary=""):
    try:
        system_response = (
            """
            You are a summarization assistant. Your job is to maintain a concise, up-to-date memory of the conversation between a user and an AI assistant.

            You are provided with:
            1. The current memory summary so far (if any).
            2. The latest user message.
            3. The latest AI response.

            Your task is to update the summary by preserving only the key information and relevant context. If the conversation is getting too long or repetitive, compress older parts and retain only essential facts, decisions, or goals discussed.

            Avoid restating full conversations. Merge details when possible, and ensure the summary remains compact and readable.

            Write in the third person, as if summarizing for another assistant. Focus on what matters: what the user is trying to do, what the AI has helped with, and what was concluded.

            Current Summary:
            {CURRENT_SUMMARY}

            User said:
            {USER_MESSAGE}

            AI responded:
            {AI_RESPONSE}

            NOTE: Include the **essence** of both the user and AI messages, but do not copy them verbatim. Keep the summary focused and trim outdated or less useful parts if necessary.
            """
        )

        
        groq_convo = [
            {"role" : "system" , "content" : system_response},
            {"role" : "user" , "content" : f"Current Summary : {current_summary} , User said : {user_message} , AI responded : {ai_message}"}
        ]
        stream = groq_client.chat.completions.create(
            messages=groq_convo , model="llama-3.3-70b-versatile" , stream=True
        )
        response = ""
        for chunk in stream:
            chunk_content = chunk.choices[0].delta.content
            if chunk_content:
                response += chunk_content
        return response 
    except Exception as e:
        print(e)