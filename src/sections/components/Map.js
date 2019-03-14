import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

import './Map.scss'

const Location = ({ text }) => (
  <div className="location-marker">
    {text}
  </div>
)

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 42.35,
      lng: -71.0574
    },
    zoom: 15
  };

  render () {
    return (
      // Important! Always set the container height explicitly
      <div className="display-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Location
            lat={this.props.latitude}
            lng={this.props.longitude}
            text={this.props.locationName}
          />
        </GoogleMapReact>
      </div>
    )
  }
}

export default Map
