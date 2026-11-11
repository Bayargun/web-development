// `defer`-ээр ачаалагдах тул DOM бэлэн болсон үед ажиллана.
const root = document.documentElement;

/* ---------- 1. Мобайл цэс ---------- */
const menuToggle = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-list");

menuToggle.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Цэс хаах" : "Цэс нээх");
});

/* ---------- 2. Dark mode ---------- */
const themeToggle = document.querySelector(".theme-toggle");
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
  } catch (e) {
    /* хувийн цонх гэх мэт үед хадгалахгүй */
  }
  syncThemeButton();
});

darkQuery.addEventListener("change", syncThemeButton);
syncThemeButton();

/* ---------- 3. 3D flip card ---------- */
document.querySelectorAll(".card").forEach((card, index) => {
  card.style.setProperty("--i", index); // stagger-ийн дараалал

  const front = card.querySelector(".card-front");
  const back = card.querySelector(".card-back");
  const openBtn = front.querySelector(".flip-btn");
  const closeBtn = back.querySelector(".flip-btn");

  // Харагдахгүй талыг гар болон дэлгэц уншигчаас нуух
  back.inert = true;

  const setFlipped = (flipped) => {
    card.classList.toggle("is-flipped", flipped);
    front.inert = flipped;
    back.inert = !flipped;
    openBtn.setAttribute("aria-expanded", String(flipped));
    (flipped ? closeBtn : openBtn).focus();
  };

  openBtn.addEventListener("click", () => setFlipped(true));
  closeBtn.addEventListener("click", () => setFlipped(false));

  card.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && card.classList.contains("is-flipped")) {
      setFlipped(false);
    }
  });
});

/* ---------- 4. Loader ---------- */
const gallery = document.getElementById("gallery");
const loader = document.getElementById("loader");
let finished = false;

const finishLoading = () => {
  if (finished) return;
  finished = true;
  root.classList.add("is-loaded"); // картуудын stagger animation эхэлнэ
  gallery.removeAttribute("aria-busy");
  loader.querySelector(".loader-text").textContent = "Ачаалж дууслаа";
  setTimeout(() => {
    loader.hidden = true;
  }, 700);
};

if (document.readyState === "complete") {
  finishLoading();
} else {
  window.addEventListener("load", finishLoading, { once: true });
}
// Сүлжээ удаан үед хэрэглэгчийг хүлээлгэхгүй
setTimeout(finishLoading, 4000);
