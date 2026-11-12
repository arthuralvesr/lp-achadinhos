import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function WhatsAppMark(props: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.2Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 7.4c.5-.2.8 1 1.3 1.7.3.5-.7 1-.7 1.4.8 1.7 2.1 2.8 3.7 3.4.5.1.9-1 1.4-.8l1.8.9c.8.5-.2 2-1.2 2-3.6-.2-7.8-4.3-7.7-7.2 0-.6.7-1.3 1.4-1.4Z" fill="currentColor" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M6 18 18 6M6 6h12v12" />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 4v16m-6-6 6 6 6-6" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function Lock(props: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="5" y="10" width="14" height="11" rx="3" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" />
    </svg>
  );
}
