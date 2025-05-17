import logging

from django.db import models
from django.utils import timezone
from django_ulid.models import ULIDField, default

logger = logging.getLogger(__name__)

class Patient(models.Model):
    id = ULIDField(primary_key=True, default=default, editable=False)
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    blood_group = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.first_name
    
    class Meta:
        verbose_name = "Patient"
        db_table = "patient"

    def update_model(
            self, 
            first_name: str,
            last_name: str,
            blood_group: str
    ) -> bool:
        try:
            if first_name:
                self.first_name = first_name
            
            if last_name:
                self.last_name = last_name
            
            if blood_group:
                self.blood_group = blood_group
            
            self.updated_at = timezone.now()
            self.save()
            return True
        except Exception as e:
            logger.error(
                {
                    "message": "Error occurred while updating patient object",
                    "errors": repr(e)
                }
            )
            return False