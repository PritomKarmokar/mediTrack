import { useEffect, useState } from "react";
import { getpatient } from "../services/ApiService";
import axios from "axios";

const PatientList = () => {
    const [patients, setPatients] = useState([])

    useEffect(() => {

        axios.get("http://127.0.0.1:8000/patients/")
            .then(res => {
                console.log(res.data)
                setPatients(res.data)
            })
            .catch(err => {
                console.error("Error fetching info:", err)
            })
    }, [])

    return (
        <div>PatientList</div>
    )
}
export default PatientList