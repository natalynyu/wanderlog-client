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

export default getGoogle
