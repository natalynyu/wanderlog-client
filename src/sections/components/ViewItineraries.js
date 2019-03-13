import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import ItineraryEdit from './ItineraryEdit'
import { viewItineraries, deleteItinerary } from '../api'
import messages from '../messages'

import './ViewItineraries.scss'
import Button from 'react-bootstrap/Button'

class ViewItineraries extends Component {
  constructor (props) {
    super(props)
    this.state = {
      locations: '',
      editing: null
    }
    this.onEditSuccess = this.onEditSuccess.bind(this)
  }

  onDeleteItinerary = (id, event) => {
    event.preventDefault()

    const {
      alert,
      user
    } = this.props

    deleteItinerary(user, id)
      .then(() => this.setState(prevState => {
        // filter itineraries array to keep itineraries where id is not equal to the one we deleted - id is the one we deleted
        return { itineraries: prevState.itineraries.filter(itinerary => itinerary._id !== id) }
      }))
      .then(() => alert(messages.deleteItinerarySuccess, 'success'))
      .catch(error => {
        console.error(error)
        alert(messages.deleteItineraryFailure, 'danger')
      })
  }

  onEditItinerary = (id, event) => {
    this.setState((state, props) => {
      return { ...state, editing: id }
    })
  }

  onEditSuccess = (edited) => {
    this.setState((state, props) => {
      return {
        itineraries: state.itineraries.map(itinerary => {
          if (itinerary._id === edited._id) {
            return edited
          }
          return itinerary
        }),
        editing: null
      }
    })
  }

  componentDidMount () {
    const { alert } = this.props
    viewItineraries(this.props.user)
      .then(response => this.setState({ itineraries: response.data.itineraries }))
      .then(() => alert(messages.viewItinerariesSuccess, 'success'))
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
        {this.state.itineraries.map(itinerary => (
          this.state.editing === itinerary._id
            ? <ItineraryEdit key={itinerary._id} itinerary={itinerary} user={this.props.user} alert={this.props.alert}
              onSuccess={this.onEditSuccess} />
            : <Fragment key={itinerary._id}>
              <h5>{itinerary.title}</h5>
              <table className="itinerary-table">
                <tbody>
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
                </tbody>
              </table>
              {this.props.user._id === itinerary.owner
                ? <Fragment>
                  <Button className="edit-button" variant="outline-info" onClick={this.onEditItinerary.bind(this, itinerary._id)}>Edit</Button>
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
