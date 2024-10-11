from django.db import models
from django.contrib.auth import get_user_model

from .constants import *

# Create your models here.
User = get_user_model()

class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField(null=True, blank=True)
    blood_group = models.CharField(max_length=5,choices=blood_groups)
    phone = models.CharField(max_length=15)
    gender = models.CharField(max_length=10,choices=genders)
    allergies = models.TextField(blank=True,null=True)

    def __str__(self):
        return f'{self.user.name}'
