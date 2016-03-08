'use strict'

import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import Media from './Media'
import { USER_ROLE } from '../constants/User'

// Extends Media class
export default class MapMedia extends Media {

  constructor (props) {
    super(props)
    this.state = {
      reference: this.props.reference,
      name: this.props.name,
      map_01: this.props.map_01,
      map_02: this.props.map_02,
      map_03: this.props.map_03,
      map_04: this.props.map_04,
      map_05: this.props.map_05,
      map_06: this.props.map_06,
      map_07: this.props.map_07,
      map_08: this.props.map_08,
      map_09: this.props.map_09,
      map_10: this.props.map_10,
      char_limit: this.props.char_limit
    }
    this.prevState = this.state
    this.type = 'Map'
  }

  onBlur (e) {
    const { id, onUpdate } = this.props
    e.preventDefault()

    // Avoid empty update
    if (this.prevState === this.state) return
    this.prevState = this.state

    onUpdate(id, {
      reference: this.refs.reference.value,
      name: this.refs.name.value,
      map_01: (USER_ROLE === 'admin') ? this.refs.map_01.value : this.refs.map_01User.value,
      map_02: (USER_ROLE === 'admin') ? this.refs.map_02.value : this.refs.map_02User.value,
      map_03: (USER_ROLE === 'admin') ? this.refs.map_03.value : this.refs.map_03User.value,
      map_04: (USER_ROLE === 'admin') ? this.refs.map_04.value : this.refs.map_04User.value,
      map_05: (USER_ROLE === 'admin') ? this.refs.map_05.value : this.refs.map_05User.value,
      map_06: (USER_ROLE === 'admin') ? this.refs.map_06.value : this.refs.map_06User.value,
      map_07: (USER_ROLE === 'admin') ? this.refs.map_07.value : this.refs.map_07User.value,
      map_08: (USER_ROLE === 'admin') ? this.refs.map_08.value : this.refs.map_08User.value,
      map_09: (USER_ROLE === 'admin') ? this.refs.map_09.value : this.refs.map_09User.value,
      map_10: (USER_ROLE === 'admin') ? this.refs.map_10.value : this.refs.map_10User.value,
      char_limit: this.refs.limit.value
    })
  }

  onReferenceChange (e) {
    e.preventDefault()
    this.setState({
      reference: e.target.value
    })
  }

  onNameChange (e) {
    e.preventDefault()
    this.setState({
      name: e.target.value
    })
  }

  onMapChange (index, e) {
    e.preventDefault()
    let newState = Object.assign(this.state, {})
    newState[`map_${index}`] = e.target.value
    this.setState(newState)
  }

  onLimitChange (e) {
    e.preventDefault()
    this.setState({
      char_limit: e.target.value
    })
  }

  render () {
    const {
      id, reference, name, content, char_limit
    } = this.props

    const ref = this.state.reference !== '' ? this.state.reference : this.props.key
    const title = `${this.type} [${ref}]`

    const tooltip = (
      <Tooltip id={`tooltip-delete-media-${id}`}>Delete Field</Tooltip>
    )
    return (
      <div id={id} key={id}>
        <div className='form-group' style={{display: USER_ROLE === 'admin' ? 'none' : 'block'}}>
          <div className='form-group'>
            <label style={{display: 'block'}}>{name} <small className="pull-right" style={{display: char_limit === 0 ? 'none' : 'block', lineHeight: '19px'}}>Character limit: {char_limit}</small></label>
            <div className='row'>
              <div className='col-xs-12 col-md-6'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Content'
                  value={this.state.map_01}
                  ref='map_01User'
                  maxLength={char_limit}
                  onChange={this.onMapChange.bind(this, '01')}
                  onBlur={this.onBlur.bind(this)} />
                <input
                  type='text'
                  className='form-control'
                  placeholder='Content'
                  value={this.state.map_02}
                  ref='map_02User'
                  maxLength={char_limit}
                  onChange={this.onMapChange.bind(this, '02')}
                  onBlur={this.onBlur.bind(this)} />
                <input
                  type='text'
                  className='form-control'
                  placeholder='Content'
                  value={this.state.map_03}
                  ref='map_03User'
                  maxLength={char_limit}
                  onChange={this.onMapChange.bind(this, '03')}
                  onBlur={this.onBlur.bind(this)} />
                <input
                  type='text'
                  className='form-control'
                  placeholder='Content'
                  value={this.state.map_04}
                  ref='map_04User'
                  maxLength={char_limit}
                  onChange={this.onMapChange.bind(this, '04')}
                  onBlur={this.onBlur.bind(this)} />
                <input
                  type='text'
                  className='form-control'
                  placeholder='Content'
                  value={this.state.map_05}
                  ref='map_05User'
                  maxLength={char_limit}
                  onChange={this.onMapChange.bind(this, '05')}
                  onBlur={this.onBlur.bind(this)} />
              </div>
              <div className='col-xs-12 col-md-6'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Content'
                  value={this.state.map_06}
                  ref='map_06User'
                  maxLength={char_limit}
                  onChange={this.onMapChange.bind(this, '06')}
                  onBlur={this.onBlur.bind(this)} />
                <input
                  type='text'
                  className='form-control'
                  placeholder='Content'
                  value={this.state.map_07}
                  ref='map_07User'
                  maxLength={char_limit}
                  onChange={this.onMapChange.bind(this, '07')}
                  onBlur={this.onBlur.bind(this)} />
                <input
                  type='text'
                  className='form-control'
                  placeholder='Content'
                  value={this.state.map_08}
                  ref='map_08User'
                  maxLength={char_limit}
                  onChange={this.onMapChange.bind(this, '08')}
                  onBlur={this.onBlur.bind(this)} />
                <input
                  type='text'
                  className='form-control'
                  placeholder='Content'
                  value={this.state.map_09}
                  ref='map_09User'
                  maxLength={char_limit}
                  onChange={this.onMapChange.bind(this, '09')}
                  onBlur={this.onBlur.bind(this)} />
                <input
                  type='text'
                  className='form-control'
                  placeholder='Content'
                  value={this.state.map_10}
                  ref='map_10User'
                  maxLength={char_limit}
                  onChange={this.onMapChange.bind(this, '10')}
                  onBlur={this.onBlur.bind(this)} />
              </div>
            </div>
          </div>
        </div>
        <div className='panel panel-default' style={{display: USER_ROLE !== 'admin' ? 'none' : 'block'}}>
          <div className='panel-heading panel-drag'>
            <div className='row'>
              <div className='col-xs-12'>
                <div className='input-group'>
                  <input
                    type='text'
                    className='form-control'
                    value={this.state.name}
                    placeholder='Name'
                    disabled={USER_ROLE !== 'admin'}
                    ref='name'
                    onChange={this.onNameChange.bind(this)}
                    onBlur={this.onBlur.bind(this)} />
                  <div className="input-group-btn">
                    <OverlayTrigger placement='top' overlay={tooltip}>
                      <button
                        className='btn btn-danger pull-right'
                        onClick={this.delete.bind(this)}>
                          <FontAwesome name='times' />
                      </button>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='panel-body'>
            <form role='form'>
              <fieldset className='input-group-vertical'>
                <div className='form-group-half' style={{display: USER_ROLE !== 'admin' ? 'none' : 'inline-block'}}>
                  <label className='sr-only'>Key</label>
                  <input
                    type='text'
                    className='form-control'
                    value={this.state.reference}
                    ref='reference'
                    placeholder='Key'
                    disabled={USER_ROLE !== 'admin'}
                    onChange={this.onReferenceChange.bind(this)}
                    onBlur={this.onBlur.bind(this)} />
                </div>
                <div className='form-group-half' style={{display: USER_ROLE !== 'admin' ? 'none' : 'inline-block'}}>
                  <label className='sr-only'>Character Limit</label>
                  <input
                    type='number'
                    className='form-control'
                    value={this.state.char_limit}
                    ref='limit'
                    placeholder='Character Limit'
                    disabled={USER_ROLE !== 'admin'}
                    onChange={this.onLimitChange.bind(this)}
                    onBlur={this.onBlur.bind(this)} />
                </div>
                <div className='form-group'>
                  <label className='sr-only'>Map Fields</label>
                  <div className='row'>
                    <div className='col-xs-12 col-md-6' style={{paddingRight: '0px'}}>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Map Field'
                        value={this.state.map_01}
                        ref='map_01'
                        onChange={this.onMapChange.bind(this, '01')}
                        onBlur={this.onBlur.bind(this)} />
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Map Field'
                        value={this.state.map_02}
                        ref='map_02'
                        onChange={this.onMapChange.bind(this, '02')}
                        onBlur={this.onBlur.bind(this)} />
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Map Field'
                        value={this.state.map_03}
                        ref='map_03'
                        onChange={this.onMapChange.bind(this, '03')}
                        onBlur={this.onBlur.bind(this)} />
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Map Field'
                        value={this.state.map_04}
                        ref='map_04'
                        onChange={this.onMapChange.bind(this, '04')}
                        onBlur={this.onBlur.bind(this)} />
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Map Field'
                        value={this.state.map_05}
                        ref='map_05'
                        onChange={this.onMapChange.bind(this, '05')}
                        onBlur={this.onBlur.bind(this)} />
                    </div>
                    <div className='col-xs-12 col-md-6' style={{paddingLeft: '0px'}}>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Map Field'
                        value={this.state.map_06}
                        ref='map_06'
                        onChange={this.onMapChange.bind(this, '06')}
                        onBlur={this.onBlur.bind(this)} />
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Map Field'
                        value={this.state.map_07}
                        ref='map_07'
                        onChange={this.onMapChange.bind(this, '07')}
                        onBlur={this.onBlur.bind(this)} />
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Map Field'
                        value={this.state.map_08}
                        ref='map_08'
                        onChange={this.onMapChange.bind(this, '08')}
                        onBlur={this.onBlur.bind(this)} />
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Map Field'
                        value={this.state.map_09}
                        ref='map_09'
                        onChange={this.onMapChange.bind(this, '09')}
                        onBlur={this.onBlur.bind(this)} />
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Map Field'
                        value={this.state.map_10}
                        ref='map_10'
                        onChange={this.onMapChange.bind(this, '10')}
                        onBlur={this.onBlur.bind(this)} />
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

MapMedia.propTypes = Object.assign({}, Media.propTypes, {
  name: PropTypes.string,
  char_limit: PropTypes.number,
  map_01: PropTypes.string,
  map_02: PropTypes.string,
  map_03: PropTypes.string,
  map_04: PropTypes.string,
  map_05: PropTypes.string,
  map_06: PropTypes.string,
  map_07: PropTypes.string,
  map_08: PropTypes.string,
  map_09: PropTypes.string,
  map_10: PropTypes.string,
  onUpdate: PropTypes.func.isRequired
})
