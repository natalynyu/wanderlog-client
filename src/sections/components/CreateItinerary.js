import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

import { createItinerary } from '../api'
import messages from '../messages'

import apiUrl from '../../apiConfig'
import axios from 'axios'

class CreateItinerary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      locations: []
    }
  }

  add () {
    this.setState((state, props) => {
      return { locations: [...state.locations, {}] }
    })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreateItinerary = event => {
    event.preventDefault()

    const {
      alert,
      history,
      user
    } = this.props

    axios({
      url: apiUrl + '/movies',
      method: 'post',
      data: {
        itinerary: {
          title: this.state.itineraryTitle,
          locations: this.state.locations
        }
      }
    })

    createItinerary(this.state, user)
      .then(() => alert(messages.createItinerarySuccess, 'success'))
      .then(() => history.push('/create-itinerary'))
      .catch(error => {
        console.error(error)
        alert(messages.createItineraryFailure, 'danger')
        this.setState({
          itineraryTitle: '',
          locations: []
        })
      })
  }

  render () {
    const {
      itineraryTitle
    } = this.state

    return (
      <React.Fragment>
        <h3>New Itinerary</h3>
        <form className='create-itinerary-form' onSubmit={this.onCreateItinerary}>
          <label htmlFor="itineraryTitle">Itinerary Name</label>
          <input
            required
            name="itineraryTitle"
            value={itineraryTitle}
            type="text"
            placeholder="Hidden Gems of Rome"
            onChange={this.handleChange}
          />
          <div>
            <label htmlFor="locationName">Location Name: </label>
            <input
              required
              name="location"
              value={location.name}
              type="text"
              placeholder="Location Name"
              onChange={this.handleChange}
            />
            <label htmlFor="locationName">Address: </label>
            <input
              required
              name="address"
              value={location.address}
              type="text"
              placeholder="Location Address"
              onChange={this.handleChange}
            />
          </div>
          {this.state.locations.map(location =>
            <div key={location.id}>
              <label htmlFor="locationName">Location Name:</label>
              <input
                required
                name="location"
                value={location.name}
                type="text"
                placeholder="Location Name"
                onChange={this.handleChange}
              />
              <label htmlFor="locationName">Address:</label>
              <input
                required
                name="address"
                value={location.address}
                type="text"
                placeholder="Location Address"
                onChange={this.handleChange}
              />
            </div>
          )}
          <React.Fragment>
            <button type="button" onClick={this.add}>Add a location</button>
            <button type="submit">Create Itinerary</button>
          </React.Fragment>
        </form>
      </React.Fragment>
    )
  }
}

export default withRouter(CreateItinerary)
