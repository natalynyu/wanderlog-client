import apiUrl from '../apiConfig'
import axios from 'axios'

export const createItinerary = credentials => {
  return axios({
    method: 'POST',
    url: apiUrl + '/create-itinerary',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}
