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
              <span style={{color: 'green'}} className='glyphicon glyphicon-asterisk'></span>}
            {!published &&
              <span style={{color: 'red'}} className='glyphicon glyphicon-asterisk'></span>}
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
