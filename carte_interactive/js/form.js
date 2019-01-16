let Form = function(station) {
  /* CREATION ELEMENTS */
  let that = this
  that.station = station
  that.bikeNumber
  that.lastName
  that.firstName
  that.endReservation
  let ctx = document.getElementById("canvas").getContext("2d")

  /* RECUPERATION ELEMENTS HTML */
  let sectionMap = document.getElementById("map")
  let aside = document.getElementById("aside")
  let infos = document.getElementById("infos")
  let reservation = document.getElementById("reservation")
  let buttonRes = document.getElementById("buttonRes")
  let buttonCancelAsideWhile = document.getElementById("buttonCancelAsideWhile")
  let stationElt = document.getElementById("stationElt")
  let statusElt = document.getElementById("statusElt")
  let addressElt = document.getElementById("addressElt")
  let availableBikes = document.getElementById("availableBikes")
  let availableStands = document.getElementById("availableStands")
  let fields = document.getElementById("fields")
  let lastName = document.getElementById("lastName")
  let firstName = document.getElementById("firstName")
  let choice = document.getElementById("choice")
  let numberChoice = document.getElementById("numberChoice")
  let option1 = document.getElementById("option1")
  let option2 = document.getElementById("option2")
  let option3 = document.getElementById("option3")
  let btnValidation = document.getElementById("btnValidation")
  let btnCancellation = document.getElementById("btnCancellation")
  let reservationStatus = document.getElementById("reservationStatus")
  let closeOrder = document.getElementById("closeOrder")
  let buttonOrder = document.getElementById("buttonOrder")
  let buttonCancelOrder = document.getElementById("buttonCancelOrder")
  let modals = document.getElementsByClassName("modal")

  window.onclick = function (event) { // disparition d'un modal apparu à l'écran
    if (event.target == document.getElementById("canvasModal") || event.target == document.getElementById("cancelModal") || event.target == document.getElementById("stationModal") || event.target == document.getElementById("veloModal") || event.target == document.getElementById("endModal") || event.target == document.getElementById("nameModal")) {
      for (let i = 0;  i < modals.length; i++) {
        modals[i].classList.remove("openModal")
      }
    }
  }

  /* METHODES */

  that.order = function () { // consultation de la commande en cours
    footer.classList.add("footerOpenOrder")
    reservationStatus.classList.add("reservationStatusOpenOrder")
    buttonOrder.classList.add("buttonOrderOpenOrder")
    buttonCancelOrder.classList.add("buttonCancelOrderOpenOrder")
    closeOrder.classList.add("closeOrderOpenOrder")
  }

  that.validation = function () { // validation de la commande au clic du bouton "Valider"
    that.date = new Date() // prise en compte de la date 
    if ((lastName.value == "") || (firstName.value == "")) { // obligation de remplir "Nom" et "Prénom"
      document.getElementById("nameModal").classList.add("openModal")
      document.getElementById("modalName").classList.add("modalOpen")
    } else if (objectCanvas.getDataURL() == objectCanvas.canvasO) { // obligation d'apposer une signature
      document.getElementById("canvasModal").classList.add("openModal")
      document.getElementById("modalCanvas").classList.add("modalOpen")
    } else { // une fois toutes les conditions remplies

      /* compteur */
      let x = numberChoice.value
      that.bikeNumber = parseInt(x)
      that.lastName = lastName.value
      that.firstName = firstName.value

      /* transformation des éléments de l'aside */
      let newAvailableBikes = (that.station.available_bikes - that.bikeNumber)
      let newAvailableBikeStands = (that.station.available_bike_stands + that.bikeNumber)
      availableBikes.textContent = "Vélos disponibles : " + newAvailableBikes
      availableStands.textContent = "Places disponibles : " + newAvailableBikeStands
      if (newAvailableBikes < 2) {
        availableBikes.textContent = "Vélo disponible : " + newAvailableBikes
      }
      if (newAvailableBikeStands < 2) {
        availableStands.textContent = "Place disponible : " + newAvailableBikeStands
      }

      aside.classList.remove("asideReservation")
      reservation.classList.remove("reservationReservation")
      fields.classList.remove("fieldsReservation")
      choice.classList.remove("reservationChoice")
      sectionMap.classList.add("mapValidated")
      buttonCancelAsideWhile.classList.add("buttonCancelAsideWhileValidated")

      /* footer */
      footer.classList.add("footerValidated")
      if (footer.classList.contains("footerValidated")) {
        buttonRes.classList.add("buttonResReservation")
      }   

      /* media queries */
      aside.classList.add("asideValidated")

      /* calcul durée session storage + différence timer */
      let reservationLength = 120
      let reservationLengthMS = reservationLength * 1000
      let date = new Date().getTime()
      that.endReservation = date + reservationLengthMS

      chrono1.start(reservationLength, that) // lancement du chrono

      let storage = new Storage(that) // lancement du storage
      let locStorage = new LocalStorage(that.lastName, that.firstName)
      Storage(that)

      /* bouton commande du footer */
      buttonOrder.addEventListener("click", function order() {
        that.order()
      })

      /* retour et réduction footer */
      closeOrder.addEventListener("click", function closeOrder() {
        that.closeOrder()
      })

      /*annulation commande */
      buttonCancelOrder.addEventListener("click", function cancelOrder() {
        that.cancelOrder()
      })

      buttonCancelAsideWhile.addEventListener("click", function cancelOrder() {
        that.cancelOrder()
      })
    }
  }

  that.closeOrder = function () { // fermeture commande après consultation
    footer.classList.remove("footerOpenOrder")
    reservationStatus.classList.remove("reservationStatusOpenOrder")
    buttonOrder.classList.remove("buttonOrderOpenOrder")
    closeOrder.classList.remove("closeOrderOpenOrder")
    buttonCancelOrder.classList.remove("buttonCancelOrderOpenOrder")
  }

  that.cancelOrder = function () { // annulation de la commande
    if (availableBikes.textContent != "Vélo disponible : 0") {
      buttonRes.classList.add("buttonResForm")
      buttonRes.classList.remove("buttonResReservation")
    }
    chrono1.stop()
    aside.classList.remove("asideValidated")
    footer.classList.remove("footerValidated")
    footer.classList.remove("footerOpenOrder")
    reservationStatus.classList.remove("reservationStatusOpenOrder")
    buttonCancelAsideWhile.classList.remove("buttonCancelAsideWhileValidated")
    buttonCancelOrder.classList.remove("buttonCancelOrderOpenOrder")
    buttonOrder.classList.remove("buttonOrderOpenOrder")
    closeOrder.classList.remove("closeOrderOpenOrder")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    document.getElementById("cancelModal").classList.add("openModal")
    document.getElementById("modalCancel").classList.add("modalOpen")

    /* annulation storage */
    sessionStorage.clear()
  }

  that.reservation = function () { // ouverture de la partie réservation
    aside.classList.add("asideReservation")
    buttonRes.classList.remove("buttonResForm")
    buttonRes.classList.add("buttonResReservation")
    infos.classList.add("infosReservation")
    reservation.classList.add("reservationReservation")

    /* NOM PRENOM ET NOMBRE DE VÉLOS */
    fields.classList.add("fieldsReservation")
    choice.classList.add("reservationChoice")
    option1.value = 1
    option2.value = 2
    option3.value = 3

    btnValidation.addEventListener("click", function clicValid() {
      that.validation()
    })

    /* media queries */
    if (window.matchMedia("(max-width: 768px)").matches) {
      reservation.scrollIntoView()
    }
  }

  that.infos = function () { // saisie du style et des infos relatives à l'aside lors de son ouverture
    aside.classList.add("asideForm")
    buttonRes.classList.add("buttonResForm")

    /* infos stations */
    stationElt.textContent = that.station.name
    statusElt.textContent = that.station.status
    addressElt.textContent = that.station.address

    /* disponibilités des vélos et des places */
    availableBikes.textContent = "Vélos disponibles : " + that.station.available_bikes
    if (that.station.available_bikes < 2) {
      availableBikes.textContent = "Vélo disponible : " + that.station.available_bikes
    }

    availableStands.textContent = "Places disponibles : " + that.station.available_bike_stands
    if (that.station.available_bike_stands < 2) {
      availableStands.textContent = "Place disponible : " + that.station.available_bike_stands
    }

    /* modification selon ouverture/fermeture et dispos */
    if (that.station.status == "OPEN") {
      statusElt.textContent = "OUVERTE"
      statusElt.classList.add("statusEltGreen")
      statusElt.classList.remove("statusEltRed")
      buttonRes.classList.remove("buttonResReservation")
      if (footer.classList.contains("footerValidated")) {
        buttonRes.classList.add("buttonResReservation")
      }
    }

    if (that.station.available_bikes == 0 && that.station.status == "OPEN" || that.station.available_bikes == 0 && that.station.status != "CLOSED") {
      aside.classList.remove("asideReservation")
      reservation.classList.remove("reservationReservation")
      fields.classList.remove("fieldsReservation")
      choice.classList.remove("reservationChoice")
      document.getElementById("veloModal").classList.add("openModal")
      document.getElementById("modalVelo").classList.add("modalOpen")
      buttonRes.classList.add("buttonResReservation")
    }

    if (that.station.status == "CLOSED") {
      aside.classList.remove("asideReservation")
      reservation.classList.remove("reservationReservation")
      fields.classList.remove("fieldsReservation")
      choice.classList.remove("reservationChoice")
      statusElt.textContent = "FERMÉE"
      statusElt.classList.add("statusEltRed")
      statusElt.classList.remove("statusEltGreen")
      buttonRes.classList.add("buttonResReservation")
      document.getElementById("stationModal").classList.add("openModal")
      document.getElementById("modalStation").classList.add("modalOpen")
    }

    if (that.station.available_bikes < 2) {
      option2.classList.add("optionImpossible")
    }

    if (that.station.available_bikes < 3) {
      option3.classList.add("optionImpossible")
    }

    if (that.station.available_bikes > 1) {
      option2.classList.remove("optionImpossible")
    }

    if (that.station.available_bikes > 2) {
      option3.classList.remove("optionImpossible")
    }

    buttonRes.addEventListener("click", function () { // déclenchement de l'ouverture de la réservation
      that.reservation()
    })

    /* media queries */
    if (window.matchMedia("(max-width: 768px)").matches) {
      aside.scrollIntoView()
    }
  }

  /* modification de la map à l'ouverture du formulaire */
  sectionMap.classList.add("mapForm")
  sectionMap.scrollIntoView()

  that.annulResa = function() {
    aside.classList.remove("asideReservation")
    buttonRes.classList.add("buttonResForm")
    buttonRes.classList.remove("buttonResReservation")
    infos.classList.remove("infosReservation")
    reservation.classList.remove("reservationReservation")
    fields.classList.remove("fieldsReservation")
    choice.classList.remove("reservationChoice")

    ctx.clearRect(0, 0, canvas.width, canvas.height) // annulation de la signature
    bikeNumber = 0
  }

  btnCancellation.addEventListener("click", function () { // clic du bouton annuler
    that.annulResa()
  })
}