'use strict'

import React, { Component, PropTypes } from 'react'
import { SHOW_ALL, SHOW_PUBLISHED, SHOW_UNPUBLISHED } from '../constants/PageFilters'

export default class PublishStatusFilter extends Component {
  renderFilter (filter, name) {
    return (
      <option value={filter}>{name}</option>
    )
  }

  onChange (e) {
    const { onFilterChange } = this.props
    e.preventDefault()
    onFilterChange(e.target.value)
  }

  render () {
    return (
      <div className='form-group'>
        <label className='filter-col' style={{marginRight: '0px'}}>Show:</label>
        <select
          className='form-control'
          onChange={this.onChange.bind(this)}>
            {this.renderFilter(SHOW_ALL, 'All')}
            {this.renderFilter(SHOW_PUBLISHED, 'Published')}
            {this.renderFilter(SHOW_UNPUBLISHED, 'Unpublished')}
        </select>
      </div>
    )
  }
}

PublishStatusFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    SHOW_ALL,
    SHOW_PUBLISHED,
    SHOW_UNPUBLISHED
  ]).isRequired
}
