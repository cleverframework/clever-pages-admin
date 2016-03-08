'use strict'

import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import Media from './Media'
import SortableImageList from './SortableImageList'
import Uploader from './Uploader'
import { USER_ROLE } from '../constants/User'

// Extends Media class
export default class GalleryMedia extends Media {

  constructor (props) {
    super(props)
    this.state = {
      reference: props.reference,
      name: props.name
    }
    this.prevState = this.state
    this.type = 'Gallery'
    this.multiple = true // TODO: verify multiupload works fine
    this.accept = '.jpg,.jpeg,.png,.gif'
  }

  // Inherit delete method from Media class

  update (e) {
    const { id, onUpdate } = this.props
    e.preventDefault()

    // Avoid empty update
    if (this.prevState === this.state) return
    this.prevState = this.state

    onUpdate(id, {
      reference: this.refs.reference.value,
      name: this.refs.name.value
    })
  }

  uploadImage (files) {
    const { id, onUploadImage } = this.props
    // TODO: Check if it's the right way to make this...
    files.forEach((file, i) => onUploadImage(id, file))
  }

  updateImage (fileId, params) {
    const { id, onUpdateImage } = this.props
    onUpdateImage(id, fileId, params)
  }

  deleteImage (fileId) {
    const { id, onDeleteImage } = this.props
    onDeleteImage(id, fileId)
  }

  onReferenceChange (e) {
    e.preventDefault()
    this.setState({
      reference: this.refs.reference.value
    })
  }

  onNameChange (e) {
    e.preventDefault()
    this.setState({
      name: this.refs.name.value
    })
  }

  onShowCropTool (imageId, imageSrc, imageCaption, imageMetadata) {
    const { id, onShowCropTool } = this.props
    onShowCropTool(id, imageId, imageSrc, imageCaption, imageMetadata)
  }

  render () {
    const {
      id, reference, imageFiles, onSort
    } = this.props

    const tooltip = (
      <Tooltip id={`tooltip-delete-media-${id}`}>Delete Gallery</Tooltip>
    )

    return (
      <div id={id} key={id}>
        <div className='panel panel-default'>
          <div className='panel-heading panel-drag' style={{display: USER_ROLE !== 'admin' ? 'none' : 'block'}}>
            <div className='row'>
              <div className='col-xs-12'>
                <div className='input-group'>
                  <input
                    type='text'
                    className='form-control'
                    value={this.state.name}
                    placeholder='Gallery Name'
                    disabled={USER_ROLE !== 'admin'}
                    ref='name'
                    onChange={this.onNameChange.bind(this)}
                    onBlur={this.update.bind(this)} />
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
              <div className='form-group' style={{display: USER_ROLE !== 'admin' ? 'none' : 'block'}}>
                <label>Key</label>
                <input
                  type='text'
                  className='form-control'
                  defaultValue={reference}
                  disabled={USER_ROLE !== 'admin'}
                  ref='reference'
                  onChange={this.onReferenceChange.bind(this)}
                  onBlur={this.update.bind(this)} />
              </div>
              <div className='form-group'>
                <label>{this.state.name} images</label>
                {imageFiles.length > 0 &&
                  <SortableImageList
                    key={Math.random()}
                    mediaId={id}
                    images={imageFiles}
                    onSort={onSort}
                    onUpdateImage={this.updateImage.bind(this)}
                    onShowCropTool={this.onShowCropTool.bind(this)}
                    onDeleteImage={this.deleteImage.bind(this)} />}
                <br />
                <Uploader
                  multiple={this.multiple}
                  accept={this.accept}
                  onUpload={this.uploadImage.bind(this)} />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

GalleryMedia.propTypes = Object.assign({}, Media.propTypes, {
  name: PropTypes.string,
  imageFiles: PropTypes.array.isRequired, // if no files must be an empty array
  onUpdate: PropTypes.func.isRequired,
  onUploadImage: PropTypes.func.isRequired,
  onUpdateImage: PropTypes.func.isRequired,
  onDeleteImage: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onShowCropTool: PropTypes.func.isRequired
})
