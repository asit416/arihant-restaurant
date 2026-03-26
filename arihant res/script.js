const parallaxNodes = document.querySelectorAll(".card-3d");

function attach3DTilt(node) {
  const strength = node.id === "heroVisual" ? 14 : 10;

  node.addEventListener("pointermove", (event) => {
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotY = (x - 0.5) * strength;
    const rotX = (0.5 - y) * strength;

    node.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(2px)`;
  });

  node.addEventListener("pointerleave", () => {
    node.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  });
}

parallaxNodes.forEach(attach3DTilt);

const revealNodes = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.18 }
);

revealNodes.forEach((node) => revealObserver.observe(node));

const heroSlides = Array.from(document.querySelectorAll(".slide"));
const dotsContainer = document.getElementById("slideDots");
let currentSlide = 0;
let autoplay;

function renderDots() {
  heroSlides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => {
      goToSlide(index);
      restartAutoplay();
    });
    dotsContainer.appendChild(dot);
  });
}

function goToSlide(index) {
  heroSlides[currentSlide].classList.remove("is-active");
  dotsContainer.children[currentSlide].classList.remove("active");

  currentSlide = (index + heroSlides.length) % heroSlides.length;

  heroSlides[currentSlide].classList.add("is-active");
  dotsContainer.children[currentSlide].classList.add("active");
}

function startAutoplay() {
  autoplay = window.setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 3800);
}

function restartAutoplay() {
  window.clearInterval(autoplay);
  startAutoplay();
}

if (heroSlides.length > 0 && dotsContainer) {
  renderDots();
  dotsContainer.children[0].classList.add("active");
  startAutoplay();
}

const floatingOrbs = document.querySelectorAll(".orb");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  floatingOrbs.forEach((orb, index) => {
    const speed = 0.08 + index * 0.03;
    orb.style.transform = `translate3d(0, ${y * speed}px, 0)`;
  });
});
