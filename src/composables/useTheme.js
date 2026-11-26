import { computed, ref } from 'vue'

const THEME_STORAGE_KEY = 'iap-theme'
const ALLOWED_THEMES = new Set(['light', 'dark'])

const currentTheme = ref('light')

const readStoredTheme = () => {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return ALLOWED_THEMES.has(stored) ? stored : 'light'
  } catch {
    return 'light'
  }
}

const persistTheme = (theme) => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Ignore storage restrictions in private browsing or embedded webviews
  }
}

const applyTheme = (theme) => {
  const safeTheme = ALLOWED_THEMES.has(theme) ? theme : 'light'
  currentTheme.value = safeTheme
  document.documentElement.dataset.theme = safeTheme
}

/** Initialize the active theme from storage before mounting the app. */
export const initTheme = () => {
  applyTheme(readStoredTheme())
}

/** Reactive theme state and toggle action for UI controls. */
export const useTheme = () => {
  const isDarkMode = computed(() => currentTheme.value === 'dark')

  const toggleTheme = () => {
    const nextTheme = isDarkMode.value ? 'light' : 'dark'
    applyTheme(nextTheme)
    persistTheme(nextTheme)
  }

  return {
    isDarkMode,
    toggleTheme,
  }
}
