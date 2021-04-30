/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express')
const passport = require('passport')

const router = express.Router()
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { Datastore } = require('@google-cloud/datastore')
const isLoggedIn = require('../middlewares/isLoggedIn')

const keys = require('../keys')

const datastore = new Datastore()

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

const runDataStoreQueryEqualFilter = async (db, kind, filterProp, filterVal) => {
  const query = datastore.createQuery(kind).filter(filterProp, '=', filterVal)
  return datastore.runQuery(query)
    .then((entities) => entities[0][0])
    .catch((err) => console.log(err))
}

const createNewDataStoreEntity = (db, kind, bodyObj) => {
  const entityKey = db.key(kind)
  const newEntity = {
    key: entityKey,
    data: bodyObj,
  }
  db.insert(newEntity).catch((err) => console.log(err))
}

const updateUserOnSignUp = async (db, bodyObj, userIdVal) => {
  const entity = await runDataStoreQueryEqualFilter(db, 'User', 'userId', userIdVal)
  const newData = bodyObj
  newData.displayName = entity.displayName
  const newEntity = {
    key: entity[datastore.KEY],
    data: newData,
  }
  db.update(newEntity)
}

passport.use(
  new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/callback',
    passReqToCallback: true,
  }, async (req, accessToken, refreshToken, profile, done) => {
    const currentUser = await runDataStoreQueryEqualFilter(datastore, 'User', 'userId', profile.id)
    if (currentUser) {
      req.session.newUser = false
      done(null, { ...currentUser, userId: profile.id })
    } else {
      const newUser = {
        userId: profile.id,
        displayName: profile.displayName,
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
      req.session.newUser = true
      createNewDataStoreEntity(datastore, 'User', newUser, datastore)
      done(null, newUser)
    }
  }),
)

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    if (err) { console.log(err) }
    if (!user) { return res.redirect('/') }
    req.session.user = user
    req.logIn(user, (err) => {
      if (req.session.newUser) {
        return res.redirect(`/signup/${user.userId}`)
      }
      return res.redirect('/')
    })
  })(req, res, next)
})

router.get('/user', (req, res, next) => {
  try {
    if (req.session.user) {
      return res.send(req.session.user)
    }
    return res.send({})
  } catch (err) {
    next(err)
  }
})

router.get('/logout', isLoggedIn, (req, res, next) => {
  try {
    req.session = null
    res.send(true)
  } catch (err) {
    next(err)
  }
})

router.get('/isLoggedIn', (req, res, next) => {
  try {
    if (!req.session.user) {
      res.send(false)
    } else {
      res.send(true)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/drivingSnapshots', (req, res, next) => {
  try {
    if (req.session.user) {
      const query = datastore.createQuery('DrivingSnapshot')
        .filter('userId', '=', req.session.user.userId)
      datastore.runQuery(query)
        .then((entities) => res.send(entities[0]))
        .catch((err) => console.log(err))
    } else {
      res.send([])
    }
  } catch (err) {
    next(err)
  }
})

router.post('/submitSignUp', isLoggedIn, async (req, res, next) => {
  try {
    const {
      phoneNumber,
      dob,
      make,
      model,
      year,
      city,
      state,
      zip,
      url,
      userId,
    } = req.body
    const newUser = {
      userId: req.session.user.userId,
      displayName: req.session.user.displayName,
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
    await updateUserOnSignUp(datastore, newUser, userId).then(() => {
      req.session.user = newUser
      res.send(true)
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
