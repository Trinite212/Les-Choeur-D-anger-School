'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);








window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 50);
});


























  const counters = document.querySelectorAll(".counter");
  let started = false;

  const startCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let current = 0;
    const isPercent = counter.innerHTML.includes('%');
    const increment = target / 50; // slower animation

    const updateCount = () => {
      if (current < target) {
        current += increment;
        counter.innerHTML = `${Math.floor(current)}${isPercent ? '<span>%</span>' : ''}`;
        requestAnimationFrame(updateCount);
      } else {
        counter.innerHTML = `${target}${isPercent ? '<span>%</span>' : ''}`;
      }
    };
    updateCount();
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        counters.forEach(counter => startCounter(counter));
        started = true;
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector(".stats"));













const classDetails = {
  "Nursery One": "Our Nursery One class focuses on sensory play, basic motor skills, and social interaction in a safe, colorful environment.",
  "Nursery Two": "In Nursery Two, children begin exploring language, basic numbers, and creative arts through interactive group activities.",
  "Nursery Three": "Nursery Three prepares students for Primary school with a focus on early literacy, logic puzzles, and leadership skills."
};

const modal = document.getElementById("classModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".close-btn");

// Select all "Know More" buttons
document.querySelectorAll(".btnn").forEach(button => {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    // Get the class name from the h3 next to the button
    const className = this.parentElement.querySelector("h3").innerText;
    
    modalTitle.innerText = className;
    modalDesc.innerText = classDetails[className];
    modal.style.display = "block";
  });
});

// Close modal when clicking 'x' or outside the box
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
};
