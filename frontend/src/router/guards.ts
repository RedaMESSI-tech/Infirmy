import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

/**
 * Guard pour les routes nécessitant une authentification
 */
export const requiresAuth = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  const authStore = useAuthStore()
  
  // Vérifier si l'utilisateur est connecté
  if (!authStore.isAuthenticated) {
    // Sauvegarder la route de destination pour redirection après connexion
    localStorage.setItem('redirectAfterLogin', to.fullPath)
    
    // Rediriger vers la page de connexion
    next('/login')
    return
  }
  
  // Utilisateur connecté, autoriser l'accès
  next()
}

/**
 * Guard pour les routes réservées aux patients
 */
export const requiresPatient = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  const authStore = useAuthStore()
  
  // Vérifier l'authentification
  if (!authStore.isAuthenticated) {
    localStorage.setItem('redirectAfterLogin', to.fullPath)
    next('/login')
    return
  }
  
  // Vérifier le rôle
  if (!authStore.isPatient) {
    // Rediriger vers la page d'accueil si ce n'est pas un patient
    next('/')
    return
  }
  
  // Patient connecté, autoriser l'accès
  next()
}

/**
 * Guard pour les routes réservées aux infirmiers
 */
export const requiresNurse = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  const authStore = useAuthStore()
  
  // Vérifier l'authentification
  if (!authStore.isAuthenticated) {
    localStorage.setItem('redirectAfterLogin', to.fullPath)
    next('/login')
    return
  }
  
  // Vérifier le rôle
  if (!authStore.isNurse) {
    // Rediriger vers la page d'accueil si ce n'est pas un infirmier
    next('/')
    return
  }
  
  // Infirmier connecté, autoriser l'accès
  next()
}

/**
 * Guard pour les routes réservées aux administrateurs
 */
export const requiresAdmin = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  const authStore = useAuthStore()
  
  // Vérifier l'authentification
  if (!authStore.isAuthenticated) {
    localStorage.setItem('redirectAfterLogin', to.fullPath)
    next('/login')
    return
  }
  
  // Vérifier le rôle
  if (!authStore.isAdmin) {
    // Rediriger vers la page d'accueil si ce n'est pas un admin
    next('/')
    return
  }
  
  // Admin connecté, autoriser l'accès
  next()
}

/**
 * Guard pour les routes publiques (rediriger si déjà connecté)
 */
export const requiresGuest = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  const authStore = useAuthStore()
  
  // Si l'utilisateur est déjà connecté, rediriger selon son rôle
  if (authStore.isAuthenticated) {
    if (authStore.isPatient) {
      next('/patient')
    } else if (authStore.isNurse) {
      next('/infirmier')
    } else if (authStore.isAdmin) {
      next('/admin')
    } else {
      next('/')
    }
    return
  }
  
  // Utilisateur non connecté, autoriser l'accès
  next()
}

/**
 * Guard pour vérifier l'authentification au chargement de l'application
 */
export const checkAuthOnAppStart = async (): Promise<void> => {
  const authStore = useAuthStore()
  await authStore.initialize()
}
