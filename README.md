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

`#strategy-visualizer` is a placeholder stage. `main.js` lazy-imports
`assets/js/components/strategy-visualizer.js` when it nears the viewport and calls
`mount(stage)`. Build the component there and set `stage.dataset.mounted = ""` to
hide the placeholder.

## Local preview

```
python3 -m http.server 4173
```
(ES modules need a server; opening the file directly won't run the JS.)
