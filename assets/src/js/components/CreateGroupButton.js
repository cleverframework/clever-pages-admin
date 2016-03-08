'use strict'

import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'

export default class CreateGroupButton extends Component {

  constructor () {
    super()
  }

  onCreate (e) {
    const { onCreate } = this.props
    onCreate()
  }

  renderForm () {
    return (
      <div className='row'>
        <button type='button' className='btn btn-default btn-block btn-lg' onClick={this.onCreate.bind(this)}>
          <FontAwesome name='plus'/>
          <span> Add new group</span>
        </button>
      </div>
    )
  }

  render () {
    return this.renderForm()
  }

}

CreateGroupButton.propTypes = {
  onCreate: PropTypes.func.isRequired
}
