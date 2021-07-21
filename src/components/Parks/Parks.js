import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Link, withRouter } from 'react-router-dom'

import './Parks.scss'
import messages from '../AutoDismissAlert/messages'
import { getAllParks } from './../../api/park'

class Parks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      parks: null,
      showCreate: false
    }
  }

  componentDidMount () {
    getAllParks()
      .then(res => this.setState({ parks: res.data.parks }))
      .then(() => this.props.msgAlert({
        heading: 'All Parks Success',
        message: messages.indexParkSuccess,
        variant: 'success'
      }))
      .catch(() => this.props.msgAlert({
        heading: 'All Parks Failure',
        message: messages.indexParkFailure,
        variant: 'danger'
      }))
  }

  handleShowForm () {
    this.setState({ showCreate: true })
  }

  render () {
    const { parks } = this.state
    let parksJsx = ''

    //  This will be for the parkJsx
    if (parks === null) {
      parksJsx = <Spinner animation="border" variant="warning" />
    } else if (parks.length === 0) {
      parksJsx = <p>There are no parks in the area</p>
    } else if (!this.props.user && parks.length > 0) {
      parksJsx = this.state.parks.map(park => (
        <div className="parkCard" key={park.id}>
          <h3 className="parkCard-Name">{park.name}</h3>
          <p className="parkCard-Address"><span className='parkCard-Title'>Address:</span> {park.address}</p>
          <p className="parkCard-Courts"><span className='parkCard-Title'>Number of courts:</span> {park.numOfCourts}</p>
          {park.indoor ? <p className="parkCard-Type">Type: Indoor</p> : <p className="parkCard-Type">Type: Outdoor</p>}
        </div>
      ))
    } else if (this.props.user && parks.length > 0) {
      parksJsx = parks.map(park => (
        <div className="parkCard" key={park.id}>
          <h3 className="parkCard-Name">{park.name}</h3>
          <p className="parkCard-Address"><span className='parkCard-Title'>Address:</span> {park.address}</p>
          <p className="parkCard-Courts"><span className='parkCard-Title'>Number of courts:</span> {park.numOfCourts}</p>
          {park.indoor ? <p className="parkCard-Type">Type: Indoor</p> : <p className="parkCard-Type">Type: Outdoor</p>}
          <div className="parkCard-Button-Container">
            <Link to={`/create-pickup/${park.id}`}><button className="parkCard-Button">Start Pickup Game at this Park</button></Link>
          </div>
        </div>
      ))
    }

    return (
      <div className="parksWrapper">
        {parksJsx}
      </div>
    )
  }
}
export default withRouter(Parks)
