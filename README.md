# Yavin Institute — website

המבין יבין — *those who understand, will understand.*

Plain HTML, CSS and JavaScript. No build step: Vercel serves the files as they are.
Every push to `main` goes live automatically.

## Layout

```
index.html              home page
assets/
  css/site.css          shared styles (every page links this)
  js/site.js            shared scripts: starfield, rotating tagline, scrolling intro
  fonts/Starjedi.ttf    "Star Jedi" by Boba Fonts (freeware) — the YAVIN wordmark
```

## Adding a section later

Give each section its own folder with an `index.html`, so the URL is clean:

```
talmud/index.html       → /talmud        (New Jerusalem Talmud)
talmud/pdfs/*.pdf       → the discussion PDFs
apply/learn/index.html  → /apply/learn   (Apply to Learn form)
apply/teach/index.html  → /apply/teach   (Apply to Teach form)
programs/index.html     → /programs      (upcoming programs, admissions)
contact/index.html      → /contact       (contact, mailing list)
```

A page one folder deep links the shared files as `../assets/css/site.css`,
two folders deep as `../../assets/css/site.css`, and copies the nav bar and
the location footer from `index.html`.

## Preview locally

Open `index.html` in a browser.
