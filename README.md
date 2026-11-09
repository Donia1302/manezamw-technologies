# MaNezaMW Technologies

A modern, responsive static website for **MaNezaMW — Technology & Digital Solutions**.

MaNezaMW is an umbrella brand for several practical technology projects: business
management software, ICT & digital services, education technology and AI-powered
tools. This site is the digital home for those projects and the services behind them.

## Pages

- `index.html` — Home
- `services.html` — ICT & Digital Services
- `education.html` — Education Technology
- `products.html` — Solutions & products
- `projects.html` — Projects & roadmap
- `about.html` — About MaNezaMW
- `contact.html` — Contact form (WhatsApp-based)
- `404.html` — Not found

## Features

- Responsive, mobile-first layout with a slide-in navigation drawer
- Light / dark theme toggle (persisted in `localStorage`)
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- Accessible: skip link, focus styles, ARIA states, semantic landmarks
- SEO: meta tags, Open Graph, sitemap, robots.txt
- Contact form with client-side validation that opens WhatsApp
- No build step required — plain HTML, CSS and JavaScript

## Live sites

- Vercel (website): https://manezamw-technologies.vercel.app/
- Vercel (Business Management System): https://maneza-mw.vercel.app/
- GitHub Pages: https://donia1302.github.io/manezamw-technologies/

## Run locally

Open `index.html` in a browser, or run a static server:

```bash
npm start
```

## Before launch

1. Replace the placeholder WhatsApp number in `assets/js/main.js` (`WHATSAPP_NUMBER`).
2. Replace the placeholder email/phone in `contact.html`.
3. Add your real domain and social links (update `sitemap.xml` / `robots.txt`).
4. Add the final MaNezaMW logo if you have a separate logo file.
5. Connect the contact form to a real form/email backend if you don't want WhatsApp-only enquiries.

## Brand direction

- Primary green: `#18d66b`
- Dark green/ink: `#071b13`
- Positioning: Technology & Digital Solutions
- Initial product: MaNezaMW Business Management System

## Project structure

```
.
├── index.html
├── services.html
├── education.html
├── products.html
├── projects.html
├── about.html
├── contact.html
├── 404.html
├── assets/
│   ├── css/style.css
│   └── js/main.js
├── robots.txt
├── sitemap.xml
├── package.json
└── README.md
```

## License

MIT — see `LICENSE`.
