'use strict'

import React, { PropTypes, Component } from 'react'
import bubblesort from 'bubble-sort-js'
import * as MediaTypes from '../constants/MediaTypes'
import TextMedia from './TextMedia'
import ImageMedia from './ImageMedia'
import GalleryMedia from './GalleryMedia'
import ButtonMedia from './ButtonMedia'
import MapMedia from './MapMedia'

import { Modal, Button, Tabs, Tab } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/lib/ModalHeader'
import ModalBody from 'react-bootstrap/lib/ModalBody'
import ModalFooter from 'react-bootstrap/lib/ModalFooter'
import ModalTitle from 'react-bootstrap/lib/ModalTitle'
import Cropper from 'react-cropper'

import { USER_ROLE } from '../constants/User'

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
    currentState.cropperSrc = `${STORAGE_PUBLIC_URL}/${imageSrc}`
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

  componentDidMount () {
    if (USER_ROLE !== 'admin') return
    const sortableList = $(this.refs.medias).sortable({
      placeholder: 'ui-state-highlight',
      handle: '.panel-drag',
      stop: (e, ui) => {
        const sortedIds = sortableList.sortable('toArray')
        this.props.onSortMedia(this.props.groupId, sortedIds)
      }})
    // $(this.refs.medias).disableSelection()
  }

  render () {
    const {
      onDelete, onUpdate,
      onUploadFileMedia, onUpdateFileMedia,
      onDeleteFileMedia, onSortGalleryMedia, onSortMedia
    } = this.props

    const counter = {
      text: 0,
      image: 0,
      gallery: 0,
      button: 0,
      map: 0
    }

    let medias = []
    let mediaMaps = []

    if (typeof this.props.medias !== 'undefined') {
      bubblesort(this.props.medias, (a, b) => a.order - b.order)
      medias = this.props.medias.filter(media => {
        return media.type !== MediaTypes.MAP
      }).map((media, i) => {
        const key = i + '' + media.id
        switch (media.type) {
          case MediaTypes.TEXT:
            counter.text++
            return (
              <TextMedia key={key}
                id={media.id}
                vid={counter.text}
                reference={media.reference}
                name={media.name}
                char_limit={media.char_limit}
                content={media.content}
                onUpdate={onUpdate}
                onDelete={onDelete} />
            )
          case MediaTypes.IMAGE:
            counter.image++
            return (
              <ImageMedia key={key}
                id={media.id}
                vid={counter.image}
                reference={media.reference}
                caption={media.caption}
                name={media.name}
                imageFile={media.imageFile}
                onShowCropTool={this.showCropperTool.bind(this)}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onUploadImage={onUploadFileMedia} />
            )
          case MediaTypes.GALLERY:
            counter.gallery++
            return (
              <GalleryMedia key={key}
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
              <ButtonMedia key={key}
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
      mediaMaps = this.props.medias.filter(media => {
        return media.type === MediaTypes.MAP
      }).map((media, i) => {
        const key = i + '' + media.id
        const keyTab = i + '' + media.id + '_tab'
        counter.map++
        return (
          <Tab key={keyTab} eventKey={i} title={media.name === '' ? `Country ${counter.map}` : media.name}>
            <br />
            <MapMedia key={key}
              id={media.id}
              vid={counter.map}
              reference={media.reference}
              name={media.name}
              char_limit={media.char_limit}
              map_01={media.map_01}
              map_02={media.map_02}
              map_03={media.map_03}
              map_04={media.map_04}
              map_05={media.map_05}
              map_06={media.map_06}
              map_07={media.map_07}
              map_08={media.map_08}
              map_09={media.map_09}
              map_10={media.map_10}
              onUpdate={onUpdate}
              onDelete={onDelete} />
          </Tab>
        )
      })
    }

    return (
      <div>
        {this.renderCropper()}
        <div className='medias' ref='medias'>
          {mediaMaps.length > 0 &&
            <Tabs defaultActiveKey={0}>
              {mediaMaps}
            </Tabs>}
          {medias}
        </div>
      </div>
    )
  }
}

Medias.propTypes = {
  // medias: PropTypes.array.isRequired,
  groupId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUploadFileMedia: PropTypes.func.isRequired,
  onUpdateFileMedia: PropTypes.func.isRequired,
  onDeleteFileMedia: PropTypes.func.isRequired,
  onSortGalleryMedia: PropTypes.func.isRequired,
  onSortMedia: PropTypes.func.isRequired
}
