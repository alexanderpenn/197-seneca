const express = require('express')
const passport = require('passport')
const router = express.Router()
const GoogleStrategy = require("passport-google-oauth20").Strategy
const keys = require("./keys")
const { Datastore } = require('@google-cloud/datastore')

const datastore = new Datastore()

passport.serializeUser(function(user, done) {
    done(null, user)
  })
  
passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(
    new GoogleStrategy({
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/callback"
    }, async (accessToken, refreshToken, email, done) => {
        let currentUser = false
        const currentUserQuery = await datastore
            .createQuery('User')
            .filter('displayName', '=', email.displayName)
        try {
            currentUser = await datastore.runQuery(currentUserQuery)
            currentUser = currentUser[0]
        }
        catch (err) {
            console.log('ERROR FROM QUERY EXECUTION', err);
        }

        if (currentUser) {
            console.log('ingress')
            done(null, currentUser)
            } 
        else {
            console.log('excess')
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
                data: newUser
            }
              datastore.insert(entity, (newUser) => { 
                done(null, newUser)
              }) 
            }
        })
)

router.get("/google", 
    passport.authenticate("google", 
    { scope: ['https://www.googleapis.com/auth/plus.login']}), 
    (req, res) => {

    }
)


router.get('/google/callback',
    passport.authenticate('google', { scope: ['email'], failureRedirect: '/login' }),
    (req, res) => {
        req.session.user = req.user
        res.redirect('/')
})

router.get("/logout", (req, res) => {
    req.session = null
    console.log('req session', req.session)
    res.redirect('/')
})

router.get("/isLoggedIn", (req, res) => {
    if (req.session.user) {
        res.send(true)
    } else {
        res.send(false)
    }
})

router.get('/signup', (req, res) => {
    
})

module.exports = router




