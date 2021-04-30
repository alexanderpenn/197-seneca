/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
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
  const { user, drivingSnapshots, dataCallBack } = props
  const vehicle = ` ${user.year} ${user.make} ${user.model}`
  const residence = ` ${user.city}, ${user.state} ${user.zip}`
  const dates = []
  const scores = []
  let speedingCount = 0
  let laneAdherence = 0
  let tailGatingCount = 0
  let totalScore = 0
  let totalDistance = -1

  drivingSnapshots.sort((a, b) => ((Date.parse(a.date) > Date.parse(b.date)) ? 1 : (Date.parse(b.date) > Date.parse(a.date)) ? -1 : 0))
  if (drivingSnapshots.length > 0) {
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
  const startDate = drivingSnapshots[0].date
  const scoreData = { date: dates, score: scores }

  const DriverInfo = () => (
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
  )

  const SafetyInfo = () => (
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
  )

  return (
    <div className="container">
      <FAB dataCallBack={dataCallBack} />
      <div className="row center">
        <DriverInfo />
        <SafetyInfo />
      </div>
      <div className="row center">
        <h3 className="white-text"> Driver Safety Score </h3>
      </div>
      <div className="row">
        <Bar labelData={scoreData.date} scoreData={scoreData.score} />
      </div>
    </div>
  )
}

export default Home
