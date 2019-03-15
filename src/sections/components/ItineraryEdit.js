import React, { Component } from 'react'

import { updateItinerary } from '../api'
import messages from '../messages'

import Button from 'react-bootstrap/Button'

import validateItinerary from '../lib/validateItinerary'

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

    try {
      const itinerary = await validateItinerary(this.state.itinerary)
      updateItinerary(itinerary, user, this.props.itinerary._id)
        .then(() => this.props.onSuccess(itinerary))
        .then(() => alert(messages.updateItinerarySuccess, 'success'))
        .catch(e => {
          alert(messages.updateItineraryFailure, 'danger')
        })
    } catch (e) {
      alert(messages.updateItineraryFailure, 'danger')
    }
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
