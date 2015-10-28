import $ from 'jquery'
import foundation from 'foundation'
import React from 'react'
import Router, { Route } from 'react-router'
import AuthApp from './components/AuthApp'
import Login from './components/Login'
import Signup from './components/Signup'
import RouterContainer from './services/RouterContainer'
import LoginActions from './actions/LoginActions'

$(document).foundation()

const routes = (
  <Route handler={AuthApp}>
    <Route name="login" path="/" handler={Login}/>
    <Route name="signup" handler={Signup}/>
  </Route>
)

const router = Router.create({ routes })
RouterContainer.set(router)

const jwt = localStorage.getItem('jwt')
if (jwt) LoginActions.loginUser(jwt)

router.run((Handler) => {
  React.render(<Handler />, document.getElementById('content'))
})
