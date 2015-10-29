import AppDispatcher from '../dispatchers/AppDispatcher.js'
import { LOAD_PAGES, SEARCH_PAGE } from '../constants/Constants.js'
import RouterContainer from '../services/RouterContainer'

export default {

  load (pages) {
    AppDispatcher.dispatch({
      actionType: LOAD_PAGES,
      pages: pages
    })
  },

  search (filterText) {
    console.log('Searching: ' + filterText)
    AppDispatcher.dispatch({
      actionType: SEARCH_PAGE,
      filterText: filterText
    })
  }

  // loginUser (jwt) {
  //   const savedJwt = localStorage.getItem('jwt')
  //
  //   AppDispatcher.dispatch({
  //     actionType: LOGIN_USER,
  //     jwt: jwt
  //   })
  //
  //   if (savedJwt !== jwt) {
  //     const nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/'
  //
  //     RouterContainer.get().transitionTo(nextPath);
  //     localStorage.setItem('jwt', jwt)
  //   }
  // },
  //
  // logoutUser () {
  //   RouterContainer.get().transitionTo('/login');
  //   localStorage.removeItem('jwt');
  //   AppDispatcher.dispatch({
  //     actionType: LOGOUT_USER
  //   })
  // }

}
