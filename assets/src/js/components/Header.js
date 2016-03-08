'use strict'

import React, { Component, PropTypes } from 'react'

import { USER_ROLE } from '../constants/User'

export default class Header extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: props.name
    }
  }

  onBlur (e) {
    const { onUpdate } = this.props
    e.preventDefault()
    onUpdate({
      name: this.refs.name.value,
      description: this.refs.description.value
    })
  }

  onNameChange (e) {
    e.preventDefault()
    this.setState({
      name: this.refs.name.value
    })
  }

  renderForm () {
    const { id, name, description, title } = this.props
    return (
      <div>
        <h3>{this.state.name || `Page ${id}`}</h3>
        <br />
        <form role='form'>
          <div className='form-group'>
            <label>Name: </label>
            <input
              defaultValue={name}
              className='form-control'
              onChange={this.onNameChange.bind(this)}
              onBlur={this.onBlur.bind(this)}
              placeholder={'What\'s the name of your page?'}
              disabled={USER_ROLE !== 'admin'}
              type='text'
              ref='name' />
          </div>
          <div className='form-group'>
            <label>Title: </label>
            <input
              defaultValue={title}
              className='form-control'
              onBlur={this.onBlur.bind(this)}
              placeholder={'What\'s the title of your page?'}
              type='text'
              ref='description' />
          </div>
          <div className='form-group'>
            <label>Description: </label>
            <textarea
              defaultValue={description}
              className='form-control'
              onBlur={this.onBlur.bind(this)}
              placeholder={'What\'s the description of your page?'}
              type='text'
              ref='description'></textarea>
          </div>
        </form>
      </div>
    )
  }

  render () {
    return this.renderForm()
  }

}

Header.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  onUpdate: PropTypes.func.isRequired
}
