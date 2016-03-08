'use strict'

import React, { PropTypes, Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { USER_ROLE } from '../constants/User'
import { Link } from 'react-router'


export default class Sidebar extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      pageId
    } = this.props

    return (
      <div className='sidebar'>
        <h1 className="h4 text-center">Pages</h1>
        <ul className="sidebar__ul--root">
          <li className="home-link"><Link to={`/pages/index`}><i className="fa fa-home"></i> Home Page</Link></li>

          <ul className="sidebar__ul--sub-root">

            <li className="sidebar__li--sub-root-link"><Link to={'/pages/our-business'}>Our Business</Link></li>

              <ul className="sidebar__ul--sub-sub-ul">
                <li><Link to={'/pages/who-we-are'}>Who We Are</Link></li>
                <li><Link to={'/pages/our-achievements'}>Our Achievements</Link></li>
                <li><Link to={'/pages/what-we-believe-in'}>What We Believe In</Link></li>
              </ul>

            <li className="sidebar__li--sub-root-link"><Link to={'/pages/our-wines'}>Our Wines</Link></li>

              <ul className="sidebar__ul--sub-sub-ul">
                <li><Link to={'/pages/jacobs-creek'}>Jacobs Creek</Link></li>
                <li><Link to={'/pages/brancott-estate'}>Brancott Estate</Link></li>
                <li><Link to={'/pages/campo-viejo'}>Campo Viejo</Link></li>
                <li><Link to={'/pages/graffigna'}>Graffigna</Link></li>
                <li><Link to={'/pages/stoneleigh'}>Stoneleigh</Link></li>
                <li><Link to={'/pages/kenwood-vineyards'}>Kenwood Vineyards</Link></li>
                <li><Link to={'/pages/helan-mountain'}>Helan Mountain</Link></li>
              </ul>

            <li className="sidebar__li--sub-root-link"><Link to={'/pages/working-with-us'}>Working With Us</Link></li>

              <ul className="sidebar__ul--sub-sub-ul">
                <li><Link to={'/pages/job-board'}>Job Board</Link></li>
                <li><Link to={'/pages/culture'}>Culture</Link></li>
                <li><Link to={'/pages/graduate-program'}>Graduate Program</Link></li>
                <li><Link to={'/pages/qanda'}>Q&A</Link></li>
              </ul>

            <li className="sidebar__li--sub-root-link"><Link to={'/pages/csr'}>CSR</Link></li>

              <ul className="sidebar__ul--sub-sub-ul">
                <li><Link to={'/pages/responsibility'}>Responsibility</Link></li>
                <li><Link to={'/pages/sustainability'}>Sustainability</Link></li>
                <li><Link to={'/pages/community'}>Community</Link></li>
              </ul>

            <li className="sidebar__li--sub-root-link"><Link to={'/pages/news-centre'}>News Centre</Link></li>

          </ul>
        </ul>
      </div>
    )
  }
}

Sidebar.propTypes = {
  pageId: PropTypes.number.isRequired
}
