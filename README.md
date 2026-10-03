# Spider-Man Portfolio

A single-page developer portfolio with a Spider-Man comic-book theme. No build step,
no framework, no dependencies — just HTML, CSS and vanilla JS, deployed free to
GitHub Pages.

## Run it locally

There's nothing to install. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:<your-username>/<repo-name>.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source → Deploy from a branch → `main` /
`/ (root)` → Save**. The workflow in `.github/workflows/deploy.yml` publishes on
every push, and your site goes live at:

```
https://<your-username>.github.io/<repo-name>/
```

To publish at the root `https://<your-username>.github.io/`, name the repo
`<your-username>.github.io`.

## Where to edit things

| What | File |
| --- | --- |
| Name, bio, headings, links | `index.html` |
| Skills, projects, footer quotes | `assets/js/data.js` |
| Colors, fonts, layout, responsive | `assets/css/styles.css` |
| Behavior, filters, animations | `assets/js/main.js` |
| Favicon / social preview image | `assets/img/` |

### Adding a project

Append to `PORTFOLIO.projects` in `assets/js/data.js`:

```js
{
  title: "Nightwatch",
  year: "2024",
  tags: ["TypeScript", "Observability", "Open Source"],
  summary: "One or two sentences on what it does and why it matters.",
  repo: "https://github.com/you/nightwatch",
  demo: "https://you.github.io/nightwatch"   // or null
}
```

Cards and the tag filters are generated automatically.

## Wiring up the contact form

The form validates in the browser but doesn't send anywhere yet. To make it live,
sign up at [Formspree](https://formspree.io) and in `assets/js/main.js`, replace
the `form.addEventListener("submit", ...)` handler with a `fetch` to your endpoint:

```js
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await fetch("https://formspree.io/f/YOUR_ID", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new FormData(form),
  });
  formStatus.textContent = res.ok ? "Message sent!" : "Something went wrong.";
});
```

Keep the existing client-side validation — it gives much better error messages than
the browser's native ones.

## Customizing the theme

Colors live in `:root` at the top of `assets/css/styles.css`:

```css
--red: #e62429;     /* primary accent */
--blue: #1b3a8b;    /* secondary accent */
--comic: #ffd400;   /* highlight yellow */
```

There's also a light theme under `[data-theme="light"]`, toggled by the switch in
the header. The choice is saved to `localStorage`.

Fonts are Bebas Neue (display), Inter (body) and JetBrains Mono (code), loaded from
Google Fonts. To go fully self-hosted, drop the files in `assets/fonts/` and swap
the `<link>` in `index.html` for `@font-face` rules.

## Accessibility notes

- Semantic landmarks, a skip link, and labeled form fields
- Visible focus rings that meet contrast requirements
- `prefers-reduced-motion` disables the typewriter, counters, and web-sling effect
- All animation is CSS/canvas-based and degrades to static content
- Print stylesheet strips the chrome so the page prints cleanly

## Browser support

Modern evergreen browsers. The site uses `color-mix()`, `aspect` CSS nesting-free
layout, `IntersectionObserver`, and `clip-path` fallbacks. No polyfills needed for
anything older than Safari 16.4 / Chrome 111.

## License

MIT — do whatever you want with it.
