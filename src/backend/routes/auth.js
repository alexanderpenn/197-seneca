const express = require('express')
const passport = require('passport')
const router = express.Router()



//router.get("/google", passport.authenticate("google", {
//    scope: ["email"]
//}))

router.get("/googler", (req, res, next) => {
    res.send('Yes')
})

router.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}))

router.get("logout", (req, res) => {
    req.logout()
    res.send(req.user)
})

module.exports = router

//TODO should i handle errors in this function either way need to add json