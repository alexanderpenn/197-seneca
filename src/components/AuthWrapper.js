/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const AuthWrapper = ({ children, isloggedIn }) => {
  const router = useHistory()

  if (!isloggedIn) {
    router.push('/login')
  }

  return children
}

export default AuthWrapper
