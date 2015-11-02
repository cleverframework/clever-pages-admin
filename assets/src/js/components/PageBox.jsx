import React from 'react/addons'
import ReactMixin from 'react-mixin'
import { Route, RouteHandler, Link } from 'react-router'
import PageList from './PageList'
import PageSearchForm from './PageSearchForm'
import PageCreateForm from './PageCreateForm'
import PagesStore from '../stores/PagesStore'
import PagesService from '../services/PagesService'

export default class PageBox extends React.Component {

  constructor () {
    super()
    const data = PagesStore.pages
    this.state = {
      data: data,
      filterText: null
    }
  }

  loadPagesFromServer () {
    PagesService
      .load()
      .catch(function(err) {
        // alert('An error occourred while fetching the data.')
        console.error('Error fetching the data', err)
      })
  }

  componentDidMount () {
    this.changeListener = this._onChange.bind(this)
    PagesStore.addChangeListener(this.changeListener)

    this.loadPagesFromServer()
    // setInterval(this.loadPagesFromServer, 5000)

  }

  _onChange () {
    this.setState({
      data: PagesStore.pages,
      filterText: PagesStore.filterText
    })
  }

  componentWillUnmount () {
    PagesStore.removeChangeListener(this.changeListener)
  }

  render () {
    return (
      <div className="pageBox">
        <PageSearchForm />
        <PageList data={this.state.data} filterText={this.state.filterText} />
        <PageCreateForm />
      </div>
    )
  }
}

ReactMixin(PageBox.prototype, React.addons.LinkedStateMixin)
