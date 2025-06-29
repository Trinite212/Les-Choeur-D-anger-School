// Form input focus and blur effects
const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value.trim() === "") {
    parent.classList.remove("focus");
  }
}

// Attach focus, blur, and input event listeners
inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", () => {
    blurFunc.call(input); // Ensure blurFunc uses the correct 'this' context
  });
  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      input.classList.add("filled");
    } else {
      input.classList.remove("filled");
      input.parentNode.classList.remove("focus"); // Ensure label resets if input is cleared
    }
  });
});

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const closeBtn = document.getElementById("closeBtn");

if (menuToggle && navLinks && closeBtn) {
  // Toggle menu
  menuToggle.addEventListener("click", function (event) {
    navLinks.classList.toggle("active");
    event.stopPropagation();
  });

  // Close if clicked outside
  document.addEventListener("click", function (event) {
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
      navLinks.classList.remove("active");
    }
  });

  // Close on nav link click
  document.querySelectorAll("#navLinks a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // Close on close button click
  closeBtn.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
}

// Form submission
const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");

if (form && successMessage && errorMessage) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Validate required fields
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      errorMessage.textContent = "Please fill out all required fields.";
      errorMessage.style.display = "block";
      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 10000);
      return;
    }

    // Hide messages before sending
    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mnnvjrnn", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        form.reset();
        // Remove 'filled' and 'focus' classes from inputs and their containers
        inputs.forEach((input) => {
          input.classList.remove("filled");
          input.parentNode.classList.remove("focus");
        });
        successMessage.style.display = "block";
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 10000);
      } else {
        errorMessage.textContent = `Error: ${responseData.error || "Submission failed"}`;
        errorMessage.style.display = "block";
        setTimeout(() => {
          errorMessage.style.display = "none";
        }, 10000);
      }
    } catch (err) {
      errorMessage.textContent = `Error: ${err.message || "Network error"}`;
      errorMessage.style.display = "block";
      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 10000);
    }
  });
}