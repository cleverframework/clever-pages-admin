'use strict'

import React, { Component, PropTypes } from 'react'

export default class CreateForm extends Component {

  constructor () {
    super()
  }

  onSubmit (e) {
    const { onCreateClick } = this.props
    e.preventDefault()
    onCreateClick(this.refs.name.value)
  }

  componentWillMount () {
    const { inputNameValue } = this.props
    this.state = { inputNameValue }
  }

  componentWillReceiveProps (nextProps) {
    const { inputNameValue } = nextProps
    this.setState({ inputNameValue })
  }

  handleChange (e) {
    const inputNameValue = this.refs.name.value
    this.setState({ inputNameValue })
  }

  renderForm () {
    const { disabled } = this.props
    return (
      <div className='row'>
        <form role='form' onSubmit={this.onSubmit.bind(this)}>
          <div className='input-group'>
            <input
              type='text'
              ref='name'
              className='form-control input-xl'
              value={this.state.inputNameValue}
              onChange={this.handleChange.bind(this)}
              placeholder={'What\'s the name of your next page?'}
              disabled={disabled} />
            <span className='input-group-btn'>
              <button
                className='btn btn-default'
                disabled={disabled}
                type='submit'>Save</button>
            </span>
          </div>
        </form>
        <br />
      </div>
    )
  }

  render () {
    return this.renderForm()
  }

}

CreateForm.propTypes = {
  disabled: PropTypes.bool.isRequired,
  inputNameValue: PropTypes.string.isRequired,
  onCreateClick: PropTypes.func.isRequired
}
