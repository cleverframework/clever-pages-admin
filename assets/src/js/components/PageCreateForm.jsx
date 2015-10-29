import React from 'react/addons'
import ReactMixin from 'react-mixin'
import { Route, RouteHandler, Link } from 'react-router'

export default class PageCreateForm extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  login (e) {
    e.preventDefault()
    // Pages.login(this.state.user, this.state.password)
    //   .catch(function(err) {
    //     alert('There\'s an error logging in')
    //     console.error('Error logging in', err)
    //   })
  }

  render () {

    return (
      <div className="row">
        <div className="large-12 columns">
          <div className="row collapse">
            <div className="small-10 columns">
              <input type="text" placeholder="Page name"/>
            </div>
            <div className="small-2 columns">
              <button className="button postfix">Create new Page</button>
            </div>
          </div>
        </div>
      </div>
    )

  }
}

ReactMixin(PageCreateForm.prototype, React.addons.LinkedStateMixin)
