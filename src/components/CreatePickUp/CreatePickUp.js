import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
// import Select from 'react-select'

import { getAllParks } from './../../api/park'
import { createPickup } from './../../api/pick-up-games'
import messages from '../AutoDismissAlert/messages'

class CreatePickUp extends Component {
  constructor () {
    super()
    this.state = {
      isCreated: false,
      allParks: null,
      scheduled: null,
      player_id: null,
      park_id: null
    }
  }

  componentDidMount () {
    console.log(this.props.match)
    console.log(this.props)
    getAllParks()
      .then(res => this.setState({ allParks: res.data.parks }))

    this.setState({ park_id: this.props.match.params.id })
    this.setState({ player_id: this.props.user.id })

    // this.state.allParks.map(park => [{this.state.options.value: park.id, this.state.options.label: park.name}])
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state)
    createPickup(this.props.user, this.state)
      .then(() => this.props.msgAlert({
        heading: 'Create PickUp Success',
        message: messages.createPickupSuccess,
        variant: 'success'
      }))
      .then(this.setState({ isCreated: true }))
      .catch(() => this.props.msgAlert({
        heading: 'Create PickUp Failure',
        message: messages.createPickupFailure,
        variant: 'danger'
      }))
  }

  render () {
    if (this.state.isCreated) {
      return (<Redirect to={ { pathname: '/' }}/>)
    }

    const formJsx = <form>
      <input type='date' name="scheduled" onChange={this.handleChange} value={this.state.scheduled}/>
      <button type='button' onClick={this.handleSubmit}>Confirm Game</button>
    </form>

    return (
      <div>{formJsx}</div>
    )
  }
}

export default withRouter(CreatePickUp)
