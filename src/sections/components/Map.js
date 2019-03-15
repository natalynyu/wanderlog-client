import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

import './Map.scss'

import config from '../../config'

import getGoogle from '../lib/getGoogle'

const Location = ({ text }) => (
  <div className="location-marker">
    {text}
  </div>
)

const loader = async (keys) => {
  const google = await getGoogle()
  return google.maps
}

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 42.35,
      lng: -71.0574
    },
    zoom: 10
  };

  render () {
    const latitudeArray = this.props.locations.map((location) => (
      location.latitude
    ))
    const minLatitude = Math.min(...latitudeArray)
    const maxLatitude = Math.max(...latitudeArray)
    const avgLatitude = (minLatitude + maxLatitude) / 2

    const longitudeArray = this.props.locations.map((location) => (
      location.longitude
    ))
    const minLongitude = Math.min(...longitudeArray)
    const maxLongitude = Math.max(...longitudeArray)
    const avgLongitude = (minLongitude + maxLongitude) / 2

    const latRatio = Math.abs(maxLatitude - minLatitude) / 180
    const lonRatio = Math.abs(maxLongitude - minLongitude) / 360
    const maxRatio = Math.max(latRatio, lonRatio)

    const center = { lat: avgLatitude, lng: avgLongitude }
    // - Math.max with 0 to prevent negatives
    // - Math.floor(...) because zoom must be a whole number and better to floor than ceil (so there is not too little room)
    // - Use 18 as max zoom and subtract a ratio of 18 determined by 1000 * maxRatio
    // - We multiply by 1000 as a guess of a good number because i
    const zoom = Math.max(Math.floor(18 * (1 - (1000 * maxRatio)), 0))

    let i = 1
    return (
      // Important! Always set the container height explicitly
      <div className="display-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: config.GOOGLE_API_KEY }}
          defaultCenter={center}
          defaultZoom={zoom}
          googleMapLoader={loader}
        >
          {this.props.locations.map((location) => (
            <Location
              key={i++} lat={location.latitude} lng={location.longitude} text={location.name}
            />
          ))}
        </GoogleMapReact>
      </div>
    )
  }
}

export default Map
