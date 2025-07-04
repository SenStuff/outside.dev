// Real-time clock functionality
function updateClock() {
  const now = new Date()
  const timeString = now.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })

  const clockElement = document.getElementById("current-time")
  if (clockElement) {
    clockElement.textContent = timeString
  }
}

// Glitch effect for title
function glitchTitle() {
  const titleElement = document.getElementById("glitch-title")
  const originalText = "THE OUTSIDE"

  // Create glitched version
  const glitchedText = originalText
    .split("")
    .map((char) => (Math.random() < 0.1 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : char))
    .join("")

  titleElement.textContent = glitchedText
  titleElement.classList.add("glitch")

  // Restore original text after 100ms
  setTimeout(() => {
    titleElement.textContent = originalText
    titleElement.classList.remove("glitch")
  }, 100)
}

// Tab functionality
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabPanels = document.querySelectorAll(".tab-panel")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab")

      // Remove active class from all buttons and panels
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabPanels.forEach((panel) => panel.classList.remove("active"))

      // Add active class to clicked button and corresponding panel
      button.classList.add("active")
      document.getElementById(targetTab).classList.add("active")
    })
  })
}

// Animate progress bars
function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-fill")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target
        const width = progressBar.style.width
        progressBar.style.width = "0%"

        setTimeout(() => {
          progressBar.style.width = width
        }, 100)
      }
    })
  })

  progressBars.forEach((bar) => observer.observe(bar))
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Start clock
  updateClock()
  setInterval(updateClock, 1000)

  // Start glitch effect
  setInterval(glitchTitle, 3000)

  // Initialize tabs
  initTabs()

  // Initialize progress bar animations
  animateProgressBars()

  // Initialize smooth scrolling
  initSmoothScrolling()

  // Add some random flicker effects
  setInterval(
    () => {
      document.body.style.filter = `brightness(${0.95 + Math.random() * 0.1})`
      setTimeout(() => {
        document.body.style.filter = "brightness(1)"
      }, 50)
    },
    2000 + Math.random() * 3000,
  )
})

// Add keyboard navigation for tabs
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const activeTab = document.querySelector(".tab-button.active")
    const tabButtons = Array.from(document.querySelectorAll(".tab-button"))
    const currentIndex = tabButtons.indexOf(activeTab)

    let nextIndex
    if (e.key === "ArrowLeft") {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1
    } else {
      nextIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0
    }

    tabButtons[nextIndex].click()
    tabButtons[nextIndex].focus()
  }
})

// Console easter egg
console.log(`
╔══════════════════════════════════════╗
║          THE OUTSIDE v0.8.3          ║
║        DEVELOPMENT CONSOLE           ║
║                                      ║
║  Status: UNKNOWN                     ║
║  Access Level: USER                  ║
║  Entity Status: [REDACTED]           ║
║                                      ║
║  Welcome to the development log...   ║
╚══════════════════════════════════════╝
`)
