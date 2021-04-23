import React, { useState }from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import '../App.css'
import { Link } from 'react-router-dom'
const axios = require('axios')



const Auth = () => {
    const [phone, setPhone] = useState('')
    const [dob, setDOB] = useState('')
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        

    }

    return (
    <div>
        <a href="/auth/google">Sign In with Google</a>
        <div>
        <form onSubmit={handleSubmit}>
            <label> Phone Number:
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <label> DOB:
                <input type="date" value={dob} onChange={(e) => setDOB(e.target.value)} />
            </label>
            <label> Vehicle Make:
                <input type="text" value={make} onChange={(e) => setMake(e.target.value)} />
            </label>
            <label> Vehicle Model:
                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
            </label>
            <label> Vehicle Year:
                <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
            </label>
            <label> City:
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </label>
            <label> State:
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
            </label>
            <label> Zip Code:
            <input type="number" value={zip} onChange={(e) => setZip(e.target.value)} />
            </label>
            <label> Google Drive URL:
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
            </label>
        <input type="submit" value="Submit" />
      </form>
        </div>
    </div>
    
    
    )
}

module.exports = Auth


