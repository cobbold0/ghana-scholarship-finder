"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert" className="space-y-3 py-12 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-slate-700">Please try again.</p>
      <button type="button" onClick={reset} className="min-h-11 rounded-md bg-emerald-700 px-5 font-semibold text-white hover:bg-emerald-800">
        Try again
      </button>
    </div>
  );
}
