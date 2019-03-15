import GoogleMapsLoader from 'google-maps'

import config from '../../config'

GoogleMapsLoader.KEY = config.GOOGLE_API_KEY

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

async function validateItinerary (i) {
  const itinerary = {
    ...i,
    locations: i.locations
      .filter(location => location.name !== '' || location.address !== '')
  }
  for (const location of itinerary.locations) {
    if (!location.latitude && !location.longitude) {
      const coords = await translateAddress(location.address)
      location.latitude = coords.latitude
      location.longitude = coords.longitude
    }
  }
  return itinerary
}

export default validateItinerary
