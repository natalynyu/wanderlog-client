import apiUrl from '../apiConfig'
import axios from 'axios'

export const createItinerary = (state, user) => {
  console.log(user)
  return axios({
    method: 'POST',
    url: apiUrl + '/create-itinerary',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { itinerary: state }
  })
}

export const viewItineraries = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/itineraries',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const deleteItinerary = (user, id) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + `/itineraries/${id}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
