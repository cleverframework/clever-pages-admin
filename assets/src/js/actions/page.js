'use strict'

import { Request } from '../middlewares/api'
import * as types from '../constants/ActionTypes'
import { PAGES_URL, QUERY_LANG } from '../constants/URLs'
import { addNotification, removeNotification } from '../helpers'

function fetchPageRequest (id) {
  return { type: types.FETCH_PAGE_REQUEST, id }
}

function fetchPageSuccess (json) {
  return { type: types.FETCH_PAGE_SUCCESS, page: json }
}

function fetchPageFailure (error) {
  return { type: types.FETCH_PAGE_FAILURE, error }
}

export function fetchPage (id) {
  return dispatch => {
    dispatch(fetchPageRequest(id))
    Request.get(`${PAGES_URL}/${id}?lang=${QUERY_LANG}`)
      .then(json => dispatch(fetchPageSuccess(json)))
      .catch(err => fetchPageFailure(err))
  }
}

function updateHeaderRequest (id) {
  return { type: types.UPDATE_HEADER_REQUEST, id }
}

function updateHeaderSuccess (json) {
  return { type: types.UPDATE_HEADER_SUCCESS, page: json }
}

function updateHeaderFailure (error) {
  return { type: types.UPDATE_HEADER_FAILURE, error }
}

export function updateHeader (NotificationSystem, id, headerParams) {
  return dispatch => {
    const n = addNotification.call(NotificationSystem, 'Updating', 'info')
    dispatch(updateHeaderRequest(id))
    Request.put(`${PAGES_URL}/${id}?lang=${QUERY_LANG}`, headerParams)
      .then(json => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Updated', 'success', 3)
        dispatch(updateHeaderSuccess(json))
      })
      .catch(err => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Error', 'error', 3)
        dispatch(updateHeaderFailure(err))
      })
  }
}

/*
 * EDIT PAGE (MEDIAS)
 */

function createMediaRequest () {
  return { type: types.CREATE_MEDIA_REQUEST }
}

function createMediaSuccess (json) {
  return { type: types.CREATE_MEDIA_SUCCESS, media: json }
}

function createMediaFailure (error) {
  return { type: types.CREATE_MEDIA_FAILURE, error }
}

export function createMedia (pageId, type) {
  return dispatch => {
    const n = addNotification.call(NotificationSystem, 'Creating', 'info')
    dispatch(createMediaRequest())
    Request.post(`${PAGES_URL}/${pageId}/medias`, { type })
      .then(json => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Created', 'success', 3)
        dispatch(createMediaSuccess(json))
      })
      .catch(err => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Error', 'error', 3)
        dispatch(createMediaFailure(err))
      })
  }
}

function updateMediaRequest (mediaId) {
  return { type: types.UPDATE_MEDIA_REQUEST, mediaId }
}

function updateMediaSuccess (json) {
  return { type: types.UPDATE_MEDIA_SUCCESS, media: json }
}

function updateMediaFailure (error) {
  return { type: types.UPDATE_MEDIA_FAILURE, error }
}

// TODO: need to implement related reducer code
export function updateMedia (pageId, mediaId, params) {
  return dispatch => {
    const n = addNotification.call(NotificationSystem, 'Updating', 'info')
    dispatch(updateMediaRequest(mediaId))
    Request.put(`${PAGES_URL}/${pageId}/medias/${mediaId}`, params)
      .then(json => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Updated', 'success', 3)
        dispatch(updateMediaSuccess(json))
      })
      .catch(err => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Error', 'error', 3)
        dispatch(updateMediaFailure(err))
      })
  }
}

function deleteMediaRequest (mediaId) {
  return { type: types.DELETE_MEDIA_REQUEST, mediaId }
}

function deleteMediaSuccess (json) {
  return { type: types.DELETE_MEDIA_SUCCESS, media: json }
}

function deleteMediaFailure (error) {
  return { type: types.DELETE_MEDIA_FAILURE, error }
}

export function deleteMedia (pageId, mediaId) {
  return dispatch => {
    const n = addNotification.call(NotificationSystem, 'Deleting', 'info')
    dispatch(deleteMediaRequest(mediaId))
    Request.delete(`${PAGES_URL}/${pageId}/medias/${mediaId}`)
      .then(json => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Uploaded', 'success', 3)
        dispatch(deleteMediaSuccess(json))
      })
      .catch(err => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Error', 'error', 3)
        dispatch(deleteMediaFailure(err))
      })
  }
}

function uploadFileMediaRequest (mediaId) {
  return { type: types.UPLOAD_FILE_MEDIA_REQUEST, mediaId }
}

function uploadFileMediaSuccess (json) {
  return { type: types.UPLOAD_FILE_MEDIA_SUCCESS, media: json }
}

function uploadFileMediaFailure (error) {
  return { type: types.UPLOAD_FILE_MEDIA_FAILURE, error }
}

export function uploadFileMedia (NotificationSystem, pageId, mediaId, file) {
  return dispatch => {
    const n = addNotification.call(NotificationSystem, 'Uploading', 'info')
    dispatch(uploadFileMediaRequest(mediaId))
    const data = new window.FormData()
    data.append('file', file)
    Request.upload(`${PAGES_URL}/${pageId}/medias/${mediaId}/files`, null, data)
      .then(json => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Uploaded', 'success', 3)
        dispatch(uploadFileMediaSuccess(json))
      })
      .catch(err => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Error', 'error', 3)
        dispatch(uploadFileMediaFailure(err))
      })
  }
}

function updateFileMediaRequest (mediaId, fileId) {
  return { type: types.UPDATE_FILE_MEDIA_REQUEST, mediaId, fileId }
}

function updateFileMediaSucess (json) {
  return { type: types.UPDATE_FILE_MEDIA_SUCCESS, media: json }
}

function updateFileMediaFailure (error) {
  return { type: types.UPDATE_FILE_MEDIA_FAILURE, error }
}

export function updateFileMedia (NotificationSystem, pageId, mediaId, fileId, params) {
  return dispatch => {
    const n = addNotification.call(NotificationSystem, 'Updating', 'info')
    dispatch(updateFileMediaRequest(mediaId, fileId))
    Request.put(`${PAGES_URL}/${pageId}/medias/${mediaId}/files/${fileId}`, params)
      .then(json => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Updated', 'success', 3)
        dispatch(updateFileMediaSucess(json))
      })
      .catch(err => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Error', 'error', 3)
        dispatch(updateFileMediaFailure(err))
      })
  }
}

function deleteFileMediaRequest (mediaId, fileId) {
  return { type: types.DELETE_FILE_MEDIA_REQUEST, mediaId, fileId }
}

function deleteFileMediaSuccess (json) {
  return { type: types.DELETE_FILE_MEDIA_SUCCESS, media: json }
}

function deleteFileMediaFailure (error) {
  return { type: types.DELETE_FILE_MEDIA_FAILURE, error }
}

export function deleteFileMedia (NotificationSystem, pageId, mediaId, fileId, params) {
  return dispatch => {
    const n = addNotification.call(NotificationSystem, 'Deleting', 'info')
    dispatch(deleteFileMediaRequest(mediaId, fileId))
    Request.delete(`${PAGES_URL}/${pageId}/medias/${mediaId}/files/${fileId}`, params)
      .then(json => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Deleted', 'success', 3)
        dispatch(deleteFileMediaSuccess(json))
      })
      .catch(err => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Error', 'error', 3)
        dispatch(deleteFileMediaFailure(err))
      })
  }
}

function sortGalleryMediaRequest (mediaId) {
  return { type: types.SORT_GALLERY_MEDIA_REQUEST, mediaId }
}

function sortGalleryMediaSuccess (json) {
  return { type: types.SORT_GALLERY_MEDIA_SUCCESS, media: json }
}

function sortGalleryMediaFailure (error) {
  return { type: types.SORT_GALLERY_MEDIA_FAILURE, error }
}

export function sortGalleryMedia (NotificationSystem, pageId, mediaId, sortedIds) {
  return dispatch => {
    const n = addNotification.call(NotificationSystem, 'Sorting', 'info')
    dispatch(sortGalleryMediaRequest(mediaId))
    Request.put(`${PAGES_URL}/${pageId}/medias/${mediaId}/files/sort`, { sortedIds })
      .then(json => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Sorted', 'success', 3)
        dispatch(sortGalleryMediaSuccess(json))
      })
      .catch(err => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Error', 'error', 3)
        dispatch(sortGalleryMediaFailure(err))
      })
  }
}

function bumpVersionRequest (pageId) {
  return { type: types.BUMP_VERSION_REQUEST, pageId }
}

function bumpVersionSuccess (json) {
  return { type: types.BUMP_VERSION_SUCCESS, page: json }
}

function bumpVersionFailure (error) {
  return { type: types.BUMP_VERSION_FAILURE, error }
}

export function bumpVersion (NotificationSystem, pageId) {
  return dispatch => {
    const n = addNotification.call(NotificationSystem, 'Saving', 'info')
    dispatch(bumpVersionRequest(pageId))
    Request.post(`${PAGES_URL}/${pageId}/bump-version`)
      .then(json => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Saved', 'success', 3)
        dispatch(bumpVersionSuccess(json))
      })
      .catch(err => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Error', 'error', 3)
        dispatch(bumpVersionFailure(err))
      })
  }
}
