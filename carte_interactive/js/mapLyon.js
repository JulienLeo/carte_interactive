/* CREATION  MAP */
let Map = function () { // création de l'objet
  let leafletMap = L.map("map", {
    center: [45.7550596, 4.8541735], // coordonnées de la ville de Lyon
    zoom: 12.5,
    minZoom: 12,
    tap: true
  })

  let markers = new L.MarkerClusterGroup() // création des groupes de clusters à partir des markers
  let objectForm

  /* création calque */
  L.tileLayer("https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}", { // choix du calque utilisé
    minZoom: 12,
    tap: true
  }).addTo(leafletMap)

  /* création icônes */
  let greenIcon = L.icon({
    iconUrl: "../img/logos/velovert.png"
  })

  let redIcon = L.icon({
    iconUrl: "../img/logos/velovrouge.png"
  })

  let greenIconZero = L.icon({
    iconUrl: "../img/logos/velovertzero.png"
  })

  /* ajout marker */
  let marker
  addMarker = function (station) {
    marker = new L.marker([station.position.lat, station.position.lng], { // récupération des coordonnées de chaque marker
      icon: greenIcon, // icône verte lorsque la station est ouverte
      title: station.name
    })

    if (station.status == "CLOSED") {
      marker = new L.marker([station.position.lat, station.position.lng], { // récupération des coordonnées de chaque marker
        icon: redIcon, // icône rouge lorsque la station est fermée
        title: station.name
      })
    }

    if (station.available_bikes == 0) {
      marker = new L.marker([station.position.lat, station.position.lng], { // récupération des coordonnées de chaque marker
      icon: greenIconZero, // icône verte avec un point rouge lorsque la station est ouverte mais qu'aucun vélo n'est disponible
      title: station.name
      })
    }

    /* ajout marker cluster */
    markers.addLayer(marker)
    leafletMap.addLayer(markers)

    marker.addEventListener("click", function () { // événement suite au clic sur un marker
      if (objectForm !== undefined) { // on ne réouvre pas de formulaire s'il est déjà ouvert pour éviter la superposition
        objectForm.station = station
      } else {
        objectForm = new Form(station) // ouverture d'un nouveau formulaire
      }
      objectForm.infos() // contenu du formulaire
    })
  }

  /*RECUPERATION DE L'API DE JCDECAUX */
  ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=6a409fbf20a07d1574bf8eeecdb0c3b5826a4fb7", function (reponse) {
    let stations = JSON.parse(reponse) // récupération de la réponse

    stations.forEach(function (station) { // transformation de la réponse et ajout d'un marker à chaque station
      addMarker(station)
    })
  })
}

let mapLyon = new Map() // ouverture de la map à l'ouverture de la page