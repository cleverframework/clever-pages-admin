import React, { PropTypes } from 'react'
import Media from './Media'
import Uploader from './Uploader'

// Extends Media class
export default class ImageMedia extends Media {

  constructor (props) {
    super(props)
    this.state = {
      reference: props.reference
    }
    this.type = 'Image'
    this.multiple = false
    this.accept = '.jpg,.jpeg,.png,.gif'
  }

  update (e) {
    const { id, onUpdate } = this.props
    e.preventDefault()
    onUpdate(id, {
      reference: this.refs.reference.value,
      caption: this.refs.caption.value
    })
  }

  uploadImage (files) {
    const { id, onUploadImage } = this.props
    if (files.length > 0) onUploadImage(id, files[0])
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
      reference, caption, imageFile
    } = this.props

    const ref = this.state.reference !== '' ? this.state.reference : this.props.vid
    const title = `${this.type} [${ref}]`

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
                  style={{textDecoration: 'none'}}
                  onClick={this.delete.bind(this)}>Delete</a>
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
                <label>Caption</label>
                <input
                  type='text'
                  className='form-control'
                  defaultValue={caption}
                  ref='caption'
                  onBlur={this.update.bind(this)} />
              </div>
              <div className='form-group'>
                <label>File</label>
                {imageFile &&
                  <div className='row'>
                    <div className='col-xs-1'>
                      <img
                        style={{ width: '64px', height: '64px' }}
                        src={`/files/${imageFile.filename}`} />
                    </div>
                    <div className='col-xs-11'>
                      <br />
                      <Uploader
                        multiple={this.multiple}
                        accept={this.accept}
                        onUpload={this.uploadImage.bind(this)} />
                    </div>
                  </div>}
                {!imageFile &&
                  <Uploader
                    multiple={this.multiple}
                    accept={this.accept}
                    onUpload={this.uploadImage.bind(this)} />}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

ImageMedia.propTypes = Object.assign({}, Media.propTypes, {
  caption: PropTypes.string.isRequired,
  imageFile: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  onUploadImage: PropTypes.func.isRequired
})
