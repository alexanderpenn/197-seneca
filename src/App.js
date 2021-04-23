import { authenticate } from 'passport'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Home from './components/home'
import Auth from './components/authPage'



const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  const fetchUser = async () => {
    const response = await axios.get('auth/user')
    setUser(response.data.user)
  }

  const fetchLoginStatus = () => {
    axios.get('auth/isLoggedIn').then(res => {
      console.log('Login status', res.data)
      setLoggedIn(res.data)
    })
  }

  useEffect(() => {
    fetchLoginStatus()
  })

  const element = (loggedIn ? <Home /> : <Auth />)

  return (
    <div className="App">
      <header className="App-header"></header>
      { element }
    </div>
  )
}

export default App



// TODO: Actually query user / login status and use element
// TODO: consider using setInterval to auto refresh loginstatus