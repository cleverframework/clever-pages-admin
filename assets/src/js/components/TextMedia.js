'use strict'

import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import Media from './Media'

// Extends Media class
export default class TextMedia extends Media {

  constructor (props) {
    super(props)
    this.state = {
      reference: props.reference
    }
    this.type = 'Text'
  }

  onBlur (e) {
    const { id, onUpdate } = this.props
    e.preventDefault()
    onUpdate(id, {
      reference: this.refs.reference.value,
      name: this.refs.name.value,
      content: this.refs.content.value
    })
  }

  onReferenceChange (e) {
    e.preventDefault()
    this.setState({
      reference: this.refs.reference.value
    })
  }

  render () {
    const {
      id, reference, name, content
    } = this.props

    const ref = this.state.reference !== '' ? this.state.reference : this.props.vid
    const title = `${this.type} [${ref}]`

    const tooltip = (
      <Tooltip id={`tooltip-delete-media-${id}`}>Delete</Tooltip>
    )

    return (
      <div className='row'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <div className='row'>
              <div className='col-xs-8'>
                <h4 className='panel-title'>{title}</h4>
              </div>
              <div className='col-xs-4'>
                <a
                  href='#'
                  className='pull-right'
                  style={{textDecoration: 'none', color: 'red'}}
                  onClick={this.delete.bind(this)}>
                  <OverlayTrigger placement='top' overlay={tooltip}>
                    <FontAwesome name='times' />
                  </OverlayTrigger>
                </a>
              </div>
            </div>
          </div>
          <div className='panel-body'>
            <form role='form'>
              <div className='form-group'>
                <label>Reference</label>
                <input
                  type='text'
                  className='form-control'
                  defaultValue={reference}
                  ref='reference'
                  onChange={this.onReferenceChange.bind(this)}
                  onBlur={this.onBlur.bind(this)} />
              </div>
              <div className='form-group'>
                <label>Name</label>
                <input
                  type='text'
                  className='form-control'
                  defaultValue={name}
                  ref='name'
                  onBlur={this.onBlur.bind(this)} />
              </div>
              <div className='form-group'>
                <label>Content</label>
                <textarea
                  type='text'
                  className='form-control'
                  defaultValue={content}
                  ref='content'
                  onBlur={this.onBlur.bind(this)} />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

TextMedia.propTypes = Object.assign({}, Media.propTypes, {
  name: PropTypes.string,
  content: PropTypes.string,
  onUpdate: PropTypes.func.isRequired
})
