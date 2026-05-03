import { useState, useEffect } from 'react';

/* ── Config ── */

const backgrounds = [
  { id: 'warm-paper', label: 'Warm Paper' },
  { id: 'soft-grid', label: 'Soft Grid' },
  { id: 'aurora-warm', label: 'Warm Aurora' },
  { id: 'dark-aurora', label: 'Dark Aurora' },
];

type ThemeId = 'warm' | 'light-tech' | 'dark-glass';

interface ThemeVars {
  id: ThemeId;
  label: string;
  defaultBg: string;
  vars: Record<string, string>;
}

const themes: ThemeVars[] = [
  {
    id: 'warm',
    label: 'Warm',
    defaultBg: 'warm-paper',
    vars: {
      '--bg': '#f7f3ea',
      '--surface-rgb': '255, 252, 245',
      '--surface-elevated-rgb': '255, 252, 245',
      '--surface': 'rgb(255, 252, 245 / 0.5)',
      '--surface-elevated': 'rgb(255, 252, 245 / 0.85)',
      '--text': '#1f1b16',
      '--muted': '#6f675c',
      '--border-rgb': '31, 27, 22',
      '--border': 'rgb(31, 27, 22 / 0.10)',
      '--border-hover': 'rgba(31, 27, 22, 0.14)',
      '--accent': '#c96442',
      '--accent-soft': 'rgba(201, 100, 66, 0.08)',
      '--accent-hover': '#b8573b',
      '--tag-bg': 'rgba(31, 27, 22, 0.04)',
      '--nav-bg-rgb': '255, 252, 245',
      '--theme-overlay': 'transparent',
      '--shadow-sm': '0 1px 2px rgba(31, 27, 22, 0.04)',
      '--shadow-md': '0 4px 16px rgba(31, 27, 22, 0.06)',
    },
  },
  {
    id: 'light-tech',
    label: 'Light Tech',
    defaultBg: 'soft-grid',
    vars: {
      '--bg': '#f8fafc',
      '--surface-rgb': '255, 255, 255',
      '--surface-elevated-rgb': '250, 250, 252',
      '--surface': 'rgb(255, 255, 255 / 0.5)',
      '--surface-elevated': 'rgb(250, 250, 252 / 0.85)',
      '--text': '#172033',
      '--muted': '#637083',
      '--border-rgb': '23, 32, 51',
      '--border': 'rgb(23, 32, 51 / 0.10)',
      '--border-hover': 'rgba(79, 70, 229, 0.24)',
      '--accent': '#4f46e5',
      '--accent-soft': 'rgba(79, 70, 229, 0.10)',
      '--accent-hover': '#4338ca',
      '--tag-bg': 'rgba(79, 70, 229, 0.06)',
      '--nav-bg-rgb': '248, 250, 252',
      '--theme-overlay': 'transparent',
      '--shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.03)',
      '--shadow-md': '0 4px 16px rgba(0, 0, 0, 0.05)',
    },
  },
  {
    id: 'dark-glass',
    label: 'Dark Glass',
    defaultBg: 'dark-aurora',
    vars: {
      '--bg': '#171310',
      '--surface-rgb': '38, 34, 30',
      '--surface-elevated-rgb': '48, 43, 38',
      '--surface': 'rgb(38, 34, 30 / 0.5)',
      '--surface-elevated': 'rgb(48, 43, 38 / 0.85)',
      '--text': '#f6efe7',
      '--muted': '#c4b8ab',
      '--border-rgb': '246, 239, 231',
      '--border': 'rgb(246, 239, 231 / 0.14)',
      '--border-hover': 'rgba(246, 239, 231, 0.26)',
      '--accent': '#d98a66',
      '--accent-soft': 'rgba(217, 138, 102, 0.14)',
      '--accent-hover': '#c47a55',
      '--tag-bg': 'rgba(246, 239, 231, 0.08)',
      '--nav-bg-rgb': '23, 19, 16',
      '--theme-overlay': 'rgba(23, 19, 16, 0.70)',
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
  bgAlpha: string;
  borderAlpha: string;
  shadowAlpha: string;
}

const glassStrengths: GlassConfig[] = [
  {
    id: 'soft',
    label: 'Soft',
    blur: '4px',
    bgAlpha: '0.92',
    borderAlpha: '0.10',
    shadowAlpha: '0.06',
  },
  {
    id: 'medium',
    label: 'Medium',
    blur: '12px',
    bgAlpha: '0.78',
    borderAlpha: '0.14',
    shadowAlpha: '0.10',
  },
  {
    id: 'strong',
    label: 'Strong',
    blur: '24px',
    bgAlpha: '0.66',
    borderAlpha: '0.22',
    shadowAlpha: '0.16',
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

    // If switching to a theme for the first time, use its default bg
    const effectiveBg = storedBg || themes.find((t) => t.id === storedTheme)?.defaultBg || DEFAULT_BG;

    setBg(effectiveBg);
    setTheme(storedTheme);
    setGlass(storedGlass);

    applyBg(effectiveBg);
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
      root.style.setProperty('--glass-bg-alpha', g.bgAlpha);
      root.style.setProperty('--glass-border-alpha', g.borderAlpha);
      root.style.setProperty('--glass-shadow-alpha', g.shadowAlpha);
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
    // Auto-select default bg for this theme
    const t = themes.find((t) => t.id === id);
    if (t) {
      selectBg(t.defaultBg);
    }
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
