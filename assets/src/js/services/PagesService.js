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
}

export default new PagesService()
