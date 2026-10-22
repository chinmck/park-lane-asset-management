# Strategy Visualizer — slab assets

Each asset class is a **pre-rendered, dimensional slab object on transparency**. The subject emerges from the
slab material, and the image carries its own perspective, side faces and lighting.

## How they are rendered

Each image is a sprite standing on its slab's footprint in the 3D scene. It turns back toward the viewer by
`BILLBOARD` (0.82) in `strategy-visualizer.js`, so the artwork's own perspective is never distorted. The slab still
moves, recedes, casts its contact shadow and assembles exactly as the approved interaction.

- **Recession:** a brightness and saturation filter on the image.
- **Selection:** a green edge light that follows the object's silhouette (`drop-shadow`), plus a soft green floor glow.
- **Placeholder:** the CSS material box underneath stays until the image has decoded, then crossfades out. It also
  remains as the fallback if an image fails to load.

## Files

| Asset | Files | 1x | 2x | Model size (w × h) |
| --- | --- | --- | --- | --- |
| Property | `property.webp`, `property@2x.webp` | 316 × 500 | 633 × 1000 | 253 × 400 |
| Art & Collectibles | `art.webp`, `art@2x.webp` | 188 × 412 | 376 × 825 | 150 × 330 |
| Equities & Investments | `equities.webp`, `equities@2x.webp` | 233 × 588 | 466 × 1175 | 186 × 470 |
| Business Interests | `business.webp`, `business@2x.webp` | 262 × 450 | 524 × 900 | 210 × 360 |

The files are WebP with alpha: about 160 KB for the 1x set and 490 KB for the 2x set, down from 7.8 MB of source PNGs.
They load with the component, about 400px before the section scrolls into view.

## Replacing an asset

1. Start from a transparent PNG of the object.
2. Trim it to the object, and remove the 1px cutout halo so there's no coloured edge on the dark background.
3. Export 1x and 2x WebP at the heights above (1.25× and 2.5× the model height).
4. Set the slab's `size.w` to `size.h × (image width ÷ image height)` so the footprint matches the art.
