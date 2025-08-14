import { httpClient } from './http'
import type { 
  ApiResponse, 
  Nurse, 
  SearchFilters, 
  SearchResult, 
  PaginatedResponse,
  Address,
  InterventionZone,
  Availability,
  Pricing
} from '@/types'

export interface NurseSearchResponse extends PaginatedResponse<SearchResult> {}

export interface NurseProfileResponse {
  nurse: Nurse
}

export interface NurseUpdateResponse {
  nurse: Nurse
}

export const nurseApi = {
  // Recherche d'infirmiers
  async search(
    filters: SearchFilters, 
    page: number = 1, 
    limit: number = 20
  ): Promise<ApiResponse<NurseSearchResponse>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    // Ajouter les filtres
    if (filters.location) {
      params.append('location', filters.location)
    }
    if (filters.coordinates) {
      params.append('lat', filters.coordinates.lat.toString())
      params.append('lng', filters.coordinates.lng.toString())
    }
    if (filters.radius) {
      params.append('radius', filters.radius.toString())
    }
    if (filters.specializations && filters.specializations.length > 0) {
      filters.specializations.forEach(spec => {
        params.append('specializations[]', spec)
      })
    }
    if (filters.availability) {
      params.append('availabilityDate', filters.availability.date)
      params.append('availabilityTime', filters.availability.time)
    }
    if (filters.rating) {
      params.append('minRating', filters.rating.toString())
    }
    if (filters.maxPrice) {
      params.append('maxPrice', filters.maxPrice.toString())
    }
    if (filters.homeVisit !== undefined) {
      params.append('homeVisit', filters.homeVisit.toString())
    }

    return httpClient.get<NurseSearchResponse>(`/nurses/search?${params.toString()}`)
  },

  // Récupérer un infirmier par ID
  async getById(id: string): Promise<ApiResponse<Nurse>> {
    return httpClient.get<Nurse>(`/nurses/${id}`)
  },

  // Récupérer les infirmiers par spécialisation
  async getBySpecialization(specialization: string): Promise<ApiResponse<Nurse[]>> {
    return httpClient.get<Nurse[]>(`/nurses/specialization/${specialization}`)
  },

  // Récupérer les infirmiers par localisation
  async getByLocation(
    coordinates: { lat: number; lng: number }, 
    radius: number
  ): Promise<ApiResponse<Nurse[]>> {
    const params = new URLSearchParams({
      lat: coordinates.lat.toString(),
      lng: coordinates.lng.toString(),
      radius: radius.toString()
    })

    return httpClient.get<Nurse[]>(`/nurses/location?${params.toString()}`)
  },

  // Récupérer les infirmiers disponibles
  async getAvailable(
    date: string, 
    time: string, 
    location?: { lat: number; lng: number }
  ): Promise<ApiResponse<Nurse[]>> {
    const params = new URLSearchParams({
      date,
      time
    })

    if (location) {
      params.append('lat', location.lat.toString())
      params.append('lng', location.lng.toString())
    }

    return httpClient.get<Nurse[]>(`/nurses/available?${params.toString()}`)
  },

  // Récupérer les infirmiers populaires
  async getPopular(limit: number = 10): Promise<ApiResponse<Nurse[]>> {
    return httpClient.get<Nurse[]>(`/nurses/popular?limit=${limit}`)
  },

  // Récupérer les infirmiers récemment ajoutés
  async getRecent(limit: number = 10): Promise<ApiResponse<Nurse[]>> {
    return httpClient.get<Nurse[]>(`/nurses/recent?limit=${limit}`)
  },

  // Récupérer les infirmiers recommandés pour un utilisateur
  async getRecommended(userId: string, limit: number = 10): Promise<ApiResponse<Nurse[]>> {
    return httpClient.get<Nurse[]>(`/nurses/recommended/${userId}?limit=${limit}`)
  },

  // Mettre à jour le profil infirmier
  async updateProfile(id: string, data: Partial<Nurse>): Promise<ApiResponse<NurseUpdateResponse>> {
    return httpClient.put<NurseUpdateResponse>(`/nurses/${id}/profile`, data)
  },

  // Mettre à jour les informations de base
  async updateBasicInfo(id: string, data: {
    firstName?: string
    lastName?: string
    phone?: string
    bio?: string
    experience?: number
    specializations?: string[]
  }): Promise<ApiResponse<NurseUpdateResponse>> {
    return httpClient.patch<NurseUpdateResponse>(`/nurses/${id}/basic-info`, data)
  },

  // Mettre à jour l'adresse
  async updateAddress(id: string, address: Address): Promise<ApiResponse<NurseUpdateResponse>> {
    return httpClient.patch<NurseUpdateResponse>(`/nurses/${id}/address`, { address })
  },

  // Mettre à jour les zones d'intervention
  async updateInterventionZones(
    id: string, 
    zones: InterventionZone[]
  ): Promise<ApiResponse<NurseUpdateResponse>> {
    return httpClient.put<NurseUpdateResponse>(`/nurses/${id}/intervention-zones`, { zones })
  },

  // Ajouter une zone d'intervention
  async addInterventionZone(
    id: string, 
    zone: Omit<InterventionZone, 'id'>
  ): Promise<ApiResponse<NurseUpdateResponse>> {
    return httpClient.post<NurseUpdateResponse>(`/nurses/${id}/intervention-zones`, zone)
  },

  // Supprimer une zone d'intervention
  async removeInterventionZone(id: string, zoneId: string): Promise<ApiResponse<NurseUpdateResponse>> {
    return httpClient.delete<NurseUpdateResponse>(`/nurses/${id}/intervention-zones/${zoneId}`)
  },

  // Mettre à jour les disponibilités
  async updateAvailabilities(
    id: string, 
    availabilities: Availability[]
  ): Promise<ApiResponse<NurseUpdateResponse>> {
    return httpClient.put<NurseUpdateResponse>(`/nurses/${id}/availabilities`, { availabilities })
  },

  // Ajouter une disponibilité
  async addAvailability(
    id: string, 
    availability: Omit<Availability, 'id'>
  ): Promise<ApiResponse<NurseUpdateResponse>> {
    return httpClient.post<NurseUpdateResponse>(`/nurses/${id}/availabilities`, availability)
  },

  // Supprimer une disponibilité
  async removeAvailability(id: string, availabilityId: string): Promise<ApiResponse<NurseUpdateResponse>> {
    return httpClient.delete<NurseUpdateResponse>(`/nurses/${id}/availabilities/${availabilityId}`)
  },

  // Mettre à jour les tarifs
  async updatePricing(id: string, pricing: Pricing): Promise<ApiResponse<NurseUpdateResponse>> {
    return httpClient.patch<NurseUpdateResponse>(`/nurses/${id}/pricing`, { pricing })
  },

  // Mettre à jour le statut d'activité
  async updateActivityStatus(id: string, isActive: boolean): Promise<ApiResponse<NurseUpdateResponse>> {
    return httpClient.patch<NurseUpdateResponse>(`/nurses/${id}/activity-status`, { isActive })
  },

  // Télécharger un document
  async uploadDocument(
    id: string, 
    file: File, 
    type: string
  ): Promise<ApiResponse<{ documentId: string; url: string }>> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)

    return httpClient.upload<{ documentId: string; url: string }>(`/nurses/${id}/documents`, file)
  },

  // Supprimer un document
  async deleteDocument(id: string, documentId: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.delete<{ message: string }>(`/nurses/${id}/documents/${documentId}`)
  },

  // Récupérer les documents
  async getDocuments(id: string): Promise<ApiResponse<Array<{
    id: string
    type: string
    name: string
    url: string
    status: string
    uploadedAt: string
  }>>> {
    return httpClient.get<Array<{
      id: string
      type: string
      name: string
      url: string
      status: string
      uploadedAt: string
    }>>(`/nurses/${id}/documents`)
  },

  // Mettre à jour le statut KYC
  async updateKYCStatus(
    id: string, 
    status: 'pending' | 'approved' | 'rejected',
    reason?: string
  ): Promise<ApiResponse<NurseUpdateResponse>> {
    return httpClient.patch<NurseUpdateResponse>(`/nurses/${id}/kyc-status`, { 
      status, 
      reason 
    })
  },

  // Récupérer les statistiques de l'infirmier
  async getStats(id: string): Promise<ApiResponse<{
    totalAppointments: number
    completedAppointments: number
    cancelledAppointments: number
    totalRevenue: number
    averageRating: number
    totalReviews: number
    thisMonth: {
      appointments: number
      revenue: number
      newPatients: number
    }
  }>> {
    return httpClient.get<{
      totalAppointments: number
      completedAppointments: number
      cancelledAppointments: number
      totalRevenue: number
      averageRating: number
      totalReviews: number
      thisMonth: {
        appointments: number
        revenue: number
        newPatients: number
      }
    }>(`/nurses/${id}/stats`)
  },

  // Récupérer le calendrier de l'infirmier
  async getCalendar(
    id: string, 
    startDate: string, 
    endDate: string
  ): Promise<ApiResponse<Array<{
    date: string
    availabilities: Availability[]
    appointments: Array<{
      id: string
      startTime: string
      endTime: string
      patientName: string
      status: string
    }>
  }>>> {
    const params = new URLSearchParams({
      startDate,
      endDate
    })

    return httpClient.get<Array<{
      date: string
      availabilities: Availability[]
      appointments: Array<{
        id: string
        startTime: string
        endTime: string
        patientName: string
        status: string
      }>
    }>>(`/nurses/${id}/calendar?${params.toString()}`)
  },

  // Récupérer les demandes de rendez-vous
  async getBookingRequests(
    id: string, 
    status?: 'pending' | 'accepted' | 'rejected'
  ): Promise<ApiResponse<Array<{
    id: string
    patientName: string
    patientPhone: string
    requestedDate: string
    requestedTime: string
    duration: number
    type: string
    notes?: string
    status: string
    createdAt: string
  }>>> {
    const params = new URLSearchParams()
    if (status) {
      params.append('status', status)
    }

    return httpClient.get<Array<{
      id: string
      patientName: string
      patientPhone: string
      requestedDate: string
      requestedTime: string
      duration: number
      type: string
      notes?: string
      status: string
      createdAt: string
    }>>(`/nurses/${id}/booking-requests?${params.toString()}`)
  },

  // Accepter une demande de rendez-vous
  async acceptBookingRequest(
    id: string, 
    requestId: string
  ): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>(`/nurses/${id}/booking-requests/${requestId}/accept`)
  },

  // Rejeter une demande de rendez-vous
  async rejectBookingRequest(
    id: string, 
    requestId: string, 
    reason?: string
  ): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>(`/nurses/${id}/booking-requests/${requestId}/reject`, { reason })
  }
}

export default nurseApi
