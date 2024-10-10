from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from doctor.models import DoctorProfile, Specialist

User = get_user_model()

class Command(BaseCommand):
    help = 'Create a user with usertype doctor and a corresponding DoctorProfile'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str, help='Username of the doctor')
        parser.add_argument('name', type=str, help='Full name of the doctor')
        parser.add_argument('email', type=str, help='Email of the doctor')

    def handle(self, *args, **kwargs):
        username = kwargs['username']
        name = kwargs['name']
        email = kwargs['email']

        # Debugging output
        self.stdout.write(self.style.SUCCESS(f"Username: {username}"))
        self.stdout.write(self.style.SUCCESS(f"Name: {name}"))
        self.stdout.write(self.style.SUCCESS(f"Email: {email}"))

        # Default values
        password = '1234admin'
        phone = '0000000000'
        address = 'Default Address'
        consultation_fee = 100
        designation = 'General'
        image = 'default.jpg'

        # Split the full name into first name and last name
        first_name, last_name = name.split(' ', 1) if ' ' in name else (name, '')

        # Create user with usertype 'doctor'
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            usertype='doctor'
        )

        # Create DoctorProfile for the user
        doctor_profile = DoctorProfile.objects.create(
            user=user,
            phone=phone,
            address=address,
            consultation_fee=consultation_fee,
            designation=designation,
            image=image
        )

        # Assign specialists to the doctor profile (if any)
        # Example: Assigning a default specialist
        default_specialist, created = Specialist.objects.get_or_create(name='Default Specialist')
        doctor_profile.specialist.set([default_specialist])

        self.stdout.write(self.style.SUCCESS(f"Created user: {user.username} with DoctorProfile: {doctor_profile}"))