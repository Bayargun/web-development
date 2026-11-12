// Dark mode — @custom-variant dark нь [data-theme="dark"]-ыг ажиглана
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

const syncTheme = () => themeToggle.setAttribute("aria-pressed", String(root.dataset.theme === "dark"));

themeToggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
  syncTheme();
});
syncTheme();

// Мобайл цэс — data-open атрибут (Tailwind: data-open:flex)
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const open = nav.toggleAttribute("data-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Цэс хаах" : "Цэс нээх");
});

// Form validation — data-submitted үед group-data-submitted:invalid:* загвар идэвхжинэ
const form = document.getElementById("uploadForm");
const success = document.getElementById("formSuccess");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  success.classList.add("hidden");

  if (!form.checkValidity()) {
    form.toggleAttribute("data-submitted", true);
    form.querySelector(":invalid").focus();
    return;
  }

  form.removeAttribute("data-submitted");
  form.reset();
  success.classList.remove("hidden");
});
