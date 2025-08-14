import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Appointment, BookingRequest, BookingConfirmation, PaginatedResponse } from '../types'
import { appointmentApi } from '../services/api.appointments'

export const useAppointmentStore = defineStore('appointment', () => {
  // State
  const appointments = ref<Appointment[]>([])
  const upcomingAppointments = ref<Appointment[]>([])
  const pastAppointments = ref<Appointment[]>([])
  const selectedAppointment = ref<Appointment | null>(null)
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  })
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const hasAppointments = computed(() => appointments.value.length > 0)
  const hasUpcomingAppointments = computed(() => upcomingAppointments.value.length > 0)
  const hasPastAppointments = computed(() => pastAppointments.value.length > 0)
  const totalAppointments = computed(() => pagination.value.total)
  const currentPage = computed(() => pagination.value.page)
  const totalPages = computed(() => pagination.value.totalPages)
  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPrevPage = computed(() => currentPage.value > 1)

  // Actions
  const getAppointments = async (page = 1, filters?: any) => {
    try {
      isLoading.value = true
      error.value = null
      
      pagination.value.page = page
      
      const response = await appointmentApi.getAppointments(page, pagination.value.limit, filters)
      
      if (response.success && response.data) {
        appointments.value = response.data.data
        pagination.value = response.data.pagination
        
        // Séparer les rendez-vous à venir et passés
        const now = new Date()
        upcomingAppointments.value = appointments.value.filter(apt => {
          const aptDate = new Date(`${apt.date} ${apt.startTime}`)
          return aptDate > now && apt.status !== 'cancelled'
        })
        
        pastAppointments.value = appointments.value.filter(apt => {
          const aptDate = new Date(`${apt.date} ${apt.startTime}`)
          return aptDate <= now || apt.status === 'cancelled'
        })
        
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

  const getAppointmentById = async (id: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await appointmentApi.getById(id)
      
      if (response.success && response.data) {
        selectedAppointment.value = response.data
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

  const createAppointment = async (bookingRequest: BookingRequest) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await appointmentApi.create(bookingRequest)
      
      if (response.success && response.data) {
        const newAppointment = response.data.appointment
        appointments.value.unshift(newAppointment)
        upcomingAppointments.value.unshift(newAppointment)
        
        // Mettre à jour la pagination
        pagination.value.total += 1
        
        return { success: true, appointment: newAppointment }
      } else {
        error.value = response.message || 'Erreur lors de la création'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la création'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await appointmentApi.update(id, updates)
      
      if (response.success && response.data) {
        const updatedAppointment = response.data
        
        // Mettre à jour dans les listes
        const updateInList = (list: Appointment[]) => {
          const index = list.findIndex(apt => apt.id === id)
          if (index !== -1) {
            list[index] = updatedAppointment
          }
        }
        
        updateInList(appointments.value)
        updateInList(upcomingAppointments.value)
        updateInList(pastAppointments.value)
        
        if (selectedAppointment.value?.id === id) {
          selectedAppointment.value = updatedAppointment
        }
        
        return { success: true, appointment: updatedAppointment }
      } else {
        error.value = response.message || 'Erreur lors de la mise à jour'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la mise à jour'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const cancelAppointment = async (id: string, reason?: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await appointmentApi.cancel(id, reason)
      
      if (response.success) {
        // Mettre à jour le statut dans les listes
        const updateStatus = (list: Appointment[]) => {
          const appointment = list.find(apt => apt.id === id)
          if (appointment) {
            appointment.status = 'cancelled'
          }
        }
        
        updateStatus(appointments.value)
        updateStatus(upcomingAppointments.value)
        updateStatus(pastAppointments.value)
        
        if (selectedAppointment.value?.id === id) {
          selectedAppointment.value.status = 'cancelled'
        }
        
        // Déplacer vers les rendez-vous passés
        const cancelledAppointment = upcomingAppointments.value.find(apt => apt.id === id)
        if (cancelledAppointment) {
          upcomingAppointments.value = upcomingAppointments.value.filter(apt => apt.id !== id)
          pastAppointments.value.unshift(cancelledAppointment)
        }
        
        return { success: true }
      } else {
        error.value = response.message || 'Erreur lors de l\'annulation'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de l\'annulation'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const rescheduleAppointment = async (id: string, newDate: string, newTime: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await appointmentApi.reschedule(id, newDate, newTime)
      
      if (response.success && response.data) {
        const updatedAppointment = response.data
        
        // Mettre à jour dans les listes
        const updateInList = (list: Appointment[]) => {
          const index = list.findIndex(apt => apt.id === id)
          if (index !== -1) {
            list[index] = updatedAppointment
          }
        }
        
        updateInList(appointments.value)
        updateInList(upcomingAppointments.value)
        updateInList(pastAppointments.value)
        
        if (selectedAppointment.value?.id === id) {
          selectedAppointment.value = updatedAppointment
        }
        
        return { success: true, appointment: updatedAppointment }
      } else {
        error.value = response.message || 'Erreur lors de la reprogrammation'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la reprogrammation'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const completeAppointment = async (id: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await appointmentApi.complete(id)
      
      if (response.success) {
        // Mettre à jour le statut dans les listes
        const updateStatus = (list: Appointment[]) => {
          const appointment = list.find(apt => apt.id === id)
          if (appointment) {
            appointment.status = 'completed'
          }
        }
        
        updateStatus(appointments.value)
        updateStatus(upcomingAppointments.value)
        updateStatus(pastAppointments.value)
        
        if (selectedAppointment.value?.id === id) {
          selectedAppointment.value.status = 'completed'
        }
        
        // Déplacer vers les rendez-vous passés
        const completedAppointment = upcomingAppointments.value.find(apt => apt.id === id)
        if (completedAppointment) {
          upcomingAppointments.value = upcomingAppointments.value.filter(apt => apt.id !== id)
          pastAppointments.value.unshift(completedAppointment)
        }
        
        return { success: true }
      } else {
        error.value = response.message || 'Erreur lors de la finalisation'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la finalisation'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const getNextPage = async (filters?: any) => {
    if (hasNextPage.value) {
      return await getAppointments(currentPage.value + 1, filters)
    }
    return { success: false, error: 'Pas de page suivante' }
  }

  const getPrevPage = async (filters?: any) => {
    if (hasPrevPage.value) {
      return await getAppointments(currentPage.value - 1, filters)
    }
    return { success: false, error: 'Pas de page précédente' }
  }

  const clearError = () => {
    error.value = null
  }

  const resetPagination = () => {
    pagination.value.page = 1
  }

  return {
    // State
    appointments,
    upcomingAppointments,
    pastAppointments,
    selectedAppointment,
    pagination,
    isLoading,
    error,
    
    // Getters
    hasAppointments,
    hasUpcomingAppointments,
    hasPastAppointments,
    totalAppointments,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    
    // Actions
    getAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    rescheduleAppointment,
    completeAppointment,
    getNextPage,
    getPrevPage,
    clearError,
    resetPagination
  }
})
