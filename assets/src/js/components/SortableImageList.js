'use strict'

import React, { Component, PropTypes } from 'react'
import $ from 'jquery'
import bubblesort from 'bubble-sort-js'
import SortableImage from './SortableImage'
import { Modal, Button } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/lib/ModalHeader'
import ModalBody from 'react-bootstrap/lib/ModalBody'
import ModalFooter from 'react-bootstrap/lib/ModalFooter'
import ModalTitle from 'react-bootstrap/lib/ModalTitle'
import Cropper from 'react-cropper'

require('jquery-ui')

export default class SortableImageList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showCropper: false
    }
  }

  componentWillMount () {
    // this.state = this.props
  }

  crop () {
    // image in dataUrl
    // console.log(this.refs.cropper.getCroppedCanvas().toDataURL())
  }

  showCropperTool () {
    console.log('copping .... ')
    this.setState({ showCropper: true})
  }

  hideCropperTool () {
    this.setState({ showCropper: false})
  }

  renderCropper () {
    return (
      <Modal
        show={this.state.showCropper}
        onHide={this.hideCropperTool.bind(this)}
        container={this}
        aria-labelledby="contained-modal-title">

        <ModalHeader closeButton>
          <ModalTitle id="contained-modal-title">Contained Modal</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <Cropper
            ref='cropper'
            src='http://fengyuanchen.github.io/cropper/img/picture.jpg'
            style={{height: 400, width: '100%'}}
            // Cropper.js options
            aspectRatio={16 / 9}
            guides={true}
            crop={this.crop} />
        </ModalBody>

        <ModalFooter>
          <Button className='btn-success'>Crop</Button>
          <Button onClick={this.hideCropperTool.bind(this)}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }

  componentDidMount () {
    const sortableList = $(`#${this.props.mediaId}`).sortable({
      placeholder: 'ui-state-highlight',
      stop: (e, ui) => {
        const sortedIds = sortableList.sortable('toArray')
        this.props.onSort(this.props.mediaId, sortedIds)
      }})
    $('.sortable').disableSelection()
  }

  render () {
    const {
      images,
      onUpdateImage, onDeleteImage
    } = this.props

    bubblesort(images, (a, b) => a.order - b.order)

    const list = images.map((image, i) => {
      return (
        <SortableImage
          key={i}
          id={image.id}
          caption={image.caption}
          filename={image.filename}
          onShowCropTool={this.showCropperTool.bind(this)}
          onUpdate={onUpdateImage}
          onDelete={onDeleteImage} />
      )
    })

    return (
      <div>
        {this.renderCropper()}
        <ul id={this.props.mediaId} className={'sortable'}>{list}</ul>
      </div>
    )
  }
}

SortableImageList.propTypes = {
  mediaId: PropTypes.number.isRequired,
  images: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  onUpdateImage: PropTypes.func.isRequired,
  onDeleteImage: PropTypes.func.isRequired
}
