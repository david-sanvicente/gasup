function initMap() {
  var location = {
    lat: 0,
    lng: 0,
    // lat: 41.8128929116136,
    // lng: -74.11378809013559,
  }

  var options = {
    center: location,
    zoom: 15,
  }

  if (navigator.geolocation) {
    console.log('geoLocation works!')

    navigator.geolocation.getCurrentPosition((loc) => {
      location.lat = loc.coords.latitude
      location.lng = loc.coords.longitude

      // render the map using user location
      map = new google.maps.Map(document.getElementById('map'), options)

      // testing putting down a marker
      new google.maps.Marker({
        position: location, // { lat: -25.363, lng: 131.044 }
        title: 'My 1st pin!',
        map: map,
      })

      // instantiate places service
      service = new google.maps.places.PlacesService(map)

      // request object
      var request = {
        location: location,
        radius: '999',
        type: ['gas_station'],
      }

      // nearby search request
      // service.nearbySearch(request, callback)
      service.nearbySearch(request, (res) => {
        // response is an Array of objects
        console.log('response')
        console.log(res)

        // iterate through response
        res.forEach((station) => {
          // place id for details request
          console.log('place_id: ', station.place_id)

          // check rating
          console.log('price level: ', station.price_level)

          // make new marker for each station
          new google.maps.Marker({
            position: {
              lat: station.geometry.viewport.Ab.h,
              lng: station.geometry.viewport.Ua.h,
            }, // { lat: -25.363, lng: 131.044 }
            title: station.name,
            map: map,
          })

          // request for details
          var request = {
            placeId: station.place_id,
            // fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
          }

          // service = new google.maps.places.PlacesService(map)
          service.getDetails(request, (res) => {
            console.log('detail')
            console.log(res)
          })
        })
      })
    })
  }
}

// function callback(results, status) {
//   console.log('results')
//   console.log(results)
//   // if (status == google.maps.places.PlacesServiceStatus.OK) {
//   //   for (var i = 0; i < results.length; i++) {
//   //     // createMarker(results[i])
//   //     console.log('results[i]', results[i])
//   //   }
//   // }
// }
