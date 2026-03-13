"use client";

const ILLUSTRATION_STYLE = {
  width: 257.39,
  height: 338.59,
};

export function IllustrationPlaceholder({ type }: { type: string }) {
  const labels: Record<string, string> = {
    clarity: "Think",
    doing: "Do",
    mentored: "Support",
    achieve: "Achieve",
  };
  return (
    <div
      className="w-full h-full flex items-center justify-center bg-white/10 rounded-b"
      style={{ ...ILLUSTRATION_STYLE }}
    >
      <span className="text-white/80 text-4xl font-bold">
        {labels[type] ?? type}
      </span>
    </div>
  );
}
