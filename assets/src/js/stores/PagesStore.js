import { CREATE_PAGE, EDIT_PAGE, DELETE_PAGE } from '../constants/Constants'
import BaseStore from './BaseStore'

class PagesStore extends BaseStore {

  constructor () {
    super()
    this.subscribe(() => this._registerToActions.bind(this))
    this._pages = null
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case CREATE_PAGE:
        // ADD NEW PAGE
        this.emitChange()
        break
      case EDIT_PAGE:
        // EDIT PAGE
        this.emitChange()
        break
      case EDIT_PAGE:
        // EDIT PAGE
        this.emitChange()
        break
      default:
        break
    }
  }

  get pages() {
    return this._pages
  }

}

export default new LoginStore()
