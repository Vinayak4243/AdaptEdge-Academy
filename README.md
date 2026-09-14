# AdaptEdge Academy

Responsive React website for AdaptEdge Academy.

## Run locally

1. Install Node.js 20 or later.
2. In this folder, run `npm install`.
3. Run `npm run dev` and open the local address shown in the terminal.

## Create a production build

Run `npm run build`. Deploy the resulting `dist/` directory to any static hosting provider, such as Netlify, Vercel, or GitHub Pages.

## GitHub Pages deployment

This project can also be published to GitHub Pages. The Vite config uses a root base path (`/`), which is correct for Netlify or a custom domain; if publishing to `<username>.github.io/<repo>/`, set `base` in `vite.config.js` to `/<repo>/` before building.

1. Push the repository to GitHub.
2. In GitHub, open the repository settings and enable GitHub Pages.
3. Choose the `gh-pages` branch as the source.
4. Run:

```bash
npm run deploy
```

This builds the site and publishes the generated `dist/` folder to the `gh-pages` branch for GitHub Pages.

> GitHub Pages does not support Netlify Functions. If you host on GitHub Pages, the admission form must use an external service such as FormSubmit, EmailJS, a Google Form, or a backend service. The app's CMS and Supabase features still work correctly on GitHub Pages.

## Production form setup

This site uses a Netlify Function at `/.netlify/functions/submit-admission`.

Before deploying live, add these environment variables in Netlify:

- `VITE_FORM_ENDPOINT=/.netlify/functions/submit-admission`
- `VITE_ADMIN_PASSWORD=your-secure-admin-password`
- `VITE_SUPABASE_URL=https://your-project-ref.supabase.co`
- `VITE_SUPABASE_ANON_KEY=your-anon-key`
- `RESEND_API_KEY=...`
- `MAIL_TO=adaptedgeacademy@gmail.com`
- `MAIL_FROM=AdaptEdge Academy <onboarding@resend.dev>`

The Netlify function sends the enquiry to Resend, which forwards it to the configured email address. If the email provider is not configured, the function returns a clear configuration error instead of pretending the form succeeded.

## Supabase studio database setup

Create a table in Supabase so the studio can save the website content online:

```sql
create table if not exists public.site_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz default now()
);
```

Then insert an initial row if needed:

```sql
insert into public.site_content (id, content)
values ('main', '{}')
on conflict (id) do nothing;
```

Create a public storage bucket called `site-media` for images and videos. In Supabase Storage, create a bucket named `site-media` and set it to public so uploaded media can be displayed in the site.

The app will save the full content JSON under the `main` record. If Supabase credentials are missing, the site falls back to local browser storage. The admin studio is protected by a password from `VITE_ADMIN_PASSWORD`, which should be changed before production use.
