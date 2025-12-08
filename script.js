const header = document.getElementById("header")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 20) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const mobileMenu = document.getElementById("mobile-menu")

mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active")
  mobileMenu.classList.toggle("hidden")
})

// Smooth Scroll Navigation
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })

    // Close mobile menu if open
    mobileMenu.classList.add("hidden")
    mobileMenuBtn.classList.remove("active")
  }
}

// Add click handlers to all navigation links
document.querySelectorAll("[data-section]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const sectionId = link.getAttribute("data-section")
    scrollToSection(sectionId)
  })
})

const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -80px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")

      // Handle cards with delays para efeito cascata
      const cards = entry.target.querySelectorAll("[data-delay]")
      cards.forEach((card) => {
        const delay = card.getAttribute("data-delay")
        setTimeout(() => {
          card.classList.add("visible")
        }, Number.parseInt(delay))
      })
    }
  })
}, observerOptions)

// Observe all animated elements
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el)
})

// Observe cards individually
document.querySelectorAll(".feature-card, .differential-card, .testimonial-card, .process-step").forEach((el) => {
  observer.observe(el)
})

const whatsappFloat = document.getElementById("whatsapp-float")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    whatsappFloat.style.opacity = "1"
    whatsappFloat.style.visibility = "visible"
  } else {
    whatsappFloat.style.opacity = "0"
    whatsappFloat.style.visibility = "hidden"
  }
})

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".hero-bg-decoration")

  parallaxElements.forEach((el, index) => {
    const speed = (index + 1) * 0.5
    el.style.transform = `translateY(${scrolled * speed}px)`
  })
})