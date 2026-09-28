import { useSyncExternalStore } from "react";
import { z } from "zod";

export const SAVED_KEY = "gsf:saved-scholarships";
const CHANGE_EVENT = "gsf:saved-change";
const EMPTY: string[] = [];
const idsSchema = z.array(z.string());

let cachedRaw: string | null = null;
let cachedIds: string[] = EMPTY;

/** Reads saved IDs; unavailable or corrupt storage yields an empty list. */
export function readSaved(): string[] {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(SAVED_KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cachedRaw) return cachedIds;
  cachedRaw = raw;
  try {
    const parsed = idsSchema.safeParse(JSON.parse(raw ?? "[]"));
    cachedIds = parsed.success ? [...new Set(parsed.data)] : EMPTY;
  } catch {
    cachedIds = EMPTY;
  }
  return cachedIds;
}

export function writeSaved(ids: string[]): void {
  try {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(ids));
  } catch {
    // Storage full or blocked: saving is best-effort.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function toggleSaved(id: string): string[] {
  const ids = readSaved();
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
  writeSaved(next);
  return next;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function useSavedIds(): string[] {
  return useSyncExternalStore(subscribe, readSaved, () => EMPTY);
}
