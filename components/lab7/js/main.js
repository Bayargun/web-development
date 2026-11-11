const root = document.documentElement;

const menuToggle = document.querySelector(".navbar__toggle");
const navList = document.querySelector(".navbar__list");

menuToggle.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("navbar__list--open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Цэс хаах" : "Цэс нээх");
});

const themeToggle = document.querySelector(".navbar__theme");
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

const isDark = () =>
  root.dataset.theme ? root.dataset.theme === "dark" : darkQuery.matches;

const syncThemeButton = () =>
  themeToggle.setAttribute("aria-pressed", String(isDark()));

themeToggle.addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
  syncThemeButton();
});

darkQuery.addEventListener("change", syncThemeButton);
syncThemeButton();

document.querySelectorAll(".card").forEach((card, index) => {
  card.style.setProperty("--i", index); // stagger-ийн дараалал

  const front = card.querySelector(".card__face--front");
  const back = card.querySelector(".card__face--back");
  const openBtn = front.querySelector(".card__btn");
  const closeBtn = back.querySelector(".card__btn");

  back.inert = true;

  const setFlipped = (flipped) => {
    card.classList.toggle("card--flipped", flipped);
    front.inert = flipped;
    back.inert = !flipped;
    openBtn.setAttribute("aria-expanded", String(flipped));
    (flipped ? closeBtn : openBtn).focus();
  };

  openBtn.addEventListener("click", () => setFlipped(true));
  closeBtn.addEventListener("click", () => setFlipped(false));

  card.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && card.classList.contains("card--flipped")) {
      setFlipped(false);
    }
  });
});

const gallery = document.getElementById("gallery");
const loader = document.getElementById("loader");
let finished = false;

const finishLoading = () => {
  if (finished) return;
  finished = true;
  root.classList.add("is-loaded");
  gallery.removeAttribute("aria-busy");
  loader.querySelector(".loader__text").textContent = "Ачаалж дууслаа";
  setTimeout(() => {
    loader.hidden = true;
  }, 700);
};

if (document.readyState === "complete") {
  finishLoading();
} else {
  window.addEventListener("load", finishLoading, { once: true });
}

setTimeout(finishLoading, 4000);
