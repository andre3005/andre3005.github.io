import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { COPY } from '../content/copy';

// Storage can throw (private mode, blocked cookies), so every access is guarded
const read = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
};

const systemTheme = () =>
  window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// index.html sets data-theme before React loads, so there is no flash on first paint
export const useTheme = () => {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || systemTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0f1120' : '#f6f7fb');
  }, [theme]);

  // Follow the system setting until the visitor picks one
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mq) return;
    const onChange = (e) => {
      if (!read('theme')) setTheme(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      write('theme', next);
      return next;
    });
  }, []);

  return [theme, toggle];
};

const initialLang = () => {
  const stored = read('lang');
  if (stored === 'en' || stored === 'de') return stored;
  return navigator.language?.toLowerCase().startsWith('de') ? 'de' : 'en';
};

export const useLangState = () => {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((l) => {
      const next = l === 'en' ? 'de' : 'en';
      write('lang', next);
      return next;
    });
  }, []);

  return [lang, toggle];
};

export const LangContext = createContext('en');

// Current language plus its copy
export const useCopy = () => {
  const lang = useContext(LangContext);
  return { lang, t: COPY[lang] };
};

// Content fields can be a string or { en, de }
export const pick = (value, lang) => {
  if (value == null || typeof value === 'string') return value ?? '';
  return value[lang] ?? value.en ?? '';
};
