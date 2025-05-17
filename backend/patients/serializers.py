from rest_framework import serializers
from django_ulid import serializers as ulid_serializers 

from patients.models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'first_name', 'last_name', 'blood_group']