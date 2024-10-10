from django.contrib import admin
from django.urls import path,include

from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers

from userauth.views import CustomUserViewSet,UserLoginView
from doctor.views import (
    DoctorProfileViewSet,
    DoctorRegistrationView,
    get_designations_and_specialists
)
from patient.views import PatientProfileViewSet,PatientRegistrationView

router = routers.DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'doctors', DoctorProfileViewSet)
router.register(r'patients', PatientProfileViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('doctor-register/', DoctorRegistrationView.as_view()),
    path('patient-register/', PatientRegistrationView.as_view()),
    path('login/', UserLoginView.as_view(),name='login'),
    path('get-designations-and-specialists/', get_designations_and_specialists),

]
urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
