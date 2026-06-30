# Top Line Exteriors

Marketing website for **Top Line Exteriors**: Fencing &amp; Exterior Repairs, Built for Michigan.

Static site hosted on **GitHub Pages**. Built with hand-written HTML + [Tailwind CSS](https://tailwindcss.com) (standalone CLI, no Node build required).

## Current state

- Full multi-page site built: `index.html` (Home), `services.html`, `about.html`, `gallery.html`, `contact.html`.
- `coming-soon.html` is the previous Coming Soon page, kept for reuse.
- The published GitHub Pages site remains the Coming Soon page until this is pushed.

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

## Contact form (Resend via Vercel function)

The site is static, so the Resend API key must **never** live in the front end. The
forms POST to a serverless function that holds the key as a server-side env var.

Files:
- `api/contact.js` serverless function (sends email via Resend)
- `vercel.json` function config
- `assets/js/contact-form.js` front-end handler (set the function URL in `ENDPOINT`)

Deploy steps:
1. Rotate your Resend key (the previous one was shared and is compromised). Resend → API Keys.
2. Verify `toplineinstall.com` as a sending domain in Resend (add its DNS records in Vercel DNS).
3. Deploy this repo to Vercel (zero-config: it auto-detects `api/contact.js`).
4. In Vercel → Project → Settings → Environment Variables, add:
   - `RESEND_API_KEY` = your new key
   - `CONTACT_TO` = quote@toplineinstall.com
   - `MAIL_FROM` = Top Line Exteriors &lt;quote@toplineinstall.com&gt;
   - `ALLOWED_ORIGIN` = https://toplineinstall.com
5. Put the function URL in `assets/js/contact-form.js` (`ENDPOINT`), e.g.
   `https://<your-vercel-app>.vercel.app/api/contact`, then commit.

Never commit the Resend key. It belongs only in Vercel environment variables.
