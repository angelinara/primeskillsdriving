---
name: site-improvement
description: >
  Scans the primeskillsdriving static site (public/*.html, public/css/my.css,
  public/js/*.js), identifies one concrete improvement — from accessibility,
  CSS quality, SEO, performance, or UX — implements it directly in the files,
  then shows a git diff for the user to review. Use this skill when the user
  says anything like "find an improvement", "improve the site", "what can be
  fixed", "suggest a change", "spot an issue", "make the site better", or
  similar. Also trigger it proactively if you notice a clear bug while working
  on the repo. Always implement the change — don't just describe it.
---

# Site Improvement Skill

## Goal

Find **one** clear, high-impact improvement in this static driving school site,
implement it by editing the actual source files, then present it for review.
One focused change beats a list of suggestions — the user can always ask for
more.

## Step 1 — Audit the codebase

Read these files systematically. You're looking for issues, not perfection.

**CSS** (`public/css/my.css`):
- Duplicate rules or rule blocks (e.g. a second `body {}` block that overrides
  the first)
- Identical selectors with identical declarations (dead redundancy)
- Unused utility classes that appear nowhere in any HTML file

**HTML** (`public/*.html`):
- `<img>` tags missing `alt` attributes, or with unhelpful alt text like
  `"image"` or `"photo"`
- Images that should have `loading="lazy"` (below-the-fold images)
- Broken heading hierarchy (`<h3>` used as page title, skipped levels)
- External links missing `rel="noopener noreferrer"` when `target="_blank"`
- `<button>` elements inside `<a>` elements (invalid HTML)
- Pages missing a `<link rel="canonical">` tag

**JS** (`public/js/*.js`):
- Functions defined but never called
- `console.log` calls left in production code

**Accessibility**:
- Form `<label>` elements not associated with their inputs via `for`/`id`
- Interactive elements without keyboard access
- Low-contrast text (can flag only if you can reason about color values)

## Step 2 — Pick one improvement

Choose by impact:
1. **Bug that changes visible output** — highest priority (e.g. a CSS override
   that silently changes the page font or background)
2. **Accessibility issue** — affects real users
3. **Performance** — image lazy-loading, unnecessary reflows
4. **Code quality / correctness** — redundant CSS, invalid HTML nesting
5. **SEO** — missing canonical, weak meta descriptions

If multiple issues exist, pick the highest-priority one and note the others
briefly at the end.

## Step 3 — Implement it

Edit the file(s) directly. Make the minimal change needed to fix the issue.
Don't tidy surrounding code unless it's part of the fix.

## Step 4 — Show the diff and explain

Run:
```bash
git diff
```

Then write a short summary (3–5 sentences) covering:
- **What** was changed (file and line range)
- **Why** it matters (the concrete impact if left unfixed)
- **What to check** — one thing the user should verify looks right in the
  browser or by reading the diff

If you spotted other issues during the audit, list them in a brief "Also
noticed" section at the end (bullet points, one line each). Don't implement
them — let the user decide.

## Tone

Be direct and specific. Name the exact selector, line, or attribute involved.
Don't say "there are several potential improvements" — say what you found and
what you did about it.
