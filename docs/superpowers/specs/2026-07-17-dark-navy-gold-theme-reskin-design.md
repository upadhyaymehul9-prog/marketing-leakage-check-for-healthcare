# Dark navy/gold theme reskin — design

## Goal
Reskin the Hospital Marketing & Brand Health Check app to visually match the
sibling Revenue Leakage Self-Audit app (`C:\Users\ADMIN\Revenue-leakage-for-Hospital`),
which uses a dark navy/gold "AccredReady" visual language. Both apps are
separate repos; this is a visual-only port, no functional/content changes.

## Color tokens (`src/styles.css` `:root`)
Replace the current light palette with Revenue Leakage's exact values:

| Token | Old | New |
|---|---|---|
| `--bg` | `#f0f4f9` | `#050e1a` |
| `--card` (→ `--panel`) | `#ffffff` | `#081525` |
| new `--panel2` | — | `#0c1e35` |
| `--border` | `#d8e0ec` | `#0f2640` |
| primary accent (`--teal` → `--gold`) | `#00a69c` | `#c9a84c` |
| `--text` | `#1a2b42` | `#c8dcea` |
| new `--white` (headings/emphasis) | — | `#eef4f9` |
| `--muted` | `#5a6b82` | `#3a5870` |
| `--red` | `#d64545` | `#e05a5a` |
| `--orange` | `#d97b2d` | `#f4a441` |
| `--green` | `#2e9e6e` | `#4caf7d` |
| `--blue` | `#0a4d8c` | `#4fc3f7` |
| `--yellow`/gold reused | `#c9a227` | `#c9a84c` |

`--navy` and `--purple` are dropped as separate tokens; anywhere they were
used for emphasis/headings switches to `--gold` or `--white`.

`index.html` gets an inline `background: #050e1a` on `html, body` (same
anti-flash trick Revenue Leakage uses) so there's no white flash before CSS loads.

## Component-level changes

**Header (`AuditShell.tsx` + CSS)**
- `.audit-header` becomes a dark panel (`--panel`) bar.
- Brand mark (₹ icon) keeps its square badge but on `--gold` background.
- `.page-nav__link.is-active`: replace solid navy fill with a gold left-border
  / underline treatment matching Revenue Leakage's active-section style
  (transparent bg, 3px gold border, gold text) rather than a filled pill.
- Score pills keep semantic colors (green/blue/orange/red) but on dark bg.

**Sidebar**
- `.sidebar` becomes `--panel` background, `--border` divider.
- `.sidebar__item.is-active`: drop the light-teal fill; use transparent
  background + 3px solid `--gold` left border, gold-tinted icon, white label
  text — mirrors Revenue Leakage's section rail exactly.
- `.sidebar__icon` background switches to `--panel2`.

**Question cards**
- `.question-card` background → `--panel`, border → `--border`.
- Badges (`.badge--critical/high/medium`) switch from solid pastel fills to
  translucent fills: `color + "22"`-equivalent (via `color-mix` or precomputed
  rgba) background, `color`-bordered, `color` text — same recipe Revenue
  Leakage uses (`r.color+"22"` bg, `r.color+"44"` border).
- `.answer-option.is-selected` variants switch from solid color fill + white
  text to translucent fill (background at ~15-20% opacity of the status
  color) + colored text, so text stays legible on dark backgrounds.
- `.how-to` block and `.how-to summary`: restyle from teal-on-light-mint to
  gold-on-dark-panel, matching Revenue Leakage's "✅ HOW TO ACHIEVE THIS"
  gold-numbered-steps look.

**Illustrations (`QuestionIllustration.tsx` `MOTIF_COLORS`)**
- Each motif's `bg` value switches to `--panel2` (`#0c1e35`) uniformly, so
  illustrations sit one shade lighter than the surrounding `--panel` question
  card — motifs stay visually distinct via their `accent` color, not via
  background variation.
- Each motif's `ink` value switches to `--white` (`#eef4f9`).
- `accent` values are unchanged — they're the colorful highlight shapes and
  already read well on a dark background.
- `.question-illustration__svg` border/shadow adjusts to dark-appropriate
  values (`--border` color border, subtle shadow or none).

**Report page**
- `.summary-card`, `.dept-card`, `.action-item`, `.plan-column` all switch to
  `--panel` background / `--border` border.
- `.health-badge--*` variants switch to translucent fills like the question
  badges.
- `.report__eyebrow` and section headings switch from teal/navy to gold/white.

**Modal**
- `.modal` background → `--panel`, overlay scrim stays dark (already
  `rgba(0,30,60,0.5)`-ish, fine as-is or slightly darkened).

## Out of scope
- No changes to React component structure, props, or business logic.
- No porting of Revenue Leakage's evidence-graded answer scale, loss
  estimates, or HOW_TO overlay data — only the visual treatment of this
  app's existing equivalent UI pieces.
- No changes to `package.json`/`package-lock.json` beyond what's already
  pending (unrelated to this task).

## Testing
- Run `npm run dev`, visually walk through: header, sidebar (all sections),
  a question card in each state (unanswered, each answer selected), the
  "How to achieve" expandable, an illustration, and the Report page.
- Run existing test suite (`npm test`) to confirm no snapshot/DOM assertions
  break from class/markup changes (styling-only changes are expected to be
  safe, but verify).
