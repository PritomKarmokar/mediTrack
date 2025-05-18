from django.urls import path

from .views import PatientsListCreateAPIView, PatientsRetrieveUpdateDeleteAPIView

urlpatterns = [
    path("", PatientsListCreateAPIView.as_view(), name="list_or_create"),

    path("<str:patient_id>/", PatientsRetrieveUpdateDeleteAPIView.as_view(), name="retrieve_update_delete")
]