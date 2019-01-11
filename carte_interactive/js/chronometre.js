let Chrono = function(element) {
    let chrono = this
    chrono.element = document.getElementById(element)
    let interval
    chrono.timer
    chrono.reservation
    let bo = true // contrôle de l'exécution du code pour savoir si un interval est actif
    let ctx = document.getElementById("canvas").getContext("2d")

    function zero(n) { // pour le zero des minutes/secondes en dessous de 9
        return (n < 10 ? "0" : "") + n;
    }

    chrono.stop = function () { // arrêt du chrono
        clearInterval(interval) // suppression de l'interval actif
        bo = true // pas d'interval actif
    }

    chrono.countdown = function () { // défilement du chrono
        /* décompte du chrono */
        let minutes = chrono.timer / (60)    
        let secondes = chrono.timer % (60)
        minutes = Math.floor(minutes)
        secondes = Math.floor(secondes)

        /* contenu de la commande */
        chrono1.element.innerHTML = "Vous avez réservé " + chrono.reservation.bikeNumber + " vélos à la station " + chrono.reservation.station.name + " à l'adresse " + chrono.reservation.station.address + " au nom de " + chrono.reservation.lastName + ". Il vous reste " + zero(minutes) + ":" + zero(secondes) + " minutes."
        chrono.timer--

        /* gestion singulier/pluriel */
        if (chrono.reservation.bikeNumber < 2 && minutes >= 2) {
            chrono1.element.innerHTML = "Vous avez réservé " + chrono.reservation.bikeNumber + " vélo à la station " + (chrono.reservation.station.name) + " à l'adresse " + chrono.reservation.station.address + " au nom de " + chrono.reservation.lastName + ". Il vous reste " + zero(minutes) + ":" + zero(secondes) + " minutes."
        }
        if (chrono.reservation.bikeNumber < 2 && minutes < 2) {
            chrono1.element.innerHTML = "Vous avez réservé " + chrono.reservation.bikeNumber + " vélo à la station " + (chrono.reservation.station.name) + " à l'adresse " + chrono.reservation.station.address + " au nom de " + chrono.reservation.lastName + ". Il vous reste " + zero(minutes) + ":" + zero(secondes) + " minute."
        }
        if (minutes < 2 && chrono.reservation.bikeNumber > 1) {
            chrono1.element.innerHTML = "Vous avez réservé " + chrono.reservation.bikeNumber + " vélos à la station " + (chrono.reservation.station.name) + " à l'adresse " + chrono.reservation.station.address + " au nom de " + chrono.reservation.lastName + ". Il vous reste " + zero(minutes) + ":" + zero(secondes) + " minute."
        }

        /* arrêt du chrono */
        if (chrono.timer == 0) {
            chrono.stop()
            setTimeout(function () {
                document.getElementById("endModal").classList.add("openModal")
                document.getElementById("modalEnd").classList.add("modalOpen")
                document.getElementById("aside").classList.remove("asideValidated")
                document.getElementById("buttonRes").classList.remove("buttonResReservation")
                document.getElementById("buttonCancelAsideWhile").classList.remove("buttonCancelAsideWhileValidated")
                document.getElementById("footer").classList.remove("footerValidated")
                document.getElementById("map").style.marginBottom = "4%"
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                sessionStorage.clear()
            })
        }
    }

    chrono.start = function (newTimer, reservation) { //lancement du chrono avec nouveau timer (éventuel) et nouvelle réservation
        if (bo) { // vérification de l'existence d'un autre interval
            chrono.timer = newTimer
            chrono.reservation = reservation
            chrono.countdown()
            interval = setInterval(chrono.countdown, 1000)
        }
        bo = false // empêchement d'un autre interval
    }

    chrono.restart = function (newTimer) { 
        chrono.stop() // annule chrono en cours
        chrono.start(newTimer) // création d'un nouveau timer 
        bo = true // pas d'interval actif
    }
}

let chrono1 = new Chrono("reservationStatus")