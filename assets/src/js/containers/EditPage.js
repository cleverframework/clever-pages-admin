'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import Header from '../components/Header'
import Medias from '../components/Medias'
import CreateMediaForm from '../components/CreateMediaForm'
import PageActionForm from '../components/PageActionForm'

const {
  fetchPage,
  updateHeader,
  createMedia,
  updateMedia,
  deleteMedia,
  uploadFileMedia,
  updateFileMedia,
  deleteFileMedia,
  sortGalleryMedia
} = actions

class EditPage extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { dispatch, params } = this.props
    const { pageid } = params
    dispatch(fetchPage(pageid))
  }

  onUpdateHeader (params) {
    const { id, dispatch } = this.props
    dispatch(updateHeader(id, params))
  }

  onCreateMedia (type) {
    const { id, dispatch } = this.props
    dispatch(createMedia(id, type))
  }

  onUpdateMedia (mediaId, params) {
    // id -> idPage
    const { dispatch, id } = this.props
    dispatch(updateMedia(id, mediaId, params))
  }

  onDeleteMedia (mediaId) {
    const { id, dispatch } = this.props
    dispatch(deleteMedia(id, mediaId))
  }

  onUploadFileMedia (mediaId, file) {
    // id -> idPage
    const { dispatch, id } = this.props
    dispatch(uploadFileMedia(id, mediaId, file))
  }

  onUpdateFileMedia (mediaId, fileId, params) {
    const { dispatch, id } = this.props
    dispatch(updateFileMedia(id, mediaId, fileId, params))
  }

  onDeleteFileMedia (mediaId, fileId) {
    const { dispatch, id } = this.props
    dispatch(deleteFileMedia(id, mediaId, fileId))
  }

  onSortGalleryMedia (mediaId, sortedIds) {
    const { id, dispatch } = this.props
    dispatch(sortGalleryMedia(id, mediaId, sortedIds))
  }

  onVersionCreate () {
    // Do Stuff
  }

  render () {
    const {
      isFetchingPage, id, version,
      name, description,
      medias
    } = this.props

    return (
      <div className='row'>

        <div className="col-sm-8">

          {isFetchingPage &&
            <div className='row'>
              <div className='col-sm-12'>
                <h2>Loading...</h2>
              </div>
            </div>
          }

          {!isFetchingPage &&
            <Header
              id={id}
              name={name}
              description={description}
              onUpdate={this.onUpdateHeader.bind(this)} />}

          {!isFetchingPage &&
            <Medias
              medias={medias}
              onUpdate={this.onUpdateMedia.bind(this)}
              onUploadFileMedia={this.onUploadFileMedia.bind(this)} // create
              onUpdateFileMedia={this.onUpdateFileMedia.bind(this)}
              onDeleteFileMedia={this.onDeleteFileMedia.bind(this)}
              onSortGalleryMedia={this.onSortGalleryMedia.bind(this)}
              onDelete={this.onDeleteMedia.bind(this)} />}

          {!isFetchingPage &&
            <br /> }

          {!isFetchingPage &&
            <CreateMediaForm
              onCreate={this.onCreateMedia.bind(this)} />}
        </div>

        <div className='col-sm-4'>
          {!isFetchingPage &&
            <PageActionForm
              version={version}
              onVersionCreate={this.onVersionCreate.bind(this)} />}
        </div>
      </div>
    )
  }
}

EditPage.propTypes = {
  isFetchingPage: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  version: PropTypes.number.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  medias: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  const { page } = state
  const {
    isFetchingPage, id, version,
    name, description,
    medias
  } = page

  return {
    isFetchingPage,
    id,
    version,
    name,
    description,
    medias
  }
}

export default connect(mapStateToProps)(EditPage)
