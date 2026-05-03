import { useState, useEffect } from 'react';

/* ── Config ── */

const backgrounds = [
  { id: 'warm-paper', label: 'Warm Paper' },
  { id: 'soft-grid', label: 'Soft Grid' },
  { id: 'aurora-warm', label: 'Warm Aurora' },
];

type ThemeId = 'warm' | 'light-tech' | 'dark-glass';

interface ThemeVars {
  id: ThemeId;
  label: string;
  vars: Record<string, string>;
}

const themes: ThemeVars[] = [
  {
    id: 'warm',
    label: 'Warm',
    vars: {
      '--bg': '#f7f3ea',
      '--surface-rgb': '255, 252, 245',
      '--surface-elevated-rgb': '255, 252, 245',
      '--surface': 'rgb(255, 252, 245 / 0.5)',
      '--surface-elevated': 'rgb(255, 252, 245 / 0.85)',
      '--border': 'rgb(31, 27, 22 / 0.10)',
      '--text': '#1f1b16',
      '--muted': '#6f675c',
      '--border-rgb': '31, 27, 22',
      '--border-hover': 'rgba(31, 27, 22, 0.14)',
      '--accent': '#c96442',
      '--accent-soft': 'rgba(201, 100, 66, 0.08)',
      '--accent-hover': '#b8573b',
      '--tag-bg': 'rgba(31, 27, 22, 0.04)',
      '--nav-bg-rgb': '255, 252, 245',
      '--shadow-sm': '0 1px 2px rgba(31, 27, 22, 0.04)',
      '--shadow-md': '0 4px 16px rgba(31, 27, 22, 0.06)',
    },
  },
  {
    id: 'light-tech',
    label: 'Light Tech',
    vars: {
      '--bg': '#f7f8fa',
      '--surface-rgb': '248, 250, 252',
      '--surface-elevated-rgb': '248, 250, 252',
      '--surface': 'rgb(248, 250, 252 / 0.5)',
      '--surface-elevated': 'rgb(248, 250, 252 / 0.85)',
      '--border': 'rgb(148, 163, 184 / 0.08)',
      '--text': '#0f172a',
      '--muted': '#64748b',
      '--border-rgb': '148, 163, 184',
      '--border-hover': 'rgba(148, 163, 184, 0.14)',
      '--accent': '#6366f1',
      '--accent-soft': 'rgba(99, 102, 241, 0.08)',
      '--accent-hover': '#4f46e5',
      '--tag-bg': 'rgba(148, 163, 184, 0.08)',
      '--nav-bg-rgb': '248, 250, 252',
      '--shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.03)',
      '--shadow-md': '0 4px 16px rgba(0, 0, 0, 0.05)',
    },
  },
  {
    id: 'dark-glass',
    label: 'Dark Glass',
    vars: {
      '--bg': '#171310',
      '--surface-rgb': '35, 31, 28',
      '--surface-elevated-rgb': '42, 38, 34',
      '--surface': 'rgb(35, 31, 28 / 0.5)',
      '--surface-elevated': 'rgb(42, 38, 34 / 0.85)',
      '--border': 'rgb(245, 239, 231 / 0.08)',
      '--text': '#f5efe7',
      '--muted': '#b9afa3',
      '--border-rgb': '245, 239, 231',
      '--border-hover': 'rgba(245, 239, 231, 0.15)',
      '--accent': '#d08a6b',
      '--accent-soft': 'rgba(208, 138, 107, 0.12)',
      '--accent-hover': '#c07855',
      '--tag-bg': 'rgba(245, 239, 231, 0.06)',
      '--nav-bg-rgb': '23, 19, 16',
      '--shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.2)',
      '--shadow-md': '0 4px 16px rgba(0, 0, 0, 0.3)',
    },
  },
];

type GlassId = 'soft' | 'medium' | 'strong';

interface GlassConfig {
  id: GlassId;
  label: string;
  blur: string;
  opacity: string;
  borderAlpha: string;
  shadow: string;
}

const glassStrengths: GlassConfig[] = [
  {
    id: 'soft',
    label: 'Soft',
    blur: '4px',
    opacity: '0.82',
    borderAlpha: '0.10',
    shadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
  },
  {
    id: 'medium',
    label: 'Medium',
    blur: '12px',
    opacity: '0.68',
    borderAlpha: '0.08',
    shadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
  },
  {
    id: 'strong',
    label: 'Strong',
    blur: '24px',
    opacity: '0.48',
    borderAlpha: '0.05',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.10)',
  },
];

const DEFAULT_BG = 'warm-paper';
const DEFAULT_THEME: ThemeId = 'warm';
const DEFAULT_GLASS: GlassId = 'medium';

/* ── Helpers ── */

function getStored<T extends string>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  return (localStorage.getItem(key) as T) ?? fallback;
}

function applyVars(vars: Record<string, string>) {
  const root = document.documentElement;
  for (const [k, v] of Object.entries(vars)) {
    root.style.setProperty(k, v);
  }
}

/* ── Component ── */

export default function AppearancePanel() {
  const [bg, setBg] = useState(DEFAULT_BG);
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME);
  const [glass, setGlass] = useState<GlassId>(DEFAULT_GLASS);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedBg = getStored('appearance-bg', DEFAULT_BG);
    const storedTheme = getStored<ThemeId>('appearance-theme', DEFAULT_THEME);
    const storedGlass = getStored<GlassId>('appearance-glass', DEFAULT_GLASS);

    setBg(storedBg);
    setTheme(storedTheme);
    setGlass(storedGlass);

    applyBg(storedBg);
    applyTheme(storedTheme);
    applyGlass(storedGlass);
  }, []);

  function applyBg(id: string) {
    document.documentElement.style.setProperty(
      '--site-bg-image',
      `url('/backgrounds/${id}.svg')`
    );
  }

  function applyTheme(id: ThemeId) {
    const t = themes.find((t) => t.id === id);
    if (t) applyVars(t.vars);
  }

  function applyGlass(id: GlassId) {
    const g = glassStrengths.find((g) => g.id === id);
    if (g) {
      const root = document.documentElement;
      root.style.setProperty('--glass-blur', g.blur);
      root.style.setProperty('--glass-opacity', g.opacity);
      root.style.setProperty('--glass-border-alpha', g.borderAlpha);
      root.style.setProperty('--glass-shadow', g.shadow);
    }
  }

  function selectBg(id: string) {
    setBg(id);
    applyBg(id);
    localStorage.setItem('appearance-bg', id);
  }

  function selectTheme(id: ThemeId) {
    setTheme(id);
    applyTheme(id);
    localStorage.setItem('appearance-theme', id);
  }

  function selectGlass(id: GlassId) {
    setGlass(id);
    applyGlass(id);
    localStorage.setItem('appearance-glass', id);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="soft-card p-4 min-w-[200px] space-y-4 animate-in">
          <fieldset>
            <legend className="mono-label mb-2">Theme</legend>
            <div className="flex flex-col gap-0.5">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => selectTheme(t.id)}
                  className={`text-left px-3 py-1.5 text-[12px] rounded-lg transition-colors duration-150 ${
                    theme === t.id
                      ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-medium'
                      : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mono-label mb-2">Background</legend>
            <div className="flex flex-col gap-0.5">
              {backgrounds.map((b) => (
                <button
                  key={b.id}
                  onClick={() => selectBg(b.id)}
                  className={`text-left px-3 py-1.5 text-[12px] rounded-lg transition-colors duration-150 ${
                    bg === b.id
                      ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-medium'
                      : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mono-label mb-2">Glass</legend>
            <div className="flex flex-col gap-0.5">
              {glassStrengths.map((g) => (
                <button
                  key={g.id}
                  onClick={() => selectGlass(g.id)}
                  className={`text-left px-3 py-1.5 text-[12px] rounded-lg transition-colors duration-150 ${
                    glass === g.id
                      ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-medium'
                      : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--border-hover)] transition-all duration-200 shadow-sm"
        aria-label="Appearance settings"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>
    </div>
  );
}
