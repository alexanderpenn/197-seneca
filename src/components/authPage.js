import React, { useState } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import '../App.css'

const axios = require('axios')

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
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
    const body = {
      phoneNumber,
      dob,
      make,
      model,
      year,
      city,
      state,
      zip,
      url,
    }
    axios.post('/auth/signup', body)
  }

  return (
    <div>
      <a href="/auth/google">Sign In with Google</a>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="phone">
            Phone Number:
            <input type="tel" id="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </label>
          <label htmlFor="dob">
            DOB:
            <input id="dob" type="date" value={dob} onChange={(e) => setDOB(e.target.value)} />
          </label>
          <label htmlFor="make">
            Vehicle Make:
            <input id="make" type="text" value={make} onChange={(e) => setMake(e.target.value)} />
          </label>
          <label htmlFor="model">
            Vehicle Model:
            <input id="model" type="text" value={model} onChange={(e) => setModel(e.target.value)} />
          </label>
          <label htmlFor="year">
            Vehicle Year:
            <input id="year" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
          </label>
          <label htmlFor="city">
            City:
            <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
          <label htmlFor="state">
            State:
            <input id="state" type="text" value={state} onChange={(e) => setState(e.target.value)} />
          </label>
          <label htmlFor="zip">
            Zip Code:
            <input id="zip" type="number" value={zip} onChange={(e) => setZip(e.target.value)} />
          </label>
          <label htmlFor="url">
            Google Drive URL:
            <input id="url" type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

module.exports = Auth
