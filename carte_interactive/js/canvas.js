let Canvas = function(element) {
  let that = this
  let canvas = document.getElementById(element)
  that.ctx = canvas.getContext("2d") // propriétés et méthodes 

  /* zones de réservation */
  that.canvasO = canvas.toDataURL() // canvas vide 

  /* évènements de la partie canvas et de la signature */
  canvas.addEventListener("mousedown", pointerDown, false) 
  canvas.addEventListener("mouseup", pointerUp, false)

  function pointerDown(evt) {
    that.ctx.beginPath() // initialisation dessin
    that.ctx.moveTo(evt.offsetX, evt.offsetY) // définition de la zone sur un axe XY 
    canvas.addEventListener("mousemove", paint, false) // application du tracé 
    canvas.addEventListener("touchmove", paint, false)
  }

  function pointerUp(evt) {
    canvas.removeEventListener("mousemove", paint) // permet d'arrêter le tracé 
    canvas.removeEventListener("touchmove", paint)
    paint(evt) 
  }

  function paint(evt) {
    that.ctx.lineTo(evt.offsetX, evt.offsetY) // ligne à partir du dernier point spécifié sur canvas
    that.ctx.stroke() // dessin de la ligne entre les différents points
    paint.required 
  }

  function getSignatureImage() { // récupération éventuelle de la signature 
    return that.ctx.getImageData(0, 0, canvas.width, canvas.height).data 
  }

  /* méthode pouvant être appellée dans n'importe quels fichiers js du dossier */
  that.getDataURL = function() {
    return canvas.toDataURL() 
  }


  // traduction des événements pour le tactile tablette/mobile
  canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e)
    let touch = e.touches[0]
    let mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    })
    canvas.dispatchEvent(mouseEvent)
  }, false)

  canvas.addEventListener("touchend", function (e) {
    let mouseEvent = new MouseEvent("mouseup", {})
    canvas.dispatchEvent(mouseEvent)
  }, false)

  canvas.addEventListener("touchmove", function (e) {
    let touch = e.touches[0]
    let mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    })
    canvas.dispatchEvent(mouseEvent)
  }, false)

  function getTouchPos(canvasDom, touchEvent) {
    let rect = canvasDom.getBoundingClientRect()
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    }
  }
}

let objectCanvas = new Canvas("canvas")