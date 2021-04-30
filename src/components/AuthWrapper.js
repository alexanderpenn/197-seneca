/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const AuthWrapper = ({ children, isloggedIn }) => {
  const history = useHistory()

  if (!isloggedIn) {
    history.push('/login')
    return null
  }
  return children
}

export default AuthWrapper
