'use strict'

import React from 'react'
import LoginStore from '../stores/LoginStore'
import { Route, RouteHandler, Link } from 'react-router'
import AuthService from '../services/AuthService'

export default class AuthenticatedApp extends React.Component {
  constructor() {
    super()
    this.state = this._getLoginState()
  }

  _getLoginState() {
    return {
      userLoggedIn: LoginStore.isLoggedIn()
    }
  }

  componentDidMount() {
    this.changeListener = this._onChange.bind(this)
    LoginStore.addChangeListener(this.changeListener)
  }

  _onChange() {
    this.setState(this._getLoginState())
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener)
  }

  render() {
    return (
      <div className="large-3 large-centered columns">
        <div className="login-box">
          <div className="row">
            <div className="large-12 columns">
              <h2>Clever V1</h2>
              <RouteHandler/>
            </div>
          </div>
        </div>
      </div>
    )
  }

  logout(e) {
    e.preventDefault()
    AuthService.logout()
  }

}
