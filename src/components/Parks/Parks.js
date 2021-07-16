import React, { Component } from 'react'

import { getAllParks } from './../../api/park'

import Spinner from 'react-bootstrap/Spinner'

class Parks extends Component {
  constructor () {
    super()
    this.state = {
      parks: null
    }
  }

  componentDidMount () {
    getAllParks()
      .then(res => this.setState({ parks: res.data.parks }))
  }

  render () {
    let parksJsx = ''

    if (this.state.parks === null) {
      parksJsx = <Spinner animation="border" variant="warning" />
    } else if (this.state.parks.length === 0) {
      parksJsx = <p>There are no parks in the area</p>
    }

    return (
      <div>
        im in parks
        {parksJsx}
      </div>
    )
  }
}
export default Parks
