# AIAT — Asociația de Inteligență Artificială Transilvania

Website-ul oficial al Asociației de Inteligență Artificială Transilvania (AIAT) — o platformă ultra-profesională construită cu Next.js 14, Tailwind CSS și Framer Motion.

---

## Vizualizare rapidă

| Categorie | Detalii |
|-----------|---------|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS + CSS custom |
| Animații | Framer Motion + CSS animations |
| Tipografie | Syne (headings) + Space Grotesk (body) |
| Icoane | Lucide React |
| 3D/FX | Canvas API (Neural Network) |
| Deploy | Vercel |

---

## Instalare și rulare locală

### Cerințe preliminare

- Node.js 18+ (recomandat 20 LTS)
- npm 9+ sau yarn 1.22+

### Pași de instalare

```bash
# 1. Clonează repository-ul
git clone https://github.com/aiat-ro/website.git
cd aiat-website

# 2. Instalează dependențele
npm install

# 3. Pornește serverul de development
npm run dev

# 4. Deschide în browser
open http://localhost:3000
```

### Build pentru producție

```bash
# Build
npm run build

# Preview build local
npm start

# Verifică lint-ul
npm run lint
```

---

## Structura proiectului

```
aiat-website/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonturi, metadata, JSON-LD)
│   ├── page.tsx                  # Homepage (compune toate secțiunile)
│   ├── sitemap.ts                # XML Sitemap auto-generat
│   └── not-found.tsx             # Custom 404 page
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky navbar cu glassmorphism
│   │   └── Footer.tsx            # Footer dark minimal
│   │
│   ├── sections/
│   │   ├── Hero.tsx              # Hero section cu neural canvas
│   │   ├── StatsBar.tsx          # Animated counters bar
│   │   ├── About.tsx             # Despre AIAT + timeline + FAQ
│   │   ├── Mission.tsx           # Misiune & valori — 3 piloni
│   │   ├── Projects.tsx          # Grid proiecte cu filtrare
│   │   ├── Events.tsx            # Timeline evenimente + newsletter
│   │   ├── Team.tsx              # Echipa + consiliu director
│   │   ├── Blog.tsx              # Articole featured
│   │   ├── Partners.tsx          # Marquee parteneri + tipuri parteneriat
│   │   └── Contact.tsx           # Formular contact + info
│   │
│   └── ui/
│       ├── Button.tsx            # Button multi-variant cu shimmer
│       ├── Badge.tsx             # Badge/pill pentru categorii
│       ├── NeuralCanvas.tsx      # Canvas animat neural network
│       ├── AnimatedCounter.tsx   # Counter animat on-scroll
│       ├── SectionReveal.tsx     # Fade-up animation on scroll
│       └── CustomCursor.tsx      # Custom cursor desktop
│
├── lib/
│   └── utils.ts                  # Utilități (cn, lerp, formatDate etc.)
│
├── styles/
│   └── globals.css               # Global styles, variabile CSS, animații
│
├── public/
│   └── robots.txt                # Instrucțiuni crawlere
│
├── next.config.js                # Configurare Next.js
├── tailwind.config.ts            # Configurare Tailwind cu design tokens
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.js             # PostCSS config
└── vercel.json                   # Configurare deploy Vercel
```

---

## Design System

### Paleta de culori

| Token | Valoare | Utilizare |
|-------|---------|-----------|
| `background` | `#0A0A0F` | Fundal principal |
| `primary` | `#6366F1` | Indigo — accent principal |
| `primary-light` | `#818CF8` | Indigo deschis |
| `accent` | `#10B981` | Emerald — inovație |
| `surface` | `#111827` | Card background |
| `border` | `#1E293B` | Borduri subtile |
| `muted` | `#64748B` | Text secundar discret |
| `text-primary` | `#F8FAFC` | Text principal |

### Tipografie

| Rol | Font | Weight | Size |
|-----|------|--------|------|
| Hero H1 | Syne | 800 | `clamp(52px, 7.5vw, 92px)` |
| Display H2 | Syne | 700 | `clamp(38px, 4.5vw, 60px)` |
| Headline H3 | Syne | 700 | `clamp(26px, 3vw, 44px)` |
| Body | Space Grotesk | 400 | `15–16px`, `line-height: 1.75` |
| Label/Caption | Space Grotesk | 500 | `12px`, `tracking: 0.2em` |

### Componente UI

#### Button

```tsx
import { Button } from '@/components/ui/Button';

// Variante: primary | secondary | ghost | accent | outline
// Dimensiuni: sm | md | lg

<Button variant="primary" size="lg" href="/contact" icon={<ArrowRight />}>
  Devino Membru
</Button>

<Button variant="secondary" size="md" onClick={handleClick}>
  Acțiune
</Button>
```

#### Badge

```tsx
import { Badge } from '@/components/ui/Badge';

// Variante: default | primary | accent | muted | upcoming | past | online | research | education | partnership

<Badge variant="research" dot>Cercetare</Badge>
<Badge variant="upcoming" dot>Urmează</Badge>
```

#### SectionReveal

```tsx
import { SectionReveal } from '@/components/ui/SectionReveal';

// Animație fade-up la scroll cu IntersectionObserver
// delay: milisecunde înainte de start
// direction: 'up' | 'left' | 'right' | 'none'

<SectionReveal delay={200} direction="left">
  <CardComponent />
</SectionReveal>
```

#### AnimatedCounter

```tsx
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

// Numără de la 0 la target când intră în viewport

<AnimatedCounter target={50} suffix="+" duration={2200} />
```

---

## Animații implementate

| Animație | Implementare | Locație |
|----------|--------------|---------|
| Page load staggered | CSS transitions + useState | `Hero.tsx` |
| Fade-up on scroll | IntersectionObserver | `SectionReveal.tsx` |
| Neural network | Canvas2D requestAnimationFrame | `NeuralCanvas.tsx` |
| Animated counters | IntersectionObserver + rAF | `AnimatedCounter.tsx` |
| Navbar glassmorphism | scroll event + CSS | `Navbar.tsx` |
| Button shimmer | CSS `::after` + hover | `globals.css` |
| Card glow hover | CSS box-shadow | `globals.css` |
| Custom cursor | rAF + lerp | `CustomCursor.tsx` |
| Partner marquee | CSS animation `marquee` | `Partners.tsx` |
| FAQ accordion | CSS max-height transition | `About.tsx` |
| Scroll indicator | CSS animation `scrollPulse` | `Hero.tsx` |

---

## SEO & Performanță

### SEO implementat

- ✅ Meta tags complete (title, description, keywords)
- ✅ Open Graph (`og:title`, `og:description`, `og:image`, `og:locale: ro_RO`)
- ✅ Twitter Card (`summary_large_image`)
- ✅ JSON-LD Organization schema cu adresa reală
- ✅ XML Sitemap (`/sitemap.xml`)
- ✅ `robots.txt`
- ✅ Canonical URLs
- ✅ `lang="ro"` pe `<html>`
- ✅ Semantic HTML cu ARIA landmarks

### Performanță

- ✅ Next.js Image optimization (`next/image`)
- ✅ Font preloading (`preload: true`, `display: swap`)
- ✅ Code splitting automat (Next.js App Router)
- ✅ `'use client'` only unde e necesar
- ✅ `passive: true` pe scroll listeners
- ✅ Canvas cleanup on unmount
- ✅ IntersectionObserver disconnect pe cleanup

### Accesibilitate

- ✅ Skip nav link (`#main-content`)
- ✅ `aria-label`, `aria-expanded`, `aria-controls`
- ✅ Focus rings vizibile (`focus-visible`)
- ✅ WCAG AA contrast pe toate textele
- ✅ `prefers-reduced-motion` — dezactivează animații
- ✅ `alt` text pe toate imaginile
- ✅ Semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
- ✅ Form labels asociate corect cu `id`/`htmlFor`

---

## Deploy pe Vercel

### Deploy cu un click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aiat-ro/website)

### Deploy manual

```bash
# Instalează Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy producție
vercel --prod
```

### Variabile de mediu (opțional)

Creează `.env.local` pentru variabile locale:

```env
# Dacă integrezi un serviciu de email pentru formular
CONTACT_EMAIL_TO=contact@aiat.ro
RESEND_API_KEY=your_key_here

# Analytics (opțional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Contribuție

Contribuțiile sunt binevenite! Urmează aceste etape:

1. Fork repository-ul
2. Creează un branch: `git checkout -b feature/NumeleFeaturii`
3. Fă modificările și commit: `git commit -m 'feat: descriere scurtă'`
4. Push branch-ul: `git push origin feature/NumeleFeaturii`
5. Deschide un Pull Request

### Convenție de commit

Folosim [Conventional Commits](https://conventionalcommits.org):

- `feat:` nouă funcționalitate
- `fix:` reparare bug
- `style:` modificări CSS/design
- `refactor:` refactorizare cod
- `docs:` documentație
- `perf:` îmbunătățiri performanță

---

## Licență

Distribuit sub licența **MIT**. Vezi [LICENSE](LICENSE) pentru detalii.

```
MIT License

Copyright (c) 2024 Asociația de Inteligență Artificială Transilvania

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## Contact

- Website: [aiat.ro](https://aiat.ro)
- Email: [contact@aiat.ro](mailto:contact@aiat.ro)
- LinkedIn: [@aiat-ro](https://linkedin.com/company/aiat-ro)
- GitHub: [@aiat-ro](https://github.com/aiat-ro)

---

*Construit cu ❤️ în Sibiu, România*
