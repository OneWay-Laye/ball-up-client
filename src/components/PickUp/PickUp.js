import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Link, withRouter } from 'react-router-dom'

import { indexPickup } from './../../api/pick-up-games'
import messages from '../AutoDismissAlert/messages'
import './PickUp.scss'

class PickUp extends Component {
  constructor () {
    super()
    this.state = {
      meetups: null
    }
  }

  componentDidMount () {
    indexPickup()
      .then(res => this.setState({ meetups: res.data }))
      .then(() => this.props.msgAlert({
        heading: 'All Parks Success',
        message: messages.indexPickupSuccess,
        variant: 'success'
      }))
      .catch(() => this.props.msgAlert({
        heading: 'All Parks Failure',
        message: messages.indexPickupFailure,
        variant: 'danger'
      }))
  }

  render () {
    let pickupJsx = ''

    console.log(this.state.meetups)
    if (this.state.meetups === null) {
      pickupJsx = <Spinner animation="border" variant="warning" />
    } else if (this.state.meetups.length === 0) {
      pickupJsx = <p>There are no Meet Ups. Go create one and invite friends.</p>
    } else if (this.state.meetups.length > 0 && !this.props.user) {
      pickupJsx = this.state.meetups.map(meet => (
        <div className='meetupCard' key={meet.id}>
          <h3 className='meetupCard-Title'>Game At: {meet.park.name}</h3>
          <p className='meetupCard-Addy'>Address: {meet.park.address}</p>
          <p className='meetupCard-Date'>Date: {meet.scheduled}</p>
        </div>
      ))
    } else {
      pickupJsx = this.state.meetups.map(meet => (
        <div className='meetupCard' key={meet.id}>
          <h3 className='meetupCard-Title'>Game At: {meet.park.name}</h3>
          <p className='meetupCard-Addy'>Address: {meet.park.address}</p>
          <p className='meetupCard-Date'>Date: {meet.scheduled}</p>
          {this.props.user.id === meet.owner ? <div>
            <Link to={`/edit-pickup/${meet.id}`}><button className='meetupCard-Button'>Edit PickUp</button></Link>
          </div> : null}
        </div>
      ))
    }

    return (
      <div className="meetup-Wrapper">
        <h1>Im in pickup</h1>
        {pickupJsx}
      </div>
    )
  }
}

export default withRouter(PickUp)
