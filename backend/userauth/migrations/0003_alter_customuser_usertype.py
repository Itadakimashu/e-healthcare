# Generated by Django 5.1.2 on 2024-10-10 20:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userauth', '0002_customuser_usertype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='usertype',
            field=models.CharField(choices=[('doctor', 'Doctor'), ('patient', 'Patient'), ('admin', 'Admin')], default='patient', max_length=10),
        ),
    ]
