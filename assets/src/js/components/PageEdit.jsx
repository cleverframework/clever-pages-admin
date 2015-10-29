import React from 'react/addons'
import ReactMixin from 'react-mixin'
import { Route, RouteHandler, Link } from 'react-router'
import Pages from '../services/PagesService'

export default class PageEdit extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  render () {

    return (
      <div className="edit">

      </div>
    )

  }
}

ReactMixin(PageEdit.prototype, React.addons.LinkedStateMixin)
