import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Review, PaginatedResponse } from '../types'
import { reviewApi } from '../services/api.reviews'

export const useReviewStore = defineStore('review', () => {
  // State
  const reviews = ref<Review[]>([])
  const nurseReviews = ref<Review[]>([])
  const userReviews = ref<Review[]>([])
  const selectedReview = ref<Review | null>(null)
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  })
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const hasReviews = computed(() => reviews.value.length > 0)
  const hasNurseReviews = computed(() => nurseReviews.value.length > 0)
  const hasUserReviews = computed(() => userReviews.value.length > 0)
  const totalReviews = computed(() => pagination.value.total)
  const currentPage = computed(() => pagination.value.page)
  const totalPages = computed(() => pagination.value.totalPages)
  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPrevPage = computed(() => currentPage.value > 1)
  
  const averageRating = computed(() => {
    if (reviews.value.length === 0) return 0
    const total = reviews.value.reduce((sum, review) => sum + review.rating, 0)
    return Math.round((total / reviews.value.length) * 10) / 10
  })
  
  const ratingDistribution = computed(() => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    reviews.value.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++
    })
    return distribution
  })

  // Actions
  const getReviews = async (page = 1, filters?: any) => {
    try {
      isLoading.value = true
      error.value = null
      
      pagination.value.page = page
      
      const response = await reviewApi.getReviews(page, pagination.value.limit, filters)
      
      if (response.success && response.data) {
        reviews.value = response.data.data
        pagination.value = response.data.pagination
        return { success: true }
      } else {
        error.value = response.message || 'Erreur lors de la récupération des avis'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la récupération des avis'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const getReviewsByNurse = async (nurseId: string, page = 1) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await reviewApi.getByNurse(nurseId, page, pagination.value.limit)
      
      if (response.success && response.data) {
        nurseReviews.value = response.data.data
        pagination.value = response.data.pagination
        return { success: true }
      } else {
        error.value = response.message || 'Erreur lors de la récupération des avis'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la récupération des avis'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const getReviewsByUser = async (userId: string, page = 1) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await reviewApi.getByUser(userId, page, pagination.value.limit)
      
      if (response.success && response.data) {
        userReviews.value = response.data.data
        pagination.value = response.data.pagination
        return { success: true }
      } else {
        error.value = response.message || 'Erreur lors de la récupération des avis'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la récupération des avis'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const getReviewById = async (id: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await reviewApi.getById(id)
      
      if (response.success && response.data) {
        selectedReview.value = response.data
        return { success: true }
      } else {
        error.value = response.message || 'Erreur lors de la récupération de l\'avis'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la récupération de l\'avis'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const createReview = async (reviewData: Omit<Review, 'id' | 'createdAt' | 'isVerified'>) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await reviewApi.create(reviewData)
      
      if (response.success && response.data) {
        const newReview = response.data
        
        // Ajouter aux listes appropriées
        reviews.value.unshift(newReview)
        nurseReviews.value.unshift(newReview)
        userReviews.value.unshift(newReview)
        
        // Mettre à jour la pagination
        pagination.value.total += 1
        
        return { success: true, review: newReview }
      } else {
        error.value = response.message || 'Erreur lors de la création de l\'avis'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la création de l\'avis'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const updateReview = async (id: string, updates: Partial<Review>) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await reviewApi.update(id, updates)
      
      if (response.success && response.data) {
        const updatedReview = response.data
        
        // Mettre à jour dans les listes
        const updateInList = (list: Review[]) => {
          const index = list.findIndex(review => review.id === id)
          if (index !== -1) {
            list[index] = updatedReview
          }
        }
        
        updateInList(reviews.value)
        updateInList(nurseReviews.value)
        updateInList(userReviews.value)
        
        if (selectedReview.value?.id === id) {
          selectedReview.value = updatedReview
        }
        
        return { success: true, review: updatedReview }
      } else {
        error.value = response.message || 'Erreur lors de la mise à jour de l\'avis'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la mise à jour de l\'avis'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const deleteReview = async (id: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await reviewApi.delete(id)
      
      if (response.success) {
        // Supprimer des listes
        reviews.value = reviews.value.filter(review => review.id !== id)
        nurseReviews.value = nurseReviews.value.filter(review => review.id !== id)
        userReviews.value = userReviews.value.filter(review => review.id !== id)
        
        if (selectedReview.value?.id === id) {
          selectedReview.value = null
        }
        
        // Mettre à jour la pagination
        pagination.value.total = Math.max(0, pagination.value.total - 1)
        
        return { success: true }
      } else {
        error.value = response.message || 'Erreur lors de la suppression de l\'avis'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la suppression de l\'avis'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const verifyReview = async (id: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await reviewApi.verify(id)
      
      if (response.success) {
        // Mettre à jour le statut dans les listes
        const updateStatus = (list: Review[]) => {
          const review = list.find(r => r.id === id)
          if (review) {
            review.isVerified = true
          }
        }
        
        updateStatus(reviews.value)
        updateStatus(nurseReviews.value)
        updateStatus(userReviews.value)
        
        if (selectedReview.value?.id === id) {
          selectedReview.value.isVerified = true
        }
        
        return { success: true }
      } else {
        error.value = response.message || 'Erreur lors de la vérification'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la vérification'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const getNextPage = async (filters?: any) => {
    if (hasNextPage.value) {
      return await getReviews(currentPage.value + 1, filters)
    }
    return { success: false, error: 'Pas de page suivante' }
  }

  const getPrevPage = async (filters?: any) => {
    if (hasPrevPage.value) {
      return await getReviews(currentPage.value - 1, filters)
    }
    return { success: false, error: 'Pas de page précédente' }
  }

  const clearError = () => {
    error.value = null
  }

  const resetPagination = () => {
    pagination.value.page = 1
  }

  const clearReviews = () => {
    reviews.value = []
    nurseReviews.value = []
    userReviews.value = []
    selectedReview.value = null
    pagination.value = {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0
    }
  }

  return {
    // State
    reviews,
    nurseReviews,
    userReviews,
    selectedReview,
    pagination,
    isLoading,
    error,
    
    // Getters
    hasReviews,
    hasNurseReviews,
    hasUserReviews,
    totalReviews,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    averageRating,
    ratingDistribution,
    
    // Actions
    getReviews,
    getReviewsByNurse,
    getReviewsByUser,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    verifyReview,
    getNextPage,
    getPrevPage,
    clearError,
    resetPagination,
    clearReviews
  }
})
