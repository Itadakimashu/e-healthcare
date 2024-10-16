from rest_framework import serializers
from django.contrib.auth import get_user_model

from doctor.serializers import DoctorProfileSerializer
from patient.serializers import PatientProfileSerializer

from patient.models import PatientProfile
from doctor.models import DoctorProfile

from .models import Appointment

User = get_user_model()

class AppointmentSerializer(serializers.ModelSerializer):
    doctor = DoctorProfileSerializer()
    patient = PatientProfileSerializer()
    class Meta:
        model = Appointment
        fields = ['doctor','patient','symptoms','day','date','serial_number','doctor_review','status']
    

class AppointmentCreateSerializer(serializers.ModelSerializer):
    doctor_id = serializers.PrimaryKeyRelatedField(queryset=DoctorProfile.objects.all(), write_only = True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only = True) 
    
    class Meta:
        model = Appointment
        fields = ['doctor_id', 'user_id', 'day', 'date']
    
    def create(self, validated_data):
        try:
            user = validated_data.get('user_id')
            doctor = validated_data.get('doctor_id') 
            patient = PatientProfile.objects.get(user=user)
            print(user.id)
            print(patient.id)

            serial_number = doctor.appointments.filter(day=validated_data['day']).count() + 1

            appointment = Appointment.objects.create(
                doctor=doctor,
                patient=patient,
                day=validated_data['day'],
                date=validated_data['date'],
                serial_number=serial_number
            )

            return appointment
        except Exception as e:
            raise serializers.ValidationError({'error': str(e)})
        

class AppointmentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['status','doctor_review']
    
    def update(self, instance, validated_data):
        try:
            instance.status = validated_data.get('status', instance.status)
            instance.doctor_review = validated_data.get('doctor_review', instance.doctor_review)
            instance.save()
            return instance
        except Exception as e:
            raise serializers.ValidationError({'error': str(e)})

