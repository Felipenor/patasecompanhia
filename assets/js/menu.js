document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuPopup = document.querySelector(".menu-popup");
  const menuClose = document.querySelector(".menu-close");

  menuToggle.addEventListener("click", () => {
    menuPopup.classList.toggle("active");
  });

  menuClose.addEventListener("click", () => {
    menuPopup.classList.remove("active");
  });
});
