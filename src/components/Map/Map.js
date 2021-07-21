import React, { useState, useEffect } from 'react'
import './Map.scss'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { getAllParks } from './../../api/park'

function Map () {
  const [viewport, setViewport] = useState({
    width: '55vw',
    height: '100vh',
    latitude: 33.749,
    longitude: -84.38798,
    zoom: 11
  })
  const [parks, setParks] = useState([])
  const [selectedPark, setSelectedPark] = useState(null)

  useEffect(() => {
    getAllParks()
      .then(res => setParks(res.data.parks))
  }, [])

  return (<div>
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken='pk.eyJ1Ijoib25ld2F5LWxheWUiLCJhIjoiY2txemY2a3UwMWhxNzJ3dDl2djQxdDJleiJ9.EaG0YrMHL5nueHGa5ETY3Q'
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {parks.map(park => (
        <Marker
          key={park.id}
          latitude={Number(park.latitude)}
          longitude={Number(park.longitude)}
        >
          <button
            className='markerButton'
            onClick={event => {
              event.preventDefault()
              setSelectedPark(park)
            }}>
            <img src='./../../../668-basketball.svg' alt='basketball-icon'/>
          </button>
        </Marker>
      ))}

      {selectedPark && (
        <Popup
          latitude={Number(selectedPark.latitude)}
          longitude={Number(selectedPark.longitude)}
          onClose={() => { setSelectedPark(null) }}
        >
          <div>
            <h2>{selectedPark.name}</h2>
            <p>{selectedPark.address}</p>
            <button>View this parks games</button>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  </div>
  )
}

export default Map
