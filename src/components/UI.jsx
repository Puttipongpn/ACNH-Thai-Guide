export function SectionHeading({ eyebrow, title, description, action }) {
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

export function TagPill({ children }) {
  return <span className="tag-pill">{children}</span>;
}

export function InternalLink({ to, navigate, children, className = "", ariaLabel }) {
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

export function FacebookButton({ url, compact = false }) {
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

export function CountBadge({ count }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/65 px-3 py-1 text-xs font-medium text-muted">
      <span aria-hidden="true">📎</span> {count} ลิงก์
    </span>
  );
}
