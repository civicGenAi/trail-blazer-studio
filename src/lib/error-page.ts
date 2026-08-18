/**
 * Standalone HTML for a catastrophic SSR failure, when React never got far
 * enough to render the app shell. No stylesheet, no fonts, no scripts: it has to
 * work when everything else did not. Colors are the site's, inlined.
 */
export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page did not load | Arusha Wildlife Safaris</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <style>
      body { font: 16px/1.6 ui-sans-serif, system-ui, -apple-system, sans-serif; background: #14231C; color: #EFE7D8; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 32rem; width: 100%; }
      .eyebrow { font-family: ui-monospace, monospace; font-size: 0.6875rem; letter-spacing: 0.22em; text-transform: uppercase; color: #C8963C; margin: 0; }
      .rule { height: 2px; width: 6rem; margin: 1rem 0 1.5rem; background: repeating-linear-gradient(to right, #C8963C 0 6px, transparent 6px 14px); }
      h1 { font-family: ui-serif, Georgia, serif; font-size: 2rem; font-weight: 500; line-height: 1.1; margin: 0 0 0.75rem; }
      p { color: rgba(239, 231, 216, 0.7); margin: 0 0 2rem; }
      .actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
      a, button { padding: 0.75rem 1.25rem; font: inherit; font-size: 0.875rem; cursor: pointer; text-decoration: none; background: none; border: 1px solid rgba(239, 231, 216, 0.4); color: #EFE7D8; }
      .primary { border-color: #C8963C; color: #C8963C; }
      a:hover, button:hover { border-color: #EFE7D8; }
      .primary:hover { background: rgba(200, 150, 60, 0.1); border-color: #C8963C; }
    </style>
  </head>
  <body>
    <div class="card">
      <p class="eyebrow">Server error</p>
      <div class="rule"></div>
      <h1>This page did not load</h1>
      <p>Something failed on our side. Reload, or start again from the home page. If you were in the middle of an enquiry, message us on WhatsApp and we will pick it up from there.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Reload</button>
        <a href="/">Go home</a>
        <a href="https://wa.me/255700000000" rel="noreferrer">WhatsApp us</a>
      </div>
    </div>
  </body>
</html>`;
}
