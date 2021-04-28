/* eslint-disable react/prop-types */
import React from 'react'
import { Fab, Action } from 'react-tiny-fab'
import 'react-tiny-fab/dist/styles.css'
import axios from 'axios'

const FAB = (props) => {
  const styles = {
    top: 0,
    left: 0,
  }

  const mainButtonStyles = {
    backgroundColor: '#818EC6',
  }

  const handleLogOut = async (e) => {
    e.preventDefault()
    const response = await axios.get('/auth/logout')

    if (response) {
      props.callbackLogout()
    }
  }

  const handleContact = (e) => {
    e.preventDefault()
    window.location = 'mailto:lenz@wharton.upenn.edu'
  }

  return (
    <Fab
      mainButtonStyles={mainButtonStyles}
      style={styles}
      icon={<i className="material-icons">menu</i>}
      alwaysShowTitle
      onClick={() => { console.log('clicked') }}
    >

      <Action
        style={{ backgroundColor: '#818EC6' }}
        text="Contact Us"
        onClick={(e) => handleContact(e)}
      >
        <i className="material-icons">contact_support</i>
      </Action>

      <Action
        style={{ backgroundColor: '#818EC6' }}
        text="Logout"
        onClick={(e) => handleLogOut(e)}
      >
        <i className="material-icons">logout</i>
      </Action>
    </Fab>
  )
}
export default FAB
