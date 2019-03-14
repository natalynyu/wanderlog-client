import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

import { createItinerary } from '../api'
import messages from '../messages'

import Button from 'react-bootstrap/Button'

import pic21 from '../../css/21.png'
import pic22 from '../../css/22.png'
import pic23 from '../../css/23.png'
import pic24 from '../../css/24.png'
import pic25 from '../../css/25.png'
import pic26 from '../../css/26.png'

class CreateItinerary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      locations: [this.createRow()],
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
      return { locations: [...state.locations, this.createRow()] }
    })
  }

  handleChange (event) {
    const target = event.target
    this.setState(function (state) {
      // copy old state
      const newState = {
        title: state.title,
        locations: state.locations.map(location => {
          return { ...location }
        })
      }
      // update (new) state based on what input was updated
      switch (target.name) {
      case 'name':
      case 'address':
        const id = target.getAttribute('data-id')
        for (let i = 0; i < newState.locations.length; i++) {
          const location = newState.locations[i]
          if (id === location.id) {
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

  onCreateItinerary (event) {
    event.preventDefault()

    const {
      alert,
      user,
      history
    } = this.props

    createItinerary(this.state, user)
      .then(() => history.push('/itineraries'))
      .then(() => alert(messages.createItinerarySuccess, 'success'))
      .catch(error => {
        console.error(error)
        alert(messages.createItineraryFailure, 'danger')
        this.setState({
          title: '',
          locations: []
        })
      })
  }

  render () {
    const {
      title
    } = this.state
    let locationId = 1
    return (
      <React.Fragment>
        <form className='create-itinerary-form' onSubmit={this.onCreateItinerary.bind(this)}>
          <h3>New Itinerary</h3>
          <label htmlFor="title">Itinerary Title</label>
          <input
            required
            name="title"
            value={title}
            type="text"
            placeholder="Best Cliff Diving Spots"
            onChange={this.handleChange}
          />
          <table>
            <tbody>
              {this.state.locations.map(location =>
                <tr key={locationId++}>
                  <td>
                    <label>Location Name:
                      <input
                        required
                        name="name"
                        value={location.name}
                        type="text"
                        placeholder="Location Name"
                        onChange={this.handleChange}
                        data-id={location.id}
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
                        data-id={location.id}
                      />
                    </label>
                  </td>
                </tr>
              )}
              <Button variant="outline-secondary" onClick={this.add}>Add a location</Button>
            </tbody>
          </table>
          <React.Fragment>
            <Button variant="outline-primary" type="submit">Create Itinerary</Button>
          </React.Fragment>
        </form>
        <section className="pictures">
          <img src={pic21} alt="pic21" />
          <img src={pic22} alt="pic22" />
          <img src={pic23} alt="pic23" />
          <img src={pic24} alt="pic24" />
          <img src={pic26} alt="pic26" />
          <img src={pic25} alt="pic25" />
        </section>
      </React.Fragment>
    )
  }
}

export default withRouter(CreateItinerary)
