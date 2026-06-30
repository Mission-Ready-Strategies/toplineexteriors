# Top Line Exteriors

Marketing website for **Top Line Exteriors** — Fencing &amp; Exterior Repairs, Built for Michigan.

Static site hosted on **GitHub Pages**. Built with hand-written HTML + [Tailwind CSS](https://tailwindcss.com) (standalone CLI, no Node build required).

## Current state

- `index.html` — **Coming Soon** page (live).
- The full multi-page site (Home / Services / About / Gallery / Contact) is in progress.

## Project structure

```
index.html          Coming Soon page (served at the site root)
assets/
  logo-white.svg    Reversed logo (for dark backgrounds)
  logo-dark.svg     Full-color logo (for light backgrounds)
  css/site.css      Compiled, minified Tailwind output (committed for Pages)
src/input.css       Tailwind source (@theme brand tokens + directives)
.nojekyll           Disable Jekyll processing on GitHub Pages
```

## Local development

The Tailwind standalone CLI lives in `bin/` (gitignored). Download the macOS arm64 build:

```bash
mkdir -p bin
curl -fL https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-arm64 -o bin/tailwindcss
chmod +x bin/tailwindcss
```

Rebuild the stylesheet after editing markup or `src/input.css`:

```bash
# one-off, minified
bin/tailwindcss -i src/input.css -o assets/css/site.css --minify

# watch mode while developing
bin/tailwindcss -i src/input.css -o assets/css/site.css --watch
```

Commit the regenerated `assets/css/site.css` so GitHub Pages serves the latest styles.

## Brand

| Token    | Hex       | Use                        |
| -------- | --------- | -------------------------- |
| Orange   | `#FF6A00` | Primary accent             |
| Black    | `#111111` | Headlines, dark UI         |
| Charcoal | `#2A2D31` | Dark sections, footer      |
| Gray     | `#5C6166` | Body copy                  |

Display font: **Archivo** · Body font: **Inter**.
