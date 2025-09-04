import json
import asyncio
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from .llm_functions_chat import groq_response , chat_summary

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("WebSocket Connected")
        await self.accept()
        
    async def disconnect(self , close_code):
        print(f"Websocket dissconnected with close code : {close_code}")
        
        
    async def receive(self, text_data):
        print(f"Recieved Data : {text_data}")
        data = json.loads(text_data)
        prompt = data['prompt']
        model = data['model']
        temperature = data['temperature']
        topP = data['topP']
        maxTokens = data['maxTokens']
        current_summary = data['current_summary']
        
        await self.stream_llms(await sync_to_async(groq_response)(current_summary , prompt , model , topP , temperature , maxTokens))
        
    async def stream_llms(self , response):
        await self.send(text_data=json.dumps({
            'response': response
        }))