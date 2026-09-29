/* Strategy Visualizer
 *
 * An architectural model of the portfolio: each asset class is a material slab
 * on a stone plinth. Selecting one brings its slab forward; selecting several
 * assembles them into one interlocking composition joined by a slim brass tie.
 *
 * main.js lazy-imports this module and calls `mount(root)`, where root is the
 * [data-component="strategy-visualizer"] element. Controls are real buttons in
 * the page markup ([data-asset]); the model is rendered into [data-sv-stage].
 *
 * Structure, layout and interaction are frozen. Final artwork: each asset's
 * `image` is a pre-rendered, dimensional slab object on transparency. It is
 * shown as a sprite standing at the slab's position and turned toward the
 * viewer (BILLBOARD), so the art keeps its own perspective and protrusion
 * while the slab still moves, recedes and assembles exactly as before. The
 * CSS material box stays underneath as the loading/error fallback.
 * Slab `size` w:h matches each image's trimmed aspect. See assets/img/visualizer/README.md
 */

// How far each sprite turns back toward the viewer (1 = fully camera-facing).
// A little less than 1 lets the composition still read its gentle rotation.
const BILLBOARD = 0.82;

const ASSETS = [
  {
    id: "property",
    label: "Property",
    material: "limestone",
    image: { src: "assets/img/visualizer/property.webp", src2x: "assets/img/visualizer/property@2x.webp" },
    size: { w: 253, h: 400, d: 44 },
    idle: { x: -262, z: 30, ry: -5 },
    view: -20,
    title: "Property, held with a purpose.",
    text: "Acquisition, repositioning and long-term management. Every building is given a defined role, then financed and maintained to serve the wider portfolio.",
    roles: ["Acquire", "Reposition", "Manage"],
  },
  {
    id: "art",
    label: "Art & Collectibles",
    material: "bronze",
    image: { src: "assets/img/visualizer/art.webp", src2x: "assets/img/visualizer/art@2x.webp" },
    size: { w: 150, h: 330, d: 40 },
    idle: { x: -150, z: -80, ry: 7 },
    view: -25,
    title: "Collections, stewarded like capital.",
    text: "Provenance, insurance, storage and considered disposal. Significant works are held under the same governance as every other asset.",
    roles: ["Provenance", "Protect", "Steward"],
  },
  {
    id: "equities",
    label: "Equities & Investments",
    material: "glass",
    image: { src: "assets/img/visualizer/equities.webp", src2x: "assets/img/visualizer/equities@2x.webp" },
    size: { w: 186, h: 470, d: 20 },
    idle: { x: 88, z: 80, ry: -2 },
    view: -31,
    title: "Liquidity, with discipline.",
    text: "Listed and private holdings structured around risk, income and time horizon: the liquid layer that lets the rest of the portfolio hold its course.",
    roles: ["Allocate", "Balance", "Review"],
  },
  {
    id: "business",
    label: "Business Interests",
    material: "marble",
    image: { src: "assets/img/visualizer/business.webp", src2x: "assets/img/visualizer/business@2x.webp" },
    size: { w: 210, h: 360, d: 44 },
    idle: { x: 206, z: -40, ry: 8 },
    view: -37,
    title: "Enterprise, aligned with the family.",
    text: "Operating companies and shareholdings, considered alongside succession, value extraction and the wider balance sheet.",
    roles: ["Structure", "Succession", "Realise"],
  },
];

const UNIFIED = {
  title: "Different assets. One strategy.",
  text: "Structured together, each holding takes a defined role (income, growth, protection or legacy) under one plan, one governance and one view of risk.",
  roles: ["One structure", "One governance", "One view of risk"],
};

const VIEW = {
  idle: { rx: -9, ry: -26 },
  multi: { rx: -12, ry: -16 },
  compact: { rx: -7, ry: -12 },
};

const COMPACT_QUERY = window.matchMedia("(max-width: 640px)");
const TABLET_QUERY = window.matchMedia("(max-width: 1024px)");
// Only wide screens have the room for the largest model
const WIDE_QUERY = window.matchMedia("(min-width: 1360px)");
const pad = (n) => String(n).padStart(2, "0");

/* ---------------------------------------------------------------- building */

function el(tag, className, parent) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (parent) parent.append(node);
  return node;
}

function buildBox(className, { w, h, d }) {
  const box = el("div", className);
  box.style.setProperty("--w", w);
  box.style.setProperty("--h", h);
  box.style.setProperty("--d", d);
  ["front", "back", "left", "right", "top"].forEach((f) => el("div", `sv-face sv-face--${f}`, box));
  return box;
}

function buildSlab(asset, index) {
  const slab = buildBox(`sv-slab m-${asset.material}`, asset.size);
  slab.dataset.asset = asset.id;
  el("div", "sv-shadow", slab);
  let tagHost = slab.querySelector(".sv-face--front");

  if (asset.image) {
    const { src, src2x } = typeof asset.image === "string" ? { src: asset.image } : asset.image;
    const sprite = el("div", "sv-sprite", slab);
    const img = el("img", "sv-sprite__img", sprite);
    img.alt = "";
    img.decoding = "async";
    img.draggable = false;
    if (src2x) img.srcset = `${src} 1x, ${src2x} 2x`;
    // Swap from material box to artwork only once decoded, so nothing pops.
    img.addEventListener("load", () => {
      (img.decode ? img.decode() : Promise.resolve())
        .catch(() => {})
        .then(() => slab.classList.add("is-loaded"));
    });
    img.src = src;
    tagHost = sprite;
  }

  const tag = el("span", "sv-tag", tagHost);
  tag.innerHTML = `<b>${pad(index + 1)}</b> ${asset.label}`;
  return slab;
}

/* ------------------------------------------------------------------ layout */

/* Returns target placement for every slab plus the brass elements. Pure. */
function layout(selected, compact) {
  const chosen = ASSETS.filter((a) => selected.has(a.id));
  const n = chosen.length;
  const place = {};

  // Resting positions: a staggered model on desktop, a shallow row on phones.
  const rest = {};
  if (compact) {
    const gap = 16;
    const total = ASSETS.reduce((s, a) => s + a.size.w, 0) + gap * (ASSETS.length - 1);
    let cursor = -total / 2;
    ASSETS.forEach((a, i) => {
      rest[a.id] = { x: cursor + a.size.w / 2, z: i % 2 ? -40 : 0, ry: 0 };
      cursor += a.size.w + gap;
    });
  } else {
    ASSETS.forEach((a) => (rest[a.id] = a.idle));
  }

  let view = compact ? VIEW.compact : VIEW.idle;
  let lintel = null;
  let datum = null;

  if (n === 0) {
    ASSETS.forEach((a) => (place[a.id] = { ...rest[a.id], y: 0, receded: false, active: false }));
  } else if (n === 1) {
    const [only] = chosen;
    ASSETS.forEach((a) => {
      const r = rest[a.id];
      place[a.id] =
        a === only
          ? { x: r.x * 0.45, y: 0, z: compact ? 150 : 190, ry: 0, receded: false, active: true }
          : { x: r.x * 0.86, y: 0, z: r.z - 110, ry: r.ry, receded: true, active: false };
    });
    view = compact ? VIEW.compact : { rx: -7, ry: only.view };
    const p = place[only.id];
    datum = { x: p.x - only.size.w / 2, z: p.z + only.size.d / 2 + 36, w: only.size.w };
  } else {
    // Assemble the chosen slabs into one massing: alternate planes step back a
    // tier and overlap their neighbours; the outer planes turn in slightly.
    const overlap = 4;
    const front = 70;
    const total = chosen.reduce((s, a) => s + a.size.w, 0) - overlap * (n - 1);
    const minH = Math.min(...chosen.map((a) => a.size.h));
    const maxD = Math.max(...chosen.map((a) => a.size.d));
    const tier = maxD + 16;
    let cursor = -total / 2;
    chosen.forEach((a, i) => {
      const back = i % 2 ? tier : 0;
      const ry = n > 2 && i === 0 ? 5 : n > 2 && i === n - 1 ? -5 : 0;
      place[a.id] = { x: cursor + a.size.w / 2, y: 0, z: front - a.size.d / 2 - back, ry, receded: false, active: true };
      cursor += a.size.w - overlap;
    });
    ASSETS.filter((a) => !selected.has(a.id)).forEach((a) => {
      const r = rest[a.id];
      place[a.id] = { x: r.x * 1.3, y: 0, z: -330, ry: r.ry, receded: true, active: false };
    });
    view = compact ? VIEW.compact : VIEW.multi;
    // Brass tie threaded low between the two tiers; its ends show past the outer planes
    lintel = { w: total + 64, d: 3, y: -Math.round(minH * 0.08), z: front - maxD - 8 };
    datum = { x: -total / 2, z: front + 40, w: total };
  }

  return { place, view, lintel, datum };
}

/* ------------------------------------------------------------------- mount */

export function mount(root) {
  const stage = root.querySelector("[data-sv-stage]");
  const detail = root.querySelector("[data-sv-detail]");
  const controls = [...root.querySelectorAll("[data-asset]")].filter((b) => b.tagName === "BUTTON");
  if (!stage || !controls.length) return () => {};

  const selected = new Set();

  // Scene graph
  const scene = el("div", "sv-scene", stage);
  const plinth = el("div", "sv-plinth", scene);
  const slabs = new Map(ASSETS.map((a, i) => [a.id, scene.appendChild(buildSlab(a, i))]));
  const lintel = scene.appendChild(buildBox("sv-slab sv-lintel m-brass", { w: 100, h: 3, d: 3 }));
  const datum = el("div", "sv-datum", scene);
  const caption = el("div", "sv__caption", stage);
  stage.classList.add("is-mounted");

  function scaleFor(compact) {
    const width = stage.clientWidth;
    if (compact) {
      const row = ASSETS.reduce((s, a) => s + a.size.w, 0) + 16 * 3;
      return Math.min(0.62, (width - 36) / row);
    }
    // Side-by-side desktop gets the larger model; full-width tablet a gentler one
    const divisor = TABLET_QUERY.matches ? 740 : WIDE_QUERY.matches ? 590 : 640;
    return Math.max(0.5, Math.min(1.8, width / divisor));
  }

  function render() {
    const compact = COMPACT_QUERY.matches;
    const { place, view, lintel: l, datum: dm } = layout(selected, compact);
    // A wide assembly eases back, like stepping away from the model
    const fit = l ? Math.min(1, (compact ? 760 : 660) / l.w) : 1;
    const s = scaleFor(compact) * fit;

    scene.style.transform = `scale(${s}) rotateX(${view.rx}deg) rotateY(${view.ry}deg)`;
    plinth.style.setProperty("--pw", `${compact ? 1100 : 980}px`);
    plinth.style.setProperty("--pd", `${compact ? 420 : 620}px`);

    ASSETS.forEach((a) => {
      const p = place[a.id];
      const slab = slabs.get(a.id);
      slab.style.transform = `translate3d(${p.x}px, ${p.y}px, ${p.z}px) rotateY(${p.ry}deg)`;
      const sprite = slab.querySelector(".sv-sprite");
      if (sprite) {
        sprite.style.transform = `rotateY(${-(p.ry + view.ry) * BILLBOARD}deg) rotateX(${-view.rx}deg)`;
      }
      slab.classList.toggle("is-active", p.active);
      slab.classList.toggle("is-receded", p.receded);
    });

    if (l) {
      lintel.style.setProperty("--w", l.w);
      lintel.style.setProperty("--d", l.d);
      lintel.style.transform = `translate3d(0, ${l.y}px, ${l.z}px) scale3d(1, 1, 1)`;
    } else {
      lintel.style.transform = `translate3d(0, -300px, 0) scale3d(0.001, 1, 0.001)`;
    }

    if (dm) {
      datum.style.width = `${dm.w}px`;
      datum.style.transform = `translate3d(${dm.x}px, 0, ${dm.z}px) rotateX(90deg)`;
    } else {
      datum.style.width = "0px";
    }

    caption.innerHTML = `<span><span class="sv__fig">Fig. 02 — </span>Portfolio model</span><span><strong>${pad(selected.size)}</strong> / ${pad(ASSETS.length)} selected</span>`;
  }

  function renderDetail() {
    const chosen = ASSETS.filter((a) => selected.has(a.id));
    if (!chosen.length) {
      detail.innerHTML = `<p class="sv__hint">Select one or more to see how they are structured together.</p>`;
      return;
    }
    const multi = chosen.length > 1;
    const c = multi ? UNIFIED : chosen[0];
    const kicker = multi
      ? chosen.map((a) => a.label).join(" · ")
      : `${pad(ASSETS.indexOf(c) + 1)} — ${c.label}`;
    detail.innerHTML = `
      <div class="sv-detail">
        <p class="sv-detail__kicker">${kicker}</p>
        <h3 class="sv-detail__title">${c.title}</h3>
        <p class="sv-detail__text">${c.text}</p>
        <ul class="sv-detail__roles">${c.roles.map((r) => `<li>${r}</li>`).join("")}</ul>
      </div>`;
  }

  function toggle(id) {
    selected.has(id) ? selected.delete(id) : selected.add(id);
    controls.forEach((b) => b.setAttribute("aria-pressed", String(selected.has(b.dataset.asset))));
    render();
    renderDetail();
  }

  controls.forEach((b) => b.addEventListener("click", () => toggle(b.dataset.asset)));
  stage.addEventListener("click", (e) => {
    const slab = e.target.closest(".sv-slab[data-asset]");
    if (slab) toggle(slab.dataset.asset);
  });

  const ro = new ResizeObserver(render);
  ro.observe(stage);
  COMPACT_QUERY.addEventListener("change", render);
  render();

  return () => {
    ro.disconnect();
    COMPACT_QUERY.removeEventListener("change", render);
    scene.remove();
    caption.remove();
    stage.classList.remove("is-mounted");
  };
}
