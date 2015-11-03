import $ from 'jquery'
import foundation from 'foundation'
import React from 'react/addons'
import ReactMixin from 'react-mixin'
import { Route, RouteHandler, Link } from 'react-router'
import PagesService from '../services/PagesService'
import PagesStore from '../stores/PagesStore'
import PagesActions from '../actions/PagesActions'
import AddMediaForm from './AddMediaForm'
import TextMedia from './TextMedia'
import ImageMedia from './ImageMedia'

export default class PageEdit extends React.Component {

  constructor () {
    super()
    this.state = {
      name: '',
      status: '',
      medias: []
    }
  }

  loadPageFromServer (pageId) {
    PagesService
      .loadOne(pageId)
      .catch(err => {
        // alert('An error occourred while fetching the data.')
        console.error('Error fetching the data', err)
        console.error(err.stack)
      })
  }

  componentWillMount () {
    const pageId = this.props.params.pageId
    const cachedPage = PagesStore.findPageById(pageId)
    if (cachedPage) return this.setState(cachedPage)
  }

  componentDidMount () {
    const pageId = this.props.params.pageId
    this.changeListener = this._onChange.bind(this)
    PagesStore.addChangeListener(this.changeListener)
    this.loadPageFromServer(pageId)
  }

  _onChange () {
    this.setState(PagesStore.activePage)
  }

  componentWillUnmount () {
    PagesStore.removeChangeListener(this.changeListener)
  }

  save (e) {

  }

  deleteMedia (mediaUnid) {
    // PagesActions.deleteMedia(mediaUnid)
    PagesActions.deleteMedia(mediaUnid)
  }

  addMedia (type) {
    PagesActions.addMedia(type)
  }

  render () {

    // if this become to slow, use forEach instead or query server side
    const medias = this.state.medias
      .map(media => {
        switch (media.type) {
          case 'TEXT':
            return (
              <TextMedia key={media.unid} mediaUnid={media.unid} onDelete={this.deleteMedia.bind(this, media.unid)} mediaKey={media.key} title={media.title}>
                {media.content}
              </TextMedia>
            )
          case 'IMAGE':
            return (
              <ImageMedia key={media.unid} mediaUnid={media.unid} onDelete={this.deleteMedia.bind(this, media.unid)} mediaKey={media.key} caption={media.caption} filepath={media.filepath} />
            )
          default:
            console.error(`${media.type} not defined.`)
        }
      })

    return (
      <div className="row editPage">
        <div className="large-12 columns">
          <form>
            <div className="row">
              <div className="large-12 columns">
                <label><b>Name</b>
                  <input type="text" valueLink={this.linkState('name')} id="name" ref="name" placeholder="Give a name to this page ..." />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="large-12 columns">
                <label><b>Description</b>
                  <input type="text" valueLink={this.linkState('description')} id="description" ref="description" placeholder="This page needs a decsription ..." />
                </label>
              </div>
            </div>

            {medias}

            <AddMediaForm onClick={this.addMedia.bind(this)}/>

            <div className="row">
              <div className="small-2 columns">
                <button className="button postfix success" id="savePageBtn" onClick={this.save.bind(this)}>Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )

  }
}

ReactMixin(PageEdit.prototype, React.addons.LinkedStateMixin)
