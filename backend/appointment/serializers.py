from rest_framework import serializers

from doctor.serializers import DoctorProfileSerializer
from patient.serializers import PatientProfileSerializer

from patient.models import PatientProfile
from doctor.models import DoctorProfile

from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    doctor = DoctorProfileSerializer()
    patient = PatientProfileSerializer()
    class Meta:
        model = Appointment
        fields = ['doctor','patient','day','date','serial_number','status']
    

class AppointmentCreateSerializer(serializers.ModelSerializer):
    doctor_id = serializers.ChoiceField(write_only=True,choices=[(doctor.id,doctor.id) for doctor in DoctorProfile.objects.all()])
    patient_id = serializers.ChoiceField(write_only=True,choices=[(patient.id,patient.id) for patient in PatientProfile.objects.all()])
    class Meta:
        model = Appointment
        fields = ['doctor_id','patient_id','day','date']
    
    def create(self, validated_data):
        doctor = DoctorProfile.objects.get(id=validated_data['doctor_id'])
        patient = PatientProfile.objects.get(id=validated_data['patient_id'])

        print('1\n')
        serial_number = doctor.appointments.filter(day=validated_data['day']).count() + 1

        appointment = Appointment.objects.create(
            doctor=doctor,patient=patient,
            day=validated_data['day'],
            date=validated_data['date'],
            serial_number=serial_number
        )
        return appointment