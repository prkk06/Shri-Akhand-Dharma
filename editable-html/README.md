# Editable HTML — Shri Akhand Dharma Foundation

This folder contains a standalone, editable version of the Foundation's one-page website in plain HTML + CSS. It is intended for non-developers who want to edit the site's text and content directly through GitHub's web editor (or any HTML editor).

## Files

- `index.html` — the full webpage. All CSS is embedded at the top inside a `<style>` block, so there are no external files to manage.
- `assets/sadt-logo.jpeg` — the Foundation logo used in the header and footer.
- `assets/hero-sacred-skyline.jpg` — the hero background image.

## How to edit on GitHub

1. Open `editable-html/index.html` in this repository on GitHub.
2. Click the pencil (Edit) icon at the top right of the file view.
3. Find the text you want to change (e.g. use `Ctrl/Cmd + F`) and edit it.
4. Scroll down, add a short commit message like "Update About text", and click **Commit changes**.

### Editing tips

- Only change the text **between** HTML tags. For example, in `<h2>About Us</h2>`, edit `About Us`, not the `<h2>` tags.
- To change a link, edit the value inside `href="..."`. Example: `<a href="mailto:info@shriakhanddharmatrust.org">`.
- To change an image, replace the file in the `assets/` folder with a file that has the exact same name, or update the `src="assets/..."` path.
- Avoid removing or renaming CSS classes (things like `class="section"`) — they control the layout.

## Preview

You can preview edits locally by simply double-clicking `index.html` — it opens in any browser. No build step or server is required.

## Note

This HTML file is a static mirror of the live site for easy editing. Changes made here do not automatically update the live app — a developer will need to sync approved text changes back into the main app source (`src/routes/index.tsx`).
