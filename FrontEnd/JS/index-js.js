document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-audio");
  audio.volume = 0.4; // Set volume to 10% (0.0 to 1.0)

  const enableAudio = () => {
    audio.play().catch((err) => {
      console.log("Autoplay blocked:", err);
    });
    document.removeEventListener("click", enableAudio);
  };

  document.addEventListener("click", enableAudio);
});

// Mobile menu toggle
document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("active");
  });

// Random glitch effect on headings
document.addEventListener("DOMContentLoaded", function () {
  const glitchElements = document.querySelectorAll(".glitch-effect");

  glitchElements.forEach((el) => {
    el.addEventListener("mouseenter", function () {
      this.style.animation = "none";
      setTimeout(() => {
        this.style.animation = "";
      }, 10);
    });
  });

  // Terminal typing effect
  const typeElements = document.querySelectorAll(".typewriter");
  if (typeElements.length > 0) {
    let currentElement = 0;

    function showNextElement() {
      if (currentElement < typeElements.length) {
        typeElements[currentElement].style.display = "inline-block";
        currentElement++;
        setTimeout(showNextElement, 2000);
      }
    }

    showNextElement();
  }

  // Console-like flicker
  setInterval(() => {
    const flickerElements = document.querySelectorAll(".flicker");
    flickerElements.forEach((el) => {
      if (Math.random() > 0.7) {
        el.style.opacity = Math.random() * 0.5 + 0.5;
      }
    });
  }, 300);

  // Mobile - reduce animation intensity
  if (window.innerWidth <= 768) {
    document.querySelectorAll(".glitch-effect").forEach((el) => {
      el.style.animationDuration = "3s";
    });

    document.querySelectorAll(".flicker").forEach((el) => {
      el.style.animationDuration = "4s";
    });
  }
});

// Adjust for window resize
window.addEventListener("resize", function () {
  if (window.innerWidth <= 768) {
    document.querySelectorAll(".glitch-effect").forEach((el) => {
      el.style.animationDuration = "3s";
    });
  } else {
    document.querySelectorAll(".glitch-effect").forEach((el) => {
      el.style.animationDuration = "2s";
    });
  }
});
