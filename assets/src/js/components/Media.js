'use strict'

import { PropTypes, Component } from 'react'

export default class Media extends Component {
  delete () {
    const { id, onDelete } = this.props
    if (confirm('Are you sure?')) onDelete(id)
  }
}

Media.propTypes = {
  id: PropTypes.string.isRequired,
  vid: PropTypes.number.isRequired,
  reference: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
}
