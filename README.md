# 🏙️ NEON HORIZON — ITZFIZZ Scroll Animation

A scroll-driven hero section built with **Next.js 14**, **GSAP**, and **Tailwind CSS**.

## 🎬 Animation Breakdown

| Scroll Stage | Effect |
|---|---|
| **Page Load** | Letters stagger fade-in per character (GSAP), stats count up |
| **0 – 35%** | Neon city zooms in (scale 1→1.6), light rays intensify |
| **35 – 75%** | Buildings split LEFT & RIGHT, camera "flies through" the corridor |
| **75 – 100%** | Final reveal — "THE FUTURE IS NOW" message fades in |

## 🛠️ Tech Stack
- Next.js 14 (App Router, static export)
- TypeScript
- Tailwind CSS
- GSAP (ScrollTrigger-free — pure scroll math for max performance)
- Pure SVG for all city visuals

## 🚀 Setup & Run

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## 📦 Deploy to GitHub Pages

1. In `next.config.js`, set:
   ```js
   basePath: '/your-repo-name'
   ```
2. Push to GitHub
3. Enable GitHub Pages in repo Settings → Pages → `gh-pages` branch
4. Or use this GitHub Action:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: 18 }
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## 📁 Project Structure

```
app/
  page.tsx                 ← Entry point
  layout.tsx               ← Root layout + metadata
  globals.css              ← CSS variables, fonts, utilities
  components/
    HeroSection.tsx        ← Scroll logic + layout
    NeonCity.tsx           ← Reactive SVG city visual
    HeadlineText.tsx       ← GSAP staggered headline
    StatsRow.tsx           ← Animated count-up stats
    ScrollProgress.tsx     ← Side bar + top bar indicator
```

## ✨ Unique Features
- **Zero image dependencies** — city is 100% SVG + CSS
- **Scroll math** (not GSAP ScrollTrigger) for buttery smooth performance
- **3-stage animation story**: zoom → fly-through → reveal
- **HUD-style UI** with corner brackets, scan lines, noise texture
- **Cinematic dark theme** with neon cyan / pink / purple palette
