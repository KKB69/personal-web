// Global variables for carousel
let currentImageIndex = 0;
const images = document.querySelectorAll(".carousel-image");
const indicators = document.querySelectorAll(".carousel-indicators .indicator");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Carousel functions
function updateCarousel() {
  // Hide all images and remove active class from indicators
  images.forEach((img, index) => {
    img.classList.remove("active", "fade-in");
    indicators[index].classList.remove("active");
  });

  // Show current image with fade-in effect and set active class on indicator
  images[currentImageIndex].classList.add("active", "fade-in");
  indicators[currentImageIndex].classList.add("active");

  // Hide/Show navigation buttons
  prevBtn.style.display = currentImageIndex === 0 ? "none" : "block";
  nextBtn.style.display =
    currentImageIndex === images.length - 1 ? "none" : "block";
}

function changeImage(direction) {
  currentImageIndex += direction;

  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  } else if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }
  updateCarousel();
}

//___________________________________________________________________________________________________________________________________________________________________________________
// Progress bar animation function
function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const percentage = entry.target.getAttribute("data-percentage");
          entry.target.style.width = `${percentage}%`;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  progressBars.forEach((bar) => observer.observe(bar));
}

// Skill cards scroll animation function
function addScrollAnimation() {
  const skillCards = document.querySelectorAll(".skill-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  skillCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize carousel
  updateCarousel();

  // Initialize animations
  animateProgressBars();
  addScrollAnimation();
});
