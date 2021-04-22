import { authenticate } from 'passport'
import React, { useState } from 'react'
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
  const fetchLoginStatus = async() => {
    try {
      await axios.get('auth/status')
      setLoggedIn(true)
      await fetchUser()
    } catch (e) {
      setLoggedIn(false)
    }
  }

  const element = (loggedIn ? <Home /> : <Auth />)
  
  return (
    <div className="App">
      <header className="App-header"></header>
      <Auth />
    </div>
  )
}

export default App



// TODO: Actually query user / login status and use element
// TODO: consider using effect to autorefresh