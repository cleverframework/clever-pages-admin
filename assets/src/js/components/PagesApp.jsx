'use strict'

import React from 'react'
import { Route, RouteHandler, Link } from 'react-router'

export default class PagesApp extends React.Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div className="row">
        <div className="large-12 columns">
          <h1>Pages</h1>
          <br />
        </div>
        <div className="large-12 columns">
          <RouteHandler/>
        </div>
      </div>
    )
  }

}
