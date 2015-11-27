'use strict'

import React, { Component, PropTypes } from 'react'

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
    onDelete(id)
  }

  render () {
    const { filename, caption } = this.props

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
        <button
          className='btn btn-default'
          onClick={this.delete.bind(this)}
          style={{marginTop: '-3.5px'}}
          type='button'>Delete</button>
      </li>
    )
  }
}

SortableImageList.propTypes = {
  id: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
