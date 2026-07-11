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
npm run start
```

## SEO

Site-wide SEO lives in [src/seo.config.json](src/seo.config.json). Edit that file to update:

- site name
- production site URL
- default title and description
- Open Graph image
- per-page titles, descriptions, and canonical paths

The app also generates `/robots.txt` and `/sitemap.xml` from the same SEO helpers. Service detail URLs are pulled from Firebase and added to the sitemap when Firebase is reachable during build/runtime.

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
