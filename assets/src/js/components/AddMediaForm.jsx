import React from 'react/addons'
import ReactMixin from 'react-mixin'

export default class AddMediaForm extends React.Component {

  constructor () {
    super()
  }

  componentDidMount () {

  }

  addMedia (type, e) {
    e.preventDefault()
    this.props.onClick(type)
  }

  render () {
    return (
      <div className="row">
        <div className="large-12 columns">
          <br />
          <label><b>Add Media</b></label>
        </div>
        <div className="large-12 columns addMediaArea">
          <ul className="button-group radius">
            <li><button className="button secondary tiny" onClick={this.addMedia.bind(this, 'TEXT')}>Text</button></li>
            <li><button className="button secondary tiny" onClick={this.addMedia.bind(this, 'IMAGE')}>Image</button></li>
            <li><button className="button secondary tiny" onClick={this.addMedia.bind(this, 'GALLERY')}>Gallery</button></li>
            <li><button className="button secondary tiny" onClick={this.addMedia.bind(this, 'BUTTON')}>Button</button></li>
          </ul>
        </div>
      </div>
    )
  }
}

ReactMixin(AddMediaForm.prototype, React.addons.LinkedStateMixin)
