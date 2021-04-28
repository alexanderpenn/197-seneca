/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'
import '../styles/App.css'

const axios = require('axios')

const SignUp = (props) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dob, setDOB] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [url, setUrl] = useState('')

  const { userId } = useParams()

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
      userId,
    }
    axios.post('/auth/submitSignUp', body)
    props.callbackLogout()
  }

  return (
    <div className="col s12 m12 l6">
      <div className="card-panel">
        <h4 className="header2">Sign Up</h4>
        <div className="row">
          <form className="col s12" onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <i className="mdi-action-account-circle prefix" />
                <input placeholder="Phone Number" type="tel" id="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="mdi-communication-email prefix" />
                <input placeholder="Date of Birth" id="dob" type="date" value={dob} onChange={(e) => setDOB(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="mdi-communication-email prefix" />
                <input placeholder="Vehicle Make" id="make" type="text" value={make} onChange={(e) => setMake(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="mdi-communication-email prefix" />
                <input placeholder="Vehicle Model" id="model" type="text" value={model} onChange={(e) => setModel(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="mdi-communication-email prefix" />
                <input placeholder="Vehicle Year" id="year" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="mdi-communication-email prefix" />
                <input placeholder="City" id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="mdi-action-lock-outline prefix" />
                <input placeholder="State" id="state" type="text" value={state} onChange={(e) => setState(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="mdi-action-lock-outline prefix" />
                <input id="zip" placeholder="Zip Code" type="number" value={zip} onChange={(e) => setZip(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="mdi-action-question-answer prefix" />
                <input id="url" placeholder="Google Drive Url" type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <button className="btn cyan waves-effect waves-light right" type="submit" name="action">
                    Submit
                    <i className="mdi-content-send right" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

module.exports = SignUp
