import {useEffect, useState} from "react";
import axios from "axios";
import {AddPatient} from "./AddPatient.jsx";

export function PatientList() {
    const [patients, setPatients] = useState([])
    const [showAddPatient, setShowAddPatient] = useState(false)

    const fetchPatients = () =>{
        axios.get("http://localhost:8000/patients/")
            .then(response => {
                console.log(response.data)
                let patientsData = response.data
                setPatients(patientsData.data)
            })
            .catch(error =>{
                console.log(error)
            })
    }
    useEffect(() => {
        fetchPatients()
    },[])

    const handleCancelBtn = () =>{
        setShowAddPatient(false)
        fetchPatients()
    }
    return (
        <div className="container">
            <h2>Patients Info</h2>
            <table className="table table-striped table-hover table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Blood Group</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {patients.map(patient => (
                    <tr key={patient.id}>
                        <td>{patient.first_name}</td>
                        <td>{patient.last_name}</td>
                        <td>{patient.blood_group}</td>
                        <td>
                            <button className="btn btn-primary m-2" onClick={() =>{}}>Update</button>
                            <button className="btn btn-danger" onClick={() =>{}}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="btn btn-success" onClick={() => setShowAddPatient(true)}>
                Add New Patient
            </button>
            <br></br>
            {showAddPatient && <AddPatient handleCancelBtn={handleCancelBtn} refreshPatients={fetchPatients}/>}
        </div>
    )
}