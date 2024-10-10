from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import PatientProfile
from .serializers import PatientProfileSerializer,PaitentRegisterSerializer

# Create your views here.
class PatientProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PatientProfile.objects.all()
    serializer_class = PatientProfileSerializer

class PatientRegistrationView(APIView):
    serializer_class = PaitentRegisterSerializer
    def post(self, request, *args, **kwargs):
        serializer = PaitentRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
