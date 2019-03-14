import React, { Component } from 'react'

import { updateItinerary } from '../api'
import messages from '../messages'

import Button from 'react-bootstrap/Button'

import GoogleMapsLoader from 'google-maps'
GoogleMapsLoader.KEY = process.env.GOOGLE_API_KEY

let _google = null

function getGoogle () {
  return new Promise((resolve, reject) => {
    if (_google != null) {
      resolve(_google)
      return
    }
    GoogleMapsLoader.load(function (google) {
      _google = google
      resolve(_google)
    })
  })
}

function translateAddress (address) {
  return new Promise(async (resolve, reject) => {
    const google = await getGoogle()
    const geocoder = new google.maps.Geocoder()
    // geocoder.geocode makes an AJAX request - we give it a callback function
    geocoder.geocode({ address: address }, (results, status) => {
      if (status !== 'OK') {
        reject(new Error(`Failed to translate address: status: ${status}`))
        return
      }
      const location = results[0].geometry.location
      resolve({ latitude: location.lat(), longitude: location.lng() })
    })
  })
}

class ItineraryEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      itinerary: props.itinerary,
      failed: false
    }
    this.add = this.add.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  createRow () {
    return { id: String(Date.now()), name: '', address: '' }
  }

  add () {
    this.setState((state, props) => {
      return {
        ...state,
        itinerary: {
          ...state.itinerary,
          locations: [...state.itinerary.locations, this.createRow()]
        }
      }
    })
  }

  handleChange (event) {
    const target = event.target
    this.setState(function (state) {
      // copy old state
      const newState = {
        ...state,
        itinerary: {
          ...state.itinerary,
          title: state.itinerary.title,
          locations: state.itinerary.locations.map(location => {
            return { ...location }
          })
        }
      }
      // update (new) state based on what input was updated
      switch (target.name) {
      case 'name':
      case 'address':
        const id = target.getAttribute('data-id')
        for (let i = 0; i < newState.itinerary.locations.length; i++) {
          const location = newState.itinerary.locations[i]
          if (id === location._id || id === location.id) {
            location[target.name] = target.value
            break
          }
        }
        break
      default:
        newState[target.name] = target.value
        break
      }
      return newState
    })
  }

  async onSubmitEdit (event) {
    event.preventDefault()

    const {
      alert,
      user
    } = this.props

    const itinerary = {}
    itinerary.title = this.state.itinerary.title
    itinerary.locations = this.state.itinerary.locations
      .filter(location => location.name !== '' || location.address !== '')
    for (const location of itinerary.locations) {
      if (!location.latitude && !location.longitude) {
        const coords = await translateAddress(location.address)
        location.latitude = coords.latitude
        location.longitude = coords.longitude
      }
    }
    updateItinerary(itinerary, user, this.props.itinerary._id)
      .then(() => this.props.onSuccess(itinerary))
      .then(() => alert(messages.updateItinerarySuccess, 'success'))
      .catch(error => {
        console.error(error)
        alert(messages.updateItineraryFailure, 'danger')
      })
  }

  render () {
    return (
      <React.Fragment>
        <form className='update-itinerary-form' onSubmit={this.onUpdateItinerary}>
          <label htmlFor="title">List Name</label>
          <input
            required
            name="title"
            value={this.state.itinerary.title}
            type="text"
            placeholder="Best Cliff Diving Spots"
            onChange={this.handleChange}
          />
          <table>
            <tbody>
              {this.state.itinerary.locations.map(location =>
                <tr key={location._id || location.id}>
                  <td>
                    <label>Location Name:
                      <input
                        required
                        name="name"
                        value={location.name}
                        type="text"
                        placeholder="Location Name"
                        onChange={this.handleChange}
                        data-id={location._id || location.id}
                      />
                    </label>
                  </td>
                  <td>
                    <label >Address:
                      <input
                        required
                        name="address"
                        value={location.address}
                        type="text"
                        placeholder="Location Address"
                        onChange={this.handleChange}
                        data-id={location._id || location.id}
                      />
                    </label>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <React.Fragment>
            <Button variant="outline-primary" onClick={this.add}>Add a location</Button>
            <Button variant="outline-primary" onClick={this.onSubmitEdit.bind(this)}>Edit Itinerary</Button>
          </React.Fragment>
        </form>
      </React.Fragment>
    )
  }
}

export default ItineraryEdit
