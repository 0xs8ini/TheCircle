document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-audio");
  if (audio) audio.volume = 0.4;

  const enableAudio = () => {
    if (audio) {
      audio.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
    }
    document.removeEventListener("click", enableAudio);
  };

  document.addEventListener("click", enableAudio);

  // Join button redirect
  const joinBTN = document.getElementById("joinBTN");
  if (joinBTN) {
    joinBTN.addEventListener("click", () => {
      window.location.href = " https://0xs8ini.github.io/TheCircle/userLogin.html";
    });
  }

  // Mobile menu toggle
  const mobileBtn = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });
  }

  // Glitch hover reset
  const glitchElements = document.querySelectorAll(".glitch-effect");
  glitchElements.forEach((el) => {
    el.addEventListener("mouseenter", function () {
      this.style.animation = "none";
      setTimeout(() => {
        this.style.animation = "";
      }, 10);
    });
  });

  // Typewriter effect
  const typeElements = document.querySelectorAll(".typewriter");
  if (typeElements.length > 0) {
    let currentElement = 0;

    const showNextElement = () => {
      if (currentElement < typeElements.length) {
        typeElements[currentElement].style.display = "inline-block";
        currentElement++;
        setTimeout(showNextElement, 2000);
      }
    };

    showNextElement();
  }

  // Console-like flicker
  setInterval(() => {
    document.querySelectorAll(".flicker").forEach((el) => {
      if (Math.random() > 0.7) {
        el.style.opacity = Math.random() * 0.5 + 0.5;
      }
    });
  }, 300);

  // Set animation duration based on screen width
  const adjustAnimations = () => {
    const glitchDuration = window.innerWidth <= 768 ? "3s" : "2s";
    const flickerDuration = window.innerWidth <= 768 ? "4s" : "2.5s";

    glitchElements.forEach((el) => {
      el.style.animationDuration = glitchDuration;
    });

    document.querySelectorAll(".flicker").forEach((el) => {
      el.style.animationDuration = flickerDuration;
    });
  };

  adjustAnimations();
  window.addEventListener("resize", adjustAnimations);
});
