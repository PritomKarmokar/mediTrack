import axios from "axios";
import { useState } from "react";

const AddPatient = ({ handleCancelBtn }) => {
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [blood_group, setBloodGroup] = useState('')

    const handleAddSubmit = async e => {
        e.preventDefault()
        console.log(first_name, last_name, blood_group)
        const res = await axios.post("http://127.0.0.1:8000/patients/", { first_name, last_name, blood_group })
        console.log(res.data)
        setFirstName('')
        setLastName('')
        setBloodGroup('')
    }
    return (
        <>
            <form onSubmit={handleAddSubmit}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="first_name" value={first_name} onChange={e => setFirstName(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="last_name" value={last_name} onChange={e => setLastName(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="blood_group" className="form-label">Blood Group</label>
                    <input type="text" className="form-control" id="blood_group" value={blood_group} onChange={e => setBloodGroup(e.target.value)}></input>
                </div>
                <button type="submit" className="btn btn-primary m-2">Add</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancelBtn}>Cancel</button>
            </form>
        </>
    )
}

export default AddPatient