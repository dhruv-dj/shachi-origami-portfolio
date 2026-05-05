# Shachi Origami Portfolio

A professional portfolio and e-commerce site for origami artist Shachi Jain. Built as a static React SPA deployed on GitHub Pages via automated CI/CD.

## Live Site

**`https://dhruv-dj.github.io/shachi-origami-portfolio/`**

Admin panel: append `#admin` to the URL — `https://dhruv-dj.github.io/shachi-origami-portfolio/#admin`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 |
| Fonts | Google Fonts — Cormorant Garamond (serif), DM Sans (sans-serif) |
| Deployment | GitHub Pages via GitHub Actions |

---

## Local Development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:5173/shachi-origami-portfolio/`.

To access the local admin panel: `http://localhost:5173/shachi-origami-portfolio/#admin`

---

## Project Structure

```
src/
├── App.jsx                        # Root — routes between site and admin panel
├── context/
│   └── ContentContext.jsx         # Global content state (loads siteContent.json)
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx                   # Full-viewport hero (uses ContentContext)
│   ├── About.jsx                  # Artist bio + photo (uses ContentContext)
│   ├── PortfolioGrid.jsx          # 2–3 col artwork grid (uses ContentContext)
│   ├── ExhibitionCarousel.jsx     # Gallery wall carousel (uses ContentContext)
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── admin/
│       ├── AdminLogin.jsx         # Password login / first-run setup
│       └── AdminPanel.jsx         # Tabbed content management interface
├── data/
│   └── artworks.jsx               # SVG placeholder artwork components
└── utils/
    ├── auth.js                    # SHA-256 password hashing
    ├── githubApi.js               # GitHub API helpers (file read/write)
    └── imageUtils.js              # Client-side image resize before upload

public/
└── siteContent.json               # Live content — edited via admin panel
```

---

## Content System

All editable content lives in **`public/siteContent.json`**. Components load this file at runtime and fall back to hardcoded defaults if it is missing.

The content schema:

```json
{
  "hero": {
    "badgeText": "Origami Artist",
    "firstName": "Shachi",
    "lastName": "Jain",
    "tagline": "...",
    "subtitle": "..."
  },
  "about": {
    "photoUrl": "",
    "paragraphs": ["...", "...", "..."],
    "stats": [{ "value": "8+", "label": "Years folding" }]
  },
  "contact": {
    "email": "shachi.origami@example.com"
  },
  "artworks": [
    {
      "id": 1,
      "title": "Crimson Crane",
      "year": 2024,
      "medium": "Washi paper, single sheet",
      "price": "₹6,500",
      "description": "...",
      "imageUrl": ""
    }
  ]
}
```

---

## Admin Panel

### First-Time Setup

1. Navigate to `/#admin`
2. You will be prompted to **create a master password** — enter and confirm it
3. The password is hashed with SHA-256 and stored in `localStorage` (never sent anywhere)

### Logging In

Visit `/#admin` → enter your password.

To **reset your password**: clear your browser's localStorage for the site, then set a new one on the next visit to `/#admin`.

### Admin Tabs

| Tab | What you can edit |
|-----|-------------------|
| **Content** | Hero text (name, tagline, subtitle), About paragraphs, stats |
| **Artworks** | Title, year, medium, price, description, and upload artwork image |
| **Media** | Artist portrait photo, video embed URLs |
| **Deploy** | GitHub settings + Save & Deploy button |

### Saving and Deploying

Changes are saved to your **browser's localStorage** immediately and reflected as a live preview on your browser.

To publish changes for all visitors:

1. Go to the **Deploy** tab
2. Enter your **GitHub repository** (`owner/repo`, e.g. `dhruv-dj/shachi-origami-portfolio`)
3. Enter a **GitHub Personal Access Token** with `contents: write` permission
   - Create one at: GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
   - Scope: Repository → `shachi-origami-portfolio` → **Contents: Read and Write**
4. Click **Save & Deploy**

GitHub Actions will rebuild and redeploy the site in approximately **2–3 minutes**. No server required.

> The GitHub token is stored in `sessionStorage` and is cleared automatically when you close the browser tab.

### Uploading Images

- **Artwork images** replace the SVG placeholders in the gallery and carousel
- **Artist portrait** replaces the crane SVG placeholder in the About section
- Images are automatically resized to a maximum of 1200px width and compressed before saving
- Alternatively, paste any external image URL into the image URL field

### Adding Video Content

In the **Media** tab, paste a YouTube or Vimeo embed URL. These appear in the media section of the site.

---

## Deployment

Pushes to `main` automatically trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. Checks out the repo
2. Installs dependencies with `npm ci`
3. Builds with Vite (`npm run build`)
4. Deploys the `dist/` folder to GitHub Pages

The `base` path is set to `/shachi-origami-portfolio/` in `vite.config.js`.

---

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `cream` | `#F5F0E8` | Page background |
| `parchment` | `#EDE4D3` | Card backgrounds |
| `wall` | `#E8DFD0` | Gallery wall texture |
| `wood` | `#8B6242` | Primary accent, buttons |
| `wood-light` | `#A07850` | Hover states, decorative lines |
| `wood-dark` | `#6B4A2E` | Button hover |
| `ink` | `#2C2C2C` | Primary text |
| `muted` | `#7A7065` | Secondary text, labels |

### Typography

- **Headings**: Cormorant Garamond (serif), `font-light`
- **Body / UI**: DM Sans (sans-serif), `font-light`
- Labels are all-caps with wide letter-spacing (`tracking-[0.3em]`)

---

## Adding New Artwork (via Admin)

1. Log in to the admin panel (`/#admin`)
2. Go to the **Artworks** tab
3. Click **Add Artwork**
4. Fill in title, year, medium, price, description
5. Upload a photo or paste an image URL
6. Go to **Deploy** and click **Save & Deploy**

## Replacing SVG Placeholders with Real Photos

Upload artwork images in the **Artworks** tab. Once an `imageUrl` is set for an artwork, it replaces the procedurally-generated SVG in both the gallery grid and the exhibition carousel.
