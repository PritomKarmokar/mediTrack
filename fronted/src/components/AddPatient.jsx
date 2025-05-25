import axios from "axios";
import {useState} from "react";

export function AddPatient({handleCancelBtn, refreshPatients}) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')

    const handleAddSubmit = async (e) => {
        e.preventDefault()
        console.log(`firstName: ${firstName} lastName: ${lastName} bloodGroup: ${bloodGroup}`)
        // const response = await axios.post('http://localhost:8000/patients/', {
        //     first_name: firstName,
        //     last_name: lastName,
        //     blood_group: bloodGroup
        // })
        // console.log(response)
        // setFirstName('')
        // setLastName('')
        // setBloodGroup('')
        axios.post('http://localhost:8000/patients/', {
            first_name: firstName,
            last_name: lastName,
            blood_group: bloodGroup
        })
            .then(response =>{
                console.log(response)
                refreshPatients()
                handleCancelBtn()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    // function validateForm(obj) {
    //     let val = obj.target.value
    //     if(val.length <= 0){
    //         console.log("empty values cannot be submitted")
    //     }
    //     return true
    // }

    return(
        <>
            <form onSubmit={handleAddSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName"
                           value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}
                    />
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName"
                               value={lastName}
                               onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bloodGroup" className="form-label">Blood Group</label>
                        <input type="text" className="form-control" id="bloodGroup"
                               value={bloodGroup}
                               onChange={(e) => setBloodGroup(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancelBtn}> Cancel</button>
                </div>
            </form>
        </>
    )
}