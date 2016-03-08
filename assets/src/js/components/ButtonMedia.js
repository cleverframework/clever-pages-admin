'use strict'

import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import Media from './Media'
import Uploader from './Uploader'
import { USER_ROLE } from '../constants/User'

// Extends Media class
export default class ButtonMedia extends Media {

  constructor (props) {
    super(props)
    this.state = {
      reference: props.reference,
      name: props.name,
      link: props.link
    }
    this.prevState = this.state
    this.type = 'Button'
    this.multiple = false
    this.accept = '.pdf,.zip,.rar'
  }

  update (e) {
    const { id, onUpdate } = this.props
    e.preventDefault()

    // Avoid empty update
    if (this.prevState === this.state) return
    this.prevState = this.state

    onUpdate(id, {
      reference: this.refs.reference.value,
      name: this.refs.name.value,
      link: this.refs.link.value
    })
  }

  uploadFile (files) {
    const { id, onUploadFile } = this.props
    if (files.length > 0) onUploadFile(id, files[0])
    else console.error('Files[] is empty... and this is wrong.')
  }

  onReferenceChange (e) {
    e.preventDefault()
    this.setState({
      reference: this.refs.reference.value
    })
  }

  onNameChange (e) {
    e.preventDefault()
    this.setState({
      name: this.refs.name.value
    })
  }

  onLinkChange (e) {
    e.preventDefault()
    this.setState({
      link: this.refs.link.value
    })
  }

  render () {
    const {
      id, reference, name, link, file
    } = this.props

    const tooltip = (
      <Tooltip id={`tooltip-delete-media-${id}`}>Delete Link</Tooltip>
    )

    const fileTemplate = (
      <div className='form-group'>
        <label>File</label>
        {file &&
          <div className='row'>
            <div className='col-xs-12'>
              <a
                target='_new'
                href='{`/files/${file.filename}`}'
                style={{marginBottom: '10px', display: 'block'}}>
                {file.filename}
              </a>
            </div>
          </div>}
        <div className='row'>
          <div className='col-xs-12'>
            <Uploader
              multiple={this.multiple}
              accept={this.accept}
              onUpload={this.uploadFile.bind(this)} />
          </div>
        </div>
      </div>
    )

    return (
      <div id={id} key={id}>
        <div className='panel panel-default' style={{display: USER_ROLE === 'admin' ? 'none' : 'block'}}>
          <div className='panel-body'>
            <div className='row'>
              <div className='col-xs-6'>
                <div className='form-group' style={{paddingTop: 5}}>
                  <label>{name}</label>
                  <input
                    type='text'
                    className='form-control'
                    value={this.state.link}
                    ref='link'
                    placeholder='Link [http://]'
                    onChange={this.onLinkChange.bind(this)}
                    onBlur={this.update.bind(this)} />
                </div>
              </div>
              <div className='col-xs-1' style={{paddingTop: 30, textAlign: 'center'}}>Or</div>
              <div className='col-xs-5'>
                {fileTemplate}
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
                    placeholder='Button Name'
                    ref='name'
                    onChange={this.onNameChange.bind(this)}
                    onBlur={this.update.bind(this)} />
                  <div className='input-group-btn'>
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
            <div className='row'>
              <form role='form'>
                <div className='col-xs-7'>
                  <fieldset className='input-group-vertical'>
                    <div className='form-group'>
                      <label className='sr-only'>Key</label>
                      <input
                        type='text'
                        className='form-control'
                        defaultValue={reference}
                        placeholder='Key'
                        ref='reference'
                        onChange={this.onReferenceChange.bind(this)}
                        onBlur={this.update.bind(this)} />
                    </div>
                    <div className='form-group'>
                      <label className='sr-only'>Link</label>
                      <input
                        type='text'
                        className='form-control'
                        defaultValue={link}
                        placeholder='http://'
                        ref='link'
                        onBlur={this.update.bind(this)}
                        onChange={this.onLinkChange.bind(this)} />
                    </div>
                  </fieldset>
                </div>
                <div className='col-xs-5'>
                  {fileTemplate}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ButtonMedia.propTypes = Object.assign({}, Media.propTypes, {
  name: PropTypes.string,
  link: PropTypes.string,
  file: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  onUploadFile: PropTypes.func.isRequired
})
