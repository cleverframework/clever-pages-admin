'use strict'

import React, { Component, PropTypes } from 'react'

export default class PageActionForm extends Component {

  constructor (props) {
    super(props)
  }

  renderForm () {
    const { id, version } = this.props
    return (
      <div className="col-xs-12">
        <div className='panel panel-default'>
          <div className='panel-body'>
            <form role='form'>
              <div className='form-group'>
                <label>Version: {version}</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return this.renderForm()
  }

}

PageActionForm.PageActionForm = {
  version: PropTypes.string.isRequired,
  onVersionCreate: PropTypes.func.isRequired
}
