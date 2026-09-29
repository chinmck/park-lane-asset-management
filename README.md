# Parklane Asset Management — Homepage

Static homepage shell. No build step; Netlify publishes the repo root.

## Structure

```
index.html                         Section order: Hero → Strategy Visualizer → Process → Philosophy → Insights → CTA → Footer
assets/css/tokens.css              Design tokens: palette, type scale, spacing, motion (edit here first)
assets/css/base.css                Reset, focus states, type primitives, reveal motion
assets/css/components.css          Buttons, links, header, mobile menu
assets/css/sections.css            Per-section layout, incl. hero crop tuning
assets/js/main.js                  Header state, mobile menu, reveals, lazy component mounting
assets/js/components/              Interactive components (mounted via [data-component])
assets/img/                        Optimised hero crops + logo mark
```

## Hero crop

The hero image is static. Framing is set per viewport with `--hero-pos` in `sections.css`:

| Viewport | Source | Framing |
| --- | --- | --- |
| ≥1600px | `hero-1672.jpg` | `50% 42%` |
| 1025–1599px | `hero-*.jpg` | `22% 50%` (sculpture sits right of the copy) |
| Tablet portrait | `hero-*.jpg` | `58% 50%`, image in upper 62% |
| Phone portrait | `hero-portrait-*.jpg` | `50% 50%`, image in upper 64% |

## Strategy Visualizer

`assets/js/components/strategy-visualizer.js` + `assets/css/strategy-visualizer.css`.

An architectural model built with CSS 3D. Each asset class is a slab on a stone plinth:
Property is limestone with an etched plan, Art & Collectibles is patinated bronze,
Equities & Investments is smoked glass, and Business Interests is dark green marble.

- **One selected:** that slab comes forward with a green edge, the others recede, the view rebalances,
  and a brass datum line marks it.
- **Several selected:** the chosen slabs assemble into one massing under a brass lintel
  ("Different assets. One strategy.").
- **Phones:** a shallow frontal row with a 2×2 grid of tap targets, using the same materials and states.

The controls are real `<button aria-pressed>` elements in `index.html`. The model is decorative (`aria-hidden`),
and the copy updates in an `aria-live` region.

**Swapping in final assets:** set `image` on an entry in `ASSETS` to lay a photograph over that slab's front face.
You can also replace `buildSlab()`. `layout()` is pure and only needs each slab's `size`.
Edit copy, sizes and resting positions in the same `ASSETS` config.

## Local preview

```
python3 -m http.server 4173
```
(ES modules need a server; opening the file directly won't run the JS.)
