import axios from "axios";
import { useState, useEffect } from "react";

export function AddPatient({ handleCancelBtn, refreshPatients, editPatient }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editPatient) {
            setFirstName(editPatient.first_name || "");
            setLastName(editPatient.last_name || "");
            setBloodGroup(editPatient.blood_group || "");
        } else {
            setFirstName("");
            setLastName("");
            setBloodGroup("");
        }
        setErrors({});
    }, [editPatient]);

    const validateForm = () => {
        const newErrors = {};
        if (!firstName.trim()) newErrors.firstName = "First Name is required";
        if (!lastName.trim()) newErrors.lastName = "Last Name is required";
        if (!bloodGroup.trim()) newErrors.bloodGroup = "Blood Group is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const patientData = {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            blood_group: bloodGroup.trim(),
        };

        try {
            if (editPatient) {
                await axios.put(`http://localhost:8000/patients/${editPatient.id}/`, patientData);
            } else {
                await axios.post("http://localhost:8000/patients/", patientData);
            }

            refreshPatients(); // Refresh the patient list
            handleCancelBtn(); // Close the form
        } catch (error) {
            console.error("Error submitting patient data:", error);
        }
    };

    return (
        <>
            <h4>{editPatient ? "Update Patient" : "Add New Patient"}</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="bloodGroup" className="form-label">Blood Group</label>
                    <input
                        type="text"
                        className="form-control"
                        id="bloodGroup"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                    />
                    {errors.bloodGroup && <div className="text-danger">{errors.bloodGroup}</div>}
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary me-2">
                        {editPatient ? "Update" : "Add"}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancelBtn}>
                        Cancel
                    </button>
                </div>
            </form>
        </>
    );
}
