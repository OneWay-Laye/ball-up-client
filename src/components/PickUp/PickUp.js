import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Link, withRouter } from 'react-router-dom'

import { indexPickup } from './../../api/pick-up-games'
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
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => this.setState({ meetups: res.data }))
  }

  render () {
    let pickupJsx = ''
    // const editPUJsx = <div>
    //   <button>Update Pickup Game</button>
    //   <button onClick{}>Delete Pickup Game</button>
    // </div>

    console.log(this.state.meetups)
    if (this.state.meetups === null) {
      pickupJsx = <Spinner animation="border" variant="warning" />
    } else if (this.state.meetups.length === 0) {
      pickupJsx = <p>There are no Meet Ups. Go create one and invite friends.</p>
    } else if (this.state.meetups.length > 0 && !this.props.user) {
      pickupJsx = this.state.meetups.map(meet => (
        <div className='meetupCard' key={meet.id}>
          <h3>Game At: {meet.park.name}</h3>
          <p>Address: {meet.park.address}</p>
          <p>Date: {meet.scheduled}</p>
        </div>
      ))
    } else {
      pickupJsx = this.state.meetups.map(meet => (
        <div className='meetupCard' key={meet.id}>
          <h3>Game At: {meet.park.name}</h3>
          <p>Address: {meet.park.address}</p>
          <p>Date: {meet.scheduled}</p>
          {this.props.user.id === meet.owner ? <div>
            <Link to={`/edit-pickup/${meet.id}`}><button>Edit PickUp</button></Link>
          </div> : null}
        </div>
      ))
    }

    return (
      <div>
        <h1>Im in pickup</h1>
        {pickupJsx}
      </div>
    )
  }
}

export default withRouter(PickUp)
