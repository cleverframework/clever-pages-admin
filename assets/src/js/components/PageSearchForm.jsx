import React from 'react/addons'
import ReactMixin from 'react-mixin'
import { Route, RouteHandler, Link } from 'react-router'
import PagesActions from '../actions/PagesActions'

export default class PageSearchForm extends React.Component {

  constructor () {
    super()
  }

  search (e) {
    e.preventDefault()
    PagesActions.search(e.target.value)
  }

  render () {

    return (
      <div className="row collapse">
        <div className="large-12 columns">
          <input className="text" placeholder="Search ..." id="filterText" ref="filterText" onChange={this.search.bind(this)} />
        </div>
      </div>
    )

  }
}

ReactMixin(PageSearchForm.prototype, React.addons.LinkedStateMixin)
