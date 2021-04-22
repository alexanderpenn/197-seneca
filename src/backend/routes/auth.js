const express = require('express')
const passport = require('passport')
const router = express.Router()
const GoogleStrategy = require("passport-google-oauth20").Strategy
const keys = require("./keys")
const { Datastore } = require('@google-cloud/datastore')

const datastore = new Datastore()


passport.use(
    new GoogleStrategy({
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/callback"
    }, (accessToken, refreshToken, email, done) => {
      datastore
          .createQuery('User')
          .filter('email', '=', email)
          .then((currentUser) => {
            if (currentUser) {
              done(null, currentUser)
            } else {
              const userKey = datastore.key(email)
              const newUser = {
                id: email,
                phone_number: null,
                birth_date: null,
                vehicle_id: null,
                camera_id: null,
                time_zone: null,
                oauth_token: null,
                drive_folder_id: null,
              }
              const entity = {
                key: userKey,
                data: newUser
              }
              datastore.insert(entity).then((newUser) => { // consider error
                return done(null, newUser)
              }) 
            }
        })
      }
    )
  )

router.get("/google", passport.authenticate("google", {
    scope: ['https://www.googleapis.com/auth/plus.login']
}))


router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/')
})

router.get("logout", (req, res) => {
    req.logout()
    res.send(req.user)
})

router.get('google/success', (req, res) => {
    res.send('congrats')
})
router.get('google/failure', (req, res) => {
    res.send('error')
})
module.exports = router

//TODO should i handle errors in this function either way need to add json



