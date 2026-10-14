# Project Associate Portfolio — Ravi Varman S

A single-page portfolio positioned for the **Project Associate (Fresher)** role
(Full Stack, AI/ML, IoT & Embedded, Testing-QA domains). Static HTML/CSS/JS —
no build step, no dependencies, deploys anywhere in seconds.

**Theme:** light & academic — paper background, serif (Spectral) headings,
scholarly blue accent (`#14507a`), Inter for body text, JetBrains Mono for code.

```
project-associate-portfolio/
├── index.html                                     the whole page
├── styles.css                                     light / academic theme (paper + scholarly blue)
├── script.js                                      nav, scroll reveal, FAQ, contact form
└── Ravi_Varman_Project_Associate_Resume.pdf       downloadable resume (linked from hero)
```

## Sections

| Section | ID | What it does |
|---|---|---|
| Hero | — | Positioning, key stats (CGPA 7.9, 4 projects, 3 internships, 0 days notice), resume download |
| Domain fit | `#domains` | Maps your exposure to the notified domains + Quantum/HPC, Cyber, UI-UX notes |
| Projects | `#work` | The 4 featured projects — What Happened Here? 2.0, Zero Barrier, Smart Door Lock, Blackspot Prediction |
| Why me | `#why` | Four arguments a recruiter cares about |
| About | `#about` | Internships, toolkit, education |
| FAQ | `#faq` | Notice period, domain fit, relocation, education, project proof |
| Contact | `#contact` | mailto form — opens the visitor's email app, nothing stored |

## Run it locally

```bash
python -m http.server 5500
# then open http://127.0.0.1:5500
```

Or just double-click `index.html`.

## Deploy

**GitHub Pages:** push this folder, then Settings → Pages → deploy from branch → `/ (root)`.

**Vercel:**
```bash
npm i -g vercel
vercel --prod        # pick this folder as the root
```

**Netlify:** drag the folder onto <https://app.netlify.com/drop>.

## Editing your content

| What | Where |
|------|-------|
| Email, phone, GitHub, LinkedIn | `index.html` — search `ravivarmansenthilkumar` and `Ravi-Varman-S` |
| Hero stats | `index.html` → `.hero__meta` |
| Domain cards | `index.html` → `#domains` section |
| Projects | `index.html` → `#work` section |
| FAQ answers | `index.html` → `#faq` section |
| Resume PDF | replace `Ravi_Varman_Project_Associate_Resume.pdf` (keep the filename) |
| Accent colour | `styles.css` → `--accent: #14507a` (top of file, `:root` block) |

## Checklist before going live

- [ ] Open the site on a phone — check the hamburger menu
- [ ] Submit the form once and confirm your email app opens
- [ ] Click every project link and the resume download
- [ ] Update the placeholder meta tags if you get a real domain
