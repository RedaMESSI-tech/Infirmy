import { httpClient } from './http'
import type { 
  ApiResponse, 
  User, 
  AuthTokens, 
  LoginCredentials, 
  RegisterData,
  ForgotPasswordData,
  ResetPasswordData,
  ProfileUpdateData
} from '@/types'

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}

export interface ProfileResponse {
  user: User
}

export const authApi = {
  // Connexion
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return httpClient.post<AuthResponse>('/auth/login', credentials)
  },

  // Inscription
  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    return httpClient.post<AuthResponse>('/auth/register', data)
  },

  // Rafraîchir le token
  async refresh(refreshToken: string): Promise<ApiResponse<{ tokens: AuthTokens }>> {
    return httpClient.post<{ tokens: AuthTokens }>('/auth/refresh', { refreshToken })
  },

  // Déconnexion
  async logout(): Promise<ApiResponse<void>> {
    return httpClient.post<void>('/auth/logout')
  },

  // Récupérer le profil utilisateur
  async me(): Promise<ApiResponse<User>> {
    return httpClient.get<User>('/auth/me')
  },

  // Mettre à jour le profil
  async updateProfile(data: ProfileUpdateData): Promise<ApiResponse<User>> {
    return httpClient.put<User>('/auth/profile', data)
  },

  // Changer le mot de passe
  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    return httpClient.post<void>('/auth/change-password', {
      currentPassword,
      newPassword
    })
  },

  // Mot de passe oublié
  async forgotPassword(data: ForgotPasswordData): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>('/auth/forgot-password', data)
  },

  // Réinitialiser le mot de passe
  async resetPassword(token: string, password: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>('/auth/reset-password', {
      token,
      password
    })
  },

  // Vérifier l'email
  async verifyEmail(token: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>('/auth/verify-email', { token })
  },

  // Renvoyer l'email de vérification
  async resendVerificationEmail(): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>('/auth/resend-verification')
  },

  // Supprimer le compte
  async deleteAccount(password: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.delete<{ message: string }>('/auth/account', {
      data: { password }
    })
  },

  // Désactiver le compte
  async deactivateAccount(): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>('/auth/deactivate')
  },

  // Réactiver le compte
  async reactivateAccount(): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>('/auth/reactivate')
  },

  // Vérifier la validité du token
  async validateToken(): Promise<ApiResponse<{ valid: boolean }>> {
    return httpClient.get<{ valid: boolean }>('/auth/validate')
  },

  // Récupérer les sessions actives
  async getActiveSessions(): Promise<ApiResponse<Array<{
    id: string
    device: string
    ip: string
    lastActivity: string
    createdAt: string
  }>>> {
    return httpClient.get<Array<{
      id: string
      device: string
      ip: string
      lastActivity: string
      createdAt: string
    }>>('/auth/sessions')
  },

  // Révoquer une session
  async revokeSession(sessionId: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.delete<{ message: string }>(`/auth/sessions/${sessionId}`)
  },

  // Révoquer toutes les sessions sauf la courante
  async revokeOtherSessions(): Promise<ApiResponse<{ message: string }>> {
    return httpClient.delete<{ message: string }>('/auth/sessions/others')
  },

  // Mettre à jour les préférences de sécurité
  async updateSecurityPreferences(preferences: {
    twoFactorEnabled?: boolean
    emailNotifications?: boolean
    smsNotifications?: boolean
    loginNotifications?: boolean
  }): Promise<ApiResponse<{ message: string }>> {
    return httpClient.put<{ message: string }>('/auth/security-preferences', preferences)
  },

  // Activer l'authentification à deux facteurs
  async enableTwoFactor(): Promise<ApiResponse<{
    qrCode: string
    secret: string
    backupCodes: string[]
  }>> {
    return httpClient.post<{
      qrCode: string
      secret: string
      backupCodes: string[]
    }>('/auth/2fa/enable')
  },

  // Désactiver l'authentification à deux facteurs
  async disableTwoFactor(code: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>('/auth/2fa/disable', { code })
  },

  // Vérifier le code 2FA
  async verifyTwoFactor(code: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>('/auth/2fa/verify', { code })
  },

  // Générer de nouveaux codes de sauvegarde
  async generateBackupCodes(): Promise<ApiResponse<{
    backupCodes: string[]
  }>> {
    return httpClient.post<{
      backupCodes: string[]
    }>('/auth/2fa/backup-codes')
  }
}

export default authApi
