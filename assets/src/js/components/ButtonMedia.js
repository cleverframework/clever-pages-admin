'use strict'

import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import Media from './Media'
import Uploader from './Uploader'

// Extends Media class
export default class ButtonMedia extends Media {

  constructor (props) {
    super(props)
    this.state = {
      reference: props.reference
    }
    this.type = 'Button'
    this.multiple = false
    this.accept = '.pdf,.zip,.rar'
  }

  update (e) {
    const { id, onUpdate } = this.props
    e.preventDefault()
    onUpdate(id, {
      reference: this.refs.reference.value,
      text: this.refs.text.value,
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

  render () {
    const {
      id, reference, text, link, file
    } = this.props

    const ref = this.state.reference !== '' ? this.state.reference : this.props.vid
    const title = `${this.type} [${ref}]`

    const tooltip = (
      <Tooltip id={`tooltip-delete-media-${id}`}>Delete</Tooltip>
    )

    return (
      <div className='row'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <div className='row'>
              <div className='col-xs-8'>
                <h4 className='panel-title'>{title}</h4>
              </div>
              <div className='col-xs-4'>
                <a
                  href='#'
                  className='pull-right'
                  style={{textDecoration: 'none', color: 'red'}}
                  onClick={this.delete.bind(this)}>
                  <OverlayTrigger placement='top' overlay={tooltip}>
                    <FontAwesome name='times' />
                  </OverlayTrigger>
                </a>
              </div>
            </div>
          </div>
          <div className='panel-body'>
            <form role='form'>
              <div className='form-group'>
                <label>Reference</label>
                <input
                  type='text'
                  className='form-control'
                  defaultValue={reference}
                  ref='reference'
                  onChange={this.onReferenceChange.bind(this)}
                  onBlur={this.update.bind(this)} />
              </div>
              <div className='form-group'>
                <label>Text</label>
                <input
                  type='text'
                  className='form-control'
                  defaultValue={text}
                  ref='text'
                  onBlur={this.update.bind(this)} />
              </div>
              <div className='form-group'>
                <label>Link</label>
                <input
                  type='text'
                  className='form-control'
                  defaultValue={link}
                  placeholder='http://'
                  ref='link'
                  onBlur={this.update.bind(this)} />
              </div>
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
            </form>
          </div>
        </div>
      </div>
    )
  }
}

ButtonMedia.propTypes = Object.assign({}, Media.propTypes, {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  file: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  onUploadFile: PropTypes.func.isRequired
})
