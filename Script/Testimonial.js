let slideIndex = 0;
let timeoutId = null;
const slides = document.getElementsByClassName("testimonial");
const dots = document.getElementsByClassName("dot");
let isAnimating = false;

function transitionSlide(currentIndex, nextIndex) {
  if (isAnimating) return;
  isAnimating = true;

  // Remove active class from all slides and dots
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
    dots[i].classList.remove("active");
  }

  slides[nextIndex].classList.add("active");
  dots[nextIndex].classList.add("active");

  setTimeout(() => {
    isAnimating = false;
  }, 600);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isAnimating) {
        const activeSlide = document.querySelector(".testimonial.active");
        if (activeSlide) {
          const currentIndex = Array.from(slides).indexOf(activeSlide);
          transitionSlide(currentIndex, currentIndex);
        }
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "-10% 0px",
  }
);

const testimonialsSection = document.querySelector(".testimonials-section");
observer.observe(testimonialsSection);

function currentSlide(index) {
  if (isAnimating) return;
  const currentIndex = slideIndex - 1;
  slideIndex = index + 1;
  transitionSlide(currentIndex, index);
  resetTimer();
}

function plusSlides(step) {
  if (isAnimating) return;
  const currentIndex = slideIndex - 1;
  let nextIndex;

  if (step < 0) {
    nextIndex = slideIndex - 2;
    if (nextIndex < 0) {
      nextIndex = slides.length - 1;
    }
  } else {
    nextIndex = slideIndex % slides.length;
  }

  slideIndex = nextIndex + 1;
  transitionSlide(currentIndex, nextIndex);
  resetTimer();
}

function resetTimer() {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    if (!isAnimating) {
      plusSlides(1);
    }
  }, 60000); // 1 minute rotation
}

function showSlides() {
  if (isAnimating) {
    setTimeout(showSlides, 100);
    return;
  }

  const currentIndex = slideIndex - 1;
  slideIndex = (slideIndex % slides.length) + 1;
  transitionSlide(currentIndex, slideIndex - 1);
  resetTimer();
}

document.querySelector(".prev").addEventListener("click", (e) => {
  e.preventDefault();
  plusSlides(-1);
});

document.querySelector(".next").addEventListener("click", (e) => {
  e.preventDefault();
  plusSlides(1);
});

for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", (e) => {
    e.preventDefault();
    currentSlide(i);
  });
}

const testimonialContainer = document.querySelector(".testimonials-container");
testimonialContainer.addEventListener("mouseover", () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});

testimonialContainer.addEventListener("mouseout", () => {
  resetTimer();
});

// Optimized scroll handler
let scrollTimeout = null;
window.addEventListener("scroll", () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  scrollTimeout = setTimeout(() => {
    const rect = testimonialsSection.getBoundingClientRect();
    const isInViewport =
      rect.top < window.innerHeight * 0.7 &&
      rect.bottom > window.innerHeight * 0.3;

    if (isInViewport && !isAnimating) {
      const activeSlide = document.querySelector(".testimonial.active");
      if (activeSlide) {
        const currentIndex = Array.from(slides).indexOf(activeSlide);
        transitionSlide(currentIndex, currentIndex);
      }
    }
  }, 100);
});

slides[0].classList.add("active");
dots[0].classList.add("active");
resetTimer();
