# Repository Guidelines

## Project Structure & Module Organization
- `scys_boost_navigator.js`: Single Violentmonkey/Tampermonkey userscript that enhances the scys.com navbar by injecting a Favorites dropdown. The metadata block (`// ==UserScript==`) defines `@match`, `@exclude`, version, and update URLs.
- `CLAUDE.md`: Agent notes; not required for runtime.
- `.claude/`, `.kiro/`: Tooling/config folders; safe to ignore for development and runtime.
- No build system or external dependencies; everything runs in the browser via the userscript manager.

## Develop, Run, and Test
- Edit only `scys_boost_navigator.js`.
- Local test flow:
  1) Install Violentmonkey/Tampermonkey in your browser.
  2) Create a new script and paste the file contents.
  3) Visit `https://scys.com/` (non-excluded pages) and verify the dropdown renders after “航海实战”.
- Release: bump `@version`, commit, and push. The `@updateURL`/`@downloadURL` already point to `main` raw content.

## Coding Style & Naming Conventions
- Indentation: 4 spaces; keep lines concise and readable.
- Quotes & semicolons: single quotes, end statements with semicolons.
- Naming: lowerCamelCase for variables/functions (e.g., `injectCSS`, `insertDropdown`); UPPER_SNAKE_CASE for future constants if added.
- Structure: keep small, focused helpers (e.g., CSS injection, DOM creation). Prefer vanilla DOM APIs; retain `@grant none`.
- CSS: store in a template string (e.g., `dropdownCSS`) and inject via a single `<style>` tag.

## Testing Guidelines
- Manual checks:
  - Dropdown appears after the “航海实战” link within `.nav-tab-box`.
  - Hover shows menu; links open in a new tab; no layout shifts.
  - Excluded paths (`/view/docx/*`, `/course/*`) do not render the dropdown.
- Data changes: when editing `buttonConfigs`, validate link order and targets.
- Diagnostics: use browser DevTools Console for errors; verify `MutationObserver` attaches only once.

## Commit & Pull Request Guidelines
- Commits: imperative and scoped, e.g. `feat: add Super Tag link`, `fix: guard nav insertion when tab box absent`.
- PRs include:
  - Clear description and rationale.
  - Before/after screenshot or short GIF.
  - Repro steps (URL, browser, userscript manager).
  - Version bump if user-facing behavior changes.
  - Note changes to metadata (`@match`, `@exclude`, URLs).

## Security & Configuration Tips
- Do not add trackers or external network calls.
- Guard DOM queries (`querySelector`) and avoid brittle selectors; keep mutations minimal.
- Prefer observers over timers; disconnect observers when not needed.
