import { Link } from "react-router-dom";
import { StarIcon, ImageIcon } from "@phosphor-icons/react";
import { posterUrl } from "../api/tmdb";
import type { Movie } from "../types/movie";

export function MovieCard({ movie }: { movie: Movie }) {
  const poster = posterUrl(movie.poster_path);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "TBA";

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-line bg-night-raise">
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-600">
            <ImageIcon size={40} />
          </div>
        )}
        {movie.vote_average > 0 && (
          <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-night/85 px-2 py-1 text-xs font-medium text-zinc-100 backdrop-blur">
            <StarIcon size={12} weight="fill" className="text-accent" />
            {movie.vote_average.toFixed(1)}
          </span>
        )}
      </div>
      <h3 className="mt-3 line-clamp-1 text-sm font-medium text-zinc-100 transition-colors group-hover:text-accent">
        {movie.title}
      </h3>
      <p className="mt-0.5 text-xs text-zinc-500">{year}</p>
    </Link>
  );
}
