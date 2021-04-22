
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import 'materialize-css/dist/css/materialize.min.css'
import FAB from './fab'
import '../App.css'
import Bar from './bar'

const Home = () => {
  const [scoreData, setScoreData] = useState({'date': ['01/01/21', '01/02/21', '01/03/21', '01/04/21', '01/05/21'], 'score': [51, 78, 89, 76, 81]})

  return (
    <div className='container'>
      <FAB />
      <div className='row center'>
        <div className='card col m5 s12 left'>
          <span className="card-title">Driver Information</span>
          <table className='card-content'>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>Alexander Lenz</td>
              </tr>
              <tr>
                <td>Vehicle:</td>
                <td>2014 Honda CR-V</td>
              </tr>
              <tr>
                <td>Residence:</td>
                <td>Jersey City, NJ 07302</td>
              </tr>
              <tr>
                <td>Policy Start Date:</td>
                <td>01/01/21</td>
              </tr>
              <tr>
                <td>Distance Driven:</td>
                <td>7,500 Miles</td>
              </tr>         
            </tbody>
          </table>      
        </div>
        <div className='card col m5 s12 right'>
          <span className="card-title">Safety Information</span>
          <table className='card-content'>
            <tbody>
              <tr>
                <td>Driver Rating:</td>
                <td>93</td>
              </tr>
              <tr>
                <td>Speeding Count:</td>
                <td>85</td>
              </tr>
              <tr>
                <td>Tailgating Count:</td>
                <td>17</td>
              </tr>
              <tr>
                <td>Lane Adherence:</td>
                <td>92/100</td>
              </tr>          
            </tbody>
          </table>  
        </div>
      </div>
      <div className='row center'>
        <h3 className='white-text'> Driver Safety Score </h3>
      </div>
      <div className='row'>
        <div className='col m12 s12'>
          <Bar labelData={scoreData.date} scoreData={scoreData.score} />
        </div>
      </div>
    </div>
  )
}

export default Home



// TODO: Datastore Backend
// TODO: OAuth and Signup
// TODO: Login | Logout
// TODO: Query and Update Datastore
// TODO: File Upload
// TODO: Popup on data points informing of changes
// TODO: Video Player to show specific infractions & the ability for a user to dispute infraction
// TODO: Design: Card spacing, fit chart on single page, black highlight on span elements, 