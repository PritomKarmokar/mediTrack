import { useState } from 'react'
import './App.css'
import {PatientList} from "./components/PatientList.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <PatientList />
    </div>
  )
}

export default App
