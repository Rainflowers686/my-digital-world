import { useState, useEffect } from 'react';

const backgrounds = [
  { id: 'warm-paper', label: 'Warm Paper' },
  { id: 'soft-grid', label: 'Soft Grid' },
  { id: 'aurora-warm', label: 'Warm Aurora' },
];

const STORAGE_KEY = 'site-bg';

function getInitialBg(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEY) ?? 'warm-paper';
  }
  return 'warm-paper';
}

export default function BackgroundPicker() {
  const [current, setCurrent] = useState('warm-paper');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const bg = getInitialBg();
    setCurrent(bg);
    applyBg(bg);
  }, []);

  function applyBg(id: string) {
    document.documentElement.style.setProperty(
      '--site-bg-image',
      `url('/backgrounds/${id}.svg')`
    );
  }

  function select(id: string) {
    setCurrent(id);
    applyBg(id);
    localStorage.setItem(STORAGE_KEY, id);
    setOpen(false);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="soft-card p-1.5 flex flex-col gap-0.5 min-w-[160px] shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-150">
          {backgrounds.map((bg) => (
            <button
              key={bg.id}
              onClick={() => select(bg.id)}
              className={`text-left px-3 py-1.5 text-[12px] rounded-lg transition-colors duration-150 ${
                current === bg.id
                  ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-medium'
                  : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
              }`}
            >
              {bg.label}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] hover:border-[rgba(31,27,22,0.18)] transition-all duration-200 shadow-sm"
        aria-label="Change background"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </button>
    </div>
  );
}
