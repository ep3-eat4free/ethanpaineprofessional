// js/script.js

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
     1. Footer year
     =============================== */
  const yearSpan = document.getElementById("footer-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ===============================
     2. Experience slider
     =============================== */
  const track = document.getElementById("experience-track");
  if (!track) return; // not on Experience page, nothing else to do

  const slides = Array.from(track.children);
  if (slides.length === 0) return;

  const buttons = document.querySelectorAll(".slider-button");
  let currentIndex = 0;

  // Ensure we have a smooth animation
  track.style.transition = "transform 0.35s ease";

  function goToSlide(index) {
    const clampedIndex = (index + slides.length) % slides.length;
    currentIndex = clampedIndex;

    const targetSlide = slides[clampedIndex];
    const offset = targetSlide.offsetLeft;

    track.style.transform = `translateX(-${offset}px)`;
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dir = btn.dataset.dir;
      if (dir === "next") {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    });
  });

  // Keep alignment correct on resize
  window.addEventListener("resize", () => {
    goToSlide(currentIndex);
  });

  // Start at first slide
  goToSlide(0);
});
