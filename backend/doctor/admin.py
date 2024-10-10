from django.contrib import admin

from .models import (
    DoctorProfile,
    Specialist,
    DoctorWorkTime,
    DayOfWeek,
)

# Register your models here.
admin.site.register(DoctorProfile)
admin.site.register(Specialist)
admin.site.register(DoctorWorkTime)
admin.site.register(DayOfWeek)

