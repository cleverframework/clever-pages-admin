import { LOAD_PAGES, CREATE_PAGE, EDIT_PAGE, DELETE_PAGE, SEARCH_PAGE } from '../constants/Constants'
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
  }

  _registerToActions (action) {

    switch(action.actionType) {
      case LOAD_PAGES:
        // LOAD PAGES
        this._pages = action.pages
        this.emitChange()
        localStorage.setItem('pages', JSON.stringify(action.pages))
        break
      case CREATE_PAGE:
        // ADD NEW PAGE
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

  get pages () {
    return this._pages
  }

  get filterText () {
    return this._filterText
  }

}

export default new PagesStore()
