import { useEffect, useState } from "react";
import axios from "axios";
import { AddPatient } from "./AddOrUpdatePatient.jsx";

export function PatientList() {
    const [patients, setPatients] = useState([]);
    const [showAddPatient, setShowAddPatient] = useState(false);
    const [editPatient, setEditPatient] = useState(null);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await axios.get("http://localhost:8000/patients/");
            // Adjust this if your API returns flat list directly
            setPatients(response.data.data || response.data);
        } catch (error) {
            console.error("Failed to fetch patients:", error);
        }
    };

    const handleDeleteBtn = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/patients/${id}/`);
            setPatients(patients.filter(p => p.id !== id));
        } catch (error) {
            console.error("Failed to delete patient:", error);
        }
    };

    const handleCancelBtn = () => {
        setShowAddPatient(false);
        setEditPatient(null);
        fetchPatients();
    };

    return (
        <div className="container">
            <h2>Patients Info</h2>

            <table className="table table-striped table-hover table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Blood Group</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">No patients found.</td>
                        </tr>
                    ) : (
                        patients.map(patient => (
                            <tr key={patient.id}>
                                <td>{patient.first_name}</td>
                                <td>{patient.last_name}</td>
                                <td>{patient.blood_group}</td>
                                <td>
                                    <button
                                        className="btn btn-primary m-2"
                                        onClick={() => {
                                            setEditPatient(patient);
                                            setShowAddPatient(true);
                                        }}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteBtn(patient.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {!editPatient && (
                <button
                    className="btn btn-success"
                    onClick={() => {
                        setEditPatient(null);
                        setShowAddPatient(true);
                    }}
                >
                    Add New Patient
                </button>
            )}


            <br /><br />

            {showAddPatient && (
                <AddPatient
                    handleCancelBtn={handleCancelBtn}
                    refreshPatients={fetchPatients}
                    editPatient={editPatient}
                />
            )}
        </div>
    );
}
