/* Parklane — site shell behaviour: header state, mobile menu, reveals, component mounting. */

const header = document.querySelector("[data-header]");
const hero = document.querySelector("[data-hero]");
const toggle = document.querySelector("[data-menu-toggle]");
const menu = document.getElementById("mobile-menu");
const desktopNav = window.matchMedia("(min-width: 1025px)");

/* Header: solid obsidian once the hero has scrolled past the header */
function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

/* Hero copy fades in once; the image itself is static */
requestAnimationFrame(() => hero?.classList.add("is-ready"));

/* Mobile menu */
function setMenu(open) {
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menu.classList.toggle("is-open", open);
  menu.inert = !open;
  document.body.classList.toggle("is-locked", open);
  if (open) menu.querySelector("a")?.focus();
}

if (toggle && menu) {
  menu.inert = true;
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });
  desktopNav.addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });
}

/* Scroll reveals */
const revealables = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add("is-visible"));
}

/* Component mounting — each [data-component] lazy-loads its module when near the viewport.
   Modules export `mount(element)`. */
const componentLoaders = {
  "strategy-visualizer": () => import("./components/strategy-visualizer.js"),
};

function mountComponent(el) {
  const load = componentLoaders[el.dataset.component];
  if (!load) return;
  load()
    .then((mod) => mod.mount?.(el))
    .catch((err) => console.error(`[parklane] failed to mount ${el.dataset.component}`, err));
}

const components = document.querySelectorAll("[data-component]");
if ("IntersectionObserver" in window) {
  const co = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        co.unobserve(entry.target);
        mountComponent(entry.target);
      });
    },
    { rootMargin: "400px 0px" }
  );
  components.forEach((el) => co.observe(el));
} else {
  components.forEach(mountComponent);
}

/* Request an Introduction dialog — present on every page */
if (document.getElementById("introduction")) {
  import("./components/introduction.js")
    .then((mod) => mod.init())
    .catch((err) => console.error("[parklane] failed to load introduction dialog", err));
}
