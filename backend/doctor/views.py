from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import DoctorProfile
from .serializers import DoctorProfileSerializer,DoctorRegistrationSerializer
from .constants import designations, specialists




# Create your views here.
class DoctorProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DoctorProfile.objects.all()
    serializer_class = DoctorProfileSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['specialist__name','designation']


class DoctorRegistrationView(APIView):
    serializer_class = DoctorRegistrationSerializer
    def post(self, request, *args, **kwargs):
        serializer = DoctorRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_designations_and_specialists(request):
    data = {
        'designations': designations,
        'specialists': specialists,
    }
    return JsonResponse(data)
