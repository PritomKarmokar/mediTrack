import axios from "axios";
import {useState} from "react";

export function AddPatient({handleCancelBtn, refreshPatients}) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}
        if(!firstName) newErrors.firstName = 'First Name is required'
        if(!lastName) newErrors.lastName = 'Last Name is required'
        if(!bloodGroup) newErrors.bloodGroup = 'Blood Group is required'
        return newErrors
    }

    const handleAddSubmit = async (e) => {
        e.preventDefault()
        console.log(`firstName: ${firstName} lastName: ${lastName} bloodGroup: ${bloodGroup}`)

        const formErrors = validateForm()
        if(Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
            return
        }

        try {
            const response = axios.post('http://localhost:8000/patients/', {
                first_name: firstName,
                last_name: lastName,
                blood_group: bloodGroup
            })
            console.log(response)
            refreshPatients()
            handleCancelBtn()

        } catch (error){
            console.log(error)
        }
    }


    return(
        <>
            <form onSubmit={handleAddSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName"
                           value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName"
                           value={lastName}
                           onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="bloodGroup" className="form-label">Blood Group</label>
                    <input type="text" className="form-control" id="bloodGroup"
                           value={bloodGroup}
                           onChange={(e) => setBloodGroup(e.target.value)}
                    />
                    {errors.bloodGroup && <div className="text-danger">{errors.bloodGroup}</div>}
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Add</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancelBtn}> Cancel</button>
                </div>
            </form>
        </>
    )
}