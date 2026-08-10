import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return true;
  }

  try {
    const savedTheme = localStorage.getItem('portfolio-theme') || localStorage.getItem('theme');
    if (savedTheme === 'light') return false;
    if (savedTheme === 'dark') return true;
  } catch (error) {
    console.warn('Theme preference could not be read:', error);
  }

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  // Update localStorage and DOM when theme changes
  useEffect(() => {
    const htmlElement = document.documentElement;
    const themeValue = isDark ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', themeValue);
    // Persist to both keys (legacy + new) so older code paths keep working
    try {
      localStorage.setItem('portfolio-theme', themeValue);
      localStorage.setItem('theme', themeValue);
    } catch (e) {
      // ignore storage errors
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
