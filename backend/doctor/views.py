from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .models import DoctorProfile
from .serializers import DoctorProfileSerializer
from .constants import designations, specialists




# Create your views here.
class DoctorProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DoctorProfile.objects.all()
    serializer_class = DoctorProfileSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['specialist__name','designation']


def get_designations_and_specialists(request):
    data = {
        'designations': designations,
        'specialists': specialists,
    }
    return JsonResponse(data)
