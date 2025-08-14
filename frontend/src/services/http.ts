import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type { ApiResponse } from '@/types'

// Configuration de base
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
const API_TIMEOUT = 30000 // 30 secondes

// Instance axios principale
const http: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Intercepteur pour les requêtes sortantes
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Ajouter le token d'authentification si disponible
    const token = localStorage.getItem('accessToken')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Ajouter un timestamp pour éviter le cache
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      }
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepteur pour les réponses entrantes
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // Traitement des réponses réussies
    return response
  },
  async (error) => {
    const originalRequest = error.config
    
    // Gestion des erreurs 401 (non autorisé)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        // Essayer de rafraîchir le token
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken
          })
          
          if (refreshResponse.data.success) {
            const { accessToken } = refreshResponse.data.data.tokens
            
            // Mettre à jour le token dans localStorage
            localStorage.setItem('accessToken', accessToken)
            
            // Mettre à jour le header de la requête originale
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
            
            // Réessayer la requête originale
            return http(originalRequest)
          }
        }
      } catch (refreshError) {
        // Échec du refresh, déconnecter l'utilisateur
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('tokenExpiry')
        
        // Rediriger vers la page de connexion
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    
    // Gestion des autres erreurs
    return Promise.reject(error)
  }
)

// Fonctions utilitaires pour les requêtes
export const httpClient = {
  // GET
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await http.get<ApiResponse<T>>(url, config)
      return response.data
    } catch (error: any) {
      return handleError<T>(error)
    }
  },

  // POST
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await http.post<ApiResponse<T>>(url, data, config)
      return response.data
    } catch (error: any) {
      return handleError<T>(error)
    }
  },

  // PUT
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await http.put<ApiResponse<T>>(url, data, config)
      return response.data
    } catch (error: any) {
      return handleError<T>(error)
    }
  },

  // PATCH
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await http.patch<ApiResponse<T>>(url, data, config)
      return response.data
    } catch (error: any) {
      return handleError<T>(error)
    }
  },

  // DELETE
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await http.delete<ApiResponse<T>>(url, config)
      return response.data
    } catch (error: any) {
      return handleError<T>(error)
    }
  },

  // Upload de fichier
  async upload<T>(url: string, file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<T>> {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await http.post<ApiResponse<T>>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            onProgress(progress)
          }
        }
      })
      
      return response.data
    } catch (error: any) {
      return handleError<T>(error)
    }
  },

  // Upload multiple
  async uploadMultiple<T>(url: string, files: File[], onProgress?: (progress: number) => void): Promise<ApiResponse<T>> {
    try {
      const formData = new FormData()
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file)
      })
      
      const response = await http.post<ApiResponse<T>>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            onProgress(progress)
          }
        }
      })
      
      return response.data
    } catch (error: any) {
      return handleError<T>(error)
    }
  }
}

// Gestion des erreurs
function handleError<T>(error: any): ApiResponse<T> {
  let message = 'Une erreur inattendue s\'est produite'
  let errors: Record<string, string[]> = {}
  
  if (error.response) {
    // Erreur de réponse du serveur
    const { status, data } = error.response
    
    switch (status) {
      case 400:
        message = 'Requête invalide'
        if (data.errors) {
          errors = data.errors
        }
        break
      case 401:
        message = 'Non autorisé'
        break
      case 403:
        message = 'Accès interdit'
        break
      case 404:
        message = 'Ressource non trouvée'
        break
      case 422:
        message = 'Données invalides'
        if (data.errors) {
          errors = data.errors
        }
        break
      case 429:
        message = 'Trop de requêtes, veuillez réessayer plus tard'
        break
      case 500:
        message = 'Erreur interne du serveur'
        break
      case 502:
        message = 'Serveur temporairement indisponible'
        break
      case 503:
        message = 'Service temporairement indisponible'
        break
      default:
        message = data.message || `Erreur ${status}`
    }
  } else if (error.request) {
    // Erreur de réseau
    message = 'Erreur de connexion au serveur'
  } else {
    // Erreur de configuration
    message = error.message || 'Erreur de configuration'
  }
  
  // Log de l'erreur en développement
  if (import.meta.env.DEV) {
    console.error('HTTP Error:', {
      message,
      error,
      status: error.response?.status,
      data: error.response?.data
    })
  }
  
  return {
    success: false,
    message,
    errors
  }
}

// Configuration pour les tests
export const setBaseURL = (url: string) => {
  http.defaults.baseURL = url
}

export const setAuthToken = (token: string) => {
  http.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const clearAuthToken = () => {
  delete http.defaults.headers.common.Authorization
}

export default httpClient
