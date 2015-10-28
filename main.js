'use strict'

const cleverCore = require('clever-core')
const Package = cleverCore.Package

// Defining the Package
var PagesAdminPackage = new Package('pages-admin')

// All CLEVER packages require registration
PagesAdminPackage
  .attach({
    where: '/pages'
  })
  .routes(['app', 'config'])
  .models()
  .register()
