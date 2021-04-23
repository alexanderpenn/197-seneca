require('dotenv').config();
const express = require('express')
const { Datastore } = require('@google-cloud/datastore')
const path = require('path')
const cookieSession = require('cookie-session')
const errorHandler = require('./middlewares/errorHandler')
const authRouter = require('./routes/auth')
const homeRouter = require('./routes/home')
const passport = require('passport')
const datastore = new Datastore()
const cors = require("cors")

const app = express()
app.use(cors())
const port = 3000 || process.env.PORT


app.use(errorHandler)
app.use(cookieSession({
    name: 'session',
    keys: ['jelly'] // GTO
}))
app.use(express.static('dist')) // GTO
app.use(express.json()) // GTO
app.use(passport.initialize())
app.use(passport.session())


app.use('/auth', authRouter)
app.use('/home', homeRouter)


app.get('/favicon.ico', (_, res) => {res.status(404).send()})// GTO
app.get('*', (_, res) => {res.sendFile(path.join(__dirname, '../dist/index.html'))})// GTO
app.listen(port, () => {console.log('listening on 3k...')})



// TODO: Serve the home page once a user is able to login
// TODO Identify if i need to use cors and why i am getting connection refused from axios
// TODO understand what websocket does and if i need to change anything