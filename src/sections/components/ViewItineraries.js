import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { viewItineraries } from '../api'
import messages from '../messages'

class ViewItineraries extends Component {
  constructor (props) {
    super(props)
    this.state = {
      locations: ''
    }
  }

  componentDidMount () {
    const { history, alert } = this.props
    viewItineraries(this.props.user)
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
        {this.state.itineraries.map((itinerary) => (
          <Fragment key={itinerary._id}>
            <h5>{itinerary.title}</h5>
            <p>Destination: {itinerary.locations[0].name}</p>
            <p>Address: {itinerary.locations[0].address}</p>
          </Fragment>
        ))}
      </Fragment>
    )
  }
}
export default withRouter(ViewItineraries)
