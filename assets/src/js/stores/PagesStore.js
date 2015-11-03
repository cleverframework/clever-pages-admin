import { LOAD_PAGES, LOAD_PAGE, CREATE_PAGE, ADD_MEDIA, UPLOAD_IMAGE, EDIT_PAGE, DELETE_PAGE, SEARCH_PAGE } from '../constants/Constants'
import BaseStore from './BaseStore'

class PagesStore extends BaseStore {

  constructor () {
    super()
    this.subscribe(() => this._registerToActions.bind(this))
    const cached = localStorage.getItem('pages')
    let parsed = null
    try {
      parsed = JSON.parse(cached)
    } catch(e) {
      localStorage.removeItem('pages')
    }

    this._pages = parsed || []
    this._filterText = null
    this._activePage = null
    this._transaction = null

    // setInterval(() => {
    //   console.log(this._activePage)
    // }, 1000)
  }

  _registerToActions (action) {

    switch (action.actionType) {
      case LOAD_PAGES:
        // LOAD PAGES
        this._pages = action.pages
        this.emitChange()
        localStorage.setItem('pages', JSON.stringify(action.pages))
        break
      case LOAD_PAGE:
        // EDIT PAGE
        this._activePage = action.page
        this.emitChange()
        break
      case CREATE_PAGE:
        // ADD NEW PAGE
        this._pages = [action.page].concat(this._pages)
        this.emitChange()
        break
      case ADD_MEDIA:
        switch (action.mediaType) {
          case 'IMAGE':
            this._activePage.medias.push({
              index: this._activePage.medias.length,
              type: action.mediaType,
              key: '',
              caption: '',
              filepath: null
            })
            break
          case 'GALLERY':
            this._activePage.medias.push({
              index: this._activePage.medias.length,
              type: action.mediaType,
              key: '',
              name: '',
              images: []
            })
            break
          case 'BUTTON':
            this._activePage.medias.push({
              index: this._activePage.medias.length || 0,
              type: action.mediaType,
              key: '',
              text: '',
              link: 'http://'
            })
          default: // TEXT
            this._activePage.medias.push({
              index: this._activePage.medias.length || 0,
              type: action.mediaType,
              key: '',
              title: '',
              content: ''
            })
        }
        this.emitChange()
        break
      case UPLOAD_IMAGE:
        // Upload an image
        const index = action.mediaIndex
        this._activePage.medias[index].filepath = action.filepath
        this.emitChange()
        break
      case EDIT_PAGE:
        // EDIT PAGE
        this.emitChange()
        break
      case SEARCH_PAGE:
        // SEARCH PAGE
        if (action.filterText === '') action.filterText = null
        this._filterText = action.filterText
        this.emitChange()
        break
      default:
        break
    }
  }

  findPageById (pageId) {
    // TODO: make this right :-)
    return this.pages[0]
  }

  get pages () {
    return this._pages
  }

  get activePage () {
    return this._activePage
  }

  get filterText () {
    return this._filterText
  }

  get transaction () {
    return this._transaction
  }

}

export default new PagesStore()
