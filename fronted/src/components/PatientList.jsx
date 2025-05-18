import { useEffect, useState } from "react";
import { getpatient } from "../services/ApiService";

const PatientList = () => {
    const [patients, setPatients] = useState([])

    useEffect(() => {
        let mount = true

        getpatient().then(res => {
            if (mount) {
                setPatients(res)
            }
        })
        return () => {
            mount = false
        }
    }, [])

    return (
        <div>PatientList</div>
    )
}
export default PatientList