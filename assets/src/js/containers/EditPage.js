'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import NotificationSystem from 'react-notification-system'
import Sticky from 'react-sticky'
import actions from '../actions'
import Header from '../components/Header'
import Groups from '../components/Groups'
import Sidebar from '../components/Sidebar'
import CreateGroupButton from '../components/CreateGroupButton'
import PageActionForm from '../components/PageActionForm'
import { USER_ROLE } from '../constants/User'

const {
  fetchPage,
  bumpVersion,
  updateHeader,
  createMedia,
  updateMedia,
  deleteMedia,
  uploadFileMedia,
  updateFileMedia,
  deleteFileMedia,
  sortGalleryMedia,
  createGroup,
  updateGroup,
  deleteGroup,
  sortMedia,
  sortGroup,
  statusChange
} = actions

class EditPage extends Component {
  constructor (props) {
    super(props)
    this._notificationSystem = null
  }

  componentDidMount () {
    const { dispatch, params } = this.props
    const { pageslug } = params
    this._notificationSystem = this.refs.notificationSystem
    dispatch(fetchPage(pageslug))
  }

  componentDidUpdate (oldprops) {
    const { dispatch, params } = this.props
    if (oldprops.params.pageslug !== params.pageslug) {
      dispatch(fetchPage(params.pageslug))
    }
  }

  onUpdateHeader (params) {
    const { id, dispatch } = this.props
    dispatch(updateHeader(this._notificationSystem, id, params))
  }

  onCreateMedia (type, groupId, order) {
    const { id, dispatch } = this.props
    dispatch(createMedia(this._notificationSystem, id, type, groupId, order))
  }

  onUpdateMedia (mediaId, params) {
    // id -> idPage
    const { dispatch, id } = this.props
    dispatch(updateMedia(this._notificationSystem, id, mediaId, params))
  }

  onDeleteMedia (mediaId) {
    const { id, dispatch } = this.props
    dispatch(deleteMedia(this._notificationSystem, id, mediaId))
  }

  onSortMedia (groupId, sortedIds) {
    const { id, dispatch } = this.props
    dispatch(sortMedia(this._notificationSystem, id, groupId, sortedIds))
  }

  onUploadFileMedia (mediaId, file) {
    // id -> idPage
    const { dispatch, id } = this.props
    dispatch(uploadFileMedia(this._notificationSystem, id, mediaId, file))
  }

  onUpdateFileMedia (mediaId, fileId, params) {
    const { dispatch, id } = this.props
    dispatch(updateFileMedia(this._notificationSystem, id, mediaId, fileId, params))
  }

  onDeleteFileMedia (mediaId, fileId) {
    const { dispatch, id } = this.props
    dispatch(deleteFileMedia(this._notificationSystem, id, mediaId, fileId))
  }

  onSortGalleryMedia (mediaId, sortedIds) {
    const { id, dispatch } = this.props
    dispatch(sortGalleryMedia(this._notificationSystem, id, mediaId, sortedIds))
  }

  onCreateGroup () {
    const { id, dispatch, groups } = this.props
    const order = groups ? groups.length : 0
    dispatch(createGroup(this._notificationSystem, id, order))
  }

  onUpdateGroup (groupId, params) {
    // id -> idPage
    const { dispatch, id } = this.props
    dispatch(updateGroup(this._notificationSystem, id, groupId, params))
  }

  onDeleteGroup (groupId) {
    const { id, dispatch } = this.props
    dispatch(deleteGroup(this._notificationSystem, id, groupId))
  }

  onSortGroup (sortedIds) {
    const { id, dispatch } = this.props
    dispatch(sortGroup(this._notificationSystem, id, sortedIds))
  }

  onBumpVersion () {
    const { id, dispatch } = this.props
    dispatch(bumpVersion(this._notificationSystem, id))
  }

  onStatusChange (status) {
    const { id, dispatch } = this.props
    dispatch(statusChange(this._notificationSystem, id, status))
  }

  render () {
    const {
      isFetchingPage, id, version, pageNotFound,
      name, description,
      slug, groups, published
    } = this.props
    return (
      <div>
        <Sidebar
          pageId={id}/>

        <div className='row list-content'>
          <NotificationSystem ref='notificationSystem' />

          <div className='col-sm-8 list-content__content'>

            {isFetchingPage &&
              <div className='row'>
                <div className='col-sm-12'>
                  <h2>Loading...</h2>
                </div>
              </div>
            }

            {!isFetchingPage && pageNotFound &&
              <div className='row'>
                <div className='col-sm-12'>
                  <h2>Page not found</h2>
                  <p>Use the list on the left to navigate to another page.</p>
                </div>
              </div>
            }

            {!isFetchingPage && !pageNotFound &&
              <Header
                id={id}
                name={name}
                description={description}
                title=''
                onUpdate={this.onUpdateHeader.bind(this)} />}

            {!isFetchingPage && !pageNotFound &&
              <h4>Fields</h4>}

            {!isFetchingPage && !pageNotFound &&
              <Groups
                groups={groups}
                onUpdateMedia={this.onUpdateMedia.bind(this)}
                onUpdateGroup={this.onUpdateGroup.bind(this)}
                onUploadFileMedia={this.onUploadFileMedia.bind(this)} // create
                onUpdateFileMedia={this.onUpdateFileMedia.bind(this)}
                onDeleteFileMedia={this.onDeleteFileMedia.bind(this)}
                onSortGalleryMedia={this.onSortGalleryMedia.bind(this)}
                onSortMedia={this.onSortMedia.bind(this)}
                onDeleteMedia={this.onDeleteMedia.bind(this)}
                onCreateMedia={this.onCreateMedia.bind(this)}
                onDeleteGroup={this.onDeleteGroup.bind(this)}
                onSortGroup={this.onSortGroup.bind(this)}/>}

            {!isFetchingPage && !pageNotFound &&
              <br /> }

            {(!isFetchingPage && !pageNotFound && USER_ROLE === 'admin') &&
              <CreateGroupButton
                onCreate={this.onCreateGroup.bind(this)} />}

          </div>

          <Sticky stickyClass='sticky' stickyStyle={{}} topOffset={-85}>
            <div className='col-sm-4'>
              {!isFetchingPage && !pageNotFound &&
                <PageActionForm
                  version={version}
                  slug={slug}
                  onBumpVersion={this.onBumpVersion.bind(this)}
                  published={published}
                  onStatusChange={this.onStatusChange.bind(this)} />}
            </div>
          </Sticky>
        </div>
      </div>
    )
  }
}

EditPage.propTypes = {
  isFetchingPage: PropTypes.bool.isRequired,
  pageNotFound: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  version: PropTypes.number.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
  medias: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  published: PropTypes.bool.isRequired
}

function mapStateToProps (state) {
  const { page } = state
  const {
    isFetchingPage, id, version, pageNotFound,
    name, description,
    medias, slug, groups, published
  } = page

  return {
    pageNotFound,
    isFetchingPage,
    id,
    version,
    name,
    description,
    slug,
    medias,
    groups,
    published
  }
}

export default connect(mapStateToProps)(EditPage)
