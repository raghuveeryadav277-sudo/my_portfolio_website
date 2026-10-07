# Raghubir Kumar — Portfolio

A responsive, dark/light personal portfolio built with plain **HTML, CSS and vanilla JavaScript**. No frameworks, no build step.

## Features
- Animated particle-network background + floating gradient orbs (pauses when tab is hidden)
- Profile photo with animated gradient ring (`assets/profile.jpg`)
- Dark theme by default + light/dark toggle (saved in localStorage)
- Sticky navbar, mobile hamburger menu, active-section highlight
- Typing animation, scroll reveal, hover effects (respects reduced-motion)
- Skills grid, project cards, education timeline
- Contact form that opens your email app via `mailto` (no fake backend)
- Semantic HTML, keyboard focus states, labelled form fields

## Technologies
HTML5 • CSS3 (variables, grid, flexbox) • JavaScript (ES6)

## Structure
```
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
├── .gitignore
└── assets/README.txt
```

## Run locally
Open `index.html` in a browser, or use **VS Code → Live Server → Go Live**.

## Deploy on Vercel
1. Push the project to a GitHub repository.
2. Open https://vercel.com and log in.
3. Click **Add New → Project** and import your repository.
4. Leave Framework as **Other**, no build command, no output directory. Click **Deploy**.
5. Copy your live URL.

## Customize
- **Profile photo:** replace `assets/profile.jpg` with your own square image (keep the same name).
- **Email & LinkedIn:** edit the `CONFIG` object at the top of `script.js`. Both update everywhere automatically.
- **Profile info:** edit text in `index.html` (hero, About, Education sections).
- **Colors:** edit the CSS variables at the top of `style.css`.
- **Add a project:** copy one `<article class="card hov proj">` block inside `#projects` in `index.html`. For links, copy the Tic-Tac-Toe buttons (they use `target="_blank"`).
- **Images/resume:** place files in `assets/` and reference them as `assets/filename`.
