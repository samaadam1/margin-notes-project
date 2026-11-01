# Margin Notes

A one-page website for **Margin Notes**, an independent bookshop and reading club in Zamalek, Cairo. It is plain HTML and Sass (compiled to CSS). The only JavaScript is `symbols.js`, which adds the icons.

**Live page:** https://samaadam1.github.io/margin-notes-project/

This README explains how the page is built, why each choice was made, and how every hover, click and state works.

## Contents
1. [How to run](#1-how-to-run)
2. [The rules the code follows](#2-the-rules-the-code-follows)
3. [Folder structure](#3-folder-structure)
4. [Design tokens](#4-design-tokens)
5. [Mixins and how screen sizes are read](#5-mixins-and-how-screen-sizes-are-read)
6. [Page structure](#6-page-structure)
7. [Every part of the page, in order](#7-every-part-of-the-page-in-order)
8. [States, hovers and clicks](#8-states-hovers-and-clicks)
9. [Icons](#9-icons)
10. [Lessons and gotchas](#10-lessons-and-gotchas)
11. [Naming guide](#11-naming-guide)

---

## 1. How to run
- Open `index.html` in a browser. It works by double-clicking the file.
- Edit the `.scss` files, never `main.css`. Compile with:

```bash
sass main.scss main.css --watch
```

`--watch` recompiles every time you save.

## 2. The rules the code follows

### Mobile first
Every rule is written for the phone first. Two mixins add the rules for bigger screens:
- `@include tablet-up` from **768px** (used only for the book grid).
- `@include desktop-up` from **1024px** (everything else).

So a rule outside any mixin is the mobile layout. A rule inside `@include desktop-up { ... }` is only added from 1024px up.

### Flex or grid
| Use | When | Used here for |
|---|---|---|
| **Flexbox** | Items go in **one direction**: a row or a stack | The header bar, the hero, the wrapping book and visit cards, the club, the membership cards, the events page split, button rows, every vertical stack |
| **Grid** | Items need **columns and rows together** (2D) | Each **event row** and the **footer** |

### "Stacked" means a flex column
`flex-direction: row` puts items **side by side**. `flex-direction: column` puts items **one on top of another**. A "stacked" layout is a **column**, and the `stack($gap)` mixin makes one.

Ask this about any container: do its children sit **next to each other** (row) or **on top of each other** (column)? For example, a plan card is a column (top part above bottom part), and the list of three plan cards is a row on desktop.

### BEM class names
`.block`, `.block__element`, `.block--modifier`:
- `.plan` is a block, `.plan__badge` is an element inside it, `.plan--featured` is a variation of it.
- `.btn` with `.btn--primary` or `.btn--outline`.

### Sass
Sass is CSS with variables, nesting and mixins. The `&` in `&__title` means "the parent's name", so `.book-card { &__title {} }` compiles to `.book-card__title`.

### No JavaScript for behavior
| Behavior | How it is done |
|---|---|
| Mobile menu open and close | A hidden checkbox and a label (the burger) |
| Scroll to a section | Anchor links (`href="#club"`) and `scroll-behavior: smooth` |
| Newsletter error message | The CSS `:user-invalid` state |
| Hover, active and focus effects | CSS pseudo-classes with a `transition` |

## 3. Folder structure

```
margin-notes-v2/
├── index.html        the page
├── symbols.js        the icon symbols
├── main.scss         loads every file below, in order
├── main.css          compiled output (do not edit)
├── abstracts/        no CSS output: tokens and tools
├── base/             global rules for bare elements
├── layout/           the page frame: container, header, footer
├── components/       reusable pieces
└── sections/         one file per section of the page
```

The layout is **7-1 inspired**: the 7-1 pattern is a Sass convention of 7 folders plus one main file. This project uses 5 folders (no `themes/` or `vendors/`, and `sections/` instead of `pages/` because it is one page).

Files load from general to specific: `abstracts → base → layout → components → sections`. A section can use any component, and a component never depends on a section.

### `abstracts/`
| File | Contents |
|---|---|
| `_variables.scss` | Colors, fonts, spacing, radii, shadow, layout sizes, breakpoints |
| `_mixins.scss` | `tablet-up`, `desktop-up`, `stack`, `visually-hidden`, `focus-ring`, and the text-style mixins |
| `_index.scss` | Forwards the two files above, so any file can start with `@use "../abstracts" as *;` |

### `base/`
| File | Contents |
|---|---|
| `_reset.scss` | Box-sizing and margin reset, smooth scrolling and the header offset, body text, the focus ring |
| `_typography.scss` | Helper classes: `.small-heading`, `.section-title`, `.section-description`, `.sr-only`, `.only-desktop`, `.only-mobile`, `.skip-link` |

### `layout/`
| File | Contents |
|---|---|
| `_container.scss` | `.container` (the centered column) and `.section` (space above and below) |
| `_header.scss` | `.announce` bar and the sticky `.site-header` with the mobile menu |
| `_footer.scss` | `.site-footer` and `.footer-nav` |

### `components/`
| File | Contents |
|---|---|
| `_icons.scss` | `.icon` and its sizes |
| `_buttons.scss` | `.btn` (primary, accent, outline, small), `.link`, `.icon-btn` |
| `_placeholder.scss` | `.placeholder` colored image boxes and `.cover` (2:3 book shape) |
| `_tag.scss` | `.tag` (category label, desktop only) |
| `_book-card.scss` | `.book-card` |
| `_form.scss` | `.field` input and error message |

### `sections/`
`_hero`, `_new-arrivals`, `_book-club`, `_membership`, `_events`, `_visit`. Each styles only its own section.

## 4. Design tokens
Defined once in `abstracts/_variables.scss`, taken from the style guide.

| Group | Values |
|---|---|
| **Colors** | `$color-ink` `#1C1B19`, `$color-muted` `#5C5A55`, `$color-forest` (green) `#1E4D3A` with `$color-forest-hover` `#163A2C`, `$color-mustard` (yellow) `#F2B33D` with `$color-mustard-hover` `#E5A225`, `$color-page` `#FBFAF7`, `$color-surface` `#EFEDE6`, `$color-line` `#DCD8CC`, `$color-error` `#B3261E`, `$color-on-forest` (text on green) `#C9D8CF` |
| **Fonts** | Instrument Serif (headings), Manrope (text) |
| **Spacing** | `$space-4`, `$space-8`, `$space-12`, `$space-16`, `$space-24`, `$space-32`, `$space-48`, `$space-64`, `$space-96`, `$space-112` (the number is the size in px) |
| **Radii** | 6px (inputs, covers), 16px (cards), 999px (buttons, tags) |
| **Hover shadow** | `0 18px 40px -18px rgba(28, 27, 25, 0.35)` |
| **Layout** | content width 1200px, 24px side gutter, header height 64px (mobile) and 88px (desktop) |

To change a color or size, edit the variable and recompile. It updates everywhere.

## 5. Mixins and how screen sizes are read

### `tablet-up` and `desktop-up`
```scss
@mixin desktop-up {
  @media (min-width: $breakpoint-desktop) {   // $breakpoint-desktop is 1024px
    @content;
  }
}
```
Writing this in a selector:

```scss
.site-header__burger {
  @include desktop-up {
    display: none;
  }
}
```
compiles to `@media (min-width: 1024px) { .site-header__burger { display: none; } }`. The browser never sees the word `desktop-up`, because Sass replaces it with `1024px` when it compiles. You can check this in `main.css`.

### The others
| Mixin | What it does |
|---|---|
| `stack($gap)` | `display: flex; flex-direction: column; gap: $gap` (a vertical stack) |
| `focus-ring` | The 2px green outline shown on keyboard focus |
| `visually-hidden` | Hides something visually but keeps it for screen readers |
| `text-style($font-size, $line-height, $weight, $letter-spacing)` | Font size, line height, weight and letter spacing together |
| `text-display`, `text-section-title`, `text-panel-title`, `text-card-title-large`, `text-card-title-small`, `text-body`, `text-small`, `text-small-heading`, `text-button` | The rows of the style guide's typography table, each with its mobile and desktop size |

### What `gap` means
`gap` is the empty space **between** items, not before the first or after the last. It matters for the wrapping book grid below, where a line's width is the items **plus** the gaps.

## 6. Page structure

```
body
├── skip link             keyboard shortcut to #main
├── .announce             thin dark bar: "Open late every Thursday until 10 PM"
├── header.site-header    sticky navigation bar
├── main#main
│   ├── section.hero
│   ├── section.new-arrivals      #arrivals
│   ├── section.book-club          #club
│   ├── section.membership
│   ├── section.events        #events
│   └── section.visit         #visit
└── footer.site-footer
```

`header`, `main` and `footer` are plain blocks stacked in normal flow. The body is not a grid. Layout tools are used **inside** each block, and no floats are used.

### The container, and "edge to edge"
Every section puts its content inside `.container`:

```scss
width: 100%;
max-width: 1248px;     // 1200px of content + 24px of padding each side
margin: 0 auto;        // splits the leftover space equally: centered
padding: 0 24px;
```

| Screen | Content width | Space at each side |
|---|---|---|
| Phone (375px) | 327px | 24px |
| Desktop (1440px) | 1200px | the rest, from the auto margins |

**Edge to edge** means the section's *background* (for example the green of the club) runs across the **full width of the window**, while the content inside stays in the centered column. The `<section>` is full width and carries the background. The `.container` div inside it limits the content. If the background were on the container instead, it would stop at 1200px and show page color on both sides.

`.section` adds the vertical space (64px mobile, 112px desktop). The hero sets its own spacing (48px/64px, then 96px).

## 7. Every part of the page, in order

### Announcement bar
A 40px dark strip with centered white text. It is not sticky, so it scrolls away.

### Header (`layout/_header.scss`)
```
header.site-header                    sticky
└── .container.site-header__inner     flex ROW, space-between, items centered
    ├── hidden checkbox               (the menu toggle)
    ├── logo "Margin Notes"           left
    ├── nav                           middle on desktop, a dropdown on mobile
    └── actions                       right: search, bag, burger
```

- **Sticky:** `position: sticky; top: 0; z-index: 20`, with a background and a bottom line so the page doesn't show through.
- **`justify-content: space-between`** puts the logo at the left edge and the actions at the right edge. On mobile the nav is taken out of the flow (`position: absolute`), so only two items are left in the row and they go to opposite ends.

| Part | Mobile (under 1024px) | Desktop (1024px and up) |
|---|---|---|
| Logo | left | left |
| Nav (Shop, Book club, Events, Visit) | hidden; opens as a full-width dropdown under the header | visible in the middle as a row, 40px between links |
| Search | icon button | icon button |
| Bag | round icon only | pill with an outline and the text "Bag (0)" |
| Burger | visible | hidden |
| Height | 64px | 88px |

**How the menu opens with no JavaScript:** a hidden checkbox comes before the nav. The burger is a `<label for="menu-toggle">`, so clicking it ticks the checkbox. The CSS rule `.site-header__toggle:checked ~ .site-header__nav { display: block }` then shows the nav. The `~` means "a later sibling". The same trick swaps the burger lines for an X.

**Going to a section:** each nav link is an **anchor link** (`href="#club"`) pointing at the section with `id="club"`. The `#club` part is called the **fragment identifier**. The smooth glide is `scroll-behavior: smooth` on `html`. Because the header is sticky and would cover the section's top, `scroll-padding-top` (64px mobile, 88px desktop) leaves room for it.

### Hero (`sections/_hero.scss`)
```
.hero__inner                       column on mobile, flex ROW on desktop
├── Div 1: .hero__content             vertical stack
│   ├── small heading
│   ├── h1 (big heading, "Talk about it" in italics)
│   ├── description
│   └── buttons: [Join the book club] [Browse new arrivals →]
└── Div 2: .hero__collage          position: relative
    ├── .hero__photo   "Shop interior"          absolute, top right
    ├── .hero__thumb   "Reader"                 absolute, bottom left
    └── .hero__badge   "Book of the month"      absolute, top left, tilted
```
- **Buttons:** stacked on mobile (the green button full width, the link centered under it), side by side on desktop.
- **Desktop:** each div gets `flex: 1`, so they share the row equally (588px each at 1200px).
- **Collage, `relative` and `absolute`:** the collage is `position: relative`. That makes it the reference for its three children, which are `position: absolute` and are placed from **its** corners (`top`, `left`, `right`, `bottom`). Without the `relative`, they would be placed from the corners of the whole page.
- **Looks the same at every width:** the collage keeps a fixed shape (`aspect-ratio: 327 / 360` on mobile, `588 / 600` on desktop) and every piece is sized in **percentages** of it. They grow and shrink together, so nothing drifts. The badge text uses `cqw` units (1cqw = 1% of the collage's width) so it shrinks with its circle. The collage has `container-type: inline-size`, which is what allows `cqw`.

| Piece | Position | Size, mobile | Size, desktop |
|---|---|---|---|
| Photo | top right | 79.5% × 88.9% | 78.2% × 90% |
| Thumbnail | bottom left, page-colored border | 45.9% × 52.8% | 44.2% × 53.3% |
| Badge | top left, rotated −12° | 29.4% wide, round | 23.1% wide, round |

### New arrivals (`sections/_new-arrivals.scss`)
```
.new-arrivals__inner                    vertical stack
├── Div 1: .new-arrivals__head          flex row, space-between, aligned to the bottom
│   ├── titles: "Just in" + "New arrivals"
│   └── link: "View all books →"    (on mobile: "View all →")
└── Div 2: .new-arrivals__list          flex row with flex-wrap: wrap
    └── .new-arrivals__item × 4
        └── .book-card              a flex column with 3 parts
            ├── .cover              image placeholder (2:3)
            ├── .book-card__info    tag (desktop only), name, author
            └── .book-card__buy     flex row: price left, "+" button right
```

**How the cards wrap onto lines:** `flex-wrap: wrap` lets items drop onto a new line when the next one doesn't fit. Each item's width decides how many fit on a line, and the `gap` has to be subtracted:

| Screen | Gap | Per line | Item width | Why |
|---|---|---|---|---|
| Mobile | 16px | 2 | `calc(50% - 8px)` | 1 gap between 2 cards, so each gives up half of it |
| From 768px | 24px | 4 | `calc(25% - 18px)` | 3 gaps (72px) shared by 4 cards, so 18px each |

Without the subtraction the items would add up to more than 100% and the last one would wrap too early. At 1200px, each desktop card is (1200 − 72) ÷ 4 = **282px**.

Cards on the same line are the same height because flex items stretch by default. `margin-top: auto` on `.book-card__buy` pushes the price row to the bottom, so all the prices line up even when one title takes two lines.

### Book club (`sections/_book-club.scss`)
```
.book-club__inner                        column on mobile, flex ROW on desktop
├── Div 1: .book-club__cover             the cover
└── Div 2: .book-club__content           vertical stack of 4 rows
    ├── Row 1: intro   "October book club pick", "The Salt Orchard", "by Leila Mansour"
    ├── Row 2: quote   the opening line and its source
    ├── Row 3: facts   When / Where / Seats
    └── Row 4: buttons [Reserve a seat] [Read the first chapter →]
```
- **Desktop:** the cover is a fixed 384px wide, the text takes the rest (`flex: 1`), with 96px between them. Everything is vertically centered.
- **Mobile cover:** 220px wide and centered.
- **A fact** is a **label** (the small uppercase word: When) and a **value** (the answer: Thu 29 Oct, 7 PM).
  - *Mobile:* each fact is a flex row, label left and value right, with lines between them.
  - *Desktop:* the three facts sit side by side (a flex row), each with the label above the value.
- **Buttons:** stacked on mobile, side by side on desktop. The yellow button is the `accent` variant, used on green backgrounds.

### Membership (`sections/_membership.scss`)
```
.membership__inner                       vertical stack
├── Div 1: .membership__head             centered: small heading, title, description
└── Div 2: .membership__list             stack on mobile, flex ROW on desktop
    └── .plan × 3                   each card is a flex column
        ├── .plan__top              name, price, description
        └── .plan__bottom           features list and button
```
- **Cards:** `.membership__list` is a stack on mobile, capped at 560px wide and centered so cards stay readable on tablets. From 1024px it is a flex row where each item is `flex: 1`, so the three cards are equal width and equal height.
- **The card is a column** because its two parts sit one above the other. The list of cards is a row on desktop because the cards sit side by side.
- **Buttons line up:** `.plan__bottom` has `margin-top: auto`, which pushes the features and button to the bottom of the card, so the three buttons line up even when descriptions differ in length.
- **Featured plan ("Club member"):** a 2px green border and a yellow **"Most popular"** badge. The badge is `position: absolute` with `top: -14px`, so it sits half outside the card. The card is `position: relative` so the badge is placed from the card's corner. The space it needs comes from the gap between the headings and the cards (40px mobile, 56px desktop).
- **Order:** in the HTML the order is Reader, Club member, Patron. On mobile the featured card has `order: -1`, so it is shown **first**. On desktop `order: 0` puts it back in the middle.
- **Features:** each is a flex row with a green check icon and the text.

### Events (`sections/_events.scss`)
```
.events__inner                      column on mobile, flex ROW on desktop
├── Div 1: .events__intro           headings and description        (flex: 1)
└── Div 2: .events__list            always a vertical stack         (flex: 2)
    └── .event × 3                  each event is a GRID
        ├── .event__date            area "date"    (day and month)
        ├── .event__body            area "body"    (title and details)
        └── .event__action          area "action"  (RSVP button)
```
- **The list is always a column of events**, on both screens. On desktop the intro sits to its left.
- **Each event is a grid with named areas.** Every quoted line is one **row** of the grid; the words in it are the columns.

```scss
// Mobile: 2 rows              // Desktop: 1 row
"date body"                    "date body action"
"date action"
```

```
Mobile                          Desktop
┌──────┬──────────────┐         ┌──────┬───────────────────┬────────┐
│      │     body     │         │ date │       body        │ action │
│ date ├──────────────┤         └──────┴───────────────────┴────────┘
│      │    action    │
└──────┴──────────────┘
```
The word `date` appears in both mobile rows, so the date spans both and sits next to the text **and** the button. This is the one place that is a real 2D layout, which is why it is a grid. On desktop the `.event` is still a grid, only with one row, and the columns are `96px 1fr auto` (the `auto` column is only as wide as the RSVP button).

### Visit + newsletter (`sections/_visit.scss`)
```
.visit__inner                       flex ROW with flex-wrap: wrap
├── Card 1: white   title, address, opening-hours table, "Get directions →"
└── Card 2: green   title + description, then the form
```
- **Wrapping:** on mobile each card is `width: 100%`, so the second wraps under the first. On desktop each is `calc(50% - 12px)` (half, minus half of the 24px gap), so they sit side by side at the same height.
- **Opening hours** is a real `<table>`, because it is data in rows and columns. The day is left-aligned and the time right-aligned. On mobile "Saturday – Wednesday" shows as "Sat – Wed" (two spans, one for each screen size).
- **Newsletter form:** the input and the Subscribe button are stacked on mobile (the button full width) and in a flex row on desktop, with the input taking the remaining width (`flex: 1`).

### Footer (`layout/_footer.scss`)
```
.site-footer__inner                 GRID with named areas
├── brand    logo and description
├── lists    Shop / Club / Visit link lists
└── bottom   "© 2026 Margin Notes" and "Privacy"
```

| Screen | Columns | Areas |
|---|---|---|
| Mobile | 1 column | `"brand"` over `"lists"` over `"bottom"` |
| Desktop | `1fr` and `auto` | `"brand lists"` over `"bottom bottom"` |

```
Desktop
┌────────────────────────┬─────────────────────────────┐
│ brand (takes the rest) │  Shop        Club     Visit │   row 1
├────────────────────────┴─────────────────────────────┤
│ © 2026 Margin Notes                          Privacy │   row 2
└──────────────────────────────────────────────────────┘
```
`"bottom bottom"` names the area in both columns, so the bottom bar spans the full width. This is the 2D reason the footer is a grid.
- **The three lists:** on mobile a 2-column grid (the third list wraps below). On desktop a flex row, each list 180px wide, sitting on the right.
- **Bottom bar:** a flex row with `space-between`, with a line above it.

## 8. States, hovers and clicks

### What a "state" is
A **state** is how an element looks depending on what the user is doing. In CSS they are written as **pseudo-classes**:

| State | Pseudo-class | When it happens |
|---|---|---|
| Normal | (none) | nothing is happening |
| **Hover** | `:hover` | the mouse is over it |
| **Pressed / click** | `:active` | the mouse button is held down on it |
| **Keyboard focus** | `:focus-visible` | reached with the Tab key |
| **Clicked into** (inputs) | `:focus` | the cursor is in the field |
| **Invalid** (inputs) | `:user-invalid` | the person typed something the field rejects |

### What the "transition" is
The smooth change between two states is made by the CSS property **`transition`**. Without it, a color would jump instantly. With `transition: background-color 200ms ease`, it fades over **200 milliseconds**. The state (`:hover`) is the trigger, and `transition` is the animation. All states use 200ms ease.

### Every interaction

| Element | Hover | Pressed (`:active`) |
|---|---|---|
| **Green button** (`.btn--primary`) | background goes darker green `#163A2C` | moves down 1px |
| **Yellow button** (`.btn--accent`) | background goes darker yellow `#E5A225` | moves down 1px |
| **Outline button** (`.btn--outline`, RSVP, plan buttons) | fills with dark and the text turns white | moves down 1px |
| **Text link** (`.link`) | underline appears (offset 4px) and **the arrow moves right** | none |
| **Book card** (`.book-card`) | **the card pops up** 4px and gets a soft shadow | none |
| **Round "+" button** (`.icon-btn`) | fills with dark and the icon turns white | none |
| **Search button** (`.icon-btn--plain`) | light gray background | none |
| **Bag** (`.site-header__bag`) | fills with dark, text turns white | none |
| **Nav links** | text turns green | none |
| **Footer links** | text turns yellow | none |
| **Footer "Privacy"** | gray turns white | none |

### The book card pop
```scss
.book-card {
  transition: transform 200ms ease, box-shadow 200ms ease;

  &:hover {
    transform: translateY(-4px);     // moves up 4px
    box-shadow: $shadow-hover;       // soft shadow below
  }
}
```
`translateY(-4px)` moves the card up without changing the layout around it, and the `transition` makes the move and the shadow fade in smoothly.

### The arrow that moves on "Browse new arrivals"
The text link is a flex row with a `gap` between the words and the arrow:

```scss
.link {
  display: inline-flex;
  gap: 6px;
  transition: color 200ms ease, gap 200ms ease;

  &:hover {
    gap: 10px;                       // gap grows from 6px to 10px
    text-decoration: underline;
    text-underline-offset: 4px;
  }
}
```
The arrow is the last item in the row, so when the `gap` grows by 4px, the arrow slides 4px to the right. The `gap` is in the `transition` list, so the move is smooth. The same link style is used for "View all", "Read the first chapter" and "Get directions".

### Keyboard focus
`:focus-visible` shows a **2px green outline with a 3px offset** around whatever is reached with the Tab key. It only appears for keyboard users, not on mouse clicks. On green backgrounds (`.on-green`) the ring is white so it stays visible. The hidden menu checkbox shows its ring on the burger button. A **skip link** ("Skip to content") is hidden until it gets focus, so keyboard users can jump past the header.

### Input states
- **Clicked into (`:focus`):** the border turns green and a soft 3px ring appears.
- **Wrong email (`:user-invalid`):** the border turns red, and the message "Please enter a valid email." appears under the field. It is hidden by default and shown with the CSS rule `.field__input:user-invalid ~ .field__error { display: block }`. `:user-invalid` only applies **after** the person has typed or left the field, so an empty form doesn't show an error right away. The message sits on a white chip, so the red stays readable on the green card.

### Buttons and the `transition` list
`.btn` transitions `color`, `background-color`, `border-color` and `transform`. That covers the hover color change and the 1px press.

## 9. Icons
Icons live in `symbols.js`. It adds a hidden SVG sprite to the page, and each icon is used with:

```html
<svg class="icon icon--18" aria-hidden="true"><use href="#i-search" /></svg>
```

Available: `i-arrow`, `i-search`, `i-bag`, `i-menu`, `i-close`, `i-plus`, `i-check`. To add one, add a `<symbol id="i-name" viewBox="0 0 24 24">` to `symbols.js`.

`.icon` sets `fill: none` and `stroke: currentColor`, so an icon takes the text color of whatever it sits in. That is why the arrow turns white in a white link and the plus turns white when the round button fills with dark. Sizes are 20px by default, with `icon--18` and `icon--16`.

### Why a script and not an `.svg` file
`<use href="symbols.svg#i-arrow">` pointing at an external file is **blocked** by browsers when the page is opened from disk (`file://`), because a page there can't load another file. The script inserts the symbols **inside** the page, so it works from disk and on a server.

### Why `defer`
`symbols.js` starts with `document.body.insertAdjacentHTML(...)`. In the `<head>`, `<body>` doesn't exist yet, so that would fail. `defer` tells the browser to download the script in the background while it keeps reading the HTML, and to **run it only after the page is parsed**. Then `<body>` exists and the icons are inserted. It also lets the script stay in the head. A `preload` link would be redundant, because the browser already finds the script early in the head.

## 10. Lessons and gotchas

- **CSS order beats intention.** The burger had `display: none` on desktop in the header file, but it still showed. `components/_buttons.scss` loads later and sets `.icon-btn { display: flex }`. With equal specificity the later rule wins. The fix was a more specific selector, `.site-header__actions .site-header__burger`.
- **Gap math in wrapping flex.** Item widths must subtract their share of the gaps (`calc(25% - 18px)`), otherwise the last item wraps early.
- **A fixed box height breaks a collage.** The hero collage drifted when it had a fixed height and a changing width. The fix is a fixed `aspect-ratio` plus percentage sizes.
- **Sticky header and anchor links.** Without `scroll-padding-top`, the header covers the top of the section you jump to.
- **The checkbox menu stays open** after you tap a link, and it can't set `aria-expanded` (the design shows it on the burger). Both would need a small script, which this project avoids.
- **A child's direction is not the parent's.** A plan card is a flex **column**; the list of cards is a flex **row** on desktop. Each container has its own direction, set by how its own children are arranged.
- **Grid or flex.** The event row and the footer are the only places that need both rows and columns, so they are the only grids. Using grid for a simple one-direction layout would still work, but makes the code harder to read.

### Design notes
- The tag on the book cards (Fiction, Essays) is **desktop only**, as in the design.
- Opening-hours days are shortened on mobile ("Sat – Wed").
- The mobile menu design isn't shown in the original frames, so the dropdown is our own addition, as is the sticky header.
- Text sizes are in pixels.

## 11. Naming guide
Names say what a thing is, so you can read the code without looking anything up.

### Variables
| Pattern | Examples | Meaning |
|---|---|---|
| `$color-…` | `$color-ink`, `$color-forest`, `$color-forest-hover`, `$color-error` | A color. `-hover` is the color used when the mouse is over it. |
| `$placeholder-…` | `$placeholder-sand`, `$placeholder-sage` | The colors of the image placeholder boxes |
| `$space-<px>` | `$space-8`, `$space-24`, `$space-112` | A space size. The number is the size in pixels. |
| `$radius-…` | `$radius-sm`, `$radius-md`, `$radius-pill` | Rounded corners: small, medium, fully round |
| `$font-…` | `$font-serif`, `$font-sans` | A font family |
| `$breakpoint-…` | `$breakpoint-tablet`, `$breakpoint-desktop` | A screen width where the layout changes |

### Mixins
| Name | Meaning |
|---|---|
| `tablet-up`, `desktop-up` | "From this screen width **and bigger**" (a `min-width` media query) |
| `stack($gap)` | A vertical stack: a flex column with a gap |
| `text-style(...)` | Font size, line height, weight and letter spacing |
| `text-display`, `text-section-title`, `text-body`, `text-small`, `text-small-heading`, `text-button`, … | A named text style from the style guide's typography table |
| `focus-ring`, `visually-hidden` | The keyboard focus outline, and hiding something visually for screen readers |

### Classes
| Pattern | Examples | Meaning |
|---|---|---|
| `block` | `.book-card`, `.plan`, `.hero` | A whole piece of the page |
| `block__element` | `.plan__badge`, `.hero__content` | A part inside a block |
| `block--modifier` | `.btn--primary`, `.link--white`, `.icon-btn--plain` | A variation of a block |
| Section blocks | `.hero`, `.new-arrivals`, `.book-club`, `.membership`, `.events`, `.visit` | One per page section. Their ids (`#arrivals`, `#club`, `#events`, `#visit`) are what the nav links point to. |
| Helpers | `.small-heading`, `.section-title`, `.section-description`, `.sr-only`, `.only-desktop`, `.only-mobile`, `.on-green` | Small reusable classes used in many places |

Naming choices:
- The text above a heading is the **small heading**, and the grey paragraph under it is the **section description**.
- The text part of a section is its `__content` (`.hero__content`, `.book-club__content`).
- The newsletter is always called **newsletter** (`.newsletter-form`, `.visit__card--newsletter`).
