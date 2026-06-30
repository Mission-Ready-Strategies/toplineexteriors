# Top Line Exteriors

Marketing website for **Top Line Exteriors**: Fencing &amp; Exterior Repairs, Built for Michigan.

Static site hosted on **GitHub Pages**. Hand-written HTML + [Tailwind CSS](https://tailwindcss.com) (standalone CLI, no Node build required).

## Pages

- `index.html` (Home), `services.html`, `about.html`, `gallery.html`, `contact.html`.
- `404.html` is the branded not-found page (served by GitHub Pages on unknown routes).

## Design system

All styling flows from one place: `src/input.css`.

- **Tokens** (`@theme`): brand orange is pulled from the logo (`#FD6003`); plus surface, text, and border tokens. There are **no hardcoded colors** in the markup.
- **Components** (`@layer components`): `.btn` / `.btn-primary` / `.btn-outline` / `.btn-inverse`, `.input` / `.select` / `.textarea`, `.card`, `.eyebrow`, `.section-title`, `.chip`, `.placeholder`, `.container-page`, `.section`. Change a component once and it updates everywhere.

## Build

The Tailwind standalone CLI lives in `bin/` (gitignored). Download the macOS arm64 build:

```bash
mkdir -p bin
curl -fL https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-arm64 -o bin/tailwindcss
chmod +x bin/tailwindcss
```

Rebuild the stylesheet after editing markup or `src/input.css`:

```bash
bin/tailwindcss -i src/input.css -o assets/css/site.css --minify   # one-off
bin/tailwindcss -i src/input.css -o assets/css/site.css --watch     # while developing
```

Commit the regenerated `assets/css/site.css` so GitHub Pages serves the latest styles.

## Images

All site photos are placed and served as WebP from `assets/img/` (12 total, no placeholders remain). See `IMAGES.md` for the slot-by-slot manifest, intended filenames, and target sizes.

## Contact form (Web3Forms)

The site is static (no backend). Forms post to [Web3Forms](https://web3forms.com) via `assets/js/contact-form.js`.

The public-safe `access_key` is already set in the hidden `access_key` input on `index.html` and `contact.html`. To route leads to a different inbox, create a new key at web3forms.com and replace it in both files.

The access key is public-safe (it only routes mail to the configured inbox). Free tier is 250 submissions per month.

## Brand

| Token    | Hex       | Use                        |
| -------- | --------- | -------------------------- |
| Brand    | `#FD6003` | Primary accent (from logo) |
| Ink      | `#14171A` | Headings                   |
| Body     | `#2A2D31` | Body copy                  |
| Muted    | `#5C6166` | Secondary text             |

Display font: **Archivo** · Body font: **Inter**.

Icons: [Lucide](https://lucide.dev) (ISC License), inlined as a self-contained SVG sprite (no CDN).
