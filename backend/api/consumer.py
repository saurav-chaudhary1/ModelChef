import json
import asyncio
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from .llm_functions import groq_response_demo


# class LLMConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         print("WebSocket Connected")
#         await self.accept()
        
#     async def disconnect(self , close_code):
#         print(f"Websocket dissconnected with close code : {close_code}")
        
#     async def receive(self, text_data):
#         print(f"Recieved Data : {text_data}")
#         text_data_json = json.loads(text_data)
#         prompt = text_data_json['prompt']
#         language = text_data_json['language']
        
#         await asyncio.gather(self.stream_llm(groq_response("llama-3.3-70b-versatile" , prompt , language)))
    
#     async def stream_llm(self , response_generator):
#         try:
#             for chunk in response_generator:
#                 await self.send(text_data=json.dumps({
#                     'response': chunk
#                 }))
#                 await asyncio.sleep(0)
                
#             await self.send(text_data=json.dumps({
#                 'response': "[Done]"
#             }))
#         except Exception as  e:
#             print(f"Error in streaming llm response : {e}")

class LLMConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("WebSocket Connected")
        await self.accept()
        
    async def disconnect(self , close_code):
        print(f"Websocket dissconnected with close code : {close_code}")
        
        
    async def receive(self, text_data):
        print(f"Recieved Data : {text_data}")
        text_data_json = json.loads(text_data)
        prompt = text_data_json['prompt']
        language = text_data_json['language']
        current_summary = text_data_json['current_summary']
        
        await self.stream_llm(await sync_to_async(groq_response_demo)("llama-3.3-70b-versatile" , prompt , language , current_summary))
        
    async def stream_llm(self , response):
        await self.send(text_data=json.dumps({
            'response': response
        }))