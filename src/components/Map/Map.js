import React, { useState } from 'react'

import ReactMapGL from 'react-map-gl'

function Map () {
  const [viewport, setViewport] = useState({
    width: '60vw',
    height: '100vh',
    latitude: 33.749,
    longitude: -84.38798,
    zoom: 11
  })

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken='pk.eyJ1Ijoib25ld2F5LWxheWUiLCJhIjoiY2txemY2a3UwMWhxNzJ3dDl2djQxdDJleiJ9.EaG0YrMHL5nueHGa5ETY3Q'
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >

    </ReactMapGL>
  )
}

export default Map
