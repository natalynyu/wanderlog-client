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
  constructor (props) {
    super(props)
    this.state = {
      locations: props.locations.filter((location) => {
        if (!location.latitude || !location.longitude) {
          // returning false means don't keep that record & don't try to find it on map
          return false
        }
        return true
      })
    }
  }
  static defaultProps = {
    center: {
      lat: 42.35,
      lng: -71.0574
    },
    zoom: 10
  };

  computeCenterAndZoom () {
    // if there are no locations, return default zoom and center
    if (!this.state.locations.length) {
      return Map.defaultProps
    }
    // loop through locations array (an array of objects), get the values of latitude
    const latitudeArray = this.state.locations.map((location) => (
      location.latitude
    ))
    // taking the things in the array. Math.min takes a variable number of arguments - must convert
    // the array to multiple arguments... Math.min would take arguments like 2, 3, 4, 5 but not an array
    const minLatitude = Math.min(...latitudeArray)
    const maxLatitude = Math.max(...latitudeArray)
    const avgLatitude = (minLatitude + maxLatitude) / 2

    const longitudeArray = this.state.locations.map((location) => (
      location.longitude
    ))
    const minLongitude = Math.min(...longitudeArray)
    const maxLongitude = Math.max(...longitudeArray)
    const avgLongitude = (minLongitude + maxLongitude) / 2

    const latRatio = Math.abs(maxLatitude - minLatitude) / 180
    const lonRatio = Math.abs(maxLongitude - minLongitude) / 360
    // Use the bigger ratio of the two so that it's visible
    const maxRatio = Math.max(latRatio, lonRatio)

    const center = { lat: avgLatitude, lng: avgLongitude }
    // - Math.max with 0 to prevent negatives
    // - Math.floor(...) because zoom must be a whole number and better to floor than ceil (so there is not too little room)
    // When places are closer together, their maxRatio will be smaller
    // and then their log will be more negative
    // and so their negative of the log will be higher (closer to all the way zoomed in).
    // The 1.5 is a guess factor to make the zooming look reasonable.
    // 0 is zoomed all the way out. 18 is zoomed all the way in
    const zoom = Math.max(Math.floor(Math.log(maxRatio) * -1.5), 0)
    // shorthand for { center: center, zoom: zoom }
    return { center, zoom }
  }
  render () {
    const { center, zoom } = this.computeCenterAndZoom()
    let i = 1
    return (
      <div className="display-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: config.GOOGLE_API_KEY }}
          defaultCenter={center}
          defaultZoom={zoom}
          // The GoogleMapReact component expects a function which returns a promise resolving to the google.maps object
          googleMapLoader={loader}
        >
          {this.state.locations.map((location) => (
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
