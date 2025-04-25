document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("initiationForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");
    const name = formData.get("name");
    const username = formData.get("username");
    const email = formData.get("email");

    if (password !== confirmPassword) {
      alert("> ERROR: Encryption keys do not match");
      return;
    }

    const userData = {
      name,
      username,
      email,
      password,
    };

    try {
      const res = await fetch("https://thecircle-backend.onrender.com:8888/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // in case the backend sets a session cookie
        body: JSON.stringify(userData),
      });

      const result = await res.text();

      if (res.ok) {
        alert(`> INITIATION SEQUENCE COMPLETE\n> ${result}`);
        // ✅ Redirect to GitHub Pages dashboard
        window.location.href = "/thecircle-frontend/dashboard.html";
      } else {
        alert(`> ERROR: ${result}`);
      }
    } catch (err) {
      console.error(err);
      alert("> ERROR: Server unreachable. Please try again later.");
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
