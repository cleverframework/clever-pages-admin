import React, { Component, PropTypes } from 'react'

export default class TextSearchFilter extends Component {

  onChange (e) {
    const { onFilterChange } = this.props
    e.preventDefault()
    onFilterChange(e.target.value)
  }

  render () {
    const { filter } = this.props
    return (
      <div className='form-group'>
        <label
          className='filter-col'
          style={{marginRight: '0px'}}>Search:</label>
        <input
          value={filter}
          type='text'
          className='form-control'
          placeholder='Type something ...'
          onChange={this.onChange.bind(this)} />
      </div>
    )
  }

}

TextSearchFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired
}
