import shortid from 'shortid'
import AppDispatcher from '../dispatchers/AppDispatcher.js'
import { LOAD_PAGES, LOAD_PAGE, CREATE_PAGE, ADD_MEDIA, DELETE_MEDIA, UPLOAD_IMAGE, SEARCH_PAGE } from '../constants/Constants.js'
import RouterContainer from '../services/RouterContainer'

export default {

  load (pages) {
    AppDispatcher.dispatch({
      actionType: LOAD_PAGES,
      pages: pages
    })
  },

  loadOne (page) {
    AppDispatcher.dispatch({
      actionType: LOAD_PAGE,
      page: page
    })
  },

  search (filterText) {
    AppDispatcher.dispatch({
      actionType: SEARCH_PAGE,
      filterText: filterText
    })
  },

  create (page) {
    AppDispatcher.dispatch({
      actionType: CREATE_PAGE,
      page: page
    })
  },

  addMedia (type) {
    AppDispatcher.dispatch({
      actionType: ADD_MEDIA,
      mediaType: type,
      mediaUnid: shortid.generate()
    })
  },

  deleteMedia (mediaUnid) {
    AppDispatcher.dispatch({
      actionType: DELETE_MEDIA,
      mediaUnid: mediaUnid
    })
  },

  uploadImage (file, mediaUnid) {
    AppDispatcher.dispatch({
      actionType: UPLOAD_IMAGE,
      mediaUnid: mediaUnid,
      filepath: file.filepath
    })
  }



}
