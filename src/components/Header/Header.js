import React, { Fragment } from 'react'
// import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'
import './Header.scss'

const Header = ({ user }) => {
  const authenticatedOptions = (
    <Fragment>
      <li><a href="#/change-password">Change Password</a></li>
      <li><a href="#/sign-out">Sign Out</a></li>
    </Fragment>
  )

  const unauthenticatedOptions = (
    <Fragment>
      <li><a href="#/sign-up">Sign Up</a></li>
      <li><a href="#/sign-in">Sign In</a></li>
    </Fragment>
  )

  const alwaysOptions = (
    <Fragment>
      <li><a href="#/">Home</a></li>
    </Fragment>
  )
  //
  // const Header = ({ user }) => (
  //   <Navbar className="nav" bg="primary" variant="dark" expand="md">
  //     <Navbar.Brand href="#">
  //       react-auth-template
  //     </Navbar.Brand>
  //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //     <Navbar.Collapse id="basic-navbar-nav">
  //       <Nav className="ml-auto">
  //         { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
  //         { alwaysOptions }
  //         { user ? authenticatedOptions : unauthenticatedOptions }
  //       </Nav>
  //     </Navbar.Collapse>
  //   </Navbar>
  // )
  return (
    <nav className='mainNav'>
      <a className='brand' href='/'>Ball Up</a>
      <ul className='mainNav-links'>
        { user && <span className="mainNav-Welcome">Welcome, {user.email}</span>}
        {alwaysOptions}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </ul>
    </nav>
  )
}

export default Header
