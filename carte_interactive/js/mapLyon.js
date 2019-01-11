/* CREATION  MAP */
let Map = function () {
  let leafletMap = L.map("map", {
    center: [45.7550596, 4.8541735],
    zoom: 12.5,
    minZoom: 12,
    tap: true
  })

  let markers = new L.MarkerClusterGroup()
  let objectForm

  /* création calque */
  L.tileLayer("https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}", {
    minZoom: 12
  }).addTo(leafletMap)

  /* création icônes */
  let greenIcon = L.icon({
    iconUrl: "../img/logos/velovert.png"
  })

  let redIcon = L.icon({
    iconUrl: "../img/logos/velovrouge.png"
  })

  /* ajout marker */
  let marker
  addMarker = function (station) {
    marker = new L.marker([station.position.lat, station.position.lng], {
      icon: greenIcon,
      title: station.name
    })

    if (station.status == "CLOSED") {
      marker = new L.marker([station.position.lat, station.position.lng], {
        icon: redIcon,
        title: station.name
      })
    }

    /* ajout marker cluster */
    markers.addLayer(marker)
    leafletMap.addLayer(markers)

    marker.addEventListener("click", function () {
      if (objectForm !== undefined) {
        objectForm.station = station
      } else {
        objectForm = new Form(station)
      }
      objectForm.infos()
    })
  }

  ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=6a409fbf20a07d1574bf8eeecdb0c3b5826a4fb7", function (reponse) {
    let stations = JSON.parse(reponse)


    stations.forEach(function (station) {
      addMarker(station)
    })
  })
}

let mapLyon = new Map()