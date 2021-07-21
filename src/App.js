import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import './App.scss'

// This will import axios calls

// This will import components
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
// import Map from './components/Map/Map'
import Parks from './components/Parks/Parks'
import PickUp from './components/PickUp/PickUp'
import CreatePickUp from './components/CreatePickUp/CreatePickUp'
import EditPickUp from './components/EditPickUp/EditPickUp'
import Mininav from './components/Mininav/Mininav'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: [],
      singlePark: {}
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  componentDidMount () {

  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <div className='page-Container'>
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        {/* <div className="map-Container">
          <Map parks={this.state.parks} />
        </div> */}
        <div className="interactive-Container">
          <Header user={user} />
          <Mininav />
          <Route exact path='/park' user={user} render={() => (
            <Parks msgAlert={this.msgAlert} user={user}/>
          )} />
          <Route exact path='/pickup' user={user} render={() => (
            <PickUp msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute path='/create-pickup/:id' user={user} render={() => (
            <CreatePickUp msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute path='/edit-pickup/:id' user={user} render={() => (
            <EditPickUp msgAlert={this.msgAlert} user={user}/>
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
        </div>

      </div>
    )
  }
}

export default App
