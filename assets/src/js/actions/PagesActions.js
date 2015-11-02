import AppDispatcher from '../dispatchers/AppDispatcher.js'
import { LOAD_PAGES, LOAD_PAGE, CREATE_PAGE, ADD_MEDIA, UPLOAD_IMAGE, SEARCH_PAGE } from '../constants/Constants.js'
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
      mediaType: type
    })
  },

  uploadImage (file, mediaIndex) {
    AppDispatcher.dispatch({
      actionType: UPLOAD_IMAGE,
      mediaIndex: mediaIndex,
      filepath: file.filepath
    })
  }



}
