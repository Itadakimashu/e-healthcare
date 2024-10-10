from rest_framework import serializers
from django.contrib.auth import get_user_model

from doctor.serializers import DoctorProfileSerializer
from doctor.models import DoctorProfile

User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name','usertype','profile')
    
    def get_profile(self, obj):
        if obj.usertype == 'doctor':
            try:
                profile = DoctorProfile.objects.get(user=obj)
                return DoctorProfileSerializer(profile).data
            except DoctorProfile.DoesNotExist:
                return None
        return None