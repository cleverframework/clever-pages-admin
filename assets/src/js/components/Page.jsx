import React from 'react/addons'
import ReactMixin from 'react-mixin'
import { Link } from 'react-router'

const style = {
  fontSize: '9px'
}

export default class Page extends React.Component {

  render () {

    return (
      <div className="panel page">
        <div className="row">
          <div className="small-8 columns">
            <h3 className="pageName">
              <Link to="edit" params={{pageId: this.props.children}}>{this.props.children}</Link>
              <br />
              <span style={style}>{this.props.status}</span>
            </h3>
          </div>
          <div className="small-4 columns">
            <br />
            <button className="button tiny alert right">Delete</button>
            <button className="button tiny info right">Publish</button>
          </div>
        </div>
      </div>
    )

  }
}

ReactMixin(Page.prototype, React.addons.LinkedStateMixin)
