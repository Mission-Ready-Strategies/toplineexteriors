# Image manifest

## Status

All site photos are **webp** (12 total). They fill the hero, all 5 home "Recent Projects" tiles, all 4 service sections, the About image, and all 12 gallery tiles. Every category is covered: Wood, Vinyl, Aluminum, Chain Link, Gates, Repairs.

No placeholders remain.

To place a real photo (export as webp):

1. Drop the file in `assets/img/` using the exact filename below.
2. In the page, replace the placeholder `<div class="placeholder ..." data-img="assets/img/NAME.jpg"> ... </div>`
   with `<img src="assets/img/NAME.jpg" alt="DESCRIBE THE PHOTO" class="h-full w-full rounded-lg object-cover" loading="lazy" />`
   (the hero uses `object-cover` and fills its frame; no `rounded-lg` there).

Format: **WebP**, sRGB. Target sizes are 2x of display size for sharp retina output. Keep each file roughly under 150 KB. (Convert with Pillow or `cwebp`.)

Icons (service cards, why-choose, contact) are inline SVG and need no files.

## Home (`index.html`)

| File | Slot | Aspect | Recommended px | Subject |
| ---- | ---- | ------ | -------------- | ------- |
| `hero-fence.jpg` | Hero | 4:3 | 1600 x 1200 | A finished fence on a Michigan property. Keep visual interest on the right; the left edge is covered by the diagonal cut. |
| `project-1.jpg` | Recent projects | 4:3 | 800 x 600 | Wood privacy fence |
| `project-2.jpg` | Recent projects | 4:3 | 800 x 600 | Metal / aluminum fence |
| `project-3.jpg` | Recent projects | 4:3 | 800 x 600 | Custom gate |
| `project-4.jpg` | Recent projects | 4:3 | 800 x 600 | Privacy fence |
| `project-5.jpg` | Recent projects | 4:3 | 800 x 600 | Siding / exterior repair |

## Services (`services.html`)

| File | Slot | Aspect | Recommended px | Subject |
| ---- | ---- | ------ | -------------- | ------- |
| `service-fence-installation.jpg` | Fence Installation section | 4:3 | 1000 x 750 | New fence install in progress or completed |
| `service-fence-repair.jpg` | Fence Repair section | 4:3 | 1000 x 750 | Repair / restoration work |
| `service-gates.jpg` | Gates section | 4:3 | 1000 x 750 | A custom gate |
| `service-exterior-repairs.jpg` | Exterior Repairs section | 4:3 | 1000 x 750 | Siding / trim / exterior work |

## About (`about.html`)

| File | Slot | Aspect | Recommended px | Subject |
| ---- | ---- | ------ | -------------- | ------- |
| `about-crew.jpg` | Story section | 4:3 | 1000 x 750 | The crew on site, or a signature completed project |

## Gallery (`gallery.html`)

| File | Aspect | Recommended px | Subject |
| ---- | ------ | -------------- | ------- |
| `gallery-01.jpg` ... `gallery-12.jpg` | 4:3 | 800 x 600 | A mix of wood, vinyl, aluminum, and chain-link fences, gates, and repairs. Consistent daylight and color grade across all twelve. |

## Already provided (no action)

Logos (`assets/logo-*.svg`), favicons (`assets/favicon*`, `assets/icon-*`, `assets/apple-touch-icon.png`), and the social share image (`assets/og-image.jpg`).
