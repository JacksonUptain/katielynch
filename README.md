# Katie Lynch | Capturing Literacy

This project is a Next.js App Router site with real routes for the main pages:

- `/`
- `/about`
- `/services`
- `/services/[service]`
- `/blog`
- `/essay`
- `/contact`

`/home` and `/katielynch` redirect to `/` for compatibility with the old app.

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run serve
```

This project is configured for a static Next.js export, so `npm run build`
creates the deployable site in `out/`.

## GitHub Pages

This repo includes a GitHub Actions workflow at
`.github/workflows/nextjs.yml`.

To deploy:

1. Push these changes to GitHub.
2. In the GitHub repo, open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `source`, `main`, or `master`, or manually run the workflow from the Actions tab.

For the current repository, the workflow builds for:

```text
https://capturingliteracy.com/
```

The workflow publishes `out/.nojekyll` and `out/CNAME` so GitHub Pages serves the
static Next.js export at the custom domain. The matching site-wide SEO URL lives
in `src/seo.config.json`.

If you ever switch back to a project page instead, update the workflow
environment variables:

```yaml
NEXT_PUBLIC_SITE_URL: https://jacksonuptain.github.io
NEXT_PUBLIC_BASE_PATH: /katielynch
```

## SEO

Site-wide SEO lives in [src/seo.config.json](src/seo.config.json). Edit that file to update:

- site name
- production site URL
- default title and description
- Open Graph image
- per-page titles, descriptions, and canonical paths

The app also generates `/robots.txt`, `/manifest.webmanifest`, and `/sitemap.xml` from the same SEO helpers. Service detail URLs are pulled from Firebase and added to the sitemap when Firebase is reachable during build/runtime.

## Firebase

The app keeps Firebase browser listeners for live page content and also fetches Firebase Realtime Database content on the server for initial page HTML and metadata.

The current Firebase values are included as fallbacks. In production, you can override them with:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
NEXT_PUBLIC_SITE_URL=
```
