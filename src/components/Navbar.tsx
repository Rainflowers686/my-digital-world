import { useState } from 'react';

const links = [
  { label: '首页', href: '#hero' },
  { label: '项目', href: '#projects' },
  { label: '学习', href: '#learning' },
  { label: '文章', href: '#articles' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[var(--surface-elevated)] border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-6 h-12 flex items-center justify-between">
        <a href="#hero" className="text-sm font-medium text-[var(--text)] tracking-tight">
          Rain's Digital World
        </a>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden flex flex-col gap-1 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-4 h-px bg-[var(--muted)] transition-all duration-300 ${
              open ? 'rotate-45 translate-y-[3px]' : ''
            }`}
          />
          <span
            className={`block w-4 h-px bg-[var(--muted)] transition-opacity duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-4 h-px bg-[var(--muted)] transition-all duration-300 ${
              open ? '-rotate-45 -translate-y-[3px]' : ''
            }`}
          />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-56 pb-3' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-[var(--muted)] hover:text-[var(--text)] py-2 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
