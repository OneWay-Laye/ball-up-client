import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import { showPickup } from './../../api/pick-up-games'

class EditPickUp extends Component {
  constructor () {
    super()
    this.state = {
      scheduled: null,
      meetup_id: null
    }
  }

  componentDidMount () {
    this.setState({ mee })
  }

  render () {
    return (
      <div className="EditPU-Container">
        <div>
          <button>Cancel Update</button>
          <button>Delete Pickup Game</button>
        </div>
        <div className="EditPU-Form-Container">

        </div>
      </div>
    )
  }
}

export default withRouter(EditPickUp)
