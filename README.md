# CineScope 🎬

Movie search on the TMDB API: browse what's popular, search the catalogue, open any film's page.

Live: [cinescope-omega-five.vercel.app](https://cinescope-omega-five.vercel.app)

![Screenshot](./screenshot.png)

## Features

- Popular movies feed with pagination
- Search is debounced (400 ms) and cancels the previous request through AbortController, so a slow old response can't overwrite a newer one
- Query and page live in the URL (`?q=...&page=...`), results are shareable and the back button behaves
- Two routes with React Router: `/` for the catalogue, `/movie/:id` for details
- Skeletons while loading, an error screen with retry, an empty state when nothing matches
- `vercel.json` rewrites, so refreshing `/movie/123` doesn't 404

## Stack

React, TypeScript, Vite, React Router, Tailwind CSS v4

## Run locally

```bash
npm install
cp .env.example .env   # then paste your TMDB key into .env
npm run dev
```

A free key is at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api). Both the v3 API Key and the v4 Read Access Token work.

About the key: anything with a `VITE_` prefix gets inlined into the client bundle, so on the live site the key is visible in DevTools. For a free TMDB key I decided that's fine for a demo. The proper fix is a server-side proxy, which is what I did later in [MarketDesk](https://github.com/KaMoWEN/MarketDesk).

## What I learned

Debounce alone doesn't make search correct. Responses can come back out of order, so each new request aborts the previous one in the `useEffect` cleanup. Moving query and page into the URL also turned out simpler than keeping them in component state, and shareable links came for free.
