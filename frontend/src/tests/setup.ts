import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Configuration globale pour les tests
config.global.stubs = {
  'router-link': true,
  'router-view': true,
  'v-app': true,
  'v-main': true,
  'v-container': true,
  'v-row': true,
  'v-col': true,
  'v-card': true,
  'v-btn': true,
  'v-text-field': true,
  'v-select': true,
  'v-textarea': true,
  'v-checkbox': true,
  'v-radio-group': true,
  'v-switch': true,
  'v-slider': true,
  'v-rating': true,
  'v-date-picker': true,
  'v-time-picker': true,
  'v-menu': true,
  'v-dialog': true,
  'v-tooltip': true,
  'v-snackbar': true,
  'v-alert': true,
  'v-badge': true,
  'v-chip': true,
  'v-avatar': true,
  'v-img': true,
  'v-sheet': true,
  'v-divider': true,
  'v-list': true,
  'v-list-item': true,
  'v-navigation-drawer': true,
  'v-app-bar': true,
  'v-footer': true,
  'v-spacer': true,
  'v-progress-linear': true,
  'v-progress-circular': true,
  'v-skeleton-loader': true,
  'v-timeline': true,
  'v-timeline-item': true,
  'v-expansion-panels': true,
  'v-expansion-panel': true,
  'v-expansion-panel-title': true,
  'v-expansion-panel-text': true,
  'v-tabs': true,
  'v-tab': true,
  'v-tab-item': true,
  'v-window': true,
  'v-window-item': true,
  'v-stepper': true,
  'v-stepper-header': true,
  'v-stepper-item': true,
  'v-stepper-window': true,
  'v-stepper-window-item': true,
  'v-data-table': true,
  'v-data-table-header': true,
  'v-data-table-row': true,
  'v-data-table-cell': true,
  'v-data-table-footer': true,
  'v-data-table-pagination': true,
  'v-data-table-server': true,
  'v-data-table-virtual': true,
  'v-data-table-group': true,
  'v-data-table-group-header': true,
  'v-data-table-group-footer': true,
  'v-data-table-group-row': true,
  'v-data-table-group-cell': true,
  'v-data-table-group-pagination': true,
  'v-data-table-group-server': true,
  'v-data-table-group-virtual': true
}

// Mock des modules externes
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn()
  }),
  useRoute: () => ({
    path: '/',
    name: 'home',
    params: {},
    query: {},
    hash: ''
  })
}))

vi.mock('pinia', () => ({
  createPinia: () => ({}),
  defineStore: vi.fn()
}))

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    user: null,
    isAuthenticated: false,
    isPatient: false,
    isNurse: false,
    isAdmin: false,
    userRole: null,
    fullName: '',
    isLoading: false,
    error: null,
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    checkAuth: vi.fn(),
    refreshAuth: vi.fn(),
    forgotPassword: vi.fn(),
    resetPassword: vi.fn(),
    updateProfile: vi.fn(),
    clearError: vi.fn()
  })
}))

vi.mock('@/stores/ui', () => ({
  useUIStore: () => ({
    theme: 'light',
    drawer: false,
    breadcrumbs: [],
    snackbar: {
      show: false,
      message: '',
      color: 'success',
      timeout: 5000
    },
    error: null,
    loading: false,
    toggleTheme: vi.fn(),
    toggleDrawer: vi.fn(),
    setBreadcrumbs: vi.fn(),
    clearBreadcrumbs: vi.fn(),
    showSnackbar: vi.fn(),
    hideSnackbar: vi.fn(),
    setError: vi.fn(),
    clearError: vi.fn(),
    setLoading: vi.fn()
  })
}))

// Configuration des tests globaux
beforeEach(() => {
  // Nettoyer les mocks avant chaque test
  vi.clearAllMocks()
  
  // Réinitialiser le DOM
  document.body.innerHTML = ''
  document.head.innerHTML = ''
})

afterEach(() => {
  // Nettoyer après chaque test
  vi.restoreAllMocks()
})
