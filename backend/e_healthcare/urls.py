from django.contrib import admin
from django.urls import path,include

from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from userauth.views import CustomUserViewSet,UserLoginView
from doctor.views import (
    DoctorProfileViewSet,
    DoctorRegistrationView,
    DoctorRatingView,
    get_designations_and_specialists
)
from patient.views import PatientProfileViewSet,PatientRegistrationView,get_blood_groups_and_genders

from appointment.views import AppointmentViewSet,AppointmentCreateView,AppointmentUpdateView

router = routers.DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'doctors', DoctorProfileViewSet)
router.register(r'patients', PatientProfileViewSet)
router.register(r'doctor-ratings', DoctorRatingView)
router.register(r'appointments', AppointmentViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    
    path('doctor-register/', DoctorRegistrationView.as_view()),
    path('patient-register/', PatientRegistrationView.as_view()),
    
    path('login/', UserLoginView.as_view(),name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 

    path('create-appointment/', AppointmentCreateView.as_view()),
    path('update-appointment/<int:pk>/', AppointmentUpdateView.as_view()),
    
    path('get-designations-and-specialists/', get_designations_and_specialists),
    path('get-blood-groups-and-genders/', get_blood_groups_and_genders),
    


]
urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
