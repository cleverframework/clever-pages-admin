import $ from 'jquery'
import foundation from 'foundation'
import React from 'react/addons'
import ReactMixin from 'react-mixin'
import { Route, RouteHandler, Link } from 'react-router'

export default class PageCreateForm extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  componentDidMount () {
    $('.addPage').foundation()
  }

  create (e) {
    e.preventDefault()
    // Pages.login(this.state.user, this.state.password)
    //   .catch(function(err) {
    //     alert('There\'s an error logging in')
    //     console.error('Error logging in', err)
    //   })
  }

  render () {

    return (
      <div className="row addPage">
        <div className="large-12 columns">
        <button className="button" data-reveal-id="addPageModal">Create new page</button>
        <div id="addPageModal" className="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
          <h2 id="modalTitle">Awesome. I have it.</h2>
          <p className="lead">Your couch.  It is mine.</p>
          <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
          <a className="close-reveal-modal" aria-label="Close">&#215;</a>
        </div>
        </div>
      </div>
    )

  }
}

ReactMixin(PageCreateForm.prototype, React.addons.LinkedStateMixin)
