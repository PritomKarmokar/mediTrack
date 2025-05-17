from django.db import models
from django_ulid.models import ULIDField, default

class Patient(models.Model):
    id = ULIDField(primary_key=True, default=default, editable=False)
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    blood_group = models.CharField(max_length=20)

    def __str__(self):
        return self.first_name
    
    class Meta:
        verbose_name = "Patient"
        db_table = "patient"