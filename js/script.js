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
  if (track) {
    const slides = Array.from(track.querySelectorAll(".experience-card"));
    if (slides.length > 0) {
      const buttons = document.querySelectorAll(".slider-button");
      let currentIndex = 0;

      function showSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        currentIndex = index;
        slides.forEach((slide, i) => {
          slide.classList.toggle("active", i === currentIndex);
        });
      }

      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const dir = btn.dataset.dir;
          showSlide(currentIndex + (dir === "next" ? 1 : -1));
        });
      });

      showSlide(0);
    }
  }

  /* ===============================
     3. Lightbox for hero photos
     =============================== */
  const heroPhotos = document.querySelectorAll(".hero-photo-card");
  
  if (heroPhotos.length > 0) {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
      <img class="lightbox-img" src="" alt="" />
      <div class="lightbox-caption">
        <p class="caption-title"></p>
        <p class="caption-credit"></p>
      </div>
    `;
    document.body.appendChild(lightbox);

    const lbImg = lightbox.querySelector(".lightbox-img");
    const lbTitle = lightbox.querySelector(".caption-title");
    const lbCredit = lightbox.querySelector(".caption-credit");
    const lbClose = lightbox.querySelector(".lightbox-close");

    heroPhotos.forEach((card) => {
      card.addEventListener("click", () => {
        const img = card.querySelector("img");
        const title = card.querySelector(".caption-title");
        const credit = card.querySelector(".caption-credit");

        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lbTitle.textContent = title ? title.textContent : "";
        lbCredit.textContent = credit ? credit.textContent : "";

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }

    lbClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });
  }

  /* ===============================
     4. Magnetic buttons
     =============================== */
  const magneticElements = document.querySelectorAll(".btn-primary, .slider-button");
  
  magneticElements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });

  /* ===============================
     5. Page transitions
     =============================== */
  const internalLinks = document.querySelectorAll('a[href$=".html"]');
  
  internalLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      
      // Only handle internal navigation
      if (href && !href.startsWith("http") && !href.startsWith("mailto")) {
        e.preventDefault();
        document.body.classList.add("fade-out");
        
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });
});
