/*
  components/icons.tsx — small authored icon set, one consistent stroke
  (1.6) and round cap/join, 24x24 viewBox. No emoji, no icon-font.
*/

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const strokeProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": "true" as const,
};

export function CameraIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M4 8h3l1.6-2.4A2 2 0 0 1 10.3 4.6h3.4a2 2 0 0 1 1.7 1L17 8h3a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 20 20H4a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 4 8Z" />
      <circle cx="12" cy="13.5" r="3.6" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M6.5 3.5h3l1.5 4-2 1.7a12 12 0 0 0 5.8 5.8l1.7-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 5 5.1 1.5 1.5 0 0 1 6.5 3.5Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M6.4 17.6 4 20l2.5-2.3A8 8 0 1 1 9.6 19Z" />
      <path d="M9.2 9.6c0 3.3 2.7 5.9 5.9 5.9l.7-1.6-1.9-1-1 .9a5 5 0 0 1-2.9-2.9l.9-1-1-1.9Z" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="1.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...strokeProps} strokeWidth={1.8} {...props}>
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M4.5 7h15" />
      <path d="M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2" />
      <path d="M6.5 7l1 12a1.5 1.5 0 0 0 1.5 1.4h6a1.5 1.5 0 0 0 1.5-1.4l1-12" />
    </svg>
  );
}

export function BackArrowIcon(props: IconProps) {
  return (
    <svg {...strokeProps} strokeWidth={1.8} {...props}>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M12 9v4" />
      <circle cx="12" cy="16.2" r="0.4" fill="currentColor" />
      <path d="M10.6 3.9 2.9 18a1.8 1.8 0 0 0 1.6 2.6h15a1.8 1.8 0 0 0 1.6-2.6L13.4 3.9a1.8 1.8 0 0 0-2.8 0Z" />
    </svg>
  );
}

export function HeartOutlineIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M12 20.2C8.5 17.6 3 13.6 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4.6-5.5 8.6-9 11.2Z" />
    </svg>
  );
}

export function HeartFilledIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true" {...props}>
      <path d="M12 20.2C8.5 17.6 3 13.6 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4.6-5.5 8.6-9 11.2Z" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true" {...props}>
      <path d="M12 2c.6 4.2 1.8 6.6 6 7.5-4.2.9-5.4 3.3-6 7.5-.6-4.2-1.8-6.6-6-7.5 4.2-.9 5.4-3.3 6-7.5Z" />
    </svg>
  );
}
