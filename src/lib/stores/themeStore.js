// src/lib/stores/themeStore.js
import { writable } from 'svelte/store';

// Function to get initial theme, checking localStorage and system preference
function getInitialTheme() {
  // Check if running in a browser environment using standard JS checks
  // before accessing browser-specific APIs like window, document, localStorage
  if (typeof window === 'undefined' || typeof document === 'undefined' || typeof localStorage === 'undefined') {
    return 'light'; // Default theme for SSR or environments without these APIs
  }

  // Check system preference only if no theme is stored
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = prefersDark ? 'dark' : 'light';

  return initial;
}

// Create a writable store initialized with the theme
const initialTheme = getInitialTheme();
export const theme = writable(initialTheme);

// Update localStorage and html class whenever the theme changes
theme.subscribe((value) => {
  // Use standard JS checks before accessing browser APIs
  if (typeof window !== 'undefined' && typeof document !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', value);
  }
});

// Function to toggle the theme
export function toggleTheme() {
  theme.update((currentTheme) => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    console.log(`Theme changed to: ${newTheme} (localStorage updated).`);
    return newTheme;
  });
}