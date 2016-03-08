'use strict'

import React, { Component, PropTypes } from 'react'
import $ from 'jquery'
import bubblesort from 'bubble-sort-js'
import SortableImage from './SortableImage'
import 'jquery-ui'

export default class SortableImageList extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    // this.state = this.props
  }

  componentDidMount () {
    const sortableList = $(this.refs.images).sortable({
      placeholder: 'ui-state-highlight',
      stop: (e, ui) => {
        const sortedIds = sortableList.sortable('toArray')
        this.props.onSort(this.props.mediaId, sortedIds)
      }})
    // $(`#${this.props.mediaId}`).disableSelection()
  }

  render () {
    const {
      images, onShowCropTool,
      onUpdateImage, onDeleteImage
    } = this.props

    bubblesort(images, (a, b) => a.order - b.order)
    const list = images.map((image, i) => {
      const key = i + '' + image.id
      return (
        <SortableImage
          key={key}
          id={image.id}
          caption={image.caption}
          filename={image.filename}
          metadata={image.metadata}
          onShowCropTool={onShowCropTool}
          onUpdate={onUpdateImage}
          onDelete={onDeleteImage} />
      )
    })

    return <ul ref='images' className={'sortable'}>{list}</ul>
  }
}

SortableImageList.propTypes = {
  mediaId: PropTypes.number.isRequired,
  images: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  onUpdateImage: PropTypes.func.isRequired,
  onDeleteImage: PropTypes.func.isRequired,
  onShowCropTool: PropTypes.func.isRequired
}
