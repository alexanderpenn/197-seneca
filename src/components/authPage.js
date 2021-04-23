import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import '../App.css'
import { Link } from 'react-router-dom'
const axios = require('axios')



const Auth = () => {

    const clicked = async (e) => {
        e.preventDefault()
        console.log('clicked')
        try {
            const response = await axios.get('/google/callback')
        } catch(error) {
            console.log(error)
            }
        if (status === 200) {
            console.log(status)
        }
    }

    return (
    <div>
        <a href="/auth/google">Sign In with Google</a>
    </div>
    )
}

module.exports = Auth


