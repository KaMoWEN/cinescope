import { describe, expect, it } from "vitest";
import { backdropUrl, posterUrl } from "./tmdb";

describe("image url helpers", () => {
  it("builds a poster url with the default width", () => {
    expect(posterUrl("/abc.jpg")).toBe(
      "https://image.tmdb.org/t/p/w500/abc.jpg",
    );
  });

  it("respects a custom width", () => {
    expect(posterUrl("/abc.jpg", 200)).toBe(
      "https://image.tmdb.org/t/p/w200/abc.jpg",
    );
  });

  it("returns null when the path is missing", () => {
    expect(posterUrl(null)).toBeNull();
    expect(backdropUrl(null)).toBeNull();
  });

  it("builds a w1280 backdrop url", () => {
    expect(backdropUrl("/bg.jpg")).toBe(
      "https://image.tmdb.org/t/p/w1280/bg.jpg",
    );
  });
});
