let LocalStorage = function(lastName, firstName) {
    localStorage.setItem("lastName", lastName)
    localStorage.setItem("firstName", firstName) // mise en place des infos à récupérer
}

if (localStorage.getItem("reservationStorage")) { // lancement et récupération storage à la condition d'une commande en cours
    let locStorageLastName = localStorage.getItem("lastName")
    let locStorageFirstName = localStorage.getItem("firstName")
    lastName.value = locStorageLastName
    firstName.value = locStorageFirstName
}