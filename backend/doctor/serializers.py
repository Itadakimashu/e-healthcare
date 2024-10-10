from rest_framework import serializers
from .models import DoctorProfile,DoctorWorkTime,DayOfWeek,Specialist

class DayOfWeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = DayOfWeek
        fields = ['name']
    
class DoctorWorkTimeSerializer(serializers.ModelSerializer):
    days_of_week = DayOfWeekSerializer(many=True,read_only=True)
    class Meta:
        model = DoctorWorkTime
        exclude = ['id','doctor']


class SpecialistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialist
        exclude = ['id']


class DoctorProfileSerializer(serializers.ModelSerializer):
    work_times = DoctorWorkTimeSerializer(many=True, read_only=True)
    specialist = SpecialistSerializer(many=True, read_only=True)
    name = serializers.CharField(source='user.name', read_only=True)
    class Meta:
        model = DoctorProfile
        exclude = ['user']