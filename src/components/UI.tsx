import type { ReactNode } from "react";
import type { Navigate } from "../types/content";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

interface TagPillProps {
  children: ReactNode;
}

interface InternalLinkProps {
  to: string;
  navigate: Navigate;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

interface FacebookButtonProps {
  url: string;
  compact?: boolean;
}

interface CountBadgeProps {
  count: number;
}

export function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-xl text-sm leading-7 text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function TagPill({ children }: TagPillProps) {
  return <span className="tag-pill">{children}</span>;
}

export function InternalLink({ to, navigate, children, className = "", ariaLabel }: InternalLinkProps) {
  return (
    <a
      href={to}
      aria-label={ariaLabel}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

export function FacebookButton({ url, compact = false }: FacebookButtonProps) {
  if (!url) {
    return (
      <span className={`button-muted ${compact ? "button-small" : ""}`} title="รอเพิ่มลิงก์ต้นทาง">
        รอเพิ่มโพสต์
      </span>
    );
  }

  return (
    <a
      className={`button-secondary ${compact ? "button-small" : ""}`}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      เปิดโพสต์ Facebook
    </a>
  );
}

export function CountBadge({ count }: CountBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/65 px-3 py-1 text-xs font-medium text-muted">
      <span aria-hidden="true">📎</span> {count} ลิงก์
    </span>
  );
}
