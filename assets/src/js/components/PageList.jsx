import React from 'react/addons'
import ReactMixin from 'react-mixin'
import { Route, RouteHandler, Link } from 'react-router'
import Page from './Page'

export default class PageList extends React.Component {

  constructor () {
    super()
  }

  render () {
    const pageNodes = this.props.data.map(page => {
      return (
        <Page key={page.name} status={page.status}>
          {page.name}
        </Page>
      )
    })
    return (
      <div className="pageList">
        {pageNodes}
      </div>
    )
  }
}

ReactMixin(PageList.prototype, React.addons.LinkedStateMixin)
