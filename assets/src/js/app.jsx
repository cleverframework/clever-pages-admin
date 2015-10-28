import $ from 'jquery'
import foundation from 'foundation'
import React from 'react'
import Router, { Route } from 'react-router'
import PagesApp from './components/PagesApp'
import List from './components/List'
import Edit from './components/Edit'
import RouterContainer from './services/RouterContainer'
import ListActions from './actions/ListActions'
import EditActions from './actions/EditActions'

$(document).foundation()

const routes = (
  <Route handler={PagesApp}>
    <Route name="list" path="/" handler={List}/>
    <Route name="edit" handler={Edit}/>
  </Route>
)

const router = Router.create({ routes })
RouterContainer.set(router)

// TODO: use local storage to cache the list for having a 0 latency ?
// Using pouchdb maybe ?

router.run((Handler) => {
  React.render(<Handler />, document.getElementById('content'))
})
