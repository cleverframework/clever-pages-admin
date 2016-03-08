'use strict'

import React, { PropTypes, Component } from 'react'
import bubblesort from 'bubble-sort-js'
import { USER_ROLE } from '../constants/User'
import Group from '../components/Group'

export default class Groups extends Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    if (USER_ROLE !== 'admin') return
    const sortableList = $(this.refs.groups).sortable({
      placeholder: 'ui-state-highlight',
      items: '.drag-enabled',
      handle: '.panel-drag',
      stop: (e, ui) => {
        const sortedIds = sortableList.sortable('toArray')
        this.props.onSortGroup(sortedIds)
      }})
    // $(this.refs.groups).disableSelection()
  }

  render () {
    const {
      onDeleteMedia, onUpdateMedia,
      onUploadFileMedia, onUpdateFileMedia,
      onDeleteFileMedia, onSortGalleryMedia, onCreateMedia,
      onUpdateGroup, onDeleteGroup, onSortMedia
    } = this.props

    bubblesort(this.props.groups, (a, b) => a.order - b.order)

    const groups = this.props.groups.map((group, i) => {
      return (
        <Group key={group.id}
          id={group.id}
          index={i}
          name={group.name}
          medias={group.medias}
          onUpdateMedia={onUpdateMedia.bind(this)}
          onCreateMedia={onCreateMedia.bind(this)}
          onUpdateGroup={onUpdateGroup.bind(this)}
          onUploadFileMedia={onUploadFileMedia.bind(this)} // create
          onUpdateFileMedia={onUpdateFileMedia.bind(this)}
          onDeleteFileMedia={onDeleteFileMedia.bind(this)}
          onSortGalleryMedia={onSortGalleryMedia.bind(this)}
          onDeleteMedia={onDeleteMedia.bind(this)}
          onSortMedia={onSortMedia.bind(this)}
          onDeleteGroup={onDeleteGroup.bind(this)} />
      )
    })

    return (
      <div ref='groups'>
        {groups}
      </div>
    )
  }
}

Groups.propTypes = {
  groups: PropTypes.array.isRequired,
  onUpdateMedia: PropTypes.func.isRequired,
  onUpdateGroup: PropTypes.func.isRequired,
  onDeleteMedia: PropTypes.func.isRequired,
  onUploadFileMedia: PropTypes.func.isRequired,
  onUpdateFileMedia: PropTypes.func.isRequired,
  onDeleteFileMedia: PropTypes.func.isRequired,
  onSortGalleryMedia: PropTypes.func.isRequired,
  onCreateMedia: PropTypes.func.isRequired,
  onDeleteGroup: PropTypes.func.isRequired,
  onSortMedia: PropTypes.func.isRequired,
  onSortGroup: PropTypes.func.isRequired
}
