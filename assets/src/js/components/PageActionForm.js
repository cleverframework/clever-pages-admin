'use strict'

import React, { Component, PropTypes } from 'react'
import { PREVIEW_SITE_URL } from '../constants/URLs'
import { PREVIEW_PRD_URL } from '../constants/URLs'
import { USER_ROLE } from '../constants/User'

export default class PageActionForm extends Component {

  constructor (props) {
    super(props)
    this.state = {
      published: this.props.published
    }
  }

  bumpVersion () {
    const { onBumpVersion } = this.props
    if (window.confirm('Are you sure you want publish the content to the website?')) onBumpVersion()
  }

  statusChange () {
    const { onStatusChange, published } = this.props
    this.setState({
      published: !published
    })
    onStatusChange(!published)
  }

  renderForm () {
    const { version, slug, published } = this.props
    const status = published ? 'visible' : 'hidden'
    return (
      <div>
        <div className='panel panel-default panel-sidebar'>
          <div className='panel-body'>
            <form role='form'>
              <div className='row'>
                <div className='col-sm-8'>
                  <div className='form-group' style={{lineHeight: '25px'}}>
                    <label>Page is {status}</label>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <input
                    type='checkbox'
                    id='status'
                    className='tgl tgl-light'
                    onChange={this.statusChange.bind(this)}
                    checked={this.state.published}/>
                  <label className='tgl-btn pull-right' htmlFor='status'></label>
                </div>
              </div>
              <button
                className='btn btn-primary btn-lg btn-block'
                onClick={this.bumpVersion.bind(this)}
                type='button'>Publish to website</button>
              <a style={{display: USER_ROLE !== 'admin' ? 'none' : 'block'}}
                className='btn btn-default btn-lg btn-block'
                href={`${PREVIEW_SITE_URL}/preview/${slug}?version=${version}`}
                target='_blank'>Preview Dev</a>
              <a
                className='btn btn-default btn-lg btn-block'
                href={`${PREVIEW_PRD_URL}/preview/${slug}?version=${version}`}
                target='_blank'>Preview</a>

              <div style={{display: USER_ROLE !== 'admin' ? 'none' : 'block'}}>
                <br/><br/>
                <small className='pull-right'>Page version: {version}</small>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return this.renderForm()
  }

}

PageActionForm.PageActionForm = {
  version: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  onBumpVersion: PropTypes.func.isRequired,
  published: PropTypes.bool.isRequired,
  onStatusChange: PropTypes.func.isRequired
}
