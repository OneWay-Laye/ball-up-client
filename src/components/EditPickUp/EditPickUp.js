import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import messages from '../AutoDismissAlert/messages'
import './EditPickUp.scss'

import { showPickup, updatePickup, deletePickup } from './../../api/pick-up-games'

class EditPickUp extends Component {
  constructor () {
    super()
    this.state = {
      scheduled: '',
      meetup_id: null,
      meetup: null,
      isDeleted: false,
      isUpdated: false
    }
  }

  componentDidMount () {
    this.setState({ meetup_id: this.props.match.params.id })
    showPickup(this.props.match.params.id)
      .then(res => this.setState({ meetup: res.data }))
  }

  handleCancel = event => {
    event.preventDefault()
    this.props.history.push('/pickup')
  }

  handleDelete = event => {
    event.preventDefault()
    deletePickup(this.props.user, this.state.meetup_id)
      .then(() => this.props.msgAlert({
        heading: 'All Parks Success',
        message: messages.deletePickupSuccess,
        variant: 'success'
      }))
      .then(this.setState({ isDeleted: true }))
      .catch(() => this.props.msgAlert({
        heading: 'All Parks Failure',
        message: messages.deletePickupFailure,
        variant: 'danger'
      }))
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  handleSubmit = event => {
    event.preventDefault()
    updatePickup(this.props.user, this.state.meetup_id, this.state.scheduled)
      .then(() => this.props.msgAlert({
        heading: 'All Parks Success',
        message: messages.updatePickupSuccess,
        variant: 'success'
      }))
      .then(this.setState({ isUpdated: true }))
      .catch(() => this.props.msgAlert({
        heading: 'All Parks Failure',
        message: messages.updatePickupFailure,
        variant: 'danger'
      }))
  }

  render () {
    const { meetup, isDeleted, isUpdated } = this.state

    if (isDeleted || isUpdated) {
      return (<Redirect to={ { pathname: '/' }}/>)
    }

    let pickupInfoJsx = ''

    if (meetup === null) {
      pickupInfoJsx = <Spinner animation="border" variant="warning" />
    } else {
      pickupInfoJsx = <div className="editPU-Info-Container">
        <h2>Pickup game at {meetup.park.name}</h2>
        <p>Scheduled for {meetup.scheduled}</p>
        <p>Address is {meetup.park.address}</p>
      </div>
    }

    return (
      <div className="editPU-Container">
        <div className="editPU-Button-Container">
          <button className="editPU-Button cancel" type='button' onClick={this.handleCancel}>Cancel Update</button>
          <button className="editPU-Button delete" type='button' onClick={this.handleDelete}>Delete Pickup Game</button>
        </div>
        {pickupInfoJsx}
        <div className="editPU-Form-Container">
          <h3 className="editPU-Form-Title">Change Scheduled date</h3>
          <form className="editPU-Form">
            <input type='date' name="scheduled" onChange={this.handleChange} value={this.state.scheduled}/>
            <button className="editPU-Button" type='button' onClick={this.handleSubmit}>Confirm Updated Date</button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(EditPickUp)
