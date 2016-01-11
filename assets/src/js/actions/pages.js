'use strict'

import { Request } from '../middlewares/api'
import * as types from '../constants/ActionTypes'
import { PAGES_URL } from '../constants/URLs'
import { addNotification, removeNotification } from '../helpers'

// Actions
function requestPages () {
  return {
    type: types.REQUEST_PAGES
  }
}

function receivePages (json) {
  return {
    type: types.RECEIVE_PAGES,
    pages: json
  }
}

export function fetchPages () {
  return dispatch => {
    dispatch(requestPages())
    Request.get(PAGES_URL)
      .then(json => dispatch(receivePages(json)))
      .catch(err => console.error(err))
  }
}

function createPageRequest (name) {
  return { type: types.CREATE_PAGE_REQUEST, name }
}

function createPageSuccess (json) {
  return { type: types.CREATE_PAGE_SUCCESS, page: json }
}

function createPageFailure (error) {
  return { type: types.CREATE_PAGE_FAILURE, error }
}

export function createPage (NotificationSystem, name) {
  return dispatch => {
    const n = addNotification.call(NotificationSystem, 'Creating', 'info')
    dispatch(createPageRequest(name))
    Request.post(PAGES_URL, { name })
      .then(json => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Created', 'success', 3)
        dispatch(createPageSuccess(json))
      })
      .catch(err => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Error', 'error', 3)
        dispatch(createPageFailure(err))
      })
  }
}

function togglePublishRequest (id) {
  return { type: types.TOGGLE_PUBLISH_REQUEST, id }
}

function togglePublishSuccess (json) {
  return { type: types.TOGGLE_PUBLISH_SUCCESS, page: json }
}

function togglePublishFailure (error) {
  return { type: types.TOGGLE_PUBLISH_FAILURE, error }
}

export function togglePublish (NotificationSystem, id, published) {
  return dispatch => {
    const n = addNotification.call(NotificationSystem, published ? 'Publishing' : 'Unpublishing', 'info')
    dispatch(togglePublishRequest(id))
    Request.put(`${PAGES_URL}/${id}`, { published })
    .then(json => {
      removeNotification.call(NotificationSystem, n)
      addNotification.call(NotificationSystem, published ? 'Published' : 'Unpublished', 'success', 3)
      dispatch(togglePublishSuccess(json))
    })
    .catch(err => {
      removeNotification.call(NotificationSystem, n)
      addNotification.call(NotificationSystem, 'Error', 'error', 3)
      dispatch(togglePublishFailure(err))
    })
  }
}

function deletePageRequest (id, params) {
  return { type: types.DELETE_PAGE_REQUEST, id }
}

function deletePageSuccess (json) {
  return { type: types.DELETE_PAGE_SUCCESS, page: json }
}

function deletePageFailure (error) {
  return { type: types.DELETE_PAGE_FAILURE, error }
}

export function deletePage (NotificationSystem, id) {
  return dispatch => {
    const n = addNotification.call(NotificationSystem, 'Deleting', 'info')
    dispatch(deletePageRequest(id))
    Request.delete(`${PAGES_URL}/${id}`)
      .then(json => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Deleted', 'success', 3)
        dispatch(deletePageSuccess(json))
      })
      .catch(err => {
        removeNotification.call(NotificationSystem, n)
        addNotification.call(NotificationSystem, 'Error', 'error', 3)
        dispatch(deletePageFailure(err))
      })
  }
}
