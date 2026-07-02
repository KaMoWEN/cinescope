// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useMovies } from "./useMovies";
import type { MovieListResponse } from "../types/movie";

const list: MovieListResponse = {
  page: 1,
  results: [
    {
      id: 1,
      title: "Test Movie",
      poster_path: null,
      overview: "",
      vote_average: 7,
      release_date: "2024-01-01",
    },
  ],
  total_pages: 3,
  total_results: 30,
};

const okResponse = {
  ok: true,
  json: () => Promise.resolve(list),
} as Response;

afterEach(() => vi.unstubAllGlobals());

describe("useMovies", () => {
  it("starts in loading state and resolves to success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(okResponse));

    const { result } = renderHook(() => useMovies("", 1));
    expect(result.current.status).toBe("loading");

    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.data?.results[0].title).toBe("Test Movie");
  });

  it("requests the popular endpoint without a query and search with one", async () => {
    const fetchMock = vi.fn().mockResolvedValue(okResponse);
    vi.stubGlobal("fetch", fetchMock);

    const { rerender, result } = renderHook(
      ({ q }) => useMovies(q, 1),
      { initialProps: { q: "" } },
    );
    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(String(fetchMock.mock.calls[0][0])).toContain("/movie/popular");

    rerender({ q: "matrix" });
    await waitFor(() =>
      expect(
        fetchMock.mock.calls.some((c) =>
          String(c[0]).includes("/search/movie"),
        ),
      ).toBe(true),
    );
    const searchUrl = String(fetchMock.mock.calls.at(-1)![0]);
    expect(searchUrl).toContain("query=matrix");
  });

  it("sets error state on a failed response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 } as Response),
    );

    const { result } = renderHook(() => useMovies("", 1));
    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.data).toBeNull();
  });

  it("aborts the in-flight request when the query changes", async () => {
    const signals: AbortSignal[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn((_url: unknown, init?: RequestInit) => {
        signals.push(init!.signal!);
        return new Promise<Response>(() => {}); // never resolves
      }),
    );

    const { rerender } = renderHook(({ q }) => useMovies(q, 1), {
      initialProps: { q: "a" },
    });
    rerender({ q: "ab" });

    await waitFor(() => expect(signals.length).toBeGreaterThanOrEqual(2));
    expect(signals[0].aborted).toBe(true);
    expect(signals.at(-1)!.aborted).toBe(false);
  });
});
