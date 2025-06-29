

















const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const closeBtn = document.getElementById('closeBtn');

// Toggle menu
menuToggle.addEventListener('click', function (event) {
  navLinks.classList.toggle('active');
  event.stopPropagation();
});

// Close if clicked outside
document.addEventListener('click', function (event) {
  if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
    navLinks.classList.remove('active');
  }
});

// Close on nav link click
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Close on close button click
closeBtn.addEventListener('click', () => {
  navLinks.classList.remove('active');
});






























window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 50);
});
