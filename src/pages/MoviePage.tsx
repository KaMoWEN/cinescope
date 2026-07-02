import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star, Image as ImageIcon } from "@phosphor-icons/react";
import { backdropUrl, posterUrl } from "../api/tmdb";
import { useMovie } from "../hooks/useMovie";
import { ErrorState } from "../components/StateViews";

function DetailsSkeleton() {
  return (
    <div className="animate-pulse" role="status" aria-label="Loading movie">
      <div className="h-56 rounded-2xl bg-night-raise sm:h-72" />
      <div className="mt-8 flex gap-8">
        <div className="hidden aspect-[2/3] w-44 shrink-0 rounded-xl bg-night-raise sm:block" />
        <div className="flex-1 space-y-4">
          <div className="h-8 w-2/3 rounded bg-night-raise" />
          <div className="h-4 w-1/3 rounded bg-night-raise" />
          <div className="h-24 rounded bg-night-raise" />
        </div>
      </div>
    </div>
  );
}

export function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const { status, movie } = useMovie(id);

  return (
    <>
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-accent"
      >
        <ArrowLeft size={15} /> Back to catalogue
      </Link>

      {status === "loading" && <DetailsSkeleton />}
      {status === "error" && <ErrorState />}

      {status === "success" && movie && (
        <article>
          {backdropUrl(movie.backdrop_path) && (
            <div className="relative overflow-hidden rounded-2xl border border-line">
              <img
                src={backdropUrl(movie.backdrop_path)!}
                alt=""
                className="h-56 w-full object-cover sm:h-72"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
            </div>
          )}

          <div className="mt-8 flex flex-col gap-8 sm:flex-row">
            <div className="hidden w-44 shrink-0 sm:block">
              {posterUrl(movie.poster_path) ? (
                <img
                  src={posterUrl(movie.poster_path)!}
                  alt={`${movie.title} poster`}
                  className="rounded-xl border border-line"
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center rounded-xl border border-line bg-night-raise text-zinc-600">
                  <ImageIcon size={40} />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="mt-2 text-zinc-400 italic">{movie.tagline}</p>
              )}

              <dl className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-400">
                {movie.vote_average > 0 && (
                  <div className="inline-flex items-center gap-1.5">
                    <Star size={14} weight="fill" className="text-accent" />
                    <span className="text-zinc-100">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span>({movie.vote_count.toLocaleString()} votes)</span>
                  </div>
                )}
                {movie.release_date && (
                  <span>{movie.release_date.slice(0, 4)}</span>
                )}
                {movie.runtime ? <span>{movie.runtime} min</span> : null}
              </dl>

              {movie.genres.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {movie.genres.map((g) => (
                    <li
                      key={g.id}
                      className="rounded-full border border-line bg-night-raise px-3 py-1 text-xs text-zinc-300"
                    >
                      {g.name}
                    </li>
                  ))}
                </ul>
              )}

              {movie.overview && (
                <p className="mt-6 max-w-2xl leading-relaxed text-zinc-300">
                  {movie.overview}
                </p>
              )}
            </div>
          </div>
        </article>
      )}
    </>
  );
}
