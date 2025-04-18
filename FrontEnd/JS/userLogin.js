document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("initiationForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const password = formData.get("password");
    const name = formData.get("name");
    const username = formData.get("username");
    const confirmPassword = formData.get("confirm_password");

    if (password !== confirmPassword) {
      alert("> ERROR: Encryption keys do not match");
      return;
    }

    const userData = {
      name: name,
      username: username,
      email: email,
      password: password,
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await res.text();

      if (res.ok) {
        alert(`> INITIATION SEQUENCE COMPLETE\n> ${result}`);
        form.reset();
      } else {
        alert(`> ERROR: ${result}`);
      }
    } catch (err) {
      console.error(err);
      alert("> ERROR: Server unreachable. Please try again later.");
    }
  });

  // Simulate terminal typing for any cursor elements
  const errorMsg = document.querySelector(".terminal-cursor");
  if (errorMsg) {
    setTimeout(() => {
      errorMsg.style.animation = "none";
    }, 4000);
  }
});

function togglePassword() {
  const input = document.getElementById("passwordInput");
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}
