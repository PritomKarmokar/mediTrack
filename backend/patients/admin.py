from django.contrib import admin

from patients.models import Patient

@admin.register(Patient)
class PatientModelAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'first_name',
        'last_name',
        'blood_group',
    ]
    ordering = ('-first_name',)
    readonly_fields = ('id',)