import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SaveButton } from "@/components/scholarships/save-button";
import { SAVED_KEY, readSaved, toggleSaved, writeSaved } from "@/lib/storage/saved";

beforeEach(() => localStorage.clear());
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("saved storage", () => {
  it("persists and toggles ids", () => {
    expect(readSaved()).toEqual([]);
    toggleSaved("a");
    toggleSaved("b");
    expect(JSON.parse(localStorage.getItem(SAVED_KEY)!)).toEqual(["a", "b"]);
    toggleSaved("a");
    expect(readSaved()).toEqual(["b"]);
  });

  it("recovers from corrupt data", () => {
    localStorage.setItem(SAVED_KEY, "{not json");
    expect(readSaved()).toEqual([]);
    localStorage.setItem(SAVED_KEY, JSON.stringify({ a: 1 }));
    expect(readSaved()).toEqual([]);
    localStorage.setItem(SAVED_KEY, JSON.stringify([1, 2]));
    expect(readSaved()).toEqual([]);
  });

  it("survives unavailable storage", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(readSaved()).toEqual([]);
    expect(() => writeSaved(["x"])).not.toThrow();
  });
});

describe("SaveButton", () => {
  it("toggles saved state accessibly", () => {
    render(<SaveButton id="chevening" title="Chevening" />);
    const button = screen.getByRole("button", { name: "Save Chevening" });
    expect(button.getAttribute("aria-pressed")).toBe("false");
    act(() => fireEvent.click(button));
    expect(screen.getByRole("button", { name: "Remove Chevening from saved" }).getAttribute("aria-pressed")).toBe("true");
    expect(readSaved()).toEqual(["chevening"]);
  });
});
