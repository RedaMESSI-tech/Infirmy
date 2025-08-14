import http from '@/plugins/axios'
import type { 
  LoginCredentials, 
  RegisterData, 
  ForgotPasswordData, 
  ResetPasswordData,
  AuthTokens,
  User 
} from '@/types'

export interface LoginResponse {
  success: boolean
  error?: string
  tokens?: AuthTokens
  user?: User
}

export interface RegisterResponse {
  success: boolean
  error?: string
  user?: User
  message?: string
}

export interface ForgotPasswordResponse {
  success: boolean
  error?: string
  message?: string
}

export interface ResetPasswordResponse {
  success: boolean
  error?: string
  message?: string
}

export interface MeResponse {
  success: boolean
  error?: string
  user?: User
}

export interface ChangePasswordResponse {
  success: boolean
  error?: string
  message?: string
}

class AuthService {
  private readonly baseUrl = '/auth'

  /**
   * Connexion utilisateur
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await http.post(`${this.baseUrl}/login`, credentials)
      
      if (response.data.success) {
        // Stocker les tokens
        const { accessToken, refreshToken } = response.data.tokens
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        
        return {
          success: true,
          tokens: response.data.tokens,
          user: response.data.user
        }
      }
      
      return {
        success: false,
        error: response.data.error || 'Erreur de connexion'
      }
    } catch (error: any) {
      return {
        success: false,
        error: this.handleError(error)
      }
    }
  }

  /**
   * Inscription utilisateur
   */
  async register(data: RegisterData): Promise<RegisterResponse> {
    try {
      const response = await http.post(`${this.baseUrl}/register`, data)
      
      if (response.data.success) {
        // Si auto-login après inscription
        if (response.data.tokens) {
          const { accessToken, refreshToken } = response.data.tokens
          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('refreshToken', refreshToken)
        }
        
        return {
          success: true,
          user: response.data.user,
          message: response.data.message
        }
      }
      
      return {
        success: false,
        error: response.data.error || 'Erreur d\'inscription'
      }
    } catch (error: any) {
      return {
        success: false,
        error: this.handleError(error)
      }
    }
  }

  /**
   * Mot de passe oublié
   */
  async forgotPassword(data: ForgotPasswordData): Promise<ForgotPasswordResponse> {
    try {
      const response = await http.post(`${this.baseUrl}/forgot-password`, data)
      
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message
        }
      }
      
      return {
        success: false,
        error: response.data.error || 'Erreur lors de l\'envoi'
      }
    } catch (error: any) {
      return {
        success: false,
        error: this.handleError(error)
      }
    }
  }

  /**
   * Réinitialisation du mot de passe
   */
  async resetPassword(data: ResetPasswordData): Promise<ResetPasswordResponse> {
    try {
      const response = await http.post(`${this.baseUrl}/reset-password`, data)
      
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message
        }
      }
      
      return {
        success: false,
        error: response.data.error || 'Erreur de réinitialisation'
      }
    } catch (error: any) {
      return {
        success: false,
        error: this.handleError(error)
      }
    }
  }

  /**
   * Rafraîchir le token
   */
  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) return false

      const response = await http.post(`${this.baseUrl}/refresh-token`, {
        refreshToken
      })
      
      if (response.data.success) {
        const { accessToken, refreshToken: newRefreshToken } = response.data.tokens
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', newRefreshToken)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error)
      return false
    }
  }

  /**
   * Récupérer le profil utilisateur connecté
   */
  async me(): Promise<MeResponse> {
    try {
      const response = await http.get('/me')
      
      if (response.data.success) {
        return {
          success: true,
          user: response.data.user
        }
      }
      
      return {
        success: false,
        error: response.data.error || 'Erreur lors de la récupération du profil'
      }
    } catch (error: any) {
      return {
        success: false,
        error: this.handleError(error)
      }
    }
  }

  /**
   * Changer le mot de passe
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<ChangePasswordResponse> {
    try {
      const response = await http.put('/me/password', {
        currentPassword,
        newPassword
      })
      
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message
        }
      }
      
      return {
        success: false,
        error: response.data.error || 'Erreur lors du changement de mot de passe'
      }
    } catch (error: any) {
      return {
        success: false,
        error: this.handleError(error)
      }
    }
  }

  /**
   * Déconnexion
   */
  async logout(): Promise<void> {
    try {
      // Appeler l'API de déconnexion si nécessaire
      await http.post(`${this.baseUrl}/logout`)
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    } finally {
      // Nettoyer le stockage local
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    }
  }

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken')
    return !!token
  }

  /**
   * Obtenir le token d'accès
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken')
  }

  /**
   * Obtenir le token de rafraîchissement
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken')
  }

  /**
   * Gestion des erreurs
   */
  private handleError(error: any): string {
    if (error.response?.data?.error) {
      return error.response.data.error
    }
    
    if (error.response?.data?.message) {
      return error.response.data.message
    }
    
    if (error.message) {
      return error.message
    }
    
    return 'Une erreur inattendue s\'est produite'
  }
}

export default new AuthService()
