import React from 'react/addons'
import ReactMixin from 'react-mixin'
import { Route, RouteHandler, Link } from 'react-router'
import Auth from '../services/AuthService'

export default class Login extends React.Component {

  constructor () {
    super()
    this.state = {
      user: '',
      password: ''
    }
  }

  login (e) {
    e.preventDefault()
    Auth.login(this.state.user, this.state.password)
      .catch(function(err) {
        alert('There\'s an error logging in')
        console.error('Error logging in', err)
      })
  }

  render () {

    return (
      <div className="login">
        <form role="form">
          <div className="row">
            <div className="large-12 columns">
              <input type="text" valueLink={this.linkState('user')} id="email" ref="email" placeholder="Email" />
            </div>
          </div>
          <div className="row">
            <div className="large-12 columns">
              <input type="password" valueLink={this.linkState('password')} id="password" ref="password" placeholder="Password" />
            </div>
          </div>
          <div className="row">
            <div className="large-12 large-centered columns">
              <button type="submit" className="button expand" onClick={this.login.bind(this)}>Login</button>
            </div>
          </div>
        </form>
        <p>Don't have an account? <Link to="signup">Signup</Link></p>
      </div>
    )

  }
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin)
