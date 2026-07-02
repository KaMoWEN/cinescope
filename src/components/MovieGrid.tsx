import type { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";

export function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((m) => (
        <li key={m.id}>
          <MovieCard movie={m} />
        </li>
      ))}
    </ul>
  );
}

export function SkeletonGrid() {
  return (
    <div
      className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      aria-label="Loading movies"
      role="status"
    >
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[2/3] rounded-xl bg-night-raise" />
          <div className="mt-3 h-4 w-3/4 rounded bg-night-raise" />
          <div className="mt-2 h-3 w-1/4 rounded bg-night-raise" />
        </div>
      ))}
    </div>
  );
}
