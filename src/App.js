import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Home from './components/home'
import Auth from './components/authPage'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  const fetchUser = () => {
    axios.get('auth/user').then((res) => {
      setUser(res.data)
    })
  }

  const fetchLoginStatus = () => {
    axios.get('auth/isLoggedIn').then((res) => {
      setLoggedIn(res.data)
    })
  }

  useEffect(() => {
    fetchLoginStatus()
  })

  const element = (loggedIn ? <Home /> : <Auth />)

  return (
    <div className="App">
      <header className="App-header" />
      { element }
    </div>
  )
}

export default App

// TODO: enable users that havent signed up ot submit a form that modifies user object
//       send key value pairs to axios signup endpoint
//       update entity within datastore
//       only serve the signup form if we can guarantee the user is signing up
// TODO: Actually query user / login status and use element
// TODO: consider using setInterval to auto refresh login status
// TODO: (auth) remove passport
// TODO: (auth) identify what i need to pass in to get email and what email currently is
// TODO: (auth) handle errors
// TODO: (passport) import into auth routes
// TODO: (components/home) pull data from datastore
// TODO: (components/home) enable google drive linking
// TODO: (components/home) stylize charts:
//        Popup on data points informing of changes
//        Video Player to show specific infractions & the ability for a user to dispute infraction
//        Design: Card spacing, fit chart on single page, black highlight on span elements,

// TODO: run es linter
// TODO: (GTO) WebSocket, Cors
