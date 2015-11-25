import React, { Component, PropTypes } from 'react'
import * as MediaTypes from '../constants/MediaTypes'

export default class CreateMediaForm extends Component {

  constructor () {
    super()
  }

  onCreate (type, e) {
    const { onCreate } = this.props
    e.preventDefault()
    onCreate(type)
  }

  renderForm () {
    return (
      <div className='row'>
        <div className='row'>
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h4 className='panel-title'>Add Media</h4>
            </div>
            <div className='panel-body'>
              <div className='btn-group' role='group'>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return this.renderForm()
  }

}

CreateMediaForm.propTypes = {
  onCreate: PropTypes.func.isRequired
}
