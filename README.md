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

## Contact form (FormSubmit)

The site is static (no backend). Both estimate forms post to [FormSubmit](https://formsubmit.co) via `assets/js/contact-form.js`, which emails submissions straight to the inbox with no account or API key.

- Destination inbox is set once, in the `ENDPOINT` in `assets/js/contact-form.js` (`https://formsubmit.co/ajax/quote@toplineinstall.com`). Change the address there to reroute leads.
- The visitor's `email` field is used as the reply-to, so you can reply to a lead directly.
- Hidden config fields on each form: `_subject`, `_template` (table layout), `_captcha` (off, AJAX), and a `_honey` honeypot for spam.

**One-time activation (required):** the first submission to a new inbox triggers a FormSubmit "Activate Form" email to that inbox. Click the link once and all future submissions are delivered automatically. FormSubmit only accepts submissions from a real http(s) origin (the live domain), not from `file://` or origin-less requests.

Optional hardening: after activation, FormSubmit issues a hashed alias (`/ajax/el/XXXX`) you can swap in for the raw address so the email is not exposed in the page source.

## Brand

| Token    | Hex       | Use                        |
| -------- | --------- | -------------------------- |
| Brand    | `#FD6003` | Primary accent (from logo) |
| Ink      | `#14171A` | Headings                   |
| Body     | `#2A2D31` | Body copy                  |
| Muted    | `#5C6166` | Secondary text             |

Display font: **Archivo** · Body font: **Inter**.

Icons: [Lucide](https://lucide.dev) (ISC License), inlined as a self-contained SVG sprite (no CDN).
