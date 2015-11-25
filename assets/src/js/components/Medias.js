import React, { PropTypes, Component } from 'react'
import * as MediaTypes from '../constants/MediaTypes'
import TextMedia from './TextMedia'
import ImageMedia from './ImageMedia'
import GalleryMedia from './GalleryMedia'

export default class Medias extends Component {

  constructor (props) {
    super(props)
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
              onUploadImage={onUploadFileMedia}
              onUpdateImage={onUpdateFileMedia}
              onDeleteImage={onDeleteFileMedia}
              onSort={onSortGalleryMedia} />
          )
        default:
          // BOOM! WDF :)
      }
    })

    return (
      <div className='row'>
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
