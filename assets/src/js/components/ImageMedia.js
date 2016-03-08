'use strict'

import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { STORAGE_PUBLIC_URL } from '../constants/URLs'
import Media from './Media'
import Uploader from './Uploader'
import { USER_ROLE } from '../constants/User'

// Extends Media class
export default class ImageMedia extends Media {

  constructor (props) {
    super(props)
    this.state = {
      reference: props.reference,
      name: this.props.name,
      caption: this.props.caption
    }
    this.prevState = this.state
    this.type = 'Image'
    this.multiple = false
    this.accept = '.jpg,.jpeg,.png,.gif'
  }

  update (e) {
    const { id, onUpdate } = this.props
    e.preventDefault()

    // Avoid empty update
    if (this.prevState === this.state) return
    this.prevState = this.state

    onUpdate(id, {
      reference: this.refs.reference.value,
      caption: this.refs.caption.value,
      name: this.refs.name.value
    })
  }

  onNameChange (e) {
    e.preventDefault()
    this.setState({
      name: e.target.value
    })
  }

  onCaptionChange (e) {
    e.preventDefault()
    this.setState({
      caption: e.target.value
    })
  }

  onReferenceChange (e) {
    e.preventDefault()
    this.setState({
      reference: e.target.value
    })
  }

  uploadImage (files) {
    const { id, onUploadImage } = this.props
    if (files.length > 0) onUploadImage(id, files[0])
    else console.error('Files[] is empty... and this is wrong.')
  }

  onShowCropTool () {
    const { id, imageFile, onShowCropTool } = this.props
    onShowCropTool(id, imageFile.id, imageFile.filename, this.refs.caption.value, imageFile.metadata)
  }

  render () {
    const { id, imageFile, name } = this.props

    const tooltip = (
      <Tooltip id={`tooltip-delete-media-${id}`}>Delete Image</Tooltip>
    )

    let tooltipCrop = null

    if (imageFile) {
      tooltipCrop = (
        <Tooltip id={`tooltip-crop-gallery-image-${imageFile.id}`}>Crop</Tooltip>
      )
    }

    const imageTemplate = (
      <div className='form-group'>
        {imageFile &&
          <div className='image-container'>
            <img
              className='img-responsive'
              src={`${STORAGE_PUBLIC_URL}/${imageFile.filename}`} />
            <div className='image-btn-container'>
              <Uploader
                multiple={this.multiple}
                accept={this.accept}
                onUpload={this.uploadImage.bind(this)} />
              <OverlayTrigger placement='top' overlay={tooltipCrop}>
                <button
                  className='btn btn-default'
                  onClick={this.onShowCropTool.bind(this)}
                  style={{marginLeft: '10px'}}
                  type='button'>
                  <FontAwesome
                    name='crop' />
                </button>
              </OverlayTrigger>
            </div>
          </div>}
        {!imageFile &&
          <div>
            <label>Image</label>
            <div className='row'>
              <div className='col-xs-12'>
                <Uploader
                  multiple={this.multiple}
                  accept={this.accept}
                  onUpload={this.uploadImage.bind(this)} />
              </div>
            </div>
          </div>}
      </div>
    )

    return (
      <div id={id}>
        <div className='panel panel-default' style={{display: USER_ROLE === 'admin' ? 'none' : 'block'}}>
          <div className='panel-body'>
            <div className='row'>
              <div className='col-xs-7'>
                <div className='form-group' style={{paddingTop: 5}}>
                  <label>{name}</label>
                  <input
                    type='text'
                    className='form-control'
                    value={this.state.caption}
                    ref='caption'
                    placeholder='Caption'
                    onChange={this.onCaptionChange.bind(this)}
                    onBlur={this.update.bind(this)} />
                </div>
              </div>
              <div className='col-xs-5'>
                {imageTemplate}
              </div>
            </div>
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
                    placeholder='Image Name'
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
            <div className='row'>
              <form role='form'>
                <div className='col-xs-7'>
                  <fieldset className='input-group-vertical'>
                    <div className='form-group' style={{display: USER_ROLE !== 'admin' ? 'none' : 'block'}}>
                      <label className='sr-only'>Key</label>
                      <input
                        type='text'
                        className='form-control'
                        value={this.state.reference}
                        disabled={USER_ROLE !== 'admin'}
                        placeholder='Key'
                        ref='reference'
                        onChange={this.onReferenceChange.bind(this)}
                        onBlur={this.update.bind(this)} />
                    </div>
                    <div className='form-group'>
                      <label className='sr-only'>Caption</label>
                      <input
                        type='text'
                        className='form-control'
                        value={this.state.caption}
                        ref='caption'
                        placeholder='Caption'
                        onChange={this.onCaptionChange.bind(this)}
                        onBlur={this.update.bind(this)} />
                    </div>
                  </fieldset>
                </div>
                <div className='col-xs-5'>
                  {imageTemplate}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ImageMedia.propTypes = Object.assign({}, Media.propTypes, {
  caption: PropTypes.string,
  imageFile: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  onUploadImage: PropTypes.func.isRequired,
  onShowCropTool: PropTypes.func.isRequired
})
