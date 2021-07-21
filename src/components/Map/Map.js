import React, { useState, useEffect } from 'react'
import './Map.scss'
import ReactMapGL, { Marker } from 'react-map-gl'
import { getAllParks } from './../../api/park'

function Map () {
  const [viewport, setViewport] = useState({
    width: '60vw',
    height: '100vh',
    latitude: 33.749,
    longitude: -84.38798,
    zoom: 11
  })
  const [parks, setParks] = useState([])

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
          <button className='markerButton'>
            <img src='./../../../public/668-basketball.svg' alt='basketball-icon'/>
          </button>
        </Marker>
      ))}
    </ReactMapGL>
  </div>
  )
}

export default Map
