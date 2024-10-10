from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

from rest_framework import viewsets,generics, permissions
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response

from .serializers import CustomUserSerializer

# Create your views here.
User = get_user_model()

class CustomUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]


class UserLoginView(generics.GenericAPIView):
    serializer_class = TokenObtainPairSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            token = AccessToken.for_user(user)
            return Response({
                'access': str(token),
                'user':{
                    'username': user.username,
                    'email': user.email,
                    'id': user.id,
                    'usertype': user.usertype,
                    'name': user.name
                }
            })
        return Response({'error': 'Invalid credentials'}, status=400)