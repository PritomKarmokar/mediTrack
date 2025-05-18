from django.utils import timezone

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Patient
from .serializers import PatientSerializer

class PatientsListCreateAPIView(APIView):
    serializer_class = PatientSerializer

    def get(self, request: Request) -> Response:
        patients = Patient.objects.all()
        
        if len(patients) <= 0:
            response = {
                "message": "Currently, no patients info is available"
            }
            return Response(data=response, status=status.HTTP_204_NO_CONTENT)
        
        serializer = self.serializer_class(instance=patients, many=True)
        
        response = {
            "message": "Currently available patients",
            "data": serializer.data
        }
        return Response(data=response, status=status.HTTP_200_OK)

    def post(self, request: Request) -> Response:
        data = request.data
        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()
            response = {
                "message": "New patient info added successfully",
                "data": serializer.data
            }
            return Response(data=response, status=status.HTTP_201_CREATED)
        
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class PatientsRetrieveUpdateDeleteAPIView(APIView):
    serializer_class = PatientSerializer

    def get(self, request: Request, patient_id: int) -> Response:
        patient = Patient.get_active_patient_info(id=patient_id)

        if patient is None:
            response = {
                "message": f"Patient with the following Id {patient_id} does not exist"
            }
            return Response(data=response, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(instance=patient)
        response = {
            "message": f"Patient with the Id {patient_id} retrieved successfully",
            "data": serializer.data
        }
        return Response(data=response, status=status.HTTP_200_OK)
        
        
    
    def patch(self, request: Request, patient_id: int) -> Response:
        first_name = request.data.get("first_name", None)
        last_name = request.data.get("last_name", None)
        blood_group = request.data.get("blood_group", None)

        patient = Patient.get_active_patient_info(id=patient_id)

        if patient is None:
            respone = {
                "message": f"Patient with the following Id {patient_id} doesn't exist"
            }
            return Response(data=respone, status=status.HTTP_404_NOT_FOUND)
        
        if not first_name and not last_name and not blood_group:
            respone = {
                "message": "first_name, last_name or blood_group is required. All values cannot be empty"
            }
            return Response(data=respone, status=status.HTTP_400_BAD_REQUEST)
        else:
            _ = patient.update_model(first_name, last_name, blood_group)
            respone = {
                "messsage": f"Patient info with Id {patient_id} updated successfully"
            }
            return Response(data=respone, status=status.HTTP_200_OK)
        
    def delete(self, request: Request, patient_id: int) -> Response:
        patient = Patient.get_active_patient_info(id=patient_id)
        if patient is None:
            respone = {
                "message": f"Patient with the following Id {patient_id} doesn't exist"
            }
            return Response(data=respone, status=status.HTTP_404_NOT_FOUND)
        
        patient.is_active = False
        patient.deleted_at = timezone.now()
        patient.save()

        respone = {
            "message" : "Patient Info deleted successfully"
        }
        return Response(data=respone, status=status.HTTP_204_NO_CONTENT)