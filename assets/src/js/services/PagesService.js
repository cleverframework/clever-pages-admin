import request from 'reqwest'
import superagent from 'superagent'
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

  loadOne (pageId) {
    return when(request({
      url: API_PAGES_URL + '/data/' + pageId,
      method: 'GET',
      crossOrigin: true,
      type: 'json'
    }))
    .then(res => {
      PagesActions.loadOne(res)
      return true
    })
  }

  uploadImage (files, mediaIndex) {
    const file = files[0]

    const req = superagent.post(API_PAGES_URL + '/data/upload')

    files.forEach((file)=> {
      req.attach(file.name, file)
    })

    return new Promise((yep, nope) => {
      req.end((err, res) => {
        if (err) return nope(err)
        yep(res)
      })
    })
    .then(res => {
      PagesActions.uploadImage(res.body, mediaIndex)
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
