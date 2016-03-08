'use strict'

import React, { Component, PropTypes } from 'react'
import * as MediaTypes from '../constants/MediaTypes'

export default class CreateMediaForm extends Component {

  constructor () {
    super()
  }

  onCreate (type, e) {
    const { onCreate, groupId } = this.props
    e.preventDefault()
    onCreate(type, groupId)
  }

  renderForm () {
    return (

      <div className='btn-group add-media-block clearfix' role='group'>
        <button
          className='btn btn-default'
          onClick={this.onCreate.bind(this, MediaTypes.TEXT)}
          type='button'>Text</button>
        <button
          className='btn btn-default'
          onClick={this.onCreate.bind(this, MediaTypes.IMAGE)}
          type='button'>Image</button>
        <button
          className='btn btn-default'
          onClick={this.onCreate.bind(this, MediaTypes.GALLERY)}
          type='button'>Gallery</button>
        <button
          className='btn btn-default'
          onClick={this.onCreate.bind(this, MediaTypes.BUTTON)}
          type='button'>Link</button>
        <button
          className='btn btn-default'
          onClick={this.onCreate.bind(this, MediaTypes.MAP)}
          type='button'>Map</button>
      </div>

    )
  }

  render () {
    return this.renderForm()
  }

}

CreateMediaForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  groupId: PropTypes.number.isRequired
}
