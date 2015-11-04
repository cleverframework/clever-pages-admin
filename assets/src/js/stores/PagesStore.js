import HashMap from 'hashmap'
import { LOAD_PAGES, LOAD_PAGE, CREATE_PAGE, ADD_MEDIA, DELETE_MEDIA, UPLOAD_IMAGES, EDIT_PAGE, DELETE_PAGE, SEARCH_PAGE } from '../constants/Constants'
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

        // HashMap stores a key-value pair
        this._activePage._medias = new HashMap()
        this._activePage.medias.forEach(media => {
          this._activePage._medias.set(media.unid, media)
        })

        this.emitChange()
        break
      case CREATE_PAGE:
        // ADD NEW PAGE
        this._pages = [action.page].concat(this._pages)
        this.emitChange()
        break
      case ADD_MEDIA:
        let mediaObj = null
        switch (action.mediaType) {
          case 'IMAGE':
            mediaObj = {
              unid: action.mediaUnid,
              type: action.mediaType,
              key: '',
              caption: '',
              filepath: null
            }
            break
          case 'GALLERY':
            mediaObj = {
              unid: action.mediaUnid,
              type: action.mediaType,
              key: '',
              description: '',
              filepaths: []
            }
            break
          case 'BUTTON':
            mediaObj = {
              unid: action.mediaUnid,
              type: action.mediaType,
              key: '',
              text: '',
              link: 'http://'
            }
            break
          default: // TEXT
            mediaObj = {
              unid: action.mediaUnid,
              type: action.mediaType,
              key: '',
              title: '',
              content: ''
            }
        }

        this._activePage.medias = []
        this._activePage._medias.set(mediaObj.unid, mediaObj)
        this._activePage._medias.forEach(media => {
          this._activePage.medias.push(media)
        })
        this.emitChange()
        break
      case DELETE_MEDIA:
        // DELETE MEDIA
        this._activePage._medias.remove(action.mediaUnid)
        this._activePage.medias = []
        this._activePage._medias.forEach(media => {
          this._activePage.medias.push(media)
        })
        this.emitChange()
        break
      case UPLOAD_IMAGES:
        // UPLOAD IMAGES (FOR MEDIAS)

        const files = action.files

        const media = this._activePage._medias.get(action.mediaUnid)

        if (media.type === 'GALLERY') {
          const filepaths = files.map(file => {
            return file.filepath
          })
          media.filepaths = filepaths.concat(media.filepaths)
        } else {
          // IMAGE
          media.filepath = files[0].filepath
        }
        this._activePage._medias.set(action.mediaUnid, media)
        this._activePage.medias = []
        this._activePage._medias.forEach(media => {
          this._activePage.medias.push(media)
        })
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
