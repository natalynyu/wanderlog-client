import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'
import logo from '../css/suitcase.png'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="create-itinerary">Create New Itinerary</Link>
    <Link to="itineraries">View Itineraries</Link>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/">Home</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <React.Fragment>
    <header className="main-header">
      <h1>Wanderlog</h1>
      <img className="logo" src={logo} alt="Logo" />
      <nav>
        { alwaysOptions }
        { user && <span>Welcome, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </nav>
    </header>
  </React.Fragment>
)

export default Header
