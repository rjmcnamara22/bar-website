# McNamara's Pub Website

A static, single-page website for **McNamara's Pub** in Cleveland, Ohio.

## Overview

This project is a lightweight promotional site built with plain HTML, CSS, and JavaScript. It includes:

- Hero/header branding section
- About section
- Drink menu image section
- Scrollable photo gallery
- Hours section
- Contact section with embedded Google Map
- Footer with social links

## Tech Stack

- **HTML5** (`index.html`)
- **CSS3** (`css/style.css`)
- **Vanilla JavaScript** (`js/script.js`)
- **Ionicons** for social and carousel icons

## Project Structure

```text
bar-website/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── pub-hero.jpg
│   ├── pub-hero-blurred.png
│   ├── drink-menu-page-1.png
│   ├── drink-menu-page-2.png
│   └── ...
└── CNAME
```

## Running Locally

Because this is a static site, you can run it with any simple web server.

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Use a local server (recommended)

From the project root:

```bash
python3 -m http.server 8080
```

Then visit:

- `http://localhost:8080`

## Editing Content

- **General content/sections:** edit `index.html`
- **Styling and responsive behavior:** edit `css/style.css`
- **Gallery controls/interactions:** edit `js/script.js`
- **Images/media:** replace files under `images/` (keep filenames or update paths in `index.html`)

## Deployment Notes

- `CNAME` is present for custom-domain hosting workflows (e.g., GitHub Pages).
- If deploying to GitHub Pages, push this repo and ensure Pages is enabled for the desired branch.

## Future Improvements

- Add accessibility enhancements (alt text improvements, aria labels where needed)
- Add SEO metadata and Open Graph tags
- Add a build/lint workflow (optional) for HTML/CSS quality checks

## License

No license is currently specified.
