// Configuration des mocks
export const MOCK_CONFIG = {
  // Activer/désactiver les mocks
  enabled: import.meta.env.VITE_ENABLE_MOCKS === 'true',
  
  // Délai de réponse simulé (en ms)
  responseDelay: 500,
  
  // Taux d'erreur simulé (0-1)
  errorRate: 0.1,
  
  // Mode de développement
  devMode: import.meta.env.DEV
}

// Export de toutes les fixtures
export * from './fixtures/users'
export * from './fixtures/nurses'
export * from './fixtures/appointments'
export * from './fixtures/messages'
export * from './fixtures/reviews'
export * from './fixtures/notifications'
export * from './fixtures/stats'

// Fonction utilitaire pour simuler un délai
export const delay = (ms: number = MOCK_CONFIG.responseDelay) => 
  new Promise(resolve => setTimeout(resolve, ms))

// Fonction utilitaire pour simuler une erreur
export const shouldSimulateError = () => 
  MOCK_CONFIG.enabled && Math.random() < MOCK_CONFIG.errorRate

// Fonction utilitaire pour générer un ID unique
export const generateId = () => 
  Math.random().toString(36).substr(2, 9) + Date.now().toString(36)

// Fonction utilitaire pour simuler une pagination
export const paginateData = <T>(
  data: T[], 
  page: number = 1, 
  limit: number = 10
) => {
  const start = (page - 1) * limit
  const end = start + limit
  const paginatedData = data.slice(start, end)
  
  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: data.length,
      totalPages: Math.ceil(data.length / limit)
    }
  }
}

// Fonction utilitaire pour filtrer les données
export const filterData = <T>(
  data: T[],
  filters: Record<string, any>
) => {
  return data.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === undefined || value === null || value === '') return true
      
      const itemValue = (item as any)[key]
      if (typeof value === 'string') {
        return itemValue?.toLowerCase().includes(value.toLowerCase())
      }
      if (typeof value === 'number') {
        return itemValue === value
      }
      if (Array.isArray(value)) {
        return value.some(v => itemValue?.includes(v))
      }
      return itemValue === value
    })
  })
}

// Fonction utilitaire pour trier les données
export const sortData = <T>(
  data: T[],
  sortBy?: string,
  sortOrder: 'asc' | 'desc' = 'asc'
) => {
  if (!sortBy) return data
  
  return [...data].sort((a, b) => {
    const aValue = (a as any)[sortBy]
    const bValue = (b as any)[sortBy]
    
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
    return 0
  })
}

// Configuration des intercepteurs de mocks
export const setupMockInterceptors = () => {
  if (!MOCK_CONFIG.enabled) return
  
  console.log('🔧 Mocks activés - Mode développement')
  
  // Intercepteur pour axios
  const { default: axios } = require('axios')
  const MockAdapter = require('axios-mock-adapter')
  
  if (typeof window !== 'undefined') {
    const mock = new MockAdapter(axios, { delayResponse: MOCK_CONFIG.responseDelay })
    
    // Configuration des routes mockées
    require('./interceptors/auth').setup(mock)
    require('./interceptors/users').setup(mock)
    require('./interceptors/nurses').setup(mock)
    require('./interceptors/appointments').setup(mock)
    require('./interceptors/messages').setup(mock)
    require('./interceptors/reviews').setup(mock)
    require('./interceptors/notifications').setup(mock)
    require('./interceptors/stats').setup(mock)
    require('./interceptors/upload').setup(mock)
    require('./interceptors/geo').setup(mock)
  }
}

// Initialisation automatique en mode développement
if (MOCK_CONFIG.enabled && MOCK_CONFIG.devMode) {
  setupMockInterceptors()
}
