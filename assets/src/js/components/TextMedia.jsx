import React from 'react/addons'
import ReactMixin from 'react-mixin'

export default class TextMedia extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  componentWillMount () {
    this.setState({
      key: this.props.mediaKey,
      title: this.props.title,
      content: this.props.children
    })
  }

  render () {
    return (
      <div className="textMediaArea">
        <div className="row">
          <div className="large-12 columns">
            <label><b>Text Media</b> (<a onClick={this.props.onDelete}>delete</a>)</label>
          </div>
        </div>
        <div className="row">
          <div className="large-12 columns">
            <input type="text" valueLink={this.linkState('key')} id="key" ref="key" placeholder="Key" />
          </div>
        </div>
        <div className="row">
          <div className="large-12 columns">
            <input type="text" valueLink={this.linkState('title')} id="title" ref="title" placeholder="Title" />
          </div>
        </div>
        <div className="row">
          <div className="large-12 columns">
            <textarea type="text" valueLink={this.linkState('content')} id="content" ref="content" placeholder="Content"></textarea>
          </div>
        </div>
      </div>
    )
  }
}

ReactMixin(TextMedia.prototype, React.addons.LinkedStateMixin)
