import request from 'reqwest'
import when from 'when'
import { API_PAGES_URL } from '../constants/Constants'
import PagesActions from '../actions/PagesActions'

class PagesService {

  load () {
    return when(request({
      url: API_PAGES_URL + '/data',
      method: 'GET',
      crossOrigin: true,
      type: 'json'
    }))
    .then(res => {
      PagesActions.load(res)
      return true
    })
  }

  create (pageName) {
    return when(request({
      url: API_PAGES_URL + '/data',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        name: pageName
      }
    }))
    .then(res => {
      PagesActions.create({
        name: res.name,
        status: res.status
      })
      return true
    })
  }

}

export default new PagesService()
