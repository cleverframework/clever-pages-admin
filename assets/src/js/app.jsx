import $ from 'jquery'
import foundation from 'foundation'
import React from 'react'
import Router, { Route } from 'react-router'
import PagesApp from './components/PagesApp'
import PageBox from './components/PageBox'
import PageEdit from './components/PageEdit'
import RouterContainer from './services/RouterContainer'

$(document).foundation()

const routes = (
  <Route handler={PagesApp}>
    <Route name="list" path="/" handler={PageBox}/>
    <Route name="edit" path="/edit/?:pageId?" handler={PageEdit}/>
  </Route>
)

const router = Router.create({ routes })
RouterContainer.set(router)

// TODO: use local storage to cache the list for having a 0 latency ?
// Using pouchdb maybe ?

router.run((Handler) => {
  React.render(<Handler />, document.getElementById('pages'))
})
