import React from 'react/addons'
import ReactMixin from 'react-mixin'
import { Route, RouteHandler, Link } from 'react-router'
import Page from './Page'

export default class PageList extends React.Component {

  constructor () {
    super()
  }

  render () {
    // if this become to slow, use forEach instead or query server side
    const pageNodes = this.props.data
      .filter(page => {
        if (this.props.filterText) {
          return !!page.name.match(new RegExp(this.props.filterText, 'gi'))
        }
        return true
      })
      .map(page => {
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
