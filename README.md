# Pratik — Game Designer Portfolio

Cinematic, neon-soaked single-page portfolio for showcasing game design work. Built with Tailwind CSS (CDN), custom CSS, and vanilla JavaScript with GSAP/ScrollTrigger for motion.

## Tech Stack

- HTML5 + Tailwind (CDN configured inline)
- Custom CSS in `project/style.css` for bespoke visuals
- Vanilla JavaScript in `project/script.js` for data-driven cards, marquee, and GSAP timelines
- GSAP + ScrollTrigger (CDN) for animations

## Project Structure

```
pratik-portfolio/
├── index.html               # Redirect shim → project/index.html
├── assets/                  # Images shared by multiple demos
└── project/
	├── index.html           # Main portfolio page
	├── style.css            # Custom styles extracted from the main file
	├── script.js            # Interactions, data, and GSAP animations
	└── assets/              # Project-specific media (if needed)
```

## Getting Started

```sh
git clone <repo-url>
cd pratik-portfolio
```

Open `project/index.html` directly in your browser, or run a lightweight static server (e.g., VS Code Live Server) for smoother asset loading.

## Editing Content

1. **Copy updates** in `project/index.html` (hero text, stats, sections).
2. **Styling tweaks** go in `project/style.css`. Keep Tailwind utility classes in HTML for layout tweaks.
3. **Data + animations** live in `project/script.js`. Update `projectsData`/`toolsData` arrays or adjust GSAP timelines there.

## Deployment

- The site is completely static—no build step required.
- Deploy `project/` as the site root (or keep the redirecting root `index.html` if deploying from repo root).
- Works on Netlify, GitHub Pages, Vercel, Cloudflare Pages, etc., with default static settings.

## Customization Ideas

- Swap hero imagery in `assets/` and update references in the hero section.
- Extend `projectsData` with additional cards or categories.
- Introduce a bundler (Vite/Snowpack) if you outgrow the CDN approach and need componentization.

## License

MIT — feel free to remix, but attribution is appreciated.
