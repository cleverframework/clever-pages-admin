import React from 'react/addons'
import ReactMixin from 'react-mixin'
import Dropzone from 'react-dropzone'
import PagesService from '../services/PagesService'
import PagesStore from '../stores/PagesStore'

export default class ImageMedia extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  componentWillMount () {
    this.setState({
      key: this.props.mediaKey,
      mediaUnid: this.props.mediaUnid,
      caption: this.props.caption,
      filepath: this.props.filepath
    })
  }

  componentDidMount () {
    this.changeListener = this._onChange.bind(this)
    PagesStore.addChangeListener(this.changeListener)
  }

  _onChange () {
    // TODO: unmount the component ?
    const state = PagesStore.activePage._medias.get(this.state.mediaUnid)
    if (!state) return
    this.setState(state)
  }

  componentWillUnmount () {
    PagesStore.removeChangeListener(this.changeListener)
  }

  onDrop (imageMedia, file) {
    PagesService.uploadImage(file, imageMedia.mediaUnid)
      .catch(err => {
        alert('There\'s an error uploading the image ' + imageMedia.mediaUnid)
        console.error('Error uploading the page', err)
      })
  }

  onOpenClick () {
    this.refs.dropzone.open()
  }

  render () {

    function generateImagePreview (filepath) {

      if (!filepath) return null

      return (
        <div style={{float: 'left', display: 'block', paddingRight: '15px'}}>
          <img src={filepath} alt="Preview" style={{ height: '64px' }} />
        </div>
      )
    }

    function generateUploader (filepath) {

      const imagePreview = generateImagePreview(filepath)

      const dropzoneStyle = {
        height: '64px',
        padding: '17.5px',
        border: '1px dashed black',
        width: 'auto',
        display: 'block',
        float: 'left'
      }

      const multiple = false

      return (
        <div className="large-12 columns" style={{marginBottom: '15px'}}>
          {imagePreview}
          <Dropzone multiple={multiple} style={dropzoneStyle} onDrop={this.onDrop.bind(this, this.state)}>
            <div>Drop file here or click to upload.</div>
          </Dropzone>
          <input type="hidden" valueLink={this.linkState('filepath')} id="filepath" ref="filepath" />
        </div>
      )
    }

    const uploader = generateUploader.call(this, this.state.filepath)

    return (
      <div className="imageMediaArea">
        <div className="row">
          <div className="large-12 columns">
            <label><b>Image Media</b> (<a onClick={this.props.onDelete}>delete</a>)</label>
          </div>
        </div>
        <div className="row">
          <div className="large-12 columns">
            <input type="text" valueLink={this.linkState('key')} id="key" ref="key" placeholder="Key" />
          </div>
        </div>
        <div className="row">
          <div className="large-12 columns">
            <input type="text" valueLink={this.linkState('caption')} id="title" ref="title" placeholder="Caption" />
          </div>
        </div>
        <div className="row">
          {uploader}
        </div>
      </div>
    )
  }
}

ReactMixin(ImageMedia.prototype, React.addons.LinkedStateMixin)
