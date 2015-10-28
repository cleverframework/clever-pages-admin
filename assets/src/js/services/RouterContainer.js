let _router = null

export default {
  set (router) {
    _router = router
  },
  get () {
    return _router
  }

  // Syntax sugar
  // set: (router) => _router = router,
  // get: () => _router
}
