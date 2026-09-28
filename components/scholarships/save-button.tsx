"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { toggleSaved, useSavedIds } from "@/lib/storage/saved";

export function SaveButton({ id, title }: { id: string; title: string }) {
  const saved = useSavedIds().includes(id);
  return (
    <button
      type="button"
      onClick={() => {
        toggleSaved(id);
        if (!saved && process.env.NEXT_PUBLIC_GA_ID) sendGAEvent("event", "scholarship_saved", { scholarship_id: id });
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from saved` : `Save ${title}`}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
    >
      <span aria-hidden="true">{saved ? "★" : "☆"}</span>
      {saved ? "Saved" : "Save"}
    </button>
  );
}
