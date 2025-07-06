class MinimalBackground {
  constructor() {
    this.mouseGlow = document.querySelector(".mouse-glow")
    this.orbs = document.querySelectorAll(".gradient-orb")
    this.header = document.querySelector(".header")
    this.mouse = { x: 0, y: 0 }
    this.targetMouse = { x: 0, y: 0 }

    this.init()
    this.bindEvents()
    this.animate()
  }

  init() {
    this.createCustomCursor()
  }

  createCustomCursor() {
    this.cursor = document.createElement("div")
    this.cursor.className = "custom-cursor"
    document.body.appendChild(this.cursor)
  }

  bindEvents() {
    document.addEventListener("mousemove", this.handleMouseMove.bind(this))
    this.header.addEventListener("mouseenter", this.handleMouseEnter.bind(this))
    this.header.addEventListener("mouseleave", this.handleMouseLeave.bind(this))
  }

  handleMouseMove(e) {
    this.targetMouse.x = e.clientX
    this.targetMouse.y = e.clientY

    // Update custom cursor
    if (this.cursor) {
      this.cursor.style.left = e.clientX - 4 + "px"
      this.cursor.style.top = e.clientY - 4 + "px"
    }

    // Calculate mouse position relative to header
    const rect = this.header.getBoundingClientRect()
    const relativeX = e.clientX - rect.left
    const relativeY = e.clientY - rect.top

    // Update mouse glow position
    this.mouseGlow.style.left = relativeX - 100 + "px"
    this.mouseGlow.style.top = relativeY - 100 + "px"

    // Subtle orb movement based on mouse position
    this.updateOrbPositions(relativeX, relativeY, rect.width, rect.height)
  }

  handleMouseEnter() {
    this.mouseGlow.style.opacity = "1"
    this.cursor.classList.add("active")

    // Enhance orb visibility
    this.orbs.forEach((orb) => {
      orb.style.opacity = "0.6"
      orb.style.filter = "blur(50px)"
    })
  }

  handleMouseLeave() {
    this.mouseGlow.style.opacity = "0"
    this.cursor.classList.remove("active")

    // Reset orb visibility
    this.orbs.forEach((orb) => {
      orb.style.opacity = "0.3"
      orb.style.filter = "blur(60px)"
    })
  }

  updateOrbPositions(mouseX, mouseY, width, height) {
    // Normalize mouse position (0 to 1)
    const normalizedX = mouseX / width
    const normalizedY = mouseY / height

    this.orbs.forEach((orb, index) => {
      // Calculate subtle movement based on mouse position
      const moveIntensity = 20 // pixels
      const offsetX = (normalizedX - 0.5) * moveIntensity * (index + 1) * 0.5
      const offsetY = (normalizedY - 0.5) * moveIntensity * (index + 1) * 0.5

      // Apply smooth transform
      orb.style.transform += ` translate(${offsetX}px, ${offsetY}px)`
    })
  }

  animate() {
    // Smooth mouse following with easing
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.1
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.1

    // Continue animation loop
    requestAnimationFrame(this.animate.bind(this))
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new MinimalBackground()
})

// Performance optimization
let ticking = false

function updateMousePosition(e) {
  if (!ticking) {
    requestAnimationFrame(() => {
      // Mouse position updates happen here
      ticking = false
    })
    ticking = true
  }
}

// Throttle mouse events for better performance
document.addEventListener("mousemove", updateMousePosition)
