import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { DropdownButton, MenuItem } from 'react-bootstrap'

export default class Pages extends Component {

  togglePublish () {
    const { id, onTogglePublish, published } = this.props
    onTogglePublish(id, !published)
  }

  delete () {
    const { id, onDelete } = this.props
    onDelete(id)
  }

  render () {
    const { id, name, published, deletingPageId } = this.props

    return (
      <div className='filter-panel'>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <Link to={`/pages/${id}`}>{name}</Link>&nbsp;
            {published &&
              <span style={{color: 'green'}} className=''>
                <img
                  src='http://www.clker.com/cliparts/u/g/F/R/X/9/green-circle-hi.png'
                  width='10'
                  height='10' />
              </span>}
            {!published &&
              <span style={{color: 'red'}} className=''>
                <img
                  src='https://pixabay.com/static/uploads/photo/2012/05/07/02/46/red-47690_640.png'
                  width='10'
                  height='10' />
              </span>}
            <div className='pull-right'>
              {deletingPageId !== id &&
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  published: PropTypes.bool.isRequired,
  deletingPageId: PropTypes.string.isRequired,
  onTogglePublish: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
