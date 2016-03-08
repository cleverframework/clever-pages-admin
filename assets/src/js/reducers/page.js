'use strict'

import * as types from '../constants/ActionTypes'

function findIndex (list, id) {
  let i = 0
  // TODO: most efficient search algo in production or use hashmap for exampe
  for (; i < list.length; i++) {
    if (list[i].id === id) break
  }
  return i
}

function page (state = {
  id: -1,
  version: 0.1,
  name: '',
  description: '',
  slug: '',
  medias: [],
  groups: [],
  isFetchingPage: false,
  isCreatingMedia: false,
  isUpdatingMedia: false, // missing reducer code
  isDeletingMedia: false,
  isUploadingFileMedia: false,
  isUpdatingFileMedia: false,
  isDeletingFileMedia: false,
  isSortingGalleryMedia: false,
  isToggling: false,
  pageNotFound: false,
  published: false
}, action) {
  let index = null
  let groupIndex = null
  let group = null
  let mediasInGroup = null
  let indexInGroup = null

  switch (action.type) {
    case types.FETCH_PAGE_REQUEST:
      return Object.assign({}, state, {
        isFetchingPage: true
      })
    case types.FETCH_PAGE_FAILURE:
      return Object.assign({}, state, {
        isFetchingPage: false,
        pageNotFound: true
      })
    case types.FETCH_PAGE_SUCCESS:
      return Object.assign({}, state, {
        isFetchingPage: false,
        pageNotFound: false,
        id: action.page.id,
        name: action.page.name,
        version: action.page.version,
        description: action.page.description,
        slug: action.page.slug,
        medias: action.page.medias,
        groups: action.page.groups,
        published: action.page.published
      })

    case types.CREATE_MEDIA_REQUEST:
      return Object.assign({}, state, {
        isCreatingMedia: true
      })
    case types.CREATE_MEDIA_FAILURE:
      // SHOULD SHOW AN ERROR VIA AN ERROR COMPONENT
      return Object.assign({}, state, {
        isCreatingMedia: false
      })
    case types.CREATE_MEDIA_SUCCESS:
      index = findIndex(state.medias, action.media.id)
      groupIndex = findIndex(state.groups, action.media.group_id)
      mediasInGroup = state.groups[groupIndex].medias || []
      group = Object.assign({}, state.groups[groupIndex], {
        medias: [
          ...mediasInGroup,
          Object.assign({}, action.media, {order: mediasInGroup.length + 1})
        ]
      })
      return Object.assign({}, state, {
        isCreatingMedia: false,
        groups: [
          ...state.groups.slice(0, groupIndex),
          group,
          ...state.groups.slice(groupIndex + 1)
        ]
      })

    // here it should go UPDATE_MEDIA_REQUEST

    case types.DELETE_MEDIA_REQUEST:
      return Object.assign({}, state, {
        isDeletingMedia: true
      })
    case types.DELETE_MEDIA_FAILURE:
      // SHOULD SHOW AN ERROR VIA AN ERROR COMPONENT
      return Object.assign({}, state, {
        isDeletingMedia: false
      })
    case types.DELETE_MEDIA_SUCCESS:
      index = findIndex(state.medias, action.media.id)
      groupIndex = findIndex(state.groups, action.media.group_id)
      mediasInGroup = state.groups[groupIndex].medias
      indexInGroup = findIndex(mediasInGroup, action.media.id)
      group = Object.assign({}, state.groups[groupIndex], {
        medias: [
          ...mediasInGroup.slice(0, indexInGroup),
          ...mediasInGroup.slice(indexInGroup + 1)
        ]
      })
      return Object.assign({}, state, {
        isDeletingMedia: false,
        groups: [
          ...state.groups.slice(0, groupIndex),
          group,
          ...state.groups.slice(groupIndex + 1)
        ]
      })

    case types.SORT_MEDIA_REQUEST:
      return Object.assign({}, state, {
        isSortingMedia: true
      })
    case types.SORT_MEDIA_FAILURE:
      // SHOULD SHOW AN ERROR VIA AN ERROR COMPONENT
      return Object.assign({}, state, {
        isSortingMedia: false
      })
    case types.SORT_MEDIA_SUCCESS:
      groupIndex = findIndex(state.groups, action.group.id)
      return Object.assign({}, state, {
        isSortingMedia: false,
        groups: [
          ...state.groups.slice(0, groupIndex),
          action.group,
          ...state.groups.slice(groupIndex + 1)
        ]
      })

    case types.UPLOAD_FILE_MEDIA_REQUEST:
      return Object.assign({}, state, {
        isUploadingFileMedia: true
      })
    case types.UPLOAD_FILE_MEDIA_FAILURE:
      // SHOULD SHOW AN ERROR VIA AN ERROR COMPONENT
      return Object.assign({}, state, {
        isUploadingFileMedia: false
      })
    case types.UPLOAD_FILE_MEDIA_SUCCESS:
      groupIndex = findIndex(state.groups, action.media.group_id)
      mediasInGroup = state.groups[groupIndex].medias || []
      index = findIndex(mediasInGroup, action.media.id)
      group = Object.assign({}, state.groups[groupIndex], {
        medias: [
          ...mediasInGroup.slice(0, index),
          Object.assign({}, action.media),
          ...mediasInGroup.slice(index + 1)
        ]
      })
      return Object.assign({}, state, {
        isUploadingFileMedia: false,
        groups: [
          ...state.groups.slice(0, groupIndex),
          group,
          ...state.groups.slice(groupIndex + 1)
        ]
      })

    case types.UPDATE_FILE_MEDIA_REQUEST:
      return Object.assign({}, state, {
        isUpdatingFileMedia: true
      })
    case types.UPDATE_FILE_MEDIA_FAILURE:
      // SHOULD SHOW AN ERROR VIA AN ERROR COMPONENT
      return Object.assign({}, state, {
        isUpdatingFileMedia: false
      })
    case types.UPDATE_FILE_MEDIA_SUCCESS:
      groupIndex = findIndex(state.groups, action.media.group_id)
      mediasInGroup = state.groups[groupIndex].medias || []
      index = findIndex(mediasInGroup, action.media.id)
      group = Object.assign({}, state.groups[groupIndex], {
        medias: [
          ...mediasInGroup.slice(0, index),
          Object.assign({}, action.media),
          ...mediasInGroup.slice(index + 1)
        ]
      })
      return Object.assign({}, state, {
        isUploadingFileMedia: false,
        groups: [
          ...state.groups.slice(0, groupIndex),
          group,
          ...state.groups.slice(groupIndex + 1)
        ]
      })

    case types.DELETE_FILE_MEDIA_REQUEST:
      return Object.assign({}, state, {
        isDeletingFileMedia: true
      })
    case types.DELETE_FILE_MEDIA_FAILURE:
      // SHOULD SHOW AN ERROR VIA AN ERROR COMPONENT
      return Object.assign({}, state, {
        isDeletingFileMedia: false
      })
    case types.DELETE_FILE_MEDIA_SUCCESS:
      groupIndex = findIndex(state.groups, action.media.group_id)
      mediasInGroup = state.groups[groupIndex].medias || []
      index = findIndex(mediasInGroup, action.media.id)
      group = Object.assign({}, state.groups[groupIndex], {
        medias: [
          ...mediasInGroup.slice(0, index),
          Object.assign({}, action.media),
          ...mediasInGroup.slice(index + 1)
        ]
      })
      return Object.assign({}, state, {
        isUploadingFileMedia: false,
        groups: [
          ...state.groups.slice(0, groupIndex),
          group,
          ...state.groups.slice(groupIndex + 1)
        ]
      })

    case types.SORT_GALLERY_MEDIA_REQUEST:
      return Object.assign({}, state, {
        isSortingGalleryMedia: true
      })
    case types.SORT_GALLERY_MEDIA_FAILURE:
      // SHOULD SHOW AN ERROR VIA AN ERROR COMPONENT
      return Object.assign({}, state, {
        isSortingGalleryMedia: false
      })
    case types.SORT_GALLERY_MEDIA_SUCCESS:
      groupIndex = findIndex(state.groups, action.media.group_id)
      mediasInGroup = state.groups[groupIndex].medias || []
      index = findIndex(mediasInGroup, action.media.id)
      group = Object.assign({}, state.groups[groupIndex], {
        medias: [
          ...mediasInGroup.slice(0, index),
          Object.assign({}, action.media),
          ...mediasInGroup.slice(index + 1)
        ]
      })
      return Object.assign({}, state, {
        isUploadingFileMedia: false,
        groups: [
          ...state.groups.slice(0, groupIndex),
          group,
          ...state.groups.slice(groupIndex + 1)
        ]
      })

    // GROUPS

    case types.CREATE_GROUP_REQUEST:
      return Object.assign({}, state, {
        isCreatingGroup: true
      })
    case types.CREATE_GROUP_FAILURE:
      // SHOULD SHOW AN ERROR VIA AN ERROR COMPONENT
      return Object.assign({}, state, {
        isCreatingGroup: false
      })
    case types.CREATE_GROUP_SUCCESS:
      return Object.assign({}, state, {
        isCreatingGroup: false,
        groups: [
          ...state.groups,
          action.group
        ]
      })

    case types.DELETE_GROUP_SUCCESS:
      groupIndex = findIndex(state.groups, action.group.id)
      return Object.assign({}, state, {
        isDeletingGroup: false,
        groups: [
          ...state.groups.slice(0, groupIndex),
          ...state.groups.slice(groupIndex + 1)
        ]
      })

    case types.BUMP_VERSION_REQUEST:
      return Object.assign({}, state, {
        isFetchingPage: true
      })
    case types.BUMP_VERSION_FAILURE:
      return Object.assign({}, state, {
        isFetchingPage: false
        // TODO: show error
      })
    case types.BUMP_VERSION_SUCCESS:
      return Object.assign({}, state, {
        isFetchingPage: false,
        id: action.page.id,
        name: action.page.name,
        version: action.page.version,
        description: action.page.description,
        slug: action.page.slug,
        medias: action.page.medias,
        groups: action.page.groups,
        published: action.page.published
      })

    case types.TOGGLE_PUBLISH_REQUEST:
      return Object.assign({}, state, {
        isToggling: true
      })
    case types.TOGGLE_PUBLISH_FAILURE:
      return Object.assign({}, state, {
        isToggling: false
      })
    case types.TOGGLE_PUBLISH_SUCCESS:
      return Object.assign({}, state, {
        isToggling: false,
        published: action.page.published
      })

    // TODO:
    // MISSING UPDATE_PAGE
    // MISSING UPDATE_MEDIA
    // MISSING UPLOAD_FILE_MEDIA

    default:
      return state
  }
}

export default page
