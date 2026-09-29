# Strategy Visualizer — slab-face assets

There are four images, one for the **front face** of each slab. The model, layout, motion and side faces stay as built.
The scene adds lighting, grain and edge highlights over each image. A slab keeps showing its placeholder
material until its image loads.

## Files

| Asset | File (1x / 2x) | 1x px | 2x px | Ratio (w:h) |
| --- | --- | --- | --- | --- |
| Property (limestone) | `property.jpg` / `property@2x.jpg` | 285 × 490 | 570 × 980 | 0.582 |
| Art & Collectibles (bronze) | `art.jpg` / `art@2x.jpg` | 148 × 358 | 295 × 715 | 0.413 |
| Equities & Investments (smoked glass) | `equities.jpg` / `equities@2x.jpg` | 183 × 635 | 365 × 1270 | 0.287 |
| Business Interests (green marble) | `business.jpg` / `business@2x.jpg` | 258 × 408 | 515 × 815 | 0.632 |

The ratios are fixed by the slab proportions. Other sizes still work, because each image fills its face and is
cropped from the centre, but matching the ratio avoids cropping.

## Art direction

- **Straight-on and flat-lit.** Don't bake in perspective, cast shadows or strong highlights. The scene adds its own
  light from the upper left and darkens the base.
- **Matte.** Avoid gloss, specular hot-spots and chrome.
- **Keep the key content central.** The lowest ~20% is darkened by ambient occlusion. A small label also sits in the
  bottom-left corner (about 12px in from each edge).
- **No text or logos** in the image.
- **Equities (glass):** a JPEG makes the pane opaque. To keep the smoked-glass translucency, supply a PNG or WebP with
  alpha (e.g. `equities.webp`) and use that filename instead.

Format: sRGB JPEG (or WebP), about 150 KB or less at 2x.

## Placing them

1. Put the files in this folder.
2. In `assets/js/components/strategy-visualizer.js`, set `image` on each entry in `ASSETS`:

   ```js
   image: { src: "assets/img/visualizer/property.jpg", src2x: "assets/img/visualizer/property@2x.jpg" },
   ```

   A plain string also works: `image: "assets/img/visualizer/property.jpg"`.

The images load with the component, only when the section nears the viewport, so they don't affect initial page load.
