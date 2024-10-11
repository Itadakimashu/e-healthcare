from django.contrib.auth import get_user_model

from rest_framework import serializers

from .models import (
    DoctorProfile,
    DoctorWorkTime,
    DayOfWeek,
    Specialist,
    DoctorRating,
    )

from patient.serializers import PatientProfileSerializer

from .constants import *

User = get_user_model()

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


class DoctorRatingSerializer(serializers.ModelSerializer):
    patient = PatientProfileSerializer(read_only=True)
    class Meta:
        model = DoctorRating
        exclude = ['doctor']

class DoctorRatingCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorRating
        fields = ['__all__']


class DoctorProfileSerializer(serializers.ModelSerializer):
    work_times = DoctorWorkTimeSerializer(many=True, read_only=True)
    specialist = SpecialistSerializer(many=True, read_only=True)
    name = serializers.CharField(source='user.name', read_only=True)
    reviews = DoctorRatingSerializer(many=True, read_only=True)
    class Meta:
        model = DoctorProfile
        exclude = ['user']



class DoctorRegistrationSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True,required=True)
    specialist = serializers.ListField(child=serializers.CharField(), required=False)
    designation = serializers.ChoiceField(choices=designations,write_only=True)
    confirm_password = serializers.CharField(write_only=True,required = True)
    days_of_week = serializers.ListField(child=serializers.CharField(), required=False)
    start_time = serializers.TimeField(write_only=True,required=True)
    end_time = serializers.TimeField(write_only=True,required=True)
    consultation_fee = serializers.IntegerField(write_only=True,required=True)
    image = serializers.ImageField(write_only=True, required=False)
    address = serializers.CharField(write_only=True, required=False)
    phone = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'name', 'image', 'password', 'confirm_password', 'email','designation', 'specialist','days_of_week','start_time','end_time','consultation_fee','address','phone']

    def create(self, validated_data):
        specialist_data = validated_data.pop('specialist', [])
        days_of_week_data = validated_data.pop('days_of_week', [])

        start_time_data = validated_data.pop('start_time')
        end_time_data = validated_data.pop('end_time')
        consultation_fee_data = validated_data.pop('consultation_fee')
        print(specialist_data)
        print(days_of_week_data)

        if validated_data['password'] != validated_data['confirm_password']:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        if User.objects.filter(email=validated_data['email']).exists():
            raise serializers.ValidationError({'error': "Email Already exists"})

        user = User.objects.create_user(
            username=validated_data['username'],
            name=validated_data['name'],
            password=validated_data['password'],
            email=validated_data['email'],
            usertype='doctor'
        )
        user.save()

        doctor_profile = DoctorProfile.objects.create(
            user=user,
            consultation_fee=consultation_fee_data,
            image=validated_data.get('image'),
            address=validated_data.get('address', ''),
            phone=validated_data.get('phone'),
            designation=validated_data.get('designation'),
        )
        for specialist in specialist_data:
            specialist_obj, created = Specialist.objects.get_or_create(name=specialist)
            doctor_profile.specialist.add(specialist_obj)

        doctor_profile.save()

        work_times = DoctorWorkTime.objects.create(
            start_time=start_time_data,
            end_time=end_time_data,
            doctor=doctor_profile
        )
        for day in days_of_week_data:
            day_obj, created = DayOfWeek.objects.get_or_create(name=day)
            work_times.days_of_week.add(day_obj)
        work_times.save()
        return user