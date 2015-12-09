'use strict'

import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

export default class SortableImageList extends Component {
  constructor (props) {
    super(props)
  }

  update (e) {
    e.preventDefault()
    const { id, onUpdate } = this.props
    onUpdate(id, {
      caption: this.refs.caption.value
    })
  }

  delete (e) {
    e.preventDefault()
    const { id, onDelete } = this.props
    if (confirm('Are you sure?')) onDelete(id)
  }

  render () {
    const { id, filename, caption } = this.props

    const tooltip = (
      <Tooltip id={`tooltip-delete-gallery-image-${id}`}>Delete</Tooltip>
    )

    return (
      <li id={this.props.id}
        className='ui-state-default'
        style={{backgroundImage: `url(/files/${filename})`}}>
        <input
          defaultValue={caption}
          type='text'
          ref='caption'
          placeholder='Caption'
          className='form-control gallery-image-input-caption'
          onBlur={this.update.bind(this)} />
        <OverlayTrigger placement='top' overlay={tooltip}>
          <button
            className='btn btn-default'
            onClick={this.delete.bind(this)}
            style={{marginTop: '-3.5px'}}
            type='button'>
            <FontAwesome
              style={{color: 'red'}}
              name='times' />
          </button>
        </OverlayTrigger>
      </li>
    )
  }
}

SortableImageList.propTypes = {
  id: PropTypes.number.isRequired,
  filename: PropTypes.string,
  caption: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
