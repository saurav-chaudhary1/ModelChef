from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import authentication , permissions
from django.contrib.auth.models import User
from .serializer import RegisterSerializer
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
import json
from .llm_functions_chat import chat_summary
from .llm_functions import chat_summary_demo
from django.http import JsonResponse

class RegisterView(APIView):
    def post(self , request):      
        print(request.data)
        data = request.data
        serializer = RegisterSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "response" : "User Succesfully created",
                "status" : True,
                "data" : serializer.data
            } , status = status.HTTP_201_CREATED)
            
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self , request):
        data = request.data
        email = data.get('email')
        password = data.get('password')
        user = User.objects.filter(email = email).first()
        if not user:
            return Response({"user": "User with this email does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                "access_token" : str(refresh.access_token),
                "refresh_token" : str(refresh)
            })
            
        return Response({"message" : "Invalid Credentials"} , status=status.HTTP_400_BAD_REQUEST)
    
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self , request):
        user = request.user
        serializer = RegisterSerializer(user)
        return Response(serializer.data)

@api_view(["POST"])
def ChatSummaryView(request):
    data = json.loads(request.body)
    current_summary = data.get('current_summary' , '')
    user_message = data['user_message']
    ai_message = data['ai_message']
    
    updated_summary = chat_summary(user_message=user_message , ai_message=ai_message , current_summary=current_summary)
    return JsonResponse({"updated_summary": updated_summary})

@api_view(['POST'])
def ChatSummaryViewDemo(request):
    data = json.loads(request.body)
    current_summary = data.get('currentSummary')
    user_message = data['user_message']
    ai_message = data['ai_message']
    
    updated_summary = chat_summary_demo(user_message=user_message , ai_message=ai_message , current_summary=current_summary)
    return JsonResponse({"updated_summary" :  updated_summary})