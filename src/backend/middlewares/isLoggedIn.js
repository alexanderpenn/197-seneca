const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    next(new Error('User is not present within session token'))
  }
}

module.exports = isLoggedIn
