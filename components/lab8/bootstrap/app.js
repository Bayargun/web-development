// Dark mode — Bootstrap 5.3-ын data-bs-theme
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

const syncTheme = () =>
  themeToggle.setAttribute("aria-pressed", String(root.getAttribute("data-bs-theme") === "dark"));

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-bs-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
  syncTheme();
});
syncTheme();

// Form validation — Bootstrap-ийн .was-validated загвар
const form = document.getElementById("uploadForm");
const success = document.getElementById("formSuccess");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  success.classList.add("d-none");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    form.querySelector(":invalid").focus();
    return;
  }

  form.classList.remove("was-validated");
  form.reset();
  success.classList.remove("d-none");
});
