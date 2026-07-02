import type { ReactNode } from "react";
import {
  CloudSlash,
  FilmSlate,
  MagnifyingGlass,
  Key,
} from "@phosphor-icons/react";

function StateShell({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-24 text-center">
      <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-night-raise text-zinc-400">
        {icon}
      </span>
      <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed text-zinc-400">
        {children}
      </div>
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <StateShell icon={<CloudSlash size={26} />} title="Something went wrong">
      <p>We couldn&apos;t reach the movie database. Check your connection.</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-night transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Try again
        </button>
      )}
    </StateShell>
  );
}

export function EmptyState({ query }: { query: string }) {
  return (
    <StateShell icon={<MagnifyingGlass size={26} />} title="Nothing found">
      <p>
        No movies match <span className="text-zinc-200">“{query}”</span>. Try a
        different title.
      </p>
    </StateShell>
  );
}

export function NotFoundState() {
  return (
    <StateShell icon={<FilmSlate size={26} />} title="Page not found">
      <p>This reel doesn&apos;t exist. Head back to the catalogue.</p>
    </StateShell>
  );
}

export function NoKeyState() {
  return (
    <StateShell icon={<Key size={26} />} title="API key required">
      <p>
        Create a free key at{" "}
        <a
          href="https://www.themoviedb.org/settings/api"
          target="_blank"
          rel="noreferrer"
          className="text-accent underline underline-offset-4"
        >
          themoviedb.org
        </a>
        , then add it to a <code className="text-zinc-200">.env</code> file as{" "}
        <code className="text-zinc-200">VITE_TMDB_KEY</code> and restart the dev
        server.
      </p>
    </StateShell>
  );
}
