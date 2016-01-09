'use strict'

import React, { PropTypes, Component } from 'react'
import * as MediaTypes from '../constants/MediaTypes'
import TextMedia from './TextMedia'
import ImageMedia from './ImageMedia'
import GalleryMedia from './GalleryMedia'
import ButtonMedia from './ButtonMedia'

import { Modal, Button } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/lib/ModalHeader'
import ModalBody from 'react-bootstrap/lib/ModalBody'
import ModalFooter from 'react-bootstrap/lib/ModalFooter'
import ModalTitle from 'react-bootstrap/lib/ModalTitle'
import Cropper from 'react-cropper'

export default class Medias extends Component {

  constructor (props) {
    super(props)
    this.state = {
      cropperMediaId: null,
      cropperImageId: null,
      cropperTitle: 'Cropper',
      cropperShow: false,
      cropperSrc: 'http://fengyuanchen.github.io/cropper/img/picture.jpg',
      cropperAspectRatio: window.cropperAspectRatio || 16/9,
      cropperGuides: true,
      cropperZoomable: false
    }
  }

  onCrop () {
    const { onUpdateFileMedia } = this.props
    const cropper = this.refs.cropper
    const params = { metadata: JSON.stringify(cropper.getCropBoxData()) }
    onUpdateFileMedia(this.state.cropperMediaId, this.state.cropperImageId, params)
    this.hideCropperTool()
  }

  dumbCrop () {
    // console.log(this.refs.cropper.getCroppedCanvas().toDataURL())
  }

  showCropperTool (mediaId, imageId, imageSrc, imageCaption, imageMetadata) {
    const currentState = this.state
    currentState.cropperMediaId = mediaId
    currentState.cropperImageId = imageId
    currentState.cropperSrc = `/files/${imageSrc}`
    currentState.cropperCaption = imageCaption
    currentState.cropperShow = true
    this.setState(currentState)

    // Need a setTimeout otherwise this.refs.cropper === undefinied
    setTimeout(() => {
      const cropper = this.refs.cropper
      if (imageMetadata) cropper.setCropBoxData(JSON.parse(imageMetadata))
    }, 100)
  }

  hideCropperTool () {
    const currentState = this.state
    currentState.cropperShow = false
    this.setState(currentState)
  }

  renderCropper () {
    return (
      <Modal
        show={this.state.cropperShow}
        onHide={this.hideCropperTool.bind(this)}
        container={this}
        aria-labelledby='contained-modal-title'>

        <ModalHeader closeButton>
          <ModalTitle id='contained-modal-title'>Cropper [{this.state.cropperCaption}]</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <Cropper
            ref='cropper'
            src={this.state.cropperSrc}
            style={{height: 400, width: '100%'}}
            // Cropper.js options
            aspectRatio={this.state.cropperAspectRatio}
            guides={this.state.cropperGuides}
            rotatable={false}
            scalable={false}
            zoomable={this.state.cropperZoomable}
            // zoomOnTouch={this.state.cropperZoomable}
            // zoomOnWheel={this.state.cropperZoomable}
            // wheelZoomRatio={this.state.cropperZoomable}
            crop={this.dumbCrop.bind(this)} />
        </ModalBody>

        <ModalFooter>
          <Button onClick={this.onCrop.bind(this)} className='btn-success'>Crop</Button>
          <Button onClick={this.hideCropperTool.bind(this)}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }

  render () {
    const {
      onDelete, onUpdate,
      onUploadFileMedia, onUpdateFileMedia,
      onDeleteFileMedia, onSortGalleryMedia
    } = this.props

    const counter = {
      text: 0,
      image: 0,
      gallery: 0,
      button: 0
    }

    const medias = this.props.medias.map((media, i) => {
      switch (media.type) {
        case MediaTypes.TEXT:
          counter.text++
          return (
            <TextMedia key={i}
              id={media.id}
              vid={counter.text}
              reference={media.reference}
              name={media.name}
              content={media.content}
              onUpdate={onUpdate}
              onDelete={onDelete} />
          )
        case MediaTypes.IMAGE:
          counter.image++
          return (
            <ImageMedia key={i}
              id={media.id}
              vid={counter.image}
              reference={media.reference}
              caption={media.caption}
              imageFile={media.imageFile}
              onShowCropTool={this.showCropperTool.bind(this)}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onUploadImage={onUploadFileMedia} />
          )
        case MediaTypes.GALLERY:
          counter.gallery++
          return (
            <GalleryMedia key={i}
              id={media.id}
              vid={counter.gallery}
              reference={media.reference}
              name={media.name}
              imageFiles={media.imageFiles}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onShowCropTool={this.showCropperTool.bind(this)}
              onUploadImage={onUploadFileMedia}
              onUpdateImage={onUpdateFileMedia}
              onDeleteImage={onDeleteFileMedia}
              onSort={onSortGalleryMedia} />
          )
        case MediaTypes.BUTTON:
          counter.button++
          return (
            <ButtonMedia key={i}
              id={media.id}
              vid={counter.button}
              reference={media.reference}
              name={media.name}
              link={media.link}
              file={media.buttonFile}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onUploadFile={onUploadFileMedia} />
          )
        default:
          // BOOM! WDF :)
      }
    })

    return (
      <div className='row'>
        {this.renderCropper()}
        {medias}
      </div>
    )
  }
}

Medias.propTypes = {
  medias: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUploadFileMedia: PropTypes.func.isRequired,
  onUpdateFileMedia: PropTypes.func.isRequired,
  onDeleteFileMedia: PropTypes.func.isRequired,
  onSortGalleryMedia: PropTypes.func.isRequired
}
