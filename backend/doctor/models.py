from django.db import models
from django.contrib.auth import get_user_model

from .constants import *

User = get_user_model()

class DoctorProfile(models.Model):
    phone = models.CharField(max_length=15)
    address = models.TextField()
    consultation_fee = models.IntegerField()
    designation = models.CharField(max_length=20, choices=designations)
    specialist = models.ManyToManyField('Specialist')
    image = models.ImageField(upload_to='doctor/')
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='profile')

    def save(self, *args, **kwargs):
        if self.user.usertype != 'doctor':
            raise ValueError("Only users with usertype 'doctor' can be assigned to a DoctorProfile.")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.user.username

class Specialist(models.Model):
    name = models.CharField(max_length=50, choices=specialists)

    def __str__(self):
        return self.name

class DoctorWorkTime(models.Model):
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE, related_name='work_times')
    days_of_week = models.ManyToManyField('DayOfWeek')
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        days = ', '.join([day.name for day in self.days_of_week.all()])
        return f"{self.doctor.user.username} - {days} ({self.start_time} - {self.end_time})"

class DayOfWeek(models.Model):
    name = models.CharField(max_length=10, choices=DAYS_OF_WEEK_CHOICES, unique=True)

    def __str__(self):
        return self.name
