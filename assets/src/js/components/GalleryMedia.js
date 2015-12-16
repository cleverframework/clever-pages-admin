'use strict'

import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import Media from './Media'
import SortableImageList from './SortableImageList'
import Uploader from './Uploader'

// Extends Media class
export default class GalleryMedia extends Media {

  constructor (props) {
    super(props)
    this.state = {
      reference: props.reference
    }
    this.type = 'Gallery'
    this.multiple = true // TODO: verify multiupload works fine
    this.accept = '.jpg,.jpeg,.png,.gif'
  }

  // Inherit delete method from Media class

  update (e) {
    const { id, onUpdate } = this.props
    e.preventDefault()
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

  render () {
    const {
      id, reference, name, imageFiles,
      onSort
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
                  onBlur={this.update.bind(this)} />
              </div>
              <div className='form-group'>
                <label>Name</label>
                <input
                  type='text'
                  className='form-control'
                  defaultValue={name}
                  ref='name'
                  onBlur={this.update.bind(this)} />
              </div>
              <div className='form-group'>
                <label>Images</label>
                {imageFiles.length > 0 &&
                  <SortableImageList
                    key={Math.random()}
                    mediaId={id}
                    images={imageFiles}
                    onSort={onSort}
                    onUpdateImage={this.updateImage.bind(this)}
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
  onSort: PropTypes.func.isRequired
})
