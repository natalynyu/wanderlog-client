import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

import { createItinerary } from '../api'
import messages from '../messages'

import apiUrl from '../../apiConfig'
import axios from 'axios'

class CreateItinerary extends Component {
  constructor () {
    super()

    this.state = {
      itineraryTitle: '',
      locations: []
    }
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
      itineraryTitle,
      locations
    } = this.state

    return (
      <form className='create-itinerary-form' onSubmit={this.onCreateItinerary}>
        <h3>Create a New Itinerary</h3>
        <label htmlFor="machine">Itinerary Title</label>
        <input
          required
          name="itineraryTitle"
          value={itineraryTitle}
          type="text"
          placeholder="Title"
          onChange={this.handleChange}
        />
        <label htmlFor="locationName">Location Name</label>
        <input
          required
          name="locations"
          value={locations}
          type="text"
          placeholder="Location"
          onChange={this.handleChange}
        />
        <button type="submit">Create Itinerary</button>
      </form>
    )
  }
}

export default withRouter(CreateItinerary)
