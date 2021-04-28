/* eslint-disable no-bitwise */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import { v4 as uuidv4 } from 'uuid'
import 'materialize-css/dist/css/materialize.min.css'
import '../styles/App.css'

import React, { useState } from 'react'
import FAB from './fab'
import Bar from './bar'

const Home = (props) => {
  const { user, drivingSnapshots, callbackLogout } = props
  const vehicle = ` ${user.year} ${user.make} ${user.model}`
  const residence = ` ${user.city}, ${user.state} ${user.zip}`
  const dates = []
  const scores = []
  let speedingCount = 0
  let laneAdherence = 0
  let tailGatingCount = 0
  let totalScore = 0
  let totalDistance = -1
  let startDate = -1
  if (drivingSnapshots.length > 0) {
    startDate = drivingSnapshots[0].date
    totalDistance = drivingSnapshots.map((snap) => snap.milesDriven).reduce((a, b) => a + b)
    drivingSnapshots.forEach((snap) => {
      dates.push(snap.date)
      scores.push(snap.score)
      speedingCount += snap.speedingCount
      tailGatingCount += snap.tailGatingCount

      laneAdherence += ~~(snap.laneAdherence / drivingSnapshots.length)
      totalScore += ~~(snap.score / drivingSnapshots.length)
    })
  }
  const scoreData = { date: dates, score: scores }

  return (
    <div className="container">
      <FAB callbackLogout={callbackLogout} />
      <div className="row center">
        <div className="card col m5 s12 left">
          <span className="card-title">Driver Information</span>
          <table className="card-content">
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{ user.displayName }</td>
              </tr>
              <tr>
                <td>Vehicle:</td>
                <td>{ vehicle }</td>
              </tr>
              <tr>
                <td>Residence:</td>
                <td>{ residence }</td>
              </tr>
              <tr>
                <td>Policy Start Date:</td>
                <td> { startDate } </td>
              </tr>
              <tr>
                <td>Distance Driven:</td>
                <td>{ totalDistance } Miles</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card col m5 s12 right">
          <span className="card-title">Safety Information</span>
          <table className="card-content">
            <tbody>
              <tr>
                <td>Driver Rating:</td>
                <td>{ totalScore }</td>
              </tr>
              <tr>
                <td>Speeding Count:</td>
                <td>{ speedingCount }</td>
              </tr>
              <tr>
                <td>Tailgating Count:</td>
                <td>{ tailGatingCount }</td>
              </tr>
              <tr>
                <td>Lane Adherence:</td>
                <td>{ laneAdherence }/100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row center">
        <h3 className="white-text"> Driver Safety Score </h3>
      </div>
      <div className="row">
        <div className="col m12 s12">
          <Bar labelData={scoreData.date} scoreData={scoreData.score} />
        </div>
      </div>
    </div>
  )
}

export default Home
