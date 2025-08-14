import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'

// Create axios instance
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Request interceptor
http.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = localStorage.getItem('accessToken')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
http.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    const authStore = useAuthStore()
    const uiStore = useUIStore()
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        // Try to refresh token
        const success = await authStore.refreshToken()
        
        if (success) {
          // Retry original request with new token
          const newToken = localStorage.getItem('accessToken')
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return http(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        await authStore.logout()
        return Promise.reject(refreshError)
      }
    }
    
    // Handle other errors
    if (error.response?.status >= 500) {
      uiStore.showError('Erreur serveur. Veuillez réessayer plus tard.')
    } else if (error.response?.status === 404) {
      uiStore.showError('Ressource non trouvée.')
    } else if (error.response?.status === 403) {
      uiStore.showError('Accès refusé.')
    } else if (error.response?.status === 422) {
      // Validation errors
      const errors = error.response.data?.errors || []
      if (errors.length > 0) {
        uiStore.showError(errors[0])
      } else {
        uiStore.showError('Données invalides.')
      }
    } else if (error.code === 'ECONNABORTED') {
      uiStore.showError('Délai d\'attente dépassé. Veuillez réessayer.')
    } else if (error.message === 'Network Error') {
      uiStore.showError('Erreur de connexion. Vérifiez votre connexion internet.')
    }
    
    return Promise.reject(error)
  }
)

// Request/Response logging in development
if (import.meta.env.DEV) {
  http.interceptors.request.use(
    (config) => {
      console.log('🚀 Request:', config.method?.toUpperCase(), config.url, config.data)
      return config
    },
    (error) => {
      console.error('❌ Request Error:', error)
      return Promise.reject(error)
    }
  )
  
  http.interceptors.response.use(
    (response) => {
      console.log('✅ Response:', response.status, response.config.url, response.data)
      return response
    },
    (error) => {
      console.error('❌ Response Error:', error.response?.status, error.response?.data)
      return Promise.reject(error)
    }
  )
}

export default http
