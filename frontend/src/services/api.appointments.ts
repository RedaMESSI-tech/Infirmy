import { httpClient } from './http'
import type { 
  ApiResponse, 
  Appointment, 
  BookingRequest, 
  BookingConfirmation, 
  PaginatedResponse,
  Address
} from '@/types'

export interface AppointmentResponse extends PaginatedResponse<Appointment> {}

export interface AppointmentDetailResponse {
  appointment: Appointment
}

export interface AppointmentUpdateResponse {
  appointment: Appointment
}

export const appointmentApi = {
  // Récupérer les rendez-vous
  async getAppointments(
    page: number = 1, 
    limit: number = 20,
    filters?: {
      status?: string
      date?: string
      nurseId?: string
      patientId?: string
      type?: string
    }
  ): Promise<ApiResponse<AppointmentResponse>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    if (filters) {
      if (filters.status) params.append('status', filters.status)
      if (filters.date) params.append('date', filters.date)
      if (filters.nurseId) params.append('nurseId', filters.nurseId)
      if (filters.patientId) params.append('patientId', filters.patientId)
      if (filters.type) params.append('type', filters.type)
    }

    return httpClient.get<AppointmentResponse>(`/appointments?${params.toString()}`)
  },

  // Récupérer un rendez-vous par ID
  async getById(id: string): Promise<ApiResponse<Appointment>> {
    return httpClient.get<Appointment>(`/appointments/${id}`)
  },

  // Créer un rendez-vous
  async create(bookingRequest: BookingRequest): Promise<ApiResponse<BookingConfirmation>> {
    return httpClient.post<BookingConfirmation>('/appointments', bookingRequest)
  },

  // Mettre à jour un rendez-vous
  async update(id: string, updates: Partial<Appointment>): Promise<ApiResponse<AppointmentUpdateResponse>> {
    return httpClient.put<AppointmentUpdateResponse>(`/appointments/${id}`, updates)
  },

  // Annuler un rendez-vous
  async cancel(id: string, reason?: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>(`/appointments/${id}/cancel`, { reason })
  },

  // Reprogrammer un rendez-vous
  async reschedule(
    id: string, 
    newDate: string, 
    newTime: string
  ): Promise<ApiResponse<AppointmentUpdateResponse>> {
    return httpClient.post<AppointmentUpdateResponse>(`/appointments/${id}/reschedule`, {
      newDate,
      newTime
    })
  },

  // Confirmer un rendez-vous
  async confirm(id: string): Promise<ApiResponse<AppointmentUpdateResponse>> {
    return httpClient.post<AppointmentUpdateResponse>(`/appointments/${id}/confirm`)
  },

  // Finaliser un rendez-vous
  async complete(id: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>(`/appointments/${id}/complete`)
  },

  // Marquer comme "no show"
  async markAsNoShow(id: string): Promise<ApiResponse<AppointmentUpdateResponse>> {
    return httpClient.post<AppointmentUpdateResponse>(`/appointments/${id}/no-show`)
  },

  // Récupérer les créneaux disponibles
  async getAvailableSlots(
    nurseId: string,
    date: string,
    duration: number = 60
  ): Promise<ApiResponse<Array<{
    startTime: string
    endTime: string
    isAvailable: boolean
  }>>> {
    const params = new URLSearchParams({
      nurseId,
      date,
      duration: duration.toString()
    })

    return httpClient.get<Array<{
      startTime: string
      endTime: string
      isAvailable: boolean
    }>>(`/appointments/available-slots?${params.toString()}`)
  },

  // Vérifier la disponibilité
  async checkAvailability(
    nurseId: string,
    date: string,
    startTime: string,
    duration: number
  ): Promise<ApiResponse<{
    isAvailable: boolean
    conflictingAppointments?: Array<{
      id: string
      startTime: string
      endTime: string
      patientName: string
    }>
  }>> {
    return httpClient.post(`/appointments/check-availability`, {
      nurseId,
      date,
      startTime,
      duration
    })
  },

  // Récupérer les rendez-vous par date
  async getByDate(date: string): Promise<ApiResponse<Appointment[]>> {
    return httpClient.get<Appointment[]>(`/appointments/date/${date}`)
  },

  // Récupérer les rendez-vous par infirmier
  async getByNurse(
    nurseId: string, 
    page: number = 1, 
    limit: number = 20
  ): Promise<ApiResponse<AppointmentResponse>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    return httpClient.get<AppointmentResponse>(`/appointments/nurse/${nurseId}?${params.toString()}`)
  },

  // Récupérer les rendez-vous par patient
  async getByPatient(
    patientId: string, 
    page: number = 1, 
    limit: number = 20
  ): Promise<ApiResponse<AppointmentResponse>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    return httpClient.get<AppointmentResponse>(`/appointments/patient/${patientId}?${params.toString()}`)
  },

  // Récupérer les rendez-vous à venir
  async getUpcoming(
    page: number = 1, 
    limit: number = 20
  ): Promise<ApiResponse<AppointmentResponse>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    return httpClient.get<AppointmentResponse>(`/appointments/upcoming?${params.toString()}`)
  },

  // Récupérer les rendez-vous passés
  async getPast(
    page: number = 1, 
    limit: number = 20
  ): Promise<ApiResponse<AppointmentResponse>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    return httpClient.get<AppointmentResponse>(`/appointments/past?${params.toString()}`)
  },

  // Récupérer les rendez-vous du jour
  async getToday(): Promise<ApiResponse<Appointment[]>> {
    return httpClient.get<Appointment[]>('/appointments/today')
  },

  // Récupérer les rendez-vous de la semaine
  async getThisWeek(): Promise<ApiResponse<Appointment[]>> {
    return httpClient.get<Appointment[]>('/appointments/this-week')
  },

  // Récupérer les rendez-vous du mois
  async getThisMonth(): Promise<ApiResponse<Appointment[]>> {
    return httpClient.get<Appointment[]>('/appointments/this-month')
  },

  // Ajouter des notes au rendez-vous
  async addNotes(
    id: string, 
    notes: string
  ): Promise<ApiResponse<AppointmentUpdateResponse>> {
    return httpClient.post<AppointmentUpdateResponse>(`/appointments/${id}/notes`, { notes })
  },

  // Mettre à jour l'adresse du rendez-vous
  async updateAddress(
    id: string, 
    address: Address
  ): Promise<ApiResponse<AppointmentUpdateResponse>> {
    return httpClient.patch<AppointmentUpdateResponse>(`/appointments/${id}/address`, { address })
  },

  // Mettre à jour le type de rendez-vous
  async updateType(
    id: string, 
    type: 'consultation' | 'home_visit' | 'emergency'
  ): Promise<ApiResponse<AppointmentUpdateResponse>> {
    return httpClient.patch<AppointmentUpdateResponse>(`/appointments/${id}/type`, { type })
  },

  // Mettre à jour la durée du rendez-vous
  async updateDuration(
    id: string, 
    duration: number
  ): Promise<ApiResponse<AppointmentUpdateResponse>> {
    return httpClient.patch<AppointmentUpdateResponse>(`/appointments/${id}/duration`, { duration })
  },

  // Récupérer les statistiques des rendez-vous
  async getStats(): Promise<ApiResponse<{
    total: number
    confirmed: number
    cancelled: number
    completed: number
    noShow: number
    thisMonth: {
      total: number
      confirmed: number
      cancelled: number
      completed: number
    }
    thisWeek: {
      total: number
      confirmed: number
      cancelled: number
      completed: number
    }
  }>> {
    return httpClient.get<{
      total: number
      confirmed: number
      cancelled: number
      completed: number
      noShow: number
      thisMonth: {
        total: number
        confirmed: number
        cancelled: number
        completed: number
      }
      thisWeek: {
        total: number
        confirmed: number
        cancelled: number
        completed: number
      }
    }>('/appointments/stats')
  },

  // Exporter les rendez-vous
  async export(
    format: 'csv' | 'pdf' | 'excel',
    filters?: {
      startDate?: string
      endDate?: string
      status?: string
      nurseId?: string
      patientId?: string
    }
  ): Promise<ApiResponse<{ downloadUrl: string }>> {
    const params = new URLSearchParams({
      format
    })

    if (filters) {
      if (filters.startDate) params.append('startDate', filters.startDate)
      if (filters.endDate) params.append('endDate', filters.endDate)
      if (filters.status) params.append('status', filters.status)
      if (filters.nurseId) params.append('nurseId', filters.nurseId)
      if (filters.patientId) params.append('patientId', filters.patientId)
    }

    return httpClient.get<{ downloadUrl: string }>(`/appointments/export?${params.toString()}`)
  },

  // Supprimer un rendez-vous (admin seulement)
  async delete(id: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.delete<{ message: string }>(`/appointments/${id}`)
  }
}

export default appointmentApi
