from django.urls import path
from . import consumer
from . import consumer_chat

websocket_urlpatterns = [
    path(r"" , consumer.LLMConsumer.as_asgi()),
    path(r"chat" , consumer_chat.ChatConsumer.as_asgi())
]