import axios from "axios"

export function getpatient() {
    return axios.get("http://127.0.0.1:8000/patients/")
        .then(res => {
            res.data
        })
}