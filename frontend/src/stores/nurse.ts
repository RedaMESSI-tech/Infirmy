import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Nurse, SearchFilters, SearchResult, PaginatedResponse } from '../types'
import { nurseApi } from '../services/api.nurses'

export const useNurseStore = defineStore('nurse', () => {
  // State
  const nurses = ref<Nurse[]>([])
  const searchResults = ref<SearchResult[]>([])
  const selectedNurse = ref<Nurse | null>(null)
  const filters = ref<SearchFilters>({})
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  })
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const hasResults = computed(() => searchResults.value.length > 0)
  const totalResults = computed(() => pagination.value.total)
  const currentPage = computed(() => pagination.value.page)
  const totalPages = computed(() => pagination.value.totalPages)
  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPrevPage = computed(() => currentPage.value > 1)

  // Actions
  const searchNurses = async (searchFilters: SearchFilters, page = 1) => {
    try {
      isLoading.value = true
      error.value = null
      
      filters.value = { ...searchFilters }
      pagination.value.page = page
      
      const response = await nurseApi.search(searchFilters, page, pagination.value.limit)
      
      if (response.success && response.data) {
        searchResults.value = response.data.data
        pagination.value = response.data.pagination
        return { success: true }
      } else {
        error.value = response.message || 'Erreur lors de la recherche'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la recherche'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const getNurseById = async (id: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await nurseApi.getById(id)
      
      if (response.success && response.data) {
        selectedNurse.value = response.data
        return { success: true }
      } else {
        error.value = response.message || 'Erreur lors de la récupération'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la récupération'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const getNursesBySpecialization = async (specialization: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await nurseApi.getBySpecialization(specialization)
      
      if (response.success && response.data) {
        nurses.value = response.data
        return { success: true }
      } else {
        error.value = response.message || 'Erreur lors de la récupération'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la récupération'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const getNursesByLocation = async (coordinates: { lat: number; lng: number }, radius: number) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await nurseApi.getByLocation(coordinates, radius)
      
      if (response.success && response.data) {
        nurses.value = response.data
        return { success: true }
      } else {
        error.value = response.message || 'Erreur lors de la récupération'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la récupération'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const getAvailableNurses = async (date: string, time: string, location?: { lat: number; lng: number }) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await nurseApi.getAvailable(date, time, location)
      
      if (response.success && response.data) {
        nurses.value = response.data
        return { success: true }
      } else {
        error.value = response.message || 'Erreur lors de la récupération'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la récupération'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const getNextPage = async () => {
    if (hasNextPage.value) {
      return await searchNurses(filters.value, currentPage.value + 1)
    }
    return { success: false, error: 'Pas de page suivante' }
  }

  const getPrevPage = async () => {
    if (hasPrevPage.value) {
      return await searchNurses(filters.value, currentPage.value - 1)
    }
    return { success: false, error: 'Pas de page précédente' }
  }

  const clearSearch = () => {
    searchResults.value = []
    selectedNurse.value = null
    filters.value = {}
    pagination.value = {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0
    }
    error.value = null
  }

  const clearError = () => {
    error.value = null
  }

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const resetPagination = () => {
    pagination.value.page = 1
  }

  return {
    // State
    nurses,
    searchResults,
    selectedNurse,
    filters,
    pagination,
    isLoading,
    error,
    
    // Getters
    hasResults,
    totalResults,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    
    // Actions
    searchNurses,
    getNurseById,
    getNursesBySpecialization,
    getNursesByLocation,
    getAvailableNurses,
    getNextPage,
    getPrevPage,
    clearSearch,
    clearError,
    updateFilters,
    resetPagination
  }
})
