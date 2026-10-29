# Margin Notes

A static landing page for **Margin Notes**, an independent bookshop and reading club in Zamalek, Cairo. It is plain HTML plus a Sass-compiled stylesheet, with no framework and no build step beyond Sass.

**Live page:** https://samaadam1.github.io/margin-notes-project/

## Project structure

```
margin-notes/
├── index.html            Page markup (single page)
├── symbols.js            SVG icon sprite, injected into the page
├── main.scss             Entry point: imports every partial in order
├── main.css              Compiled output, linked from index.html
├── main.css.map          Source map for main.css
├── abstracts/            Tokens, functions, mixins (no CSS output)
├── base/                 Reset, typography, global helpers
├── layout/               Page-level structure: container, header, footer
├── components/           Reusable UI pieces
└── sections/             Styles specific to one page section
```

## Architecture

The Sass follows a **7-1 inspired** pattern, trimmed to five folders. Dependencies run one way:

```
abstracts  →  base  →  layout  →  components  →  sections
```

Each layer may use anything from `abstracts`, and sections may rely on components, but never the reverse. `main.scss` pulls everything in with `@use`, in that order, so the compiled CSS cascades from general to specific.

Class names use **BEM** (`.book-card`, `.book-card__title`, `.btn--primary`). Layout is **mobile-first**: base styles target 375px, and `up(md)` / `up(lg)` mixins add the 768px and 1024px+ rules.

### `abstracts/`
Holds no CSS of its own. Everything here is a Sass tool, shared through `_index.scss`, which forwards the other three files. Any partial can then start with `@use "../abstracts" as *;`.

| File | Contents |
|---|---|
| `_variables.scss` | Design tokens: colors, fonts, the spacing scale, radii, shadow, transition, content width, breakpoints |
| `_functions.scss` | `rem($px)` converts px to rem; `sp($step)` looks up the spacing scale |
| `_mixins.scss` | Media queries `up()` and `below()`, helpers `visually-hidden` and `flex-col`, and the type styles (`t-display`, `t-section-title`, `t-body`, `t-eyebrow`, `t-button`, and others) |
| `_index.scss` | Forwards the three files above |

### `base/`
Global styles that apply to bare elements and utilities, with no components in here.

| File | Contents |
|---|---|
| `_reset.scss` | CSS reset and element defaults |
| `_typography.scss` | Heading and text styles, plus helper classes: `.eyebrow`, `.section-title`, `.lead`, `.skip-link`, `.sr-only`, `.hide-sm`, `.show-sm-only`, and the color-context classes `.on-forest` and `.on-ink` |

### `layout/`
The page's structural frame.

| File | Contents |
|---|---|
| `_container.scss` | `.container` (max width and gutters), `.section` (vertical spacing), `.section-head` |
| `_header.scss` | `.announce` bar, `.site-header`, `.logo`, `.site-nav`, `.bag-link`, and the CSS-only mobile menu (`.menu-check`, `.menu-toggle`) |
| `_footer.scss` | `.site-footer` and `.footer-nav` |

### `components/`
Reusable pieces that could appear in more than one place.

| File | Contents |
|---|---|
| `_icons.scss` | `.icon` and the size modifiers `--16`, `--18`, `--20` |
| `_buttons.scss` | `.btn` (primary, accent, outline, sizes, block), `.cta-row`, `.link`, `.icon-btn` |
| `_placeholder.scss` | `.ph` colored image placeholders (sand, sage, wheat, lilac) |
| `_tag.scss` | `.tag` pill label |
| `_book-card.scss` | `.book-card` |
| `_form.scss` | `.field` label and input styles |

### `sections/`
One file per section of the page, in page order. Each styles only its own section.

| File | Page section |
|---|---|
| `_hero.scss` | Hero with the photo collage |
| `_arrivals.scss` | New arrivals grid |
| `_club.scss` | Book club pick |
| `_plans.scss` | Membership plans |
| `_events.scss` | Upcoming events list |
| `_visit.scss` | Visit info, opening hours and newsletter form |

## Page structure

`index.html` is one page made of three stacked blocks: **header**, **main** and **footer**. They sit in normal document flow, so `body` is not a grid. Layout tools are used inside each block, and no floats are used anywhere.

```
body
├── skip link             Keyboard shortcut to #main
├── .announce             Thin top bar ("Open late every Thursday…")
├── header.site-header    Sticky navigation bar
├── main#main
│   ├── section.hero
│   ├── section.arrivals
│   ├── section.club
│   ├── section.plans
│   ├── section.events
│   └── section.visit
└── footer.site-footer
```

### How width and centering work
Every section wraps its content in `.container`, which is `min(100% - 48px, 1200px)` wide and centered with `margin-inline: auto`. The section's background runs edge to edge, and the content stays in the centered column. `.section` adds the vertical padding between blocks. The header does the same with its own inner wrapper.

Layout is mobile-first. Content stacks in a single column by default, and at 1024px and up it switches to grid or a row.

### Header (`layout/_header.scss`)
- **Announcement bar:** a dark strip above the header that scrolls away.
- **Header bar:** sticky at the top, built with flexbox in three parts: the **logo** on the left, the **main nav** (Shop, Book club, Events, Visit) and the **actions** on the right (search button, bag link, menu button).
- **Nav behavior:** below 1024px the nav is a dropdown opened by a CSS-only checkbox toggle. From 1024px up it is an inline row of links and the menu button is hidden.

### Sections (`main`)
| Section | Layout | What's inside |
|---|---|---|
| **Hero** | 2-column grid on desktop, stacked on mobile | Eyebrow, headline, intro text, a "Join the book club" button and a "Browse new arrivals" link. On the other side is a photo collage (two image placeholders and a "Book of the month" badge). |
| **New arrivals** | Heading row, then a product grid (2 columns on mobile, 4 on desktop) | Section title with a "View all books" link, and four `.book-card`s. Each card has a cover, tag, title, author, price and an add-to-bag button. |
| **Book club** | Dark green panel, 12-column grid on desktop | The month's pick: cover image, title and author, a quote from the book, three facts (when, where, seats) and two actions ("Reserve a seat", "Read the first chapter"). |
| **Membership** | Heading, then 3 plan cards on desktop (stacked on mobile) | Three plans: Reader (free), Club member (featured, "Most popular") and Patron. Each has a name, price, short description, a checklist of features and a button. |
| **Events** | Intro column plus a list, 12-column grid on desktop | Three upcoming events. Each row has a date block, title, time and place, and an RSVP button (grid areas: date / body / action). |
| **Visit + newsletter** | 2 panels side by side on desktop | Left panel: address, opening-hours table and a directions link. Right panel (dark green): newsletter sign-up form with an email field and Subscribe button. |

### Footer (`layout/_footer.scss`)
Dark block in two rows:
- **Top:** the brand (logo and one-line description), and three link columns (Shop, Club, Visit).
- **Bottom:** copyright line and a Privacy link.

## Layout details

### Header: flexbox bar
The header bar (`.site-header__inner`) is a flex row with `justify-content: space-between`, so the first and last items sit at the edges and any middle item is spread between them. It has three children:

| Child | Mobile (< 1024px) | Desktop (≥ 1024px) |
|---|---|---|
| **Logo** | Left | Left |
| **Nav** (`.site-nav`) | Taken out of the flow: it is absolutely positioned as a full-width dropdown under the header (`top: 100%; left: 0; right: 0`) and hidden until the menu checkbox is ticked | Back in the flow as a row of links with a 40px gap, sitting in the middle |
| **Actions** (`.site-header__actions`) | Right: search, bag icon and menu button, 8px apart | Right: search and bag link with its "Bag (0)" label, 12px apart. The menu button is hidden. |

Because the mobile nav is out of the flow, only two items remain in the row, the logo and the actions. `space-between` pushes them to opposite ends.

Other sizing:
- **Height:** 64px on mobile, 88px on desktop.
- **Width:** on mobile the bar fills the screen with 24px padding on the left and 16px on the right. On desktop it uses the same `min(100% - 48px, 1200px)` centered width as `.container`.
- **Sticky:** `position: sticky; top: 0; z-index: 20` keeps it at the top while scrolling. The announcement bar above it is not sticky and scrolls away.
- **Bag label:** visually hidden below 1024px, so mobile shows only the icon (screen readers still read the label).

### Book club: 12-column grid (desktop)
Below 1024px the club is a vertical flex stack (cover, then text). From 1024px up, `.club__inner` becomes a grid:

```scss
display: grid;
grid-template-columns: repeat(12, minmax(0, 1fr));
gap: 24px;
align-items: center;
```

At the full 1200px container width each column is **(1200 − 11 × 24) ÷ 12 = 78px**. Only two items are placed on the grid:

```
column:  1   2   3   4   5   6   7   8   9  10  11  12
        ┌───────────────┐       ┌─────────────────────────────┐
        │     cover     │ empty │           content           │
        │    span 4     │  (5)  │      from 6, span 7         │
        └───────────────┘       └─────────────────────────────┘
```

| Item | CSS | Columns | Width |
|---|---|---|---|
| Cover | `grid-column: span 4` | 1–4 | 4 × 78 + 3 × 24 = 384px |
| (empty) | nothing placed | 5 | breathing room between the two items |
| Content | `grid-column: 6 / span 7` | 6–12 | 7 × 78 + 6 × 24 = 690px |

- `span 4` means "take 4 columns from wherever the item starts". `6 / span 7` means "start at grid line 6, take 7 columns".
- `align-items: center` vertically centers the cover and the text against each other.
- Between 1024px and 1440px the container is narrower than 1200px, so the columns shrink and the widths scale down.
- `minmax(0, 1fr)` lets columns shrink below their content width, so long content can't force the grid to overflow.

The events section and the footer use the same 12-column pattern with their own spans.

## Icons

Icons live in `symbols.js`. It inserts a hidden SVG sprite at the top of `<body>`, and the markup references each icon with:

```html
<svg class="icon icon--18" aria-hidden="true"><use href="#i-arrow" /></svg>
```

Available icons: `i-arrow`, `i-search`, `i-bag`, `i-menu`, `i-close`, `i-plus`, `i-check`. To add one, add a `<symbol id="i-name" viewBox="0 0 24 24">` to `symbols.js`.

The script is used instead of an external `.svg` file because browsers block external `<use>` references when a page is opened straight from disk (`file://`).

## Working with the styles

Edit the `.scss` partials, never `main.css`. Compile with Dart Sass:

```bash
sass main.scss main.css --watch
```

To change a color, font, spacing step or breakpoint, edit `abstracts/_variables.scss`. The change carries through every partial.
