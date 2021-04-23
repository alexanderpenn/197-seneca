import React from 'react'
import { Fab, Action } from 'react-tiny-fab'
import 'react-tiny-fab/dist/styles.css'
import axios from 'axios'



const FAB = () => {

    const styles = {
        top: 0,
        left: 0,
    }

    const mainButtonStyles = {
        backgroundColor: '#818EC6',
    }

    const handleVideoUpload = () => {
        return
    }

    const handleLogOut = (e) => {
        e.preventDefault()
        axios.get('/auth/logout')

    }

    const handleContact = () => {
        return
    }
    
    return (
        <Fab
            mainButtonStyles={mainButtonStyles}
            style={styles}
            icon={<i className="material-icons">menu</i>}
            alwaysShowTitle={true}
            onClick={() => {console.log('clicked')}}> 
        
            <Action
                style={{backgroundColor: '#818EC6'}}
                text="Upload Video"
                onClick={handleVideoUpload}>
                <i className="material-icons">file_upload</i>
            </Action>

            <Action
                style={{backgroundColor: '#818EC6'}}
                text="Contact Us"
                onClick={handleContact}>
                <i className="material-icons">contact_support</i>
            </Action>

            <Action
                style={{backgroundColor: '#818EC6'}}
                text="Logout"
                onClick={handleLogOut}>
                <i className="material-icons">logout</i>
            </Action>
        </Fab>
    )
}
export default FAB
