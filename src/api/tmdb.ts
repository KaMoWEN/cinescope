import type { MovieDetails, MovieListResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const KEY = import.meta.env.VITE_TMDB_KEY as string | undefined;

// NOTE: any VITE_-prefixed variable is inlined into the client bundle at
// build time. For a free TMDB key this is an accepted trade-off for a demo;
// a production app would proxy requests through a serverless function.
export const hasApiKey = Boolean(KEY);

/** The long v4 "Read Access Token" is a JWT and goes in the header;
 *  the short v3 key goes in the query string. Support both. */
const isBearerToken = KEY !== undefined && KEY.includes(".");

async function fetchJson<T>(
  path: string,
  params: Record<string, string> = {},
  signal?: AbortSignal,
): Promise<T> {
  const url = new URL(BASE_URL + path);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  if (KEY && !isBearerToken) url.searchParams.set("api_key", KEY);

  const res = await fetch(url, {
    signal,
    headers: isBearerToken ? { Authorization: `Bearer ${KEY}` } : undefined,
  });
  if (!res.ok) {
    throw new Error(`TMDB request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function getPopular(
  page = 1,
  signal?: AbortSignal,
): Promise<MovieListResponse> {
  return fetchJson("/movie/popular", { page: String(page) }, signal);
}

export function searchMovies(
  query: string,
  page = 1,
  signal?: AbortSignal,
): Promise<MovieListResponse> {
  return fetchJson(
    "/search/movie",
    { query, page: String(page), include_adult: "false" },
    signal,
  );
}

export function getMovie(
  id: string,
  signal?: AbortSignal,
): Promise<MovieDetails> {
  return fetchJson(`/movie/${id}`, {}, signal);
}

export function posterUrl(path: string | null, width = 500): string | null {
  return path ? `https://image.tmdb.org/t/p/w${width}${path}` : null;
}

export function backdropUrl(path: string | null): string | null {
  return path ? `https://image.tmdb.org/t/p/w1280${path}` : null;
}
