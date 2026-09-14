## Why the site wasn't working

Two separate build configuration problems were preventing the site from displaying correctly.

**Blank page on load:** The production build was configured with a base path of `/AdaptEdge-Academy/`, intended for hosting on GitHub Pages under a repository subpath. That setting made every build emit an `index.html` that requested its JavaScript and CSS from `/AdaptEdge-Academy/assets/...`. On Netlify, the site is served from the domain root, so those asset paths didn't exist — the browser got 404s for the app's script and stylesheet, and the page never rendered anything beyond an empty container.

**Unstyled content:** After that first issue was fixed, the page loaded but appeared as plain, unstyled content rather than the designed website — no layout, colors, or spacing from the design. The project uses Tailwind CSS (via `@import "tailwindcss";` in the stylesheet), which requires its Vite plugin to process that import into real CSS. The plugin was installed as a dependency but was never registered in the Vite configuration, so the Tailwind import was passed through unprocessed and none of the site's styling ever took effect.

## Fix

Updated the Vite configuration to build with a root base path (`/`), matching how Netlify serves the site, and registered the Tailwind CSS Vite plugin so the stylesheet is compiled correctly. Also corrected the README's GitHub Pages instructions, which had referenced the old repo-subpath base setting.

Verified locally that the app now serves its assets at the correct paths and that the stylesheet compiles into full Tailwind CSS output (rather than a raw, unprocessed import) before finishing.
