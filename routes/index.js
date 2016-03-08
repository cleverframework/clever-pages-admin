'use strict'

// Dependencies
const router = require('express').Router()
const jwtDecode = require('jwt-decode')

// Require CleverCore
const CleverCore = require('clever-core')

// Load the config from the core
const config = CleverCore.loadConfig()

// Check if jwt-cookie exists
function isLogged(req, res, next) {
  const jwt = req.cookies[config.auth.jwt.cookie]
  if (!jwt) return res.redirect('/login')

  // Decode jwt
  res.locals.user = jwtDecode(jwt)
  next()
}

// Exports
module.exports = function(PagesAdminPackage, app, config) {

  // TODO:
  // - Change clever-core for auto passing res.locals to render
  // - Check what's best for 404 - maybe using a single router.use ...

  router.use(isLogged, (req, res) => {
    console.log(res.locals)
    res.send(PagesAdminPackage.render('pages', res.locals))
  })

  return router

}
