'use strict'

export function addNotification (title, level, autoDismiss) {
  let message = 'Please don\'t refresh the page.'
  switch (level) {
    case 'error':
      message = 'Oops! Something went wrong.'
      break
    case 'success':
      message = 'Awesome! Everything went smooth.'
      break
    default:
      // something ?
  }

  return this.addNotification({
    title,
    message,
    level,
    dismissible: false,
    autoDismiss: autoDismiss || 0
  })
}

export function removeNotification (notification) {
  setTimeout(() => {
    this.removeNotification(notification)
  }, 1500)
}
