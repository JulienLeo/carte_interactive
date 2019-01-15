let Slider = function() {
    /* CREATION ELEMENT */
    let slider = this
    let slideIndex = 0
    let playing = true
    let timeOut
    let i

    /*RECUPERATION HTML */
	let slides = document.getElementsByClassName("slides")
    let dots = document.getElementsByClassName("dot")
    let prev = document.getElementById("prev")
    let next = document.getElementById("next")
    let pause = document.getElementById("pause")
    let dot1 = document.getElementById("dot1")
    let dot2 = document.getElementById("dot2")
    let dot3 = document.getElementById("dot3")
    let dot4 = document.getElementById("dot4")
    let dot5 = document.getElementById("dot5")

    /* BOUTONS PRECEDENT ET SUIVANT */
    function plusSlides(n) { // contrôle du slider par l'utilisateur
        slider.play(slideIndex += n-1)
    }

    /* image en cours */
    function currentSlide(n) { // définition de l'image en cours pour le clic sur les points
	    slider.play(slideIndex = n)
    }

    /* PAUSE */
    slider.pause = function () { // arrêt du slider
        playing = true
        pause.innerHTML = "&#9654;"
        clearTimeout(timeOut)
    }

    /* LECTURE AUTOMATIQUE */
    slider.play = function (n) { // lancement du défilement du slider
        clearTimeout(timeOut)
    	if (n > slides.length) {slideIndex = 1} // boucle en arrivant après la dernière image
	    if (n < 1) {slideIndex = slides.length} // boucle en revenant avant la première image
	    for (i = 0; i < slides.length; i++) { // affichage des images l'une après l'autre
		    slides[i].style.display = "none"
	    }
	    for (i = 0; i < dots.length; i++) { // évolution des points
		    dots[i].className = dots[i].className.replace(" active", "")
	    }
        slideIndex++
        playing = false
	    if (slideIndex > slides.length) {slideIndex = 1} // permet la boucle
	    slides[slideIndex-1].style.display = "block" // affichage du slider
        dots[slideIndex-1].className += " active" // noircissement du point concerné
        timeOut = setTimeout(slider.play, 5000) // définition du temps entre chaque image
    }

    pause.addEventListener("click", function() { // événements au clic sur le bouton pause/lecture
        if (playing == false) {
            slider.pause()
        } else {
            slider.play()
            pause.innerHTML = "&#10074;&#10074;"
        }
    })

    /* FLECHES GAUCHE/DROITE ET TOUCHES DIRECTIONNELLES */
    prev.addEventListener("click", function() { // événement au clic sur le chevron gauche
        plusSlides(-1)
    })

    next.addEventListener("click", function() { // événement au clic sur le chevron droit
        plusSlides(1)
    })

    document.addEventListener("keydown", function(e) { // événements touches
	    if (e.keyCode === 37) { // événement flèche gauche
		    plusSlides(-1)
	    } else if (e.keyCode === 39) { //événement flèche droite
		    plusSlides(1)
        } else if (e.keyCode === 32 && playing == false) { // événement espace quand le slider défile
            slider.pause()
            e.preventDefault()
        } else if (e.keyCode === 32 && playing == true) { // événement espace quand le slider est en pause
            slider.play()
            pause.innerHTML = "&#10074;&#10074;"
            e.preventDefault()
        }
    })


    /* DOTS (points de défilement) */
    dot1.addEventListener("click", function() { // événement au clic sur le point 1
        currentSlide(0)
        pause.innerHTML = "&#10074;&#10074;"
    })
    dot2.addEventListener("click", function() { // événement au clic sur le point 2
        currentSlide(1)
        pause.innerHTML = "&#10074;&#10074;"
    })
    dot3.addEventListener("click", function() { // événement au clic sur le point 3
        currentSlide(2)
        pause.innerHTML = "&#10074;&#10074;"
    })
    dot4.addEventListener("click", function() { // événement au clic sur le point 4
        currentSlide(3)
        pause.innerHTML = "&#10074;&#10074;"
    })
    dot5.addEventListener("click", function() { // événement au clic sur le point 5
        currentSlide(4)
        pause.innerHTML = "&#10074;&#10074;"
    })

}

let slider = new Slider() // création slider à l'ouverture de page
slider.play() // lancement du défilement du slider à l'ouverture de page