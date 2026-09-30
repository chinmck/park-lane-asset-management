/* Capabilities page — slow image movement.
   Each [data-drift] image rises a few pixels as its section scrolls through
   the viewport. Capped at ±20px; skipped entirely for reduced motion. */

const images = [...document.querySelectorAll("[data-drift]")];
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
const RANGE = 20;

if (images.length && !reduce.matches) {
  let ticking = false;

  const update = () => {
    const vh = window.innerHeight;
    images.forEach((img) => {
      const box = img.parentElement.getBoundingClientRect();
      if (box.bottom < 0 || box.top > vh) return;
      // -1 as the frame enters from below, +1 as it leaves at the top
      const progress = (vh / 2 - (box.top + box.height / 2)) / (vh / 2 + box.height / 2);
      img.style.transform = `translate3d(0, ${(-progress * RANGE).toFixed(1)}px, 0)`;
    });
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", update);
  update();
}
