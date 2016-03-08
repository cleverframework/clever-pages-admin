'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import NotificationSystem from 'react-notification-system'
import actions from '../actions'
import * as PageFilters from '../constants/PageFilters'
import { USER_ROLE } from '../constants/User'
import Pages from '../components/Pages'
import PublishStatusFilter from '../components/PublishStatusFilter'
import TextSearchFilter from '../components/TextSearchFilter'
import CreateForm from '../components/CreateForm'

const {
  fetchPages, setPublishStatusFilter,
  setTextSearchFilter, createPage,
  togglePublish, deletePage
} = actions

class ListPage extends Component {
  constructor (props) {
    super(props)
    this._notificationSystem = null
  }

  onTogglePublish (pageId, published) {
    const { dispatch } = this.props
    dispatch(togglePublish(this._notificationSystem, pageId, published))
  }

  onDelete (pageId) {
    const { dispatch } = this.props
    dispatch(deletePage(this._notificationSystem, pageId))
  }

  onCreate (name) {
    const { dispatch } = this.props
    dispatch(createPage(this._notificationSystem, name))
  }

  componentDidMount () {
    const { dispatch } = this.props
    this._notificationSystem = this.refs.notificationSystem
    dispatch(fetchPages())
  }

  render () {
    const {
      filteredPages, isFetching,
      isCreating, createFormInputNameValue,
      publishStatusFilter, textSearchFilter,
      isDeleting, deletingPageId,
      dispatch
    } = this.props

    return (
      <div className="container">
        <section id='ListPage'>
          <NotificationSystem ref='notificationSystem' />
          <div className='row'>
            <div id='filter-panel' className='filter-panel'>
              <div className='panel panel-default'>
                <div className='panel-body'>
                  <form className='form-inline' role='form'>

                    <PublishStatusFilter
                      filter={publishStatusFilter}
                      onFilterChange={nextFilter =>
                        dispatch(setPublishStatusFilter(nextFilter))
                      } />

                    <TextSearchFilter
                      filter={textSearchFilter}
                      onFilterChange={nextFilter =>
                        dispatch(setTextSearchFilter(nextFilter))
                      } />

                  </form>
                </div>
              </div>
            </div>
          </div>

          {USER_ROLE === 'admin' &&
            <CreateForm
              inputNameValue={createFormInputNameValue}
              disabled={isCreating}
              onCreateClick={this.onCreate.bind(this)} />}

          {isFetching && filteredPages.length === 0 &&
            <div className='row'>
              <div className='col-xs-12'>
                <h2>Loading...</h2>
                <br />
              </div>
            </div>
          }
          {!isFetching && filteredPages.length === 0 &&
            <div className='row'>
              <div className='col-xs-12'>
                <h2>Empty.</h2>
                <br />
              </div>
            </div>
          }
          {filteredPages.length > 0 &&
            <div className='row' style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Pages
                pages={filteredPages}
                isDeleting={isDeleting}
                deletingPageId={deletingPageId}
                onTogglePublish={this.onTogglePublish.bind(this)}
                onDelete={this.onDelete.bind(this)} />
            </div>
          }
        </section>
      </div>
    )
  }
}

ListPage.propTypes = {
  filteredPages: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isCreating: PropTypes.bool.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  deletingPageId: PropTypes.number.isRequired,
  createFormInputNameValue: PropTypes.string.isRequired,
  publishStatusFilter: PropTypes.string.isRequired,
  textSearchFilter: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function selectPages (pages, psf, rsf) {
  if (rsf) {
    pages = pages.filter(page => !!page.name.match(new RegExp(rsf, 'gi')))
  }

  switch (psf) {
    case PageFilters.SHOW_ALL:
      return pages
    case PageFilters.SHOW_PUBLISHED:
      return pages.filter(page => page.published)
    case PageFilters.SHOW_UNPUBLISHED:
      return pages.filter(page => !page.published)
  }
}

function mapStateToProps (state) {
  const { pages, publishStatusFilter, textSearchFilter } = state
  const {
    isFetching, items,
    createFormInputNameValue, isCreating,
    isDeleting, deletingPageId
  } = pages

  return {
    filteredPages: selectPages(items, publishStatusFilter, textSearchFilter),
    isFetching,
    isCreating,
    isDeleting,
    deletingPageId,
    createFormInputNameValue,
    publishStatusFilter,
    textSearchFilter
  }
}

export default connect(mapStateToProps)(ListPage)
