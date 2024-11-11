from django.shortcuts import render

from rest_framework import viewsets, generics, status
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import AccountSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password or not email:
            return Response(
                {'error': 'Username, password, and email are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create_user(username=username, password=password, email=email)
        return Response({'success': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    
class AccountView(APIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = AccountSerializer
    
    def get(self, request, pk):
        user = User.objects.get(pk=pk)
        return Response(serializer.data)
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    
    