import React from 'react/addons'
import ReactMixin from 'react-mixin'
import { Route, RouteHandler, Link } from 'react-router'
import PagesService from '../services/PagesService'

export default class PageCreateForm extends React.Component {

  constructor () {
    super()
    this.state = {
      pageName: ''
    }
  }

  create (e) {
    e.preventDefault()
    console.log(e)
    const pageName = this.state.pageName
    PagesService.create(pageName)
      .then(() => {
        this.setState({
          pageName: ''
        })
        return true
      })
      .catch(function(err) {
        alert('There\'s an error adding the page')
        console.error('Error adding the page', err)
      })
  }

  render () {

    return (
      <div className="row addPage">
        <div className="large-12 columns">
          <form>
            <div className="row collapse">
              <div className="small-10 columns">
                <input type="text" valueLink={this.linkState('pageName')} id="pageName" ref="pageName" placeholder="Page name" />
              </div>
              <div className="small-2 columns">
                <button className="button postfix success" id="pageNameBtn" onClick={this.create.bind(this)}>Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )

  }
}

ReactMixin(PageCreateForm.prototype, React.addons.LinkedStateMixin)
