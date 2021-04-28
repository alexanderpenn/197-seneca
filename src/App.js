/* eslint-disable max-len */
import './styles/App.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/homePage'
import LogIn from './components/logInPage'
import SignUp from './components/signUpPage'
import AuthWrapper from './components/AuthWrapper'

const axios = require('axios')

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [drivingSnapshots, setDrivingSnapshots] = useState([])

  const fetchLoginStatus = async () => axios.get('/auth/isLoggedIn').then((res) => {
    setLoggedIn(res.data)
  })

  const fetchDrivingSnapshots = async () => axios.get('/auth/drivingSnapshots').then((res) => {
    setDrivingSnapshots(res.data)
  })

  const fetchUser = async () => axios.get('/auth/user').then((res) => {
    if (res.data !== false) {
      setUser(res.data)
    } else {
      setUser(false)
    }
  })

  const startLoadingData = async () => {
    await fetchLoginStatus()
    await fetchUser()
    await fetchDrivingSnapshots()
    setLoading(false)
  }

  useEffect(() => {
    startLoadingData()
  }, [])

  const callbackLogout = () => {
    startLoadingData()
  }

  if (loading) {
    return (
      <div>
        <h1>Loading data...</h1>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact>
            <AuthWrapper isloggedIn={loggedIn}>
              <Home user={user} drivingSnapshots={drivingSnapshots} callbackLogout={callbackLogout} />
            </AuthWrapper>
          </Route>

          <Route path="/login" exact>
            <LogIn />
          </Route>

          <Route path="/signup/:userId" exact>
            <SignUp callbackLogout={callbackLogout} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App

// TODO: Order Snapshots by date, remove misspelled snapshot
// Fix render problem on redirect w/ hook
// TODO: Stylization (charts, signup, card spacing, login)
//       loginPage: Add logo
// TODO: break down html into multiple react components
// TODO: remove user in system in order to test out form submission
//
// TODO: (GTO) Parse and remove GTO comments, WebSocket, Cors, public, dist
// TODO: (components/home):
//        Popup on data points informing of changes
//        Video Player to show specific infractions & the ability for a user to dispute infraction
//        enable google drive access
