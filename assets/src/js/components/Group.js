'use strict'

import React, { PropTypes, Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { USER_ROLE } from '../constants/User'
import Medias from '../components/Medias'
import CreateMediaForm from '../components/CreateMediaForm'

// Extends Media class
export default class Group extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: this.props.name,
    }
    this.prevState = this.state
  }

  onBlur (e) {
    const { id, onUpdateGroup } = this.props
    e.preventDefault()

    // Avoid empty update
    if (this.prevState === this.state) return
    this.prevState = this.state

    onUpdateGroup(id, {
      name: this.refs.name.value
    })
  }

  onNameChange (e) {
    e.preventDefault()
    this.setState({
      name: e.target.value
    })
  }

  delete(e) {
    const { id, onDeleteGroup } = this.props
    onDeleteGroup(id)
  }

  createMedia(type, groupId) {
    const { onCreateMedia, medias } = this.props
    const order = medias ? medias.length : 0
    onCreateMedia(type, groupId, order)
  }

  render () {
    const {
      id, name, medias,
      onUpdateMedia, onUploadFileMedia, onUpdateFileMedia,
      onDeleteFileMedia, onSortGalleryMedia, onDeleteMedia,
      onCreateMedia, onSortMedia, index
    } = this.props

    const tooltip = (
      <Tooltip id={`tooltip-delete-group-${id}`}>Delete Group</Tooltip>
    )

    const dragClass = (USER_ROLE === 'admin' && index > 0) ? 'panel-heading panel-drag' : 'panel-heading'
    let panelClass = (USER_ROLE === 'admin') ? 'panel panel-default panel-field-group' : 'panel panel-default'
    panelClass += (USER_ROLE === 'admin' && index > 0) ? ' drag-enabled' : ''
    return (
      <div className={panelClass} id={id}>
        <div className={dragClass}>
          {(USER_ROLE !== 'admin' || index === 0) &&
            <span>{this.state.name}</span>}
          {(USER_ROLE === 'admin' && index > 0) &&
            <div className='input-group'>
              <input
                type='text'
                className='form-control'
                value={this.state.name}
                placeholder='Group name'
                disabled={USER_ROLE !== 'admin'}
                ref='name'
                onChange={this.onNameChange.bind(this)}
                onBlur={this.onBlur.bind(this)} />

              <div className="input-group-btn">
                <OverlayTrigger placement='top' overlay={tooltip}>
                  <button
                    className='btn btn-danger pull-right'
                    onClick={this.delete.bind(this)}>
                      <FontAwesome name='times' />
                  </button>
                </OverlayTrigger>
              </div>
            </div>}
        </div>
        <div className='panel-body'>
          <Medias
            medias={medias}
            groupId={id}
            onUpdate={onUpdateMedia.bind(this)}
            onUploadFileMedia={onUploadFileMedia.bind(this)} // create
            onUpdateFileMedia={onUpdateFileMedia.bind(this)}
            onDeleteFileMedia={onDeleteFileMedia.bind(this)}
            onSortGalleryMedia={onSortGalleryMedia.bind(this)}
            onSortMedia={onSortMedia.bind(this)}
            onDelete={onDeleteMedia.bind(this)} />

          {USER_ROLE === 'admin' &&
            <CreateMediaForm
              onCreate={this.createMedia.bind(this)}
              groupId={id} />}
        </div>
      </div>
    )
  }
}

Group.propTypes = {
  id: PropTypes.number,
  index: PropTypes.number,
  name: PropTypes.string,
  medias: PropTypes.array,
  onUpdateGroup: PropTypes.func.isRequired,
  onUpdateMedia: PropTypes.func.isRequired,
  onDeleteMedia: PropTypes.func.isRequired,
  onUploadFileMedia: PropTypes.func.isRequired,
  onUpdateFileMedia: PropTypes.func.isRequired,
  onDeleteFileMedia: PropTypes.func.isRequired,
  onSortGalleryMedia: PropTypes.func.isRequired,
  onSortMedia: PropTypes.func.isRequired,
  onCreateMedia: PropTypes.func.isRequired
}
