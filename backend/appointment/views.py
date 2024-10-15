from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,AllowAny

from .models import Appointment
from .serializers import (
        AppointmentSerializer,
        AppointmentCreateSerializer,
        AppointmentUpdateSerializer,
    )

# Create your views here.
class AppointmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class AppointmentCreateView(APIView):
    serializer_class = AppointmentCreateSerializer
    permission_classes = [AllowAny]
    def post(self,request):
        serializer = AppointmentCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AppointmentUpdateView(APIView):
    serializer_class = AppointmentUpdateSerializer
    permission_classes = [AllowAny]
    def put(self,request,pk):
        try:
            appointment = Appointment.objects.get(pk=pk)
        except Appointment.DoesNotExist:
            return Response({'error':'Appointment does not exist'},status=status.HTTP_404_NOT_FOUND)
        serializer = AppointmentUpdateSerializer(appointment,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



