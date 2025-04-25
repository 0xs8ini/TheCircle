document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Clear previous errors
    usernameError.style.display = "none";
    passwordError.style.display = "none";

    const formData = new FormData(form);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("https://thecircle-backend.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Required to store session cookie
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // ✅ Update this with your actual GitHub Pages dashboard page path
        window.location.href = "/thecircle-frontend/dashboard.html";
      } else {
        const errorData = await response.json();
        const message = errorData.message || "Authentication failed";

        if (message.includes("credentials")) {
          usernameError.textContent = "> ERROR: Invalid credentials";
          usernameError.style.display = "block";
          passwordError.textContent = "> ERROR: Invalid credentials";
          passwordError.style.display = "block";
        } else {
          usernameError.textContent = `> ERROR: ${message}`;
          usernameError.style.display = "block";
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      usernameError.textContent = "> ERROR: Connection failed";
      usernameError.style.display = "block";
    }
  });

  // Terminal-style cursor animation pause
  const errorMsg = document.querySelector(".terminal-cursor");
  if (errorMsg) {
    setTimeout(() => {
      errorMsg.style.animation = "none";
    }, 4000);
  }
});

function togglePassword() {
  const passwordField = document.getElementById("password");
  const toggleBtn = document.querySelector(".toggle-password svg");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleBtn.innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />';
  } else {
    passwordField.type = "password";
    toggleBtn.innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />';
  }
}
