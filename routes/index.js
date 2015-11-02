'use strict'

// Dependencies
const router = require('express').Router()
const jwtDecode = require('jwt-decode')

// Require CleverCore
const CleverCore = require('clever-core')

// Load the config from the core
const config = CleverCore.loadConfig()

// check if jwt-cookie exists
function isLogged(req, res, next) {
  // NB: we don't need a high security check
  // since this module don't handle any data.
  // The check is done in the API that is exchange via the React components.
  const jwt = req.cookies[config.auth.jwt.cookie]
  if (!jwt) return res.redirect('/auth')

  // Decode jwt
  res.locals.user = jwtDecode(jwt)
  next()
}

// Exports
module.exports = function(PagesAdminPackage, app, config) {

  let db = [
    {status: 'Published', name: 'Homepage', medias: []},
    {status: 'Published', name: 'Page 2', medias: []},
    {status: 'Unpublished', name: 'Page 3', medias: []},
    {status: 'Published', name: 'Page 4', medias: []},
    {status: 'Published', name: 'Page 5', medias: []},
    {status: 'Maybe', name: 'Homepage 2', medias: []}
  ]

  // Mock
  router.get('/data', (req, res, next) => {
    res.json(db)
  })

  router.post('/data/upload', (req, res, next) => {
    res.json({
      filepath: 'http://dreamatico.com/data_images/animals/animals-4.jpg'
    })
  })

  router.get('/data/:id', (req, res, next) => {
    if (req.params.id === 'Homepage')
      return res.json(db[0])

    res.json(db[1])
  })

  router.post('/data', (req, res, next) => {

    const newx = {status: 'Unpublished', name: req.body.name}

    db = [newx].concat(db)

    res.json(newx)
  })

  router.get('/', isLogged, (req, res, next) => {
    // TODO: Change clever-core for auto passing res.locals to render
    res.send(PagesAdminPackage.render('pages', res.locals))
  })

  return router

}
