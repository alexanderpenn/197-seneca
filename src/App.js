import './styles/App.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/homePage'
import LogIn from './components/logInPage'
import SignUp from './components/signUpPage'

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
      setUser({})
    }
  })

  const startLoadingData = async () => {
    await fetchLoginStatus()
    await fetchUser()
    await fetchDrivingSnapshots()
    setLoading(false)
  }

  useEffect(() => {
    setInterval(() => {
      startLoadingData()
    }, 1000)
  }, [])

  const dataCallBack = async () => {
    setLoading(true)
    await startLoadingData()
    return { loggedIn, user }
  }

  if (loading) {
    return (
      <div>
        <h1>Loading data...</h1>
      </div>
    )
  }
  const component = loggedIn
    ? <Home user={user} drivingSnapshots={drivingSnapshots} dataCallBack={dataCallBack} />
    : <LogIn />
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact>
            { component }
          </Route>

          <Route path="/signup/:userId" exact>
            <SignUp />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
