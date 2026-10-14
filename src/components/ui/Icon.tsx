import type { SVGProps } from "react";

/** Small inline icon set (24px stroke icons). No icon package needed. */
const PATHS: Record<string, string> = {
  wind: "M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h8",
  cloud: "M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9H7z",
  heart: "M12 20s-7-4.35-9-9.5C1.7 7 4 4 7 4c2 0 3.4 1 5 3 1.6-2 3-3 5-3 3 0 5.3 3 4 6.5-2 5.15-9 9.5-9 9.5z",
  shield: "M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3zM9 12l2 2 4-4",
  users: "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 5.2a3.5 3.5 0 0 1 0 6.6",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7l1-8z",
  leaf: "M5 19c0-9 5-14 15-14 0 10-5 15-14 15M5 19c2-4 5-7 9-9",
  repeat: "M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3",
  apple: "M12 7c-1-2-3-3-5-2-3 1.5-3 6-1 10 1 2 2.5 4 4.5 4 1 0 1.5-.5 2.5-.5s1.5.5 2.5.5c2 0 3.5-2 4.5-4 1.5-3 1-6-.5-7.5-1.5-1.5-4-1.5-5.5.5zM12 7c0-2 1-4 3-4",
  rainbow: "M3 18a9 9 0 0 1 18 0M7 18a5 5 0 0 1 10 0M11 18a1 1 0 0 1 2 0",
  flame: "M12 22c4 0 7-2.8 7-7 0-3-2-5-3.5-7-.5 1.5-1.5 2.5-2.5 3 0-3-1.5-6-4-8 0 4-4 6-4 12 0 4 3 7 7 7z",
  sprout: "M12 22v-9M12 13c0-4-3-6-8-6 0 4 3 6 8 6zM12 15c0-3.5 2.5-6 8-6 0 3.5-2.5 6-8 6z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  pin: "M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  video: "M15 10l5-3v10l-5-3M4 6h9a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
  home: "M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10",
  check: "M5 12.5l4.5 4.5L19 7.5",
  arrow: "M5 12h14M13 6l6 6-6 6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  lock: "M7 11V8a5 5 0 0 1 10 0v3M6 11h12v10H6z",
  calendar: "M4 7h16v13H4zM4 11h16M8 3v4M16 3v4",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  chevron: "M9 6l6 6-6 6",
  filter: "M4 5h16l-6 8v6l-4-2v-4L4 5z",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  dollar: "M12 3v18M16 7.5c0-1.7-1.8-3-4-3s-4 1.3-4 3 1.8 2.5 4 3 4 1.3 4 3-1.8 3-4 3-4-1.3-4-3",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v6M12 7.5v.01",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5zM19 19v2H6",
  language: "M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M12 5c-1 4-4 7-8 8M13 21l4-10 4 10M14.5 18h5",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.5 8.5l-2 5-5 2 2-5 5-2z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20a7.5 7.5 0 0 1 15 0",
  message: "M4 5h16v11H9l-5 4V5zM8 9.5h8M8 12.5h5",
  sun: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  child: "M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8 22v-6l-2-1 2-5h8l2 5-2 1v6M10 22v-4h4v4",
};

export type IconName = keyof typeof PATHS;

export function Icon({ name, className = "h-5 w-5", ...rest }: { name: string } & SVGProps<SVGSVGElement>) {
  const d = PATHS[name] ?? PATHS.sparkle;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...rest}>
      <path d={d} />
    </svg>
  );
}
