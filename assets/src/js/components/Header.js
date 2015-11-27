'use strict'

import React, { Component, PropTypes } from 'react'

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
    const { name, description } = this.props
    return (
      <div className='row'>
        <div className='row'>
          <h3>{this.state.name}</h3>
          <br />
        </div>
        <div className='row'>
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h4 className='panel-title'>Header</h4>
            </div>
            <div className='panel-body'>
              <form role='form'>
                <div className='form-group'>
                  <label>Name: </label>
                  <input
                    defaultValue={name}
                    className='form-control'
                    onChange={this.onNameChange.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    placeholder={'What\'s the name of your page?'}
                    type='text'
                    ref='name' />
                </div>
                <div className='form-group'>
                  <label>Description: </label>
                  <input
                    defaultValue={description}
                    className='form-control'
                    onBlur={this.onBlur.bind(this)}
                    placeholder={'What\'s the description of your page?'}
                    type='text'
                    ref='description' />
                </div>
              </form>
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

Header.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired
}
