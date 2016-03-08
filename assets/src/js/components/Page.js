'use strict'

import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome'
import {
  DropdownButton, MenuItem,
  Tooltip, OverlayTrigger
} from 'react-bootstrap'

import { USER_ROLE } from '../constants/User'

export default class Pages extends Component {

  togglePublish () {
    const { id, onTogglePublish, published } = this.props
    onTogglePublish(id, !published)
  }

  delete () {
    const { id, onDelete } = this.props
    if (confirm('Are you sure?')) onDelete(id)
  }

  render () {
    const { id, slug, name, published, deletingPageId } = this.props

    const tooltip = (
      <Tooltip id={`tooltip-${id}`}>{published ? 'Publish' : 'Unpublish'}</Tooltip>
    )

    return (
      <div className='filter-panel'>
        <div className='panel panel-default'>
          <div className='panel-body'>
            {published &&
              <OverlayTrigger placement='top' overlay={tooltip}>
                <FontAwesome
                  style={{color: 'green'}}
                  name='circle' />
              </OverlayTrigger>}
            {!published &&
              <OverlayTrigger placement='top' overlay={tooltip}>
                <FontAwesome
                  style={{color: 'red'}}
                  name='circle' />
              </OverlayTrigger>}
            &nbsp;<Link to={`/pages/${slug}`}>{name}</Link>
            <div className='pull-right'>
              {(USER_ROLE === 'admin' && deletingPageId !== id) &&
                <DropdownButton bsStyle={'default'} title={'Quick Actions'} id={`dropdown-basic-${id}`}>
                  <MenuItem
                    onSelect={this.togglePublish.bind(this)}>{published ? 'Unpublish' : 'Publish'}
                  </MenuItem>
                  <MenuItem onSelect={this.delete.bind(this)}>Delete</MenuItem>
                </DropdownButton>}
              {deletingPageId === id &&
                <span>Deleting...</span>}
            </div>

          </div>
        </div>
      </div>
    )
  }
}

Pages.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  published: PropTypes.bool.isRequired,
  deletingPageId: PropTypes.number.isRequired,
  onTogglePublish: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
