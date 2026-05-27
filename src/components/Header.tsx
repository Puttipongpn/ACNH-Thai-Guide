import { useState } from "react";
import { navItems } from "../data/content";
import type { Navigate } from "../types/content";
import { InternalLink } from "./UI";

interface HeaderProps {
  navigate: Navigate;
  currentPath: string;
}

export default function Header({ navigate, currentPath }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  function visit(path: string) {
    setIsOpen(false);
    navigate(path);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-leaf/10 bg-cream/92 backdrop-blur">
      <div className="page-container flex h-18 items-center justify-between gap-4">
        <InternalLink to="/" navigate={navigate} className="group flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-leaf text-xl shadow-soft">
            🏝️
          </span>
          <span>
            <span className="font-display block text-lg font-bold leading-none text-ink">ACNH Thai Guide</span>
            <span className="text-xs text-muted">สมุดสารบัญกลุ่ม</span>
          </span>
        </InternalLink>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="เมนูหลัก">
          {navItems.map((item) => (
            <InternalLink
              key={item.label}
              to={item.path}
              navigate={navigate}
              className={`nav-link ${currentPath === item.path ? "nav-link-active" : ""}`}
            >
              {item.label}
            </InternalLink>
          ))}
        </nav>
        <button
          type="button"
          className="rounded-xl border border-leaf/20 bg-white px-3 py-2 text-sm text-ink lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          เมนู
        </button>
      </div>
      {isOpen && (
        <nav
          id="mobile-menu"
          aria-label="เมนูหลักบนมือถือ"
          className="page-container grid grid-cols-2 gap-1 border-t border-leaf/10 py-3 lg:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="rounded-xl px-4 py-3 text-sm font-medium text-ink hover:bg-leaf-pale"
              onClick={(event) => {
                event.preventDefault();
                visit(item.path);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
