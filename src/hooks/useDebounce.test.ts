// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("start", 400));
    expect(result.current).toBe("start");
  });

  it("only updates after the delay has passed", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      { initialProps: { value: "a" } },
    );

    rerender({ value: "ab" });
    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(399));
    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe("ab");
  });

  it("drops intermediate values while typing", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      { initialProps: { value: "m" } },
    );

    for (const value of ["ma", "mat", "matr", "matrix"]) {
      rerender({ value });
      act(() => vi.advanceTimersByTime(100));
    }
    expect(result.current).toBe("m");

    act(() => vi.advanceTimersByTime(400));
    expect(result.current).toBe("matrix");
  });
});
