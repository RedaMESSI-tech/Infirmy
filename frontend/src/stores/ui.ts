import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Types
export interface LoadingState {
  show: boolean
  text?: string
  progress?: number
}

export interface Snackbar {
  show: boolean
  message: string
  color: string
  icon: string
  timeout: number
}

export interface Dialog {
  show: boolean
  title: string
  message: string
  color: string
  icon: string
  maxWidth: string
  showCancel: boolean
  cancelText: string
  confirmText: string
  onConfirm: () => void
}

export const useUIStore = defineStore('ui', () => {
  // State
  const loading = ref<LoadingState>({
    show: false,
    text: 'Chargement...',
    progress: undefined
  })

  const snackbar = ref<Snackbar>({
    show: false,
    message: '',
    color: 'success',
    icon: 'mdi-check-circle',
    timeout: 5000
  })

  const dialog = ref<Dialog>({
    show: false,
    title: '',
    message: '',
    color: 'primary',
    icon: 'mdi-information',
    maxWidth: '400px',
    showCancel: true,
    cancelText: 'Annuler',
    confirmText: 'Confirmer',
    onConfirm: () => {}
  })

  const theme = ref<'light' | 'dark'>('light')
  const isMobile = ref(false)
  const currentPage = ref('')
  const currentPageIcon = ref('')

  // Computed
  const isLoading = computed(() => loading.value.show)
  const loadingText = computed(() => loading.value.text)
  const loadingProgress = computed(() => loading.value.progress)

  // Actions
  const showLoading = (text?: string, progress?: number) => {
    loading.value = {
      show: true,
      text: text || 'Chargement...',
      progress
    }
  }

  const hideLoading = () => {
    loading.value.show = false
  }

  const updateLoading = (text?: string, progress?: number) => {
    if (text !== undefined) loading.value.text = text
    if (progress !== undefined) loading.value.progress = progress
  }

  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', newTheme)
    document.body.classList.remove('theme--light', 'theme--dark')
    document.body.classList.add(`theme--${newTheme}`)
    // Store in localStorage
    localStorage.setItem('infirmy-theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const showSnackbar = (message: string, color: string = 'success', icon?: string, timeout?: number) => {
    snackbar.value = {
      show: true,
      message,
      color,
      icon: icon || getDefaultIcon(color),
      timeout: timeout || 5000
    }
  }

  const showSuccess = (message: string, timeout?: number) => {
    showSnackbar(message, 'success', 'mdi-check-circle', timeout)
  }

  const showError = (message: string, timeout?: number) => {
    showSnackbar(message, 'error', 'mdi-alert-circle', timeout)
  }

  const showWarning = (message: string, timeout?: number) => {
    showSnackbar(message, 'warning', 'mdi-alert', timeout)
  }

  const showInfo = (message: string, timeout?: number) => {
    showSnackbar(message, 'info', 'mdi-information', timeout)
  }

  const hideSnackbar = () => {
    snackbar.value.show = false
  }

  const showDialog = (options: Partial<Dialog>) => {
    dialog.value = {
      ...dialog.value,
      ...options,
      show: true
    }
  }

  const showConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    options: Partial<Dialog> = {}
  ) => {
    showDialog({
      title,
      message,
      onConfirm,
      color: 'warning',
      icon: 'mdi-help-circle',
      showCancel: true,
      cancelText: 'Annuler',
      confirmText: 'Confirmer',
      ...options
    })
  }

  const hideDialog = () => {
    dialog.value.show = false
  }

  const setPageInfo = (page: string, icon: string) => {
    currentPage.value = page
    currentPageIcon.value = icon
  }

  const updateResponsiveness = () => {
    isMobile.value = window.innerWidth < 960
  }

  const initialize = async () => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('infirmy-theme') as 'light' | 'dark'
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Auto-detect theme based on system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }

    // Set up responsiveness
    updateResponsiveness()
    window.addEventListener('resize', updateResponsiveness)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('infirmy-theme')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    })
  }

  const cleanup = () => {
    window.removeEventListener('resize', updateResponsiveness)
  }

  // Helper function to get default icon based on color
  const getDefaultIcon = (color: string): string => {
    switch (color) {
      case 'success':
        return 'mdi-check-circle'
      case 'error':
        return 'mdi-alert-circle'
      case 'warning':
        return 'mdi-alert'
      case 'info':
        return 'mdi-information'
      default:
        return 'mdi-information'
    }
  }

  // Return
  return {
    // State
    loading,
    snackbar,
    dialog,
    theme,
    isMobile,
    currentPage,
    currentPageIcon,

    // Computed
    isLoading,
    loadingText,
    loadingProgress,

    // Actions
    showLoading,
    hideLoading,
    updateLoading,
    setTheme,
    toggleTheme,
    showSnackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideSnackbar,
    showDialog,
    showConfirm,
    hideDialog,
    setPageInfo,
    updateResponsiveness,
    initialize,
    cleanup
  }
})