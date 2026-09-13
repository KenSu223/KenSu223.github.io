# Ken (Tongli) Su — personal academic website

Static HTML + CSS with optional JavaScript interactions. Double-click `index.html` to preview it;
push the generated HTML to GitHub to publish. Visitors do not need JavaScript to read any content.
Node.js is used only to regenerate News and Publications after editing their data.

```
website/
├── index.html                  # page structure + all prose (bio, education, experience, service)
├── assets/
│   ├── css/style.css           # all styling; colors live in the :root / html.dark blocks at the top
│   ├── js/site-data.js         # ← NEWS + PUBLICATIONS live here. This is the file you edit most.
│   ├── js/render.js            # enhances static news, highlights nav, and handles scrolling
│   ├── js/theme.js             # dark-mode toggle
│   ├── img/profile.jpg         # headshot
│   ├── img/favicon.svg         # browser-tab icon ("KS")
│   ├── img/pubs/               # teaser figures for papers (optional)
│   └── files/                  # CV and paper PDFs
└── .nojekyll                   # tells GitHub Pages to serve the files as-is
```

## Before you publish — 1 thing to check

**The EMBC PDF.** `assets/files/fECG2Doppler.pdf` is your accepted paper, linked from the
publications list. IEEE lets authors post the accepted version on a personal site, but it must
carry the IEEE copyright notice — confirm the version you host is the right one, or swap the PDF
link for the arXiv/DOI link once one exists.

## Logos

`assets/img/logos/` holds the official marks, taken from each organization's own site or from
Wikipedia:

| File | Source |
|---|---|
| `emory.svg` | Emory's site favicon (`emory.edu/themes/emory/favicon.svg`) — the official shield |
| `columbia.svg` | Blue Columbia shield; an SVG wrapper whose `viewBox` crops the "COLUMBIA UNIVERSITY" wordmark off the embedded JPEG, so the shield matches Emory's in size |
| `dupont.svg` | Official DuPont logo (Wikimedia Commons) |
| `causaldynamics.png` | Causal Dynamics Lab touch icon (`causaldynamics.com/apple-icon.png`) |

To swap one, drop a replacement in that folder and update the `src` in `index.html`. Square marks
work best; a wide wordmark (like DuPont's) needs `class="row-logo wide"` on its `<span>` so it can
use the full width of the box.

## What makes the page "flashy"

A compact desktop profile, three research-question cards, and prominent publication entries sit
on a white background with navy accents. Education and experience use simple rows. Dark mode,
nav highlighting, news expansion and back-to-top are progressive enhancements. Text is visible
by default and scroll interactions respect `prefers-reduced-motion`.

## Adding a paper

Open `assets/js/site-data.js` and add an object at the top of `window.PUBS`:

```js
{
  title: "Paper title",
  authors: "Coauthor A, **Tongli Su**, Coauthor B",   // ** ** bolds your name
  venue: "NeurIPS 2027",
  thumbLabel: "NeurIPS 2027",                          // shown when there is no teaser image
  badges: ["Spotlight"],                               // [] for none
  insight: "One sentence on what the paper shows.",
  thumb: "assets/img/pubs/my-paper.png",               // "" for none
  links: [
    { label: "arXiv", url: "https://arxiv.org/abs/..." },
    { label: "Code",  url: "https://github.com/..." }
  ]
}
```

Adding news works the same way — push an object with `date` and `html` to `window.NEWS`.
Then regenerate the checked-in HTML before previewing or publishing:

```bash
node scripts/build-content.mjs
node scripts/build-content.mjs --check
```

The script generates the marked News and Publications blocks and adds content-based version IDs to CSS and JavaScript URLs. Run it after changing styles or scripts too, so browsers fetch the updated assets. Edit the rest of `index.html` directly.
No teaser is rendered unless a real `thumb` path is supplied. All news remains readable without JS;
with JS, `NEWS_VISIBLE` controls the initial count.

The website CV source is `assets/files/Ken_Su_CV.tex`. Compile with Tectonic:

```bash
tectonic -X compile assets/files/Ken_Su_CV.tex
```

Keep the PDF and its source together when updating the CV.

## Publishing on GitHub Pages

1. Create a **public** repo on GitHub named exactly `KenSu223.github.io`.
   Leave it empty — no README, no .gitignore.
2. From this folder:

```bash
cd "/Users/kensu/Library/Mobile Documents/com~apple~CloudDocs/post_phd_resume/website"
git init -b main
git add .
git commit -m "Personal academic website"
git remote add origin https://github.com/KenSu223/KenSu223.github.io.git
git push -u origin main
```

3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`. Save.
4. Wait ~1 minute. The site is live at **https://KenSu223.github.io**.

Every later update is just:

```bash
git add . && git commit -m "Update publications" && git push
```

## Local preview

```bash
cd "/Users/kensu/Library/Mobile Documents/com~apple~CloudDocs/post_phd_resume/website" && python3 -m http.server 8000
```

Then open <http://localhost:8000>. (Opening `index.html` directly also works.)

## Optional: a custom domain later

Buy a domain, add a file named `CNAME` in this folder containing just the domain
(e.g. `kensu.ai`), point the domain's DNS at GitHub Pages, and set it under Settings → Pages.
Your GitHub Pages URL keeps working and redirects to it.
