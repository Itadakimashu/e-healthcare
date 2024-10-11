from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import PatientProfile
from .constants import *

User = get_user_model()

class PatientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientProfile
        exclude = ['user']

class PaitentRegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True,required = True)
    phone = serializers.CharField(write_only=True, required=True)
    date_of_birth = serializers.DateField(write_only=True, required=False)
    blood_group = serializers.ChoiceField(choices=blood_groups,write_only=True, required=True)
    gender = serializers.ChoiceField(choices=genders,write_only=True,required=True)
    allergies = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = User
        fields = ['username', 'name', 'gender', 'password', 'confirm_password', 'email', 'phone', 'date_of_birth', 'blood_group','allergies']
    
    def create(self, validated_data):
        confirm_password = validated_data.pop('confirm_password')
        if validated_data['password'] != confirm_password:
            raise serializers.ValidationError({'password': 'Passwords do not match'})
        
        user = User.objects.create_user(
            username=validated_data['username'],
            name=validated_data['name'],
            password=validated_data['password'],
            email=validated_data['email'],
            usertype='patient'
        )
        user.save()
        PatientProfile.objects.create(
            user=user,
            phone=validated_data['phone'],
            blood_group=validated_data['blood_group'],
            gender=validated_data['gender'],
            date_of_birth=validated_data.get('date_of_birth'),
            allergies=validated_data.get('allergies'),
            )
        return user