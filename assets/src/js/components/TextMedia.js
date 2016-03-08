'use strict'

import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import Media from './Media'
import { USER_ROLE } from '../constants/User'

// Extends Media class
export default class TextMedia extends Media {

  constructor (props) {
    super(props)
    this.state = {
      reference: this.props.reference,
      name: this.props.name,
      content: this.props.content,
      char_limit: this.props.char_limit
    }
    this.prevState = this.state
    this.type = 'Text'
  }

  onBlur (e) {
    const { id, onUpdate } = this.props
    e.preventDefault()

    // Avoid empty update
    if (this.prevState === this.state) return
    this.prevState = this.state

    onUpdate(id, {
      reference: this.refs.reference.value,
      name: this.refs.name.value,
      content: (USER_ROLE === 'admin') ? this.refs.content.value : this.refs.contentUser.value,
      char_limit: this.refs.limit.value
    })
  }

  onReferenceChange (e) {
    e.preventDefault()
    this.setState({
      reference: e.target.value
    })
  }

  onNameChange (e) {
    e.preventDefault()
    this.setState({
      name: e.target.value
    })
  }

  onContentChange (e) {
    e.preventDefault()
    this.setState({
      content: e.target.value
    })
  }

  onLimitChange (e) {
    e.preventDefault()
    this.setState({
      char_limit: e.target.value
    })
  }

  render () {
    const {
      id, name, char_limit
    } = this.props

    const tooltip = (
      <Tooltip id={`tooltip-delete-media-${id}`}>Delete Field</Tooltip>
    )
    return (
      <div id={id} key={id}>
        <div className='form-group' style={{display: USER_ROLE === 'admin' ? 'none' : 'block'}}>
          <div className='form-group'>
            <label style={{display: 'block'}}>{name} <small className='pull-right' style={{display: char_limit === 0 ? 'none' : 'block', lineHeight: '19px'}}>Character limit: {char_limit}</small></label>

            <textarea style={{display: char_limit > 0 ? 'none' : 'block'}}
              className='form-control'
              placeholder='Content'
              value={this.state.content}
              ref='contentUser'
              onChange={this.onContentChange.bind(this)}
              onBlur={this.onBlur.bind(this)} />

            <input style={{display: char_limit === 0 ? 'none' : 'block'}}
              type='text'
              className='form-control'
              placeholder='Content'
              value={this.state.content}
              ref='contentUser'
              maxLength={char_limit}
              onChange={this.onContentChange.bind(this)}
              onBlur={this.onBlur.bind(this)} />
          </div>
        </div>
        <div className='panel panel-default' style={{display: USER_ROLE !== 'admin' ? 'none' : 'block'}}>
          <div className='panel-heading panel-drag'>
            <div className='row'>
              <div className='col-xs-12'>
                <div className='input-group'>
                  <input
                    type='text'
                    className='form-control'
                    value={this.state.name}
                    placeholder='Text Name'
                    disabled={USER_ROLE !== 'admin'}
                    ref='name'
                    onChange={this.onNameChange.bind(this)}
                    onBlur={this.onBlur.bind(this)} />
                  <div className='input-group-btn'>
                    <OverlayTrigger placement='top' overlay={tooltip}>
                      <button
                        className='btn btn-danger pull-right'
                        onClick={this.delete.bind(this)}>
                          <FontAwesome name='times' />
                      </button>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='panel-body'>
            <form role='form'>
              <fieldset className='input-group-vertical'>
                <div className='form-group-half' style={{display: USER_ROLE !== 'admin' ? 'none' : 'inline-block'}}>
                  <label className='sr-only'>Key</label>
                  <input
                    type='text'
                    className='form-control'
                    value={this.state.reference}
                    ref='reference'
                    placeholder='Key'
                    disabled={USER_ROLE !== 'admin'}
                    onChange={this.onReferenceChange.bind(this)}
                    onBlur={this.onBlur.bind(this)} />
                </div>
                <div className='form-group-half' style={{display: USER_ROLE !== 'admin' ? 'none' : 'inline-block'}}>
                  <label className='sr-only'>Character Limit</label>
                  <input
                    type='number'
                    className='form-control'
                    value={this.state.char_limit}
                    ref='limit'
                    placeholder='Character Limit'
                    disabled={USER_ROLE !== 'admin'}
                    onChange={this.onLimitChange.bind(this)}
                    onBlur={this.onBlur.bind(this)} />
                </div>
                <div className='form-group'>
                  <label className='sr-only'>Content</label>
                  <textarea
                    type='text'
                    className='form-control'
                    placeholder='Content'
                    value={this.state.content}
                    ref='content'
                    onChange={this.onContentChange.bind(this)}
                    onBlur={this.onBlur.bind(this)} />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

TextMedia.propTypes = Object.assign({}, Media.propTypes, {
  name: PropTypes.string,
  char_limit: PropTypes.number,
  content: PropTypes.string,
  onUpdate: PropTypes.func.isRequired
})
