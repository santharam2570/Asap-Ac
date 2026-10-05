import type { SVGProps } from "react";

const paths = {
  layers: <path d="M12 3 2 8l10 5 10-5-10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5" />,
  finance: <path d="M3 21h18M5 21V10m4 11V10m6 11V10m4 11V10M2 10h20L12 3 2 10Z" />,
  truck: (
    <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7zM7 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
  ),
  users: (
    <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm10 9v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 4.15a3.5 3.5 0 0 1 0 6.7" />
  ),
  code: <path d="m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16" />,
  cloud: <path d="M7 18a4.5 4.5 0 0 1-.5-8.97A6 6 0 0 1 18 8.5a4.5 4.5 0 0 1-.5 9.5H7Z" />,
  chart: <path d="M4 20V4m0 16h16M8 16v-4m4 4V8m4 8v-6" />,
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  clock: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2" />,
  calendar: <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Zm0 4h16M8 3v4m8-4v4" />,
  signal: <path d="M5 20v-4m5 4v-8m5 8V8m5 12V4" />,
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  mail: <path d="M4 6h16v12H4zm0 0 8 7 8-7" />,
  pin: <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  search: <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm9 2-4.35-4.35" />,
  plus: <path d="M12 5v14m-7-7h14" />,
  award: (
    <path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-3.5-1.1L7 21l5-3 5 3-1.5-7.1" />
  ),
  briefcase: (
    <path d="M4 8h16v11H4zM9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M4 13h16" />
  ),
  monitor: <path d="M3 5h18v11H3zM8 20h8m-4-4v4" />,
  project: <path d="M4 5h16v14H4zM4 9h16M9 9v10" />,
  headset: (
    <path d="M4 14v-2a8 8 0 1 1 16 0v2M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2Zm16 0a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2Zm-3 4v1a2 2 0 0 1-2 2h-3" />
  ),
  star: (
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
  ),
  building: <path d="M4 21V4h10v17M14 9h6v12M8 8h2m-2 4h2m-2 4h2M3 21h18" />,
  target: (
    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
  ),
  whatsapp: (
    <path d="M4 20l1.3-4A8 8 0 1 1 8.5 19L4 20Zm5-11.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a4.5 4.5 0 0 1-2.3-2.3l.8-1-1-2L9 8.5Z" />
  ),
} as const;

export type IconKey = keyof typeof paths;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconKey;
}

export function Icon({ name, className = "size-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
