import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/services/authService'
import type { User, Patient, Nurse, AuthTokens, LoginCredentials, RegisterData, ForgotPasswordData, ResetPasswordData } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  // Router
  const router = useRouter()

  // State
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const userRole = computed(() => user.value?.role || null)
  const isPatient = computed(() => user.value?.role === 'patient')
  const isNurse = computed(() => user.value?.role === 'nurse')
  const isAdmin = computed(() => user.value?.role === 'admin')

  // Actions
  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await authService.login(credentials)
      
      if (response.success && response.user && response.tokens) {
        user.value = response.user
        isAuthenticated.value = true
        
        // Redirection basée sur le rôle
        await redirectAfterLogin()
        
        return { success: true }
      } else {
        error.value = response.error || 'Erreur de connexion'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur de connexion'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await authService.register(data)
      
      if (response.success && response.user) {
        user.value = response.user
        isAuthenticated.value = true
        
        // Redirection basée sur le rôle
        await redirectAfterLogin()
        
        return { success: true }
      } else {
        error.value = response.error || 'Erreur d\'inscription'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur d\'inscription'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const forgotPassword = async (data: ForgotPasswordData): Promise<{ success: boolean; error?: string }> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await authService.forgotPassword(data)
      
      if (response.success) {
        return { success: true }
      } else {
        error.value = response.error || 'Erreur lors de l\'envoi'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de l\'envoi'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const resetPassword = async (data: ResetPasswordData): Promise<{ success: boolean; error?: string }> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await authService.resetPassword(data)
      
      if (response.success) {
        return { success: true }
      } else {
        error.value = response.error || 'Erreur de réinitialisation'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur de réinitialisation'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await authService.logout()
    } finally {
      // Nettoyer l'état local
      user.value = null
      isAuthenticated.value = false
      error.value = null
      
      // Rediriger vers la page d'accueil
      router.push('/')
    }
  }

  const refreshToken = async (): Promise<boolean> => {
    try {
      const success = await authService.refreshToken()
      if (success) {
        // Vérifier le profil utilisateur
        await checkAuth()
        return true
      }
      return false
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error)
      return false
    }
  }

  const checkAuth = async (): Promise<boolean> => {
    try {
      const response = await authService.me()
      
      if (response.success && response.user) {
        user.value = response.user
        isAuthenticated.value = true
        return true
      } else {
        // Token invalide, essayer de le rafraîchir
        const refreshSuccess = await refreshToken()
        if (!refreshSuccess) {
          // Échec du rafraîchissement, déconnexion
          await logout()
          return false
        }
        return true
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error)
      return false
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await authService.changePassword(currentPassword, newPassword)
      
      if (response.success) {
        return { success: true }
      } else {
        error.value = response.error || 'Erreur lors du changement de mot de passe'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors du changement de mot de passe'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const redirectAfterLogin = async (): Promise<void> => {
    // Vérifier s'il y a une redirection sauvegardée
    const redirectPath = localStorage.getItem('redirectAfterLogin')
    localStorage.removeItem('redirectAfterLogin')

    if (redirectPath) {
      router.push(redirectPath)
      return
    }

    // Redirection par défaut basée sur le rôle
    if (isPatient.value) {
      router.push('/patient')
    } else if (isNurse.value) {
      router.push('/infirmier')
    } else if (isAdmin.value) {
      router.push('/admin')
    } else {
      router.push('/')
    }
  }

  const clearError = (): void => {
    error.value = null
  }

  const initialize = async (): Promise<void> => {
    // Vérifier l'authentification au démarrage
    if (authService.isAuthenticated()) {
      await checkAuth()
    }
  }

  // Return
  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    
    // Computed
    userRole,
    isPatient,
    isNurse,
    isAdmin,
    
    // Actions
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
    refreshToken,
    checkAuth,
    changePassword,
    clearError,
    initialize
  }
})
