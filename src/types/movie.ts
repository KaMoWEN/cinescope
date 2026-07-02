export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
}

export interface MovieDetails extends Movie {
  backdrop_path: string | null;
  genres: { id: number; name: string }[];
  runtime: number | null;
  tagline: string;
  vote_count: number;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
