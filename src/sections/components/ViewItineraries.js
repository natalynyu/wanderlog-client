import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { viewItineraries } from '../api'
import messages from '../messages'

import apiUrl from '../../apiConfig'
import axios from 'axios'

class ViewItineraries extends Component {
  constructor () {
    super()
    this.state = {
      locations: ''
    }
  }

  componentDidMount () {
    axios({
      url: apiUrl + '/itineraries',
      method: 'get'
    })
    viewItineraries(this.state)
      .then(response => this.setState({ itineraries: response.data.itineraries }))
      .then(() => alert(messages.viewItinerariesSuccess, 'success'))
      .then(() => history.push('/itineraries'))
      .catch(error => {
        console.error(error)
        alert(messages.viewItinerariesFailure, 'danger')
      })
  }
  render () {
    if (!this.state.itineraries) {
      return <p>Loading...</p>
    }
    return (
      <Fragment>
        <h3>Itineraries</h3>
        <ul>
          {this.state.itinerary.map((itinerary) => (
            <li key={itinerary.id}>
              <Link to={`/itineraries/${itinerary.id}`}>{itinerary.locations.name}</Link>
            </li>
          ))}
        </ul>
      </Fragment>
    )
  }
}
export default withRouter(ViewItineraries)
