/* Strategy Visualizer — placeholder module.
 *
 * Contract: main.js lazy-imports this file when the section nears the viewport
 * and calls `mount(stageElement)`. The stage is the bordered container inside
 * #strategy-visualizer. To ship the real component:
 *   1. Render into `stage` (it keeps its size from sections.css).
 *   2. Set `stage.dataset.mounted = ""` to hide the static placeholder.
 *   3. Return an optional `unmount` function.
 * Style it in its own stylesheet (e.g. assets/css/strategy-visualizer.css)
 * using the tokens in tokens.css.
 */

export function mount(stage) {
  // Intentionally left as a no-op until the interactive build lands.
  return () => {};
}
