import { useEffect, useState } from "react";
import { getpatient } from "../services/ApiService";
import AddPatient from "./AddPatient";
import axios from "axios";

const PatientList = () => {
    const [patients, setPatients] = useState([])
    const [showAddPatient, setShowAddPatient] = useState(false)

    useEffect(() => {

        axios.get("http://127.0.0.1:8000/patients/")
            .then(res => {
                console.log(res.data)
                setPatients(res.data.data)
            })
            .catch(err => {
                console.error("Error fetching info:", err)
            })
    }, [])

    const handleCancelBtn = () => {
        setShowAddPatient(false)

        axios.get("http://127.0.0.1:8000/patients/")
            .then(res => {
                console.log("Response from the api:", res)
                setPatients(res.data.data)
            })
    }

    const handleDeleteBtn = (id) => {
        axios.delete("http://127.0.0.1:8000/patients/" + id + "/")
            .then(res => {
                console.log(res.data)
                setPatients(patients.filter(p => p.id !== id))
            })
    }

    return (
        <div className="container">
            <h3>Patient List</h3>
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
                    {patients.map(res =>
                        <tr key={res.id}>
                            <td>{res.first_name}</td>
                            <td>{res.last_name}</td>
                            <td>{res.blood_group}</td>
                            <td>
                                <button className="btn btn-primary m-2" onClick={() => { }}>Edit</button>
                                <button className="btn btn-danger" onClick={() => { handleDeleteBtn(res.id) }}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <br />
            <button className="btn btn-success" onClick={() => setShowAddPatient(true)}>Add New Patient</button>
            <br></br>
            <br></br>
            {showAddPatient && <AddPatient handleCancelBtn={handleCancelBtn} />}
        </div >
    )
}
export default PatientList