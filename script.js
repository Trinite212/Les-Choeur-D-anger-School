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














// Data for the items
const classMaterials = {
  "Nursery One": {
    desc: "Sensory-based learning focusing on play and motor skills.",
    items: [
      { name: "Crayons", icon: "fa-palette" },
      { name: "Scribble Pad", icon: "fa-book-open" },
      { name: "Apron", icon: "fa-shirt" }
    ]
  },
  "Nursery Two": {
    desc: "Introduction to phonics, numbers, and creative expression.",
    items: [
      { name: "Pencils", icon: "fa-pencil" },
      { name: "Workbook", icon: "fa-book" },
      { name: "Eraser", icon: "fa-eraser" }
    ]
  },
  "Nursery Three": {
    desc: "Preparing children for primary school with advanced literacy.",
    items: [
      { name: "School Bag", icon: "fa-bag-shopping" },
      { name: "Story Books", icon: "fa-lines-leaning" },
      { name: "Lunch Box", icon: "fa-box" }
    ]
  }
};

const modal = document.getElementById("classModal");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll(".btnn").forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    const className = this.previousElementSibling.innerText; // Gets "Nursery One"
    const data = classMaterials[className];

    document.getElementById("modalTitle").innerText = className;
    document.getElementById("modalDescription").innerText = data.desc;

    // Clear and build the boxes
    const list = document.getElementById("essentialsList");
    list.innerHTML = "";
    data.items.forEach(item => {
      list.innerHTML += `
        <div class="essential-item">
          <i class="fa-solid ${item.icon}"></i>
          <span>${item.name}</span>
        </div>`;
    });

    modal.style.display = "block";
  });
});

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };
