from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import PatientProfile
from .serializers import PatientProfileSerializer,PaitentRegisterSerializer
from .constants import *

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
    
def get_blood_groups_and_genders(request):
    data = {
        'blood_groups': blood_groups,
        'genders': genders,
    }
    return JsonResponse(data)