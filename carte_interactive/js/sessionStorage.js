/* SESSION STORAGE */
function Storage(reservation) {
    reservation_json = JSON.stringify(reservation)
    sessionStorage.setItem("reservationStorage", reservation_json) // mise en place des infos à récupérer
}

let reservationStatus = document.getElementById("reservationStatus")
let buttonOrder = document.getElementById("buttonOrder")
let closeOrder = document.getElementById("closeOrder")
let buttonCancelOrder = document.getElementById("buttonCancelOrder")
let buttonCancelAsideWhile = document.getElementById("buttonCancelAsideWhile")

if (sessionStorage.getItem("reservationStorage")) { // lancement et récupération storage à la condition d'une commande en cours
    let reservationStorage_json = sessionStorage.getItem("reservationStorage")
    reservationStorage = JSON.parse(reservationStorage_json)

    let newForm = new Form(reservationStorage.station) // nouvel affichage d'un formulaire

    /* reconstruction du footer et événements liés*/
    document.getElementById("map").classList.remove("mapForm")
    document.getElementById("footer").classList.add("footerValidated")
    document.getElementById("buttonRes").classList.add("buttonResReservation")
    buttonCancelAsideWhile.classList.add("buttonCancelAsideWhileValidated")
    
    buttonOrder.addEventListener("click", function order() {
        newForm.order()
    })

    closeOrder.addEventListener("click", function closeOrder() {
        newForm.closeOrder()
    })

    buttonCancelOrder.addEventListener("click", function cancelOrder() {
        newForm.cancelOrder()
    })

    buttonCancelAsideWhile.addEventListener("click", function cancelOrder() {
        newForm.cancelOrder()
    })

    /* CHRONO */
    let endReservation = reservationStorage.endReservation // récupération de l'heure de fin du chrono
    let newDate = new Date().getTime() // date actuelle
    let newTime = endReservation - newDate // calcul temps restant 
    newTime = Math.round(newTime / 1000)
    chrono1.start(newTime, reservationStorage) // prise en compte chrono recalculé dans la réservation
}