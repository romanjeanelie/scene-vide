import emitter from '~/utils/EventEmitter'

export default class Controls {
  constructor() {
    this.x = {
      start: 0,
      distance: 0,
      end: 0,
    }

    this.y = {
      start: 0,
      distance: 0,
      end: 0,
    }

    this.isDown = false
  }

  init() {
    document.body.style.overflow = 'hidden'
    this.wheel()
    // this.drag()
    this.keys()
  }

  destroy() {
    document.body.style.overflow = 'unset'
    emitter.removeAllListeners('CONTROLS:DOWN')
  }

  wheel() {
    window.addEventListener('wheel', (e) => {
      const distance = e.deltaY
      emitter.emit('CONTROLS:DOWN', distance)
    })
  }

  drag() {
    window.addEventListener('mousedown', this.onTouchDown.bind(this))
    window.addEventListener('mousemove', this.onTouchMove.bind(this))
    window.addEventListener('mouseup', this.onTouchUp.bind(this))

    window.addEventListener('touchstart', this.onTouchDown.bind(this))
    window.addEventListener('touchmove', this.onTouchMove.bind(this))
    window.addEventListener('touchend', this.onTouchUp.bind(this))
  }

  keys() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        const distance = +1
        emitter.emit('CONTROLS:DOWN', distance)
      }
      if (e.key === 'ArrowLeft') {
        const distance = -1
        emitter.emit('CONTROLS:DOWN', distance)
      }

      if (e.key === 'ArrowDown') {
        const distance = +1
        emitter.emit('CONTROLS:DOWN', distance)
      }
      if (e.key === 'ArrowUp') {
        const distance = -1
        emitter.emit('CONTROLS:DOWN', distance)
      }

      if (e.code === 'Space') {
        const distance = +1
        emitter.emit('CONTROLS:DOWN', distance)
      }
    })
  }

  onTouchDown(event) {
    this.isDown = true

    this.x.start = event.touches ? event.touches[0].clientX : event.clientX
    this.y.start = event.touches ? event.touches[0].clientY : event.clientY

    const values = {
      x: this.x,
      y: this.y,
    }
  }

  onTouchMove(event) {
    if (!this.isDown === true) return

    const x = event.touches ? event.touches[0].clientX : event.clientX
    const y = event.touches ? event.touches[0].clientY : event.clientY

    this.x.end = x
    this.y.end = y
    this.x.distance = this.x.start - this.x.end
    this.y.distance = this.y.start - this.y.end

    const values = {
      x: this.x,
      y: this.y,
    }

    const distance = this.x.distance
    // if (distance > 200 || distance < -200) {
    document.body.classList.add('is-dragged')
    emitter.emit('CONTROLS:DOWN', distance)
    // }
  }

  onTouchUp(event) {
    this.isDown = false
    document.body.classList.remove('is-dragged')

    const x = event.changedTouches ? event.changedTouches[0].clientX : event.clientX
    const y = event.changedTouches ? event.changedTouches[0].clientY : event.clientY

    this.x.end = x
    this.y.end = y

    const values = {
      x: this.x,
      y: this.y,
    }
  }
}
