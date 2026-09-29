/* Approach page — Defined Purpose taxonomy.
   Each term is a toggle button; hovering or focusing it reveals its one-line
   explanation in a shared aria-live region. Clicking pins the selection. */

const root = document.querySelector(".ap-taxonomy");

if (root) {
  const purposes = JSON.parse(root.dataset.purposes);
  const detail = root.querySelector(".ap-taxonomy__detail");
  const terms = [...root.querySelectorAll(".ap-term")];
  let pinned = terms.find((t) => t.getAttribute("aria-pressed") === "true")?.dataset.purpose;

  function show(key) {
    const text = purposes[key]?.text;
    if (!text || detail.textContent === text) return;
    detail.textContent = text;
    detail.classList.remove("is-changing");
    void detail.offsetWidth; // restart the fade
    detail.classList.add("is-changing");
    terms.forEach((t) => t.setAttribute("aria-pressed", String(t.dataset.purpose === key)));
  }

  terms.forEach((t) => {
    t.addEventListener("mouseenter", () => show(t.dataset.purpose));
    t.addEventListener("focus", () => show(t.dataset.purpose));
    t.addEventListener("click", () => {
      pinned = t.dataset.purpose;
      show(pinned);
    });
  });

  // Leaving the row with the pointer returns to the pinned term
  root.querySelector(".ap-taxonomy__terms").addEventListener("mouseleave", () => show(pinned));
}
