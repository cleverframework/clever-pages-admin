'use strict'

import React, { Component, PropTypes } from 'react'

export default class PageActionForm extends Component {

  constructor (props) {
    super(props)
  }

  renderForm () {
    const { id, version, onBumpVersion } = this.props
    return (
      <div className='col-xs-12' style={{paddingTop: '75px'}}>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <form role='form'>
              <div className='form-group'>
                <label>Current Version:</label> {version}
              </div>
              <button
                className='btn btn-primary btn-lg btn-block'
                onClick={onBumpVersion}
                type='button'>Save</button>
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
  version: PropTypes.number.isRequired,
  onBumpVersion: PropTypes.func.isRequired
}
