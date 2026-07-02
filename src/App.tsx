import { Link, Route, Routes } from "react-router-dom";
import { FilmSlate } from "@phosphor-icons/react";
import { HomePage } from "./pages/HomePage";
import { MoviePage } from "./pages/MoviePage";
import { NotFoundState } from "./components/StateViews";

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-night font-sans text-zinc-300 antialiased">
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-100"
          >
            <FilmSlate size={20} className="text-accent" weight="fill" />
            CineScope
          </Link>
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            Data by TMDB
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="*" element={<NotFoundState />} />
        </Routes>
      </main>
    </div>
  );
}
