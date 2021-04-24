/* eslint-disable no-console */
const express = require('express')
const passport = require('passport')

const router = express.Router()
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { Datastore } = require('@google-cloud/datastore')
const keys = require('./keys')

const datastore = new Datastore()

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(
  new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/callback',
  }, async (accessToken, refreshToken, email, done) => {
    let currentUser = false
    const currentUserQuery = await datastore
      .createQuery('User')
      .filter('displayName', '=', email.displayName)
    try {
      currentUser = await datastore.runQuery(currentUserQuery)
      currentUser = currentUser[0]
    } catch (err) {
      console.log('ERROR FROM QUERY EXECUTION', err);
    }
    if (currentUser) {
      done(null, currentUser)
    } else {
      const userKey = datastore.key('User')
      const newUser = {
        userId: email.id,
        displayName: email.displayName,
        phoneNumber: null,
        dob: null,
        make: null,
        model: null,
        year: null,
        city: null,
        state: null,
        zip: null,
        url: null,
      }
      const entity = {
        key: userKey,
        data: newUser,
      }
      datastore.insert(entity, (user) => {
        done(null, user) // changed from newUser to user
      })
    }
  }),
)

router.get('/google',
  passport.authenticate('google',
    { scope: ['https://www.googleapis.com/auth/plus.login'] }))

router.get('/google/callback',
  passport.authenticate('google', { scope: ['email'], failureRedirect: '/login' }),
  (req, res) => {
    req.session.user = req.user
    res.redirect('/')
  })

router.get('/logout', (req, res) => {
  req.session = null
  console.log('req session', req.session)
  res.redirect('/')
})

router.get('/isLoggedIn', (req, res) => {
  if (req.session.user) {
    res.send(true)
  } else {
    res.send(false)
  }
})

router.get('/signup', (req, res) => {
  datastore
    .createQuery('User')
    .filter('userId', '=', req.session.user)
    .then((userQuery) => {
      datastore.runQuery(userQuery).then((userArr) => {
        const user = userArr[0]
        const { phoneNumber, dob, make, model, year, city, state, zip, url } = req.body
        const newUser = {
          userId: user.userId,
          displayName: user.displayName,
          phoneNumber,
          dob,
          make,
          model,
          year,
          city,
          state,
          zip,
          url,
        }
        const entity = {
          key: user.key,
          data: newUser,
        }
        datastore.insert(entity, () => {
          res.send('Sucessfully Updates')
        })
      })
    })
})

module.exports = router
