import React from 'react/addons'
import ReactMixin from 'react-mixin'
import { Link } from 'react-router'

export default class Page extends React.Component {

  constructor () {
    super()
  }

  render () {

    return (
      <div className="panel page">
        <h3 className="pageName">
          <Link to="edit" params={{pageId: this.props.children}}>{this.props.children}</Link>
        </h3>
        {this.props.status}
      </div>
    )

  }
}

ReactMixin(Page.prototype, React.addons.LinkedStateMixin)
