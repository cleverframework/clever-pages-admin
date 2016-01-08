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

  onShowCropTool () {
    const { id, filename, caption, onShowCropTool } = this.props
    onShowCropTool(id, filename, caption)
  }

  render () {
    const { id, filename, caption, onShowCropTool } = this.props

    const tooltipDelete = (
      <Tooltip id={`tooltip-delete-gallery-image-${id}`}>Delete</Tooltip>
    )

    const tooltipCrop = (
      <Tooltip id={`tooltip-crop-gallery-image-${id}`}>Crop</Tooltip>
    )

    const styleListElement = {
      backgroundImage: `url(/files/${filename})`,
      width: '100%',
      height: '64px',
      display: 'block',
      backgroundSize: '64px 64px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left top'
    }

    return (
      <li id={this.props.id}
        className='ui-state-default'
        style={styleListElement}>
        <input
          defaultValue={caption}
          type='text'
          ref='caption'
          placeholder='Caption'
          className='form-control gallery-image-input-caption'
          onBlur={this.update.bind(this)} />
        <OverlayTrigger placement='top' overlay={tooltipCrop}>
          <button
            className='btn btn-default'
            onClick={this.onShowCropTool.bind(this)}
            style={{marginTop: '-3.5px'}}
            type='button'>
            <FontAwesome
              name='crop' />
          </button>
        </OverlayTrigger>
        <OverlayTrigger placement='top' overlay={tooltipDelete}>
          <button
            className='btn btn-default'
            onClick={this.delete.bind(this)}
            style={{marginTop: '-3.5px', marginLeft: '10px'}}
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
  onDelete: PropTypes.func.isRequired,
  onShowCropTool: PropTypes.func.isRequired
}
