# WorKnow design system

How the WorKnow website looks and how its pages are put together. The values here live as tokens at the top of `assets/css/main.css`. Change them there, and every page follows.

## 1. Visual direction

WorKnow sits between the history of science and economic history. The design draws on the material world of both fields: the printed page of the early modern practical treatise, and the stone, ink and crimson of Tuscan institutions. It aims to be scholarly and calm. Generous margins and a strong typographic hierarchy carry the page, with very little ornament.

There is **one graphic motif**: the WorKnow logo, a quadrant inscribed *Working Knowledge*. It is shown large once, beside the title on the home page, as a vector drawing that takes the page’s ink colour in light and dark modes.

## 2. Colour

Named after Tuscan materials. Contrast ratios are measured against the page ground and meet WCAG AA for normal text; most meet AAA.

| Token | Name | Colour | Dark (unused) | Use | Contrast (light / dark) |
|---|---|---|---|---|---|
| `--marmo` → `--bg` | Carrara marble | `#f8f7f4` | `#15171a` | Page ground | — |
| `--pietra` → `--surface` | Pietra serena | `#ebeeeb` | `#1e2124` | Quiet surfaces: footer, project facts, acknowledgement box | — |
| `--inchiostro` → `--ink` | Iron-gall ink | `#1f1b1c` | `#ebe7e2` | Text, section rules | 15.9 / 14.6 |
| `--grigio` → `--muted` | Stone grey | `#575d61` | `#a4a9ad` | Secondary text, labels, dates | 6.2 / 7.6 |
| `--cremisi` → `--accent` | Crimson | `#7b1e2c` | `#e3929e` | The single accent: links, buttons, active menu item, timeline dots. Taken from the FIS and Sant’Anna marks | 9.5 / 7.6 |
| `--terra` → `--flag` | Terra di Siena | `#94531c` | `#dba467` | Only to flag what is upcoming: “Upcoming” badges, the “Today” marker | 5.6 / 8.1 |
| `--filo` → `--rule` | Hairline | `#d3d8d5` | `#30343a` | Thin dividers | — |

Rules:
- **Crimson is the only accent.** Burnt sienna marks time (what is coming next) and is never used for decoration.
- **Logos always sit on white plates**, in both themes, so funders’ marks are never recoloured.
- **The site is always shown in the light palette**, whatever the visitor’s device setting. The dark values in the table are kept for reference only.

## 3. Typography

Three open-licence families, served from the site itself:

| Role | Family | Why |
|---|---|---|
| Display: page titles, section heads, large dates | **Libre Caslon Display** | A revival of the types of William Caslon, cut in London in the 1720s, the age of practical mathematics manuals. Used sparingly, at large sizes only. |
| Body: running text | **Source Serif 4** | A sturdy modern text serif with true italics. Comfortable for long reading and clear for citations. |
| Interface: menu, labels, dates, buttons | **Public Sans** | A neutral sans for small functional text, so that it never competes with the serif. |

Scale (rem): 0.78 · 0.9 · 1.0625 (body) · 1.3 · 1.75 · up to 3.6 for page titles and 5 for the home title.

- Running text is set at most 40rem wide (about 65 characters per line).
- Labels are small capitals in Public Sans with 0.08em letter-spacing.
- Headings use balanced line breaks.
- Dates in lists use tabular figures, so they line up.

## 4. Layout

- **Frame:** content at most 72rem wide, with a side gutter of 16–40px that scales with the screen.
- **Column:** left-aligned and editorial, not centred. Long text stays in a 40rem measure. Wider elements (member grid, timeline, logo grid) use the full frame.
- **Sections** open with a 1px ink rule and a Caslon heading. Optional links (“All publications →”) sit at the right of the same line.
- **Spacing scale:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 72px (`--s1` to `--s8`). Sections are separated by 72px.
- **Breakpoints:** menu collapses below 980px; hero, project aside and two-column blocks stack below 860/760px; lists and the timeline switch to single-column below 620/520px.

## 5. Components

Each component lives in one file. Its content comes from one data source, so editors never touch the markup.

### Header (`_includes/header.html`)
- **Content:** logo and “WorKnow” wordmark; menu items from `_data/navigation.yml`, starting with Home.
- **Behaviour:** sticky at the top. The current section is crimson with an underline (`aria-current="page"`). Below 980px the menu collapses behind a **Menu** button (`aria-expanded` kept in sync).
- **Accessibility:** a “Skip to content” link is the first focusable element.

### Hero (`index.html`, `_includes/project-logo.svg`)
- **Content:** the title *Working Knowledge* with the full subtitle in italics, a two-sentence summary, and two actions (About the project, Meet the team). No administrative details: funding is acknowledged in one quiet line at the foot of the home page, with a link to the Funding page.
- **Graphic:** the project logo as a vector drawing. On phones it sits above the title, smaller.

### Member grid (`team.html`, `_includes/person.html`)
- **Data:** `_data/team.yml`, `_data/collaborators.yml`.
- **Structure:** a short introduction, then one grid of equal cards with no separate sections by role: the PI first, then the researchers. Three columns on desktop, two on tablets, one on phones. Each card has a large 4:5 portrait, the name in Caslon, the role in small crimson capitals, a line of specialisations, an envelope icon for email, and a *people/Name-Surname* link to the person’s own page.
- **Fallback:** without a photo, the person’s initials in crimson Caslon on a stone surface. Specialisation, email and link appear only when filled in.

### Dissemination timeline (`dissemination.html`, `_includes/timeline.html`)
- **Data:** `_data/dissemination.yml`, any order. One list for workshops and events organised by WorKnow and for presentations of the project’s work elsewhere.
- **Structure:** a vertical hairline with a dot for each item. Dates sit to the left, details to the right. Year labels in Caslon divide the years. Items organised by WorKnow have a solid crimson dot and the label “Organised by WorKnow”. Two fixed bookends, *WorKnow begins* (June 2025) and *WorKnow concludes* (June 2028), frame the grant period.
- **Behaviour:** the browser compares each date with today, marks future items “Upcoming” in burnt sienna and inserts a dashed **Today** line, without rebuilding the site.
- The home page shows the next three upcoming items from the same data.

### Publication list (`publications.html`, `_includes/publication.html`)
- **Data:** `_data/publications.yml`.
- **Structure:** year column and a Chicago author–date citation, with type and open-access chips, a *Read* link and *Copy citation*. Type filters appear once there is more than one type.

### Funding (`funding.html`)
- Four logo plates (project, MUR, FIS, Sant’Anna) on white, and the grant details.

### Footer (`_includes/footer.html`)
- Funder logo strip on white plates, the funding acknowledgement sentence, project period, optional contact email, and “This site uses no cookies or tracking”.

## 6. Writing style

British English (organisation, programme, acknowledgement). Plain, precise sentences; no promotional adjectives. Labels name things the way readers do: *Dissemination*, *Publications*, *Team*.
