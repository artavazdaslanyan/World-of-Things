# World of Things — Technical Specification v1.1

Oct 27, 2026 · @ART

## 1. Purpose and scope

World of Things is a single-file web application (`world-of-things.html`, about 408 KB with Bootstrap embedded) that replaces the PowerPoint project-charter deck with one program-level Gantt overview. Project managers maintain their own project in a built-in edit page and share it as a file; the program manager places those files next to the application and the page combines them.

This document describes the application as built and tested on 27 October 2026 (v1.1). It supersedes the v1.0 functional specification; section 12 lists what changed.

**In scope**

- Program view: centred Gantt card, month granularity, adjustable months-per-screen zoom, program milestones, deadlines, today and program markers, risk counter
- Project charter modal and a program charter modal, both read-only
- Risks list across the program and all projects, every entry clickable
- Edit page for project managers (own browser tab) with versioned local storage
- Settings page for the program manager (own browser tab) with versioned local storage
- JSON import; export through the browser's Save-as dialog
- Fully offline: Bootstrap 5.3 CSS and JS embedded, Bootstrap Icons as an inline SVG sprite, no network requests

**Out of scope**

- Any server, database or login
- Fetching files from SharePoint or OneDrive; the program manager downloads files by hand
- Print or export of the view
- Automatic status roll-up from sub-items to projects

## 2. Architecture, file layout and build

One HTML file serves three views, selected by the URL hash and opened in separate browser tabs: the program view (no hash), the edit page (`#edit`), the settings page (`#settings`) and a preview of the program view with unsaved settings (`#preview`, opened by the settings page).

**Folder layout on the program manager's machine**

```
world-of-things.html
world-of-things-settings.js
json-files/
    <projectId>.js
    ...
```

**Why `.js`.** A page opened from disk cannot `fetch()` sibling files, but it can load them with `<script>` tags. Every data file is a JSON object wrapped in one call: `wot.register({...});` for a project, `wot.settings({...});` for settings. Export writes this wrapper; import accepts both the wrapped form and bare JSON.

**Load sequence**

1. Load `world-of-things-settings.js` (3 s timeout); apply program name, colors, view defaults
2. For each entry in `settings.items`, inject `<script src="json-files/<file>?t=<timestamp>">`; the timestamp defeats browser caching so Refresh always reads the current file
3. After all scripts load or fail, derive the axis and render; missing files become greyed placeholder rows

**Source and build.** The repository holds `src/theme.css` (the editable theme block), `src/app.css`, `src/icons.html` (SVG sprite of 35 Bootstrap Icons), `src/body.html` and `src/app.js`; `build.js` concatenates them with `node_modules/bootstrap/dist/css/bootstrap.min.css` and `bootstrap.bundle.min.js` into `dist/world-of-things.html`. `sample-data.js` regenerates the FreshMarkt sample program. `test.py` opens the built page from `file://` in headless Chromium, exercises each view and reports console errors.

**Technology.** HTML5, CSS, vanilla JavaScript (ES2020), Bootstrap 5.3 (modals, tooltips, popovers, dropdowns, forms, grid), no other libraries. Targets: current Edge and Chrome; Firefox works except for the Save-as dialog (section 9).

&#91;embedded content: data flow · PM to program view\]

No step is automatic between the PM's export and the program view: the PM shares the file, the program manager downloads it into `json-files/`, lists it in settings and presses Refresh.

## 3. Data model and JSON schemas

Three levels: a **project** (one row, one file, one PM) holds **sub-items** (rows when expanded), which hold **tasks** (a counted checklist, never drawn). Dates are `YYYY-MM-DD`; timestamps are `YYYY-MM-DDTHH:MM:SS` local time. Everything on the chart is derived from these fields; nothing is typed twice. Missing arrays are treated as empty; missing IDs are generated on load.

### 3.1 Project file — `json-files/<projectId>.js`

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `schemaVersion` | number | yes | `1`; a higher number marks the row with a warning icon |
| `projectId` | string | yes | File name and version key; letters, digits, `-`, `_`; editable by the PM, generated as `project-xxxx` for a new project |
| `projectName` | string | yes | Shown in the name column, above the bar and as charter title |
| `projectManager` | string | yes | Shown on the row; drives Group by PM and Filter by PM |
| `startDate` / `endDate` | date | yes | PM's reporting window; snapped to whole months on the chart |
| `status` | `red` `amber` `green` | yes | Project RAG dot, chosen by the PM |
| `statusNote` | string | no | One line; tooltip on the dot and charter header |
| `description` | string | no | Charter text |
| `updatedOn` | timestamp | yes | Set on Save and on Import if absent; version key; written on Export |
| `saveNote` | string | no | One-line change note for that version |
| `milestones[]` | array | no | `name`, `date`, `done` → diamonds on the bar (filled when done, outlined when open) |
| `subItems[]` | array | no | See 3.2; order = display order |
| `risks[]` | array | no | See 3.3 |
| `links[]` | array | no | `label`, `url` |
| `parentId` | string | no | Reserved for future epic grouping |

### 3.2 Sub-item (inside `subItems[]`)

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `subItemId` | string | yes | Unique within the project; generated `sub-xxxx` |
| `title` | string | yes |  |
| `startDate` / `endDate` | date | yes | Independent of the project window; may fall outside it |
| `status` | enum | yes | One of the six values in 3.4 |
| `owner` | string | no | Shown after the title |
| `tasks[]` | array | no | `name`, `done` → the `done / total` pill |
| `updates[]` | array | no | `date`, `text`; displayed newest first |

### 3.3 Risk (inside `risks[]`, and `programRisks[]` in settings without `riskId` and `relatedSubItemId`)

| Field | Type | Required |
| --- | --- | --- |
| `riskId` | string | yes (generated `risk-xxxx`) |
| `date` | date | yes |
| `description` | string | yes |
| `relatedSubItemId` | string, `""` or `null` | no (empty = whole project) |
| `owner` | string | no |
| `status` | `open` `closed` | yes |

### 3.4 Sub-item status values

| Value in file | Label | Counts as done |
| --- | --- | --- |
| `completed-validated` | Completed and validated | yes |
| `completed-pending` | Completed pending validation | no |
| `exceeded` | Due date (to be) exceeded | no |
| `at-risk` | Due date at risk | no |
| `on-track` | Due date on track | no |
| `not-started` | Not started | no |

**Derived values** (never typed): project pill = sub-items with `completed-validated` / total sub-items; sub-item pill = tasks with `done: true` / total tasks; risks pill = closed / total over program risks plus all project risks; axis range; finished flag (`endDate` before today); stale flag (`updatedOn` older than `staleAfterDays`).

### 3.5 Settings file — `world-of-things-settings.js`

| Field | Type | Meaning |
| --- | --- | --- |
| `schemaVersion` | number | `1` |
| `programName` | string | Top-bar title and program charter title |
| `programManager`, `sponsor`, `objective` | string | Program popover and program charter |
| `startDate`, `endDate` | date | Dashed program markers on the chart |
| `reportingCadence` | `weekly` `biweekly` `monthly` `quarterly` | Shown in the top bar |
| `lastRefreshedOn` | timestamp | Copied from the view state on Save; read-only in the form |
| `staleAfterDays` | number | Default 30 |
| `updatedOn`, `saveNote` | timestamp, string | Version key and note, as for projects |
| `items[]` | array | `projectId`, `displayName`, `file`, `pmOverride`; order = default row order |
| `programMilestones[]` | array | `name`, `date`, `note` → diamonds on the top row |
| `deadlines[]` | array | `name`, `date`, `description` → tinted month columns |
| `programRisks[]` | array | `date`, `description`, `owner`, `status` |
| `colors` | object | Keys as in section 8; empty object = defaults |
| `view` | object | `sortByTime`, `groupByPm`, `hideFinished`, `showPmColumn`, `expandAll`, `pmFilter`, `sortByStatus`, `showLabelColumn`, `monthsPerScreen` |
| `labels` | object | Overrides for `appName`, `todayBtn`, `programRow`, `noSettings`, `noProjects`, `fileNotFound` |

### 3.6 File wrapper

```
wot.register({
  "schemaVersion": 1,
  "projectId": "den-haag-store",
  ...
});
```

The JSON is pretty-printed with two-space indentation so it stays readable in a text editor. Import strips the wrapper by taking the text between the first `(` and the last `)` when the file starts with `wot.`, otherwise parses the whole file as JSON.

## 4. Program view

### 4.1 Layout

- A top bar pinned to the window; its height is measured live (ResizeObserver) and the page offset follows it, so when the buttons wrap to a second line on a narrow window the chart moves down with them
- Below it, on a cream page background with 1 rem × 1.25 rem padding, one chart card: white, 1 px warm-grey border, 8 px radius, **sized to its content and centred horizontally**; it caps at the page width and scrolls horizontally inside when the range is wider than the screen, and vertically when there are more rows than fit
- Inside the card: a quarter/month header pinned to the top, an optional name column pinned to the left, and the timeline
- After each render the chart measures any project name that overflows past the last month and widens itself so the card fits and no phantom scrollbar appears

### 4.2 Top bar

Left: program name (click or focus opens a popover with program manager, sponsor, objective, period, cadence, last refresh) and a muted line `monthly · refreshed 26 Oct 2026 09:00`. Right, in order:

| Control | Type | Behaviour |
| --- | --- | --- |
| Risks | button with `closed / total` pill | Opens the risks list (section 5.3); pill tinted sage when everything is closed; `0 / 0` when nothing reported |
| Zoom − / `24 m` / + | button group | Months per screen width, steps 12, 18, 24, 36, 48; default 24; the left-most visible month stays in place when zooming |
| Today | button | Scrolls so the current quarter is at the left edge |
| Sort by time | toggle | Rows by `startDate`; same start → earlier `endDate` first |
| Group by PM | toggle | Rows of one PM adjacent, each block sorted by start |
| Name column | toggle (sidebar icon) | Shows or hides the pinned name column on the left; the card re-centres |
| Hide finished | toggle | Hides projects whose `endDate` is before today |
| More | dropdown | Filter by PM (select), Sort by status (red first), Show PM in name column, Expand all sub-items, Legend, Reset order and view |
| Refresh | icon | Reloads settings and all project files from disk; stamps `lastRefreshedOn` |
| Edit | pencil | Opens `#edit` in a new tab |
| Settings | cog | Opens `#settings` in a new tab |

Active toggles use the sage tint. With no sort or group active, rows follow `settings.items` order. Toggle states start from `settings.view`, are overridden by the browser's own `wot.view` record, and persist across reloads.

### 4.3 Time axis

- Two header rows: quarters (`Q1 2026`, taupe boundaries) spanning three months, and months as `Jan`, `Feb` … in English
- Column width = (page width − 40 px − name column width) ÷ months per screen, minimum 34 px; gridlines at every month, quarter boundaries darker
- Range: from the quarter containing the earliest project `startDate` or program milestone to the quarter containing the latest `endDate` or milestone; whole quarters; empty quarters drawn; sub-item dates ignored
- No dates at all → current year Q1–Q4
- Initial scroll: Q1 of the current year at the left edge; if the range starts after or ends before the current year, the first quarter of the range
- Today: 2 px charcoal line placed within the current month by day of month
- Program start and end: 2 px dashed markers at the month boundary
- Deadline months: full-height soft-gold column and one info icon in the month header; hover lists every deadline of that month with name, exact date and description

### 4.4 Program milestones row

Fixed first row, sage background, labelled with the `programRow` text, showing `programMilestones[]` as charcoal diamonds with name, date and note as tooltip. Drawn whenever a settings file is present.

### 4.5 Project row (60 px)

- Name column (when shown): project name, or the PM name when Show PM in name column is on; clickable → charter
- Label line above the bar on a translucent white backing so gridlines don't cut through the text, left-aligned with the bar's start, may overflow to the right: RAG dot · `done / total` pill · project name (clickable → charter) · PM name muted · stale clock icon · unknown-schema warning icon
- Bar: teal, flat left end, arrowhead right end, snapped to whole months; sage when the project is finished; click → expand/collapse sub-items
- Milestones: apricot diamonds with charcoal border; filled when done, white when open; tooltip with name and date
- Missing file: greyed, hatched row with the display name from settings and `file not found: json-files/<file>`

### 4.6 Sub-item rows (50 px, expanded)

Indented, lighter name cell, same anatomy with the six-state dot, `done / total` tasks pill, title, owner and an apricot bar at the sub-item's own dates, which may extend outside the parent's bar. Expand state is per project; Expand all applies to every project.

### 4.7 Tooltips

RAG dot: status and `statusNote`. Project pill: each sub-item with its status. Sub-item pill: each task with ✓ or ○. Project name: PM and exact dates. Stale icon: last update timestamp. Diamonds: name and date. Deadline icon: the month's deadlines.

## 5. Modals

All modals are Bootstrap modals, closed with the X, Escape or a click outside; the program view behind them is untouched.

### 5.1 Project charter (extra-large, scrolls inside)

Opened by clicking a project name in the name column, the name above the bar, a project risk in the risks list, or Preview charter on the edit page.

1. Header line: RAG dot, status label, `statusNote`, project pill
2. Project manager · period · updated timestamp with `saveNote`
3. Description and links
4. Milestones, sorted by date, ✓ when done
5. Sub-items in file order, one block each: status dot and label, tasks pill, title, period, owner; task checklist (☑ struck through when done); updates newest first in an indented teal-bordered log
6. Risks and impediments table: open first, closed greyed; related sub-item shown by title or "Whole project"

### 5.2 Program charter (same modal)

Opened from a program-level risk in the risks list. Shows program manager, sponsor, period, objective, cadence, number of projects loaded and missing, settings timestamp, program milestones, deadlines and the program risks table.

### 5.3 Risks list (large)

Opened from the Risks button. One line per risk across the program and every loaded project: open/closed tag (gold / sage), description, source (`Program`, or project name and related sub-item), date, owner and an "open charter" link. Sorted open first, then newest first. Every line is clickable: project risks open that project's charter, program risks open the program charter; the risks list closes first.

### 5.4 Legend (centred)

Project RAG dots, the six sub-item status dots with their labels and which one counts as done, the pill, milestone and program-milestone diamonds, deadline tint, today line, program markers and the stale icon, plus the two click instructions.

### 5.5 Confirm (centred)

Generic Cancel / Continue dialog used by delete, import-overwrite, remove sub-item, remove risk and discard-unsaved-changes.

## 6. Edit page (`#edit`)

Opened in a new tab from the pencil icon. The top bar shows `World of Things — Edit project`; the program-view buttons are hidden. A PM maintains one or more projects; each project is stored in this browser as dated versions (section 9).

### 6.1 Header bar (pinned under the top bar)

| Control | Behaviour |
| --- | --- |
| Record dropdown | One entry per saved version, `Project name — 26 Oct 2026 23:00`, grouped by project (optgroup), newest first; placeholder `— nothing saved in this browser —` when empty. Selecting loads that snapshot; with unsaved changes a confirm asks first |
| Delete | Deletes the selected version after `This record (name — date) will be deleted from your local storage. Continue?`; the dropdown returns to its empty state and the form clears |
| Import JSON file | File picker (`.js`, `.json`); rules in 9.4 |
| New project | Blank form with a generated `projectId`, dates = today, status green; confirm if unsaved changes exist |
| ● unsaved changes | Marker shown after the first edit; leaving the tab with unsaved changes triggers the browser's leave prompt |
| Preview charter | Opens the charter modal with the current unsaved form state |
| Save | New version with the current timestamp and save note; dropdown re-selects it |
| Export | Save-as dialog for `<projectId>.js` (section 9.3) |

### 6.2 Project details card

Project ID (editable; kept file-name safe as you type: lowercase, anything but letters, digits, `-`, `_` becomes `-`; help text explains it is the file name and version key and that changing it starts a new set of versions) · title · project manager · start and end date pickers · RAG status as three colored radio pills · status note · description (4-line textarea) · save note for this version · links (label, URL, add/remove).

### 6.3 Milestones card

Rows of date, name, done checkbox, remove; Add milestone. Sorted by date when displayed in the charter.

### 6.4 Sub-items card

One collapsible card per sub-item. Header (click to collapse): status dot, live `done / total` tasks pill, title, move up, move down, remove (confirm), chevron. Body: title · owner · start · end · status as six colored radio pills · Tasks (done checkbox, name, remove; Enter in a task name adds and focuses the next line; Add task) · Updates newest on top (Add update inserts today's date at the top and focuses the text; each has date, 2-line textarea, remove). Add sub-item below the last card. Collapsed state is remembered while the record stays loaded.

### 6.5 Risks and impediments card

Table of date, description, related to (Whole project or one of this project's sub-items), owner, status open/closed, remove (confirm); closed rows greyed; Add risk.

### 6.6 Behaviour and validation

- Inputs bind to the record by field path on every keystroke; structural changes (add, remove, reorder) re-render the form
- Live values: the sub-item header pill, dot and title update as you type
- End before start is not blocked
- Export is blocked, with the missing fields named, when project ID, title, project manager, dates or status are empty
- Import rejects a file that is not World of Things JSON, lacks `projectId`, or has a `schemaVersion` above 1
- If local storage is unavailable (blocked private mode) a banner says so; Import and Export still work

## 7. Settings page (`#settings`)

Opened in a new tab from the cog icon; top bar shows `World of Things — Settings`. Same header mechanics as the edit page: record dropdown (`Program name — date`, newest first), Delete, Import settings file, New settings, unsaved marker, Preview program view (stores the unsaved settings in session storage and opens `#preview` in a new tab), Save, Export (`world-of-things-settings.js`).

| Section | Fields and controls |
| --- | --- |
| 1. Program details | Program name · program manager · sponsor · objective (2-line) · start and end date · reporting cadence (weekly, biweekly, monthly, quarterly) · last refreshed (read-only, formatted) · stale after (days) · save note for this version |
| 2. Project files | Table: project ID, display name, file name under `json-files/`, PM override; move up/down (order = default row order), remove; Add project file; **Check files** loads each listed file from disk and marks the row ✓ found or ✗ missing |
| 3. Program milestones | Rows of date, name, note; add/remove |
| 4. Deadlines | Rows of date, name, description; add/remove |
| 5. Program risks | Table of date, description, owner, status open/closed; add/remove |
| 6. Colors | For each of the 17 variables in section 8: swatch, native color picker and hex field, all kept in sync live; Reset to defaults |
| 7. View defaults | Checkboxes: show name column, sort by time, group by PM, hide finished, show PM in name column, expand all, sort by status; PM filter text; months per screen width (12–48) |
| 8. Text and labels | Placeholder program name, Today button label, program milestones row label, the two empty-state messages, the file-not-found text; empty = default |

After Export the program manager replaces the file next to the page and presses Refresh in the program view.

## 8. Colors and theming

All colors are CSS custom properties in one commented block (`<style id="wot-theme">`) at the top of the page, prefixed `--wot-`. Their computed values at load become the defaults; `settings.colors` overrides any of them, so a user can retheme by editing the block or through the settings page.

### 8.1 Palette v1.1 (warm)

| Variable | v1.0 | v1.1 default | Used for |
| --- | --- | --- | --- |
| `--wot-white` | `#FFFFFF` | `#FFFFFF` | Chart card, modals, label-line backing |
| `--wot-black` | `#000000` | `#2B2F36` charcoal | Text, today line, diamond borders |
| `--wot-mint` | `#D5EAE2` | `#D4E6D0` sage | Program milestone row, finished bars, 100 % pills, active buttons |
| `--wot-blue` | `#B6CDD8` | `#7FB5B2` teal | Project bars, charter update log border |
| `--wot-grey` | `#D9D9D9` | `#E6E0D6` warm grey | Gridlines, borders, missing-file rows |
| `--wot-offwhite` | `#F3F3F3` | `#F8F4ED` cream | Page background, top bar, header bands, name column |
| `--wot-sand` | `#EADBC8` | `#F8E6B8` soft gold | Deadline month tint, open-risk tag |
| `--wot-rose` | `#E0C6B9` | `#F2B592` apricot | Sub-item bars, milestone diamonds |

Quarter boundaries use a fixed taupe `#B8AFA2`; sub-item name cells use `#fcfaf6`.

### 8.2 Project RAG

`--wot-rag-red` `#DC3545`, `--wot-rag-amber` `#FFC107`, `--wot-rag-green` `#198754` (Bootstrap danger, warning, success).

### 8.3 Sub-item status

| Variable | Status | Default |
| --- | --- | --- |
| `--wot-st-validated` | Completed and validated | `#0DCAF0` info |
| `--wot-st-pending` | Completed pending validation | `#0D6EFD` primary |
| `--wot-st-exceeded` | Due date (to be) exceeded | `#DC3545` danger |
| `--wot-st-at-risk` | Due date at risk | `#FFC107` warning |
| `--wot-st-on-track` | Due date on track | `#198754` success |
| `--wot-st-not-started` | Not started | `#F8F9FA` light, border `#DEE2E6` |

### 8.4 Derived

`--wot-deadline-tint` = sand, `--wot-today` = black, `--wot-pill-done` = mint. Status dots carry their label in tooltips and in the legend, so meaning never depends on color alone.

## 9. Local storage, versions, import and export

Local storage is the working copy for whoever edits; the exported file is the shared truth. The program view never writes project data to local storage; it only keeps the view state.

### 9.1 Storage keys

| Key | Holds |
| --- | --- |
| `wot.project.<projectId>.<updatedOn>` | One full project snapshot per Save or Import |
| `wot.settings.<updatedOn>` | One full settings snapshot per Save or Import |
| `wot.view` | Current toggle states, zoom, name-column state, `lastRefreshedOn` |
| session `wot.previewSettings` | Unsaved settings handed to a `#preview` tab |

A snapshot is a few KB against a browser limit of about 5 MB, so hundreds of versions fit; per-record Delete keeps it tidy.

### 9.2 Save

Stamps `updatedOn` with the current local time, writes a new record under the new key and re-selects it in the dropdown. Earlier records stay.

### 9.3 Export (Save-as dialog)

Writes the record in the form, with its `updatedOn` and `saveNote`, as `<projectId>.js` or `world-of-things-settings.js`. In Edge and Chrome the browser's Save-as window opens with the name pre-filled (File System Access API), so the PM can choose a synced SharePoint or OneDrive folder and the program manager can save next to the page; cancelling does nothing. In browsers without that API the file goes to Downloads as before. Export never changes local storage.

### 9.4 Import

1. Parse the file (wrapper or bare JSON); reject with a message if it is not valid, lacks `projectId` (projects) or has `schemaVersion` above 1
2. If `updatedOn` is missing, stamp it now
3. Same `projectId` **and** same `updatedOn` already stored → confirm `This file matches a version already in your local storage and will overwrite it. Continue?`, then replace that record
4. Otherwise store as an additional record; nothing is removed, even if the file is older
5. Load the imported record into the form and select it

Handover: the stand-in PM imports, works, saves and exports; the returning PM imports the latest file, which lands as a new version beside their older ones.

### 9.5 Refresh in the program view

Reloads settings and all project files from disk (cache-busted), stamps `lastRefreshedOn` in `wot.view` and shows it in the top bar; the settings page shows it read-only and writes it into the next saved settings version.

## 10. Empty states, errors and messages

| Situation | Behaviour |
| --- | --- |
| No settings file | Placeholder name `World of Things`, default colors, full-width card with the current year Q1–Q4 and no rows, message `No settings file found. Open settings to name your program and add project files, or place world-of-things-settings.js next to this page.`; all buttons work |
| Settings loaded, no project files | Program name, milestones row, deadlines and markers render; axis = current year; message `No project files loaded. Add files to the json-files folder and list them in settings.` |
| A listed file missing or failing to load (3 s) | Greyed hatched row with the display name and `file not found: json-files/<file>`; other rows render normally |
| A file with `schemaVersion` above 1 | Row rendered with a warning icon; tooltip names the version |
| Edit or settings page, empty local storage | Empty dropdown, prompt to choose, import or start new |
| Local storage blocked | Banner on the form pages; Import and Export still work |
| Import of an unreadable file | Red message under the header: `Could not read this file: not a World of Things JSON file.` |
| Export with required fields empty | Red message naming the fields |

All user-facing texts live in one `LABELS` object next to the theme block; six of them can be overridden from `settings.labels`.

## 11. Technical notes and known limitations

- **Rendering.** The chart is rebuilt as one HTML string on every state change (toggle, zoom, expand, resize) and inserted at once; tooltips are re-initialised after each render. Horizontal scroll position is preserved across re-renders
- **Column width** is computed from the page width, not the card, so a short program at 24 months per screen gets the same column size as a long one and simply occupies less of the page
- **Sticky layers.** Name column z-index 5, header 6, header name cell 7; bars, labels and diamonds stay at 2–3 so they pass underneath when scrolling
- **Pop-ups.** Edit and settings open with `window.open` on the same file; a browser may ask once to allow pop-ups for `file://`
- **Save-as dialog** needs Edge or Chrome; Firefox and Safari fall back to a download
- **Preview program view** from settings reads project files from disk, so it reflects unsaved settings but not unsaved project edits
- **Sub-item status picker** is a row of six labelled pills; on narrow screens it wraps to two lines
- **Dates** are compared as strings and snapped by calendar month; no time-zone handling is needed because no times are stored except version stamps
- **Tested** with headless Chromium from `file://` at 1500 × 820 and 1100 × 700: program view, expand, charter, risks, grouping, name-column toggle, zoom 12–48, edit import/save/export, settings import and Check files, empty page; no console errors except the expected missing-file notice on the empty page

## 12. Change log v1.0 → v1.1

| Area | Change |
| --- | --- |
| Layout | Chart card with padding and border; sized to its content and centred; cream page background; no phantom horizontal scrollbar; page offset follows the top-bar height when buttons wrap |
| Layers | Diamonds, bars and labels pass underneath the frozen name column |
| Top bar | Name-column toggle; months-per-screen zoom (12–48, default 24, i.e. columns half as wide as v1.0); risks button carries a `closed / total` pill |
| Risks | Risks list modal replaces the popover; every risk clickable: project risks open the project charter, program risks open the new program charter |
| Program charter | New modal with program details, milestones, deadlines and program risks |
| Name column | Project names clickable → charter |
| Palette | Warm v1.1 palette (cream, teal, apricot, sage, soft gold, charcoal); taupe quarter boundaries; sage active buttons |
| Edit page | Project ID always editable, sanitised to file-name-safe characters; Export requires an ID |
| Export | Save-as dialog in Edge/Chrome instead of a silent download |
| Settings | View defaults gained show name column and months per screen |
| Data | `view.showLabelColumn` and `view.monthsPerScreen` added; no change to project files |
| Sample data | FreshMarkt — Netherlands rollout: 8 projects, 5 PMs, Jan 2026–Sep 2027, 4 deadlines, 4 program milestones, 10 risks |
