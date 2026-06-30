# Top Line Exteriors

Marketing website for **Top Line Exteriors**: Fencing &amp; Exterior Repairs, Built for Michigan.

Static site hosted on **GitHub Pages**. Hand-written HTML + [Tailwind CSS](https://tailwindcss.com) (standalone CLI, no Node build required).

## Pages

- `index.html` (Home), `services.html`, `about.html`, `gallery.html`, `contact.html`.
- `coming-soon.html` is the previous launch page, kept for reuse.
- The published GitHub Pages site stays on the Coming Soon page until this is pushed.

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

Every photo is a placeholder (`.placeholder` div with a `data-img` path) until real photos are provided. See `IMAGES.md` for the full list of slots, intended filenames, and sizes. Drop files into `assets/img/` and swap the placeholder div for an `<img>`.

## Contact form (Web3Forms)

The site is static (no backend). Forms post to [Web3Forms](https://web3forms.com) via `assets/js/contact-form.js`.

1. Create a free access key at web3forms.com (enter the inbox email that should receive leads).
2. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in the hidden `access_key` input on `index.html` and `contact.html`.

The access key is public-safe (it only routes mail to your inbox). Free tier is 250 submissions per month.

## Brand

| Token    | Hex       | Use                        |
| -------- | --------- | -------------------------- |
| Brand    | `#FD6003` | Primary accent (from logo) |
| Ink      | `#14171A` | Headings                   |
| Body     | `#2A2D31` | Body copy                  |
| Muted    | `#5C6166` | Secondary text             |

Display font: **Archivo** · Body font: **Inter**.

Icons: [Lucide](https://lucide.dev) (ISC License), inlined as a self-contained SVG sprite (no CDN).
