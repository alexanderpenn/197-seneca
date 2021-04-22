const passport = require('passport')
const GoogleStrategy = require("passport-google-oauth20").Strategy
const keys = require("../routes/keys")
const { Datastore } = require('@google-cloud/datastore')

const datastore = new Datastore()


passport.use(
  new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "/auth/google/redirect"
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
              done(null, newUser)
            }) 
          }
      })
    }
  )
)

// TODO: serialize user and enable functionality with services other than google

