const request = require('request')
// Geocoding with mapbox
const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +
  '.json?access_token=pk.eyJ1IjoiaWx5b3NzIiwiYSI6ImNqdmdxOWR2NjBhaWQ0M3E4eWw2aGJpM3AifQ.EXgHLqbNYFBMdiFgVFen5Q&limit=1'

  request({ url: url, json: true}, (error, response) => {
    if (error) {
      callback('Unnable to connect to location services!', undefined)
    } else if (response.body.features.length === 0){
      callback('Unable to find location. Try another search.', undefined)
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
