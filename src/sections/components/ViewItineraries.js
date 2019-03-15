import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import ItineraryEdit from './ItineraryEdit'
import { viewItineraries, deleteItinerary } from '../api'
import messages from '../messages'

import './ViewItineraries.scss'
import Map from './Map.js'
import Button from 'react-bootstrap/Button'

import pic27 from '../../css/27.png'
import pic28 from '../../css/28.png'
import pic29 from '../../css/29.png'
import pic30 from '../../css/30.png'
import pic31 from '../../css/31.png'
import pic32 from '../../css/32.png'

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
      .catch(e => {
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
      .catch(e => {
        alert(messages.viewItinerariesFailure, 'danger')
      })
  }
  render () {
    if (!this.state.itineraries) {
      return <p>Loading...</p>
    }
    return (
      <Fragment>
        <section className="view-itineraries-section">
          <h4>Itineraries</h4>
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
                <Map locations={itinerary.locations} />
              </Fragment>
          ))}
        </section>
        <section className="pictures">
          <img src={pic27} alt="pic27" />
          <img src={pic28} alt="pic28" />
          <img src={pic29} alt="pic29" />
          <img src={pic30} alt="pic30" />
          <img src={pic31} alt="pic31" />
          <img src={pic32} alt="pic32" />
        </section>
      </Fragment>
    )
  }
}
export default withRouter(ViewItineraries)
