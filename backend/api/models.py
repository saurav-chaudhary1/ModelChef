from django.db import models

class Conversation(models.Model):
    user_message = models.TextField()
    ai_message = models.TextField()
    summary = models.TextField(blank=True , null=True)
    created_at = models.DateTimeField(auto_now_add=True)