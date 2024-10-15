from django.db import models

from doctor.models import DoctorProfile
from patient.models import PatientProfile

from .constants import *
from doctor.constants import DAYS_OF_WEEK_CHOICES


# Create your models here.

class Appointment(models.Model):
    doctor = models.ForeignKey(DoctorProfile,on_delete=models.CASCADE,related_name='appointments')
    patient = models.ForeignKey(PatientProfile,on_delete=models.CASCADE,related_name='appointments')
    symptoms = models.TextField(blank=True,null=True)
    doctor_review = models.TextField(blank=True,null=True)
    status = models.CharField(max_length=20,choices=APPOINTMENT_STATUS,default='pending')
    serial_number = models.IntegerField()
    day = models.CharField(max_length=20,choices=DAYS_OF_WEEK_CHOICES)
    date = models.DateField()


    def __str__(self):
        return f"{self.doctor.user.name} - {self.patient.user.name} - {self.date}"

