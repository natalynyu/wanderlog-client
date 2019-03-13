import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { viewItineraries, deleteItinerary } from '../api'
import messages from '../messages'

import './ViewItineraries.scss'
import Button from 'react-bootstrap/Button'

class ViewItineraries extends Component {
  constructor (props) {
    super(props)
    this.state = {
      locations: ''
    }
    this.onDeleteItinerary = this.onDeleteItinerary.bind(this)
  }

  onDeleteItinerary = (id, event) => {
    event.preventDefault()

    const {
      alert,
      history,
      user
    } = this.props

    deleteItinerary(user, id)
      .then(() => this.setState(prevState => {
        // filter itineraries array to keep itineraries where id is not equal to the one we deleted - id is the one we deleted
        return { itineraries: prevState.itineraries.filter(itinerary => itinerary._id !== id) }
      }))
      .then(() => alert(messages.deleteItinerarySuccess, 'success'))
      .then(() => history.push('/itineraries'))
      .catch(error => {
        console.error(error)
        alert(messages.deleteItineraryFailure, 'danger')
      })
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
            <table className="itinerary-table">
              <tr>
                <th>Destination</th>
                <th>Address</th>
              </tr>
              {itinerary.locations.map((location) => (
                <Fragment key={location._id}>
                  <tr>
                    <td>{location.name}</td>
                    <td>{location.address}</td>
                  </tr>
                </Fragment>
              ))}
            </table>
            { this.props.user._id === itinerary.owner
              ? <Fragment>
                <Button className="edit-button" variant="outline-info">Edit</Button>
                <Button className="delete-button" variant="outline-danger" onClick={this.onDeleteItinerary.bind(this, itinerary._id)}>Delete</Button>
              </Fragment> : ''
            }
          </Fragment>
        ))}
      </Fragment>
    )
  }
}
export default withRouter(ViewItineraries)
