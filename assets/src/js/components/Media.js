'use strict'

import { PropTypes, Component } from 'react'

export default class Media extends Component {
  delete () {
    const { id, onDelete } = this.props
    if (confirm('Are you sure?')) onDelete(id)
  }
}

Media.propTypes = {
  id: PropTypes.number.isRequired,
  vid: PropTypes.number.isRequired,
  reference: PropTypes.string,
  onDelete: PropTypes.func.isRequired
}
