import { httpClient } from './http'
import type { 
  ApiResponse, 
  Review, 
  PaginatedResponse
} from '@/types'

export interface ReviewResponse extends PaginatedResponse<Review> {}

export interface ReviewDetailResponse {
  review: Review
}

export interface ReviewCreateResponse {
  review: Review
}

export const reviewApi = {
  // Récupérer tous les avis
  async getReviews(
    page: number = 1, 
    limit: number = 20,
    filters?: {
      rating?: number
      nurseId?: string
      patientId?: string
      isVerified?: boolean
      dateFrom?: string
      dateTo?: string
    }
  ): Promise<ApiResponse<ReviewResponse>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    if (filters) {
      if (filters.rating) params.append('rating', filters.rating.toString())
      if (filters.nurseId) params.append('nurseId', filters.nurseId)
      if (filters.patientId) params.append('patientId', filters.patientId)
      if (filters.isVerified !== undefined) params.append('isVerified', filters.isVerified.toString())
      if (filters.dateFrom) params.append('dateFrom', filters.dateFrom)
      if (filters.dateTo) params.append('dateTo', filters.dateTo)
    }

    return httpClient.get<ReviewResponse>(`/reviews?${params.toString()}`)
  },

  // Récupérer un avis par ID
  async getById(id: string): Promise<ApiResponse<Review>> {
    return httpClient.get<Review>(`/reviews/${id}`)
  },

  // Récupérer les avis d'un infirmier
  async getByNurse(
    nurseId: string, 
    page: number = 1, 
    limit: number = 20
  ): Promise<ApiResponse<ReviewResponse>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    return httpClient.get<ReviewResponse>(`/reviews/nurse/${nurseId}?${params.toString()}`)
  },

  // Récupérer les avis d'un patient
  async getByUser(
    userId: string, 
    page: number = 1, 
    limit: number = 20
  ): Promise<ApiResponse<ReviewResponse>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    return httpClient.get<ReviewResponse>(`/reviews/user/${userId}?${params.toString()}`)
  },

  // Créer un avis
  async create(reviewData: Omit<Review, 'id' | 'createdAt' | 'isVerified'>): Promise<ApiResponse<ReviewCreateResponse>> {
    return httpClient.post<ReviewCreateResponse>('/reviews', reviewData)
  },

  // Mettre à jour un avis
  async update(
    id: string, 
    updates: Partial<Review>
  ): Promise<ApiResponse<ReviewDetailResponse>> {
    return httpClient.put<ReviewDetailResponse>(`/reviews/${id}`, updates)
  },

  // Supprimer un avis
  async delete(id: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.delete<{ message: string }>(`/reviews/${id}`)
  },

  // Vérifier un avis (admin/modérateur)
  async verify(id: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>(`/reviews/${id}/verify`)
  },

  // Signaler un avis
  async report(
    id: string, 
    reason: string, 
    description?: string
  ): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>(`/reviews/${id}/report`, { reason, description })
  },

  // Récupérer les avis signalés
  async getReportedReviews(
    page: number = 1, 
    limit: number = 20
  ): Promise<ApiResponse<ReviewResponse>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    return httpClient.get<ReviewResponse>(`/reviews/reported?${params.toString()}`)
  },

  // Récupérer les avis en attente de modération
  async getPendingReviews(
    page: number = 1, 
    limit: number = 20
  ): Promise<ApiResponse<ReviewResponse>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    return httpClient.get<ReviewResponse>(`/reviews/pending?${params.toString()}`)
  },

  // Approuver un avis en attente
  async approve(id: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>(`/reviews/${id}/approve`)
  },

  // Rejeter un avis en attente
  async reject(
    id: string, 
    reason: string
  ): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>(`/reviews/${id}/reject`, { reason })
  },

  // Récupérer les avis par note
  async getByRating(
    rating: number, 
    page: number = 1, 
    limit: number = 20
  ): Promise<ApiResponse<ReviewResponse>> {
    const params = new URLSearchParams({
      rating: rating.toString(),
      page: page.toString(),
      limit: limit.toString()
    })

    return httpClient.get<ReviewResponse>(`/reviews/by-rating?${params.toString()}`)
  },

  // Récupérer les avis par date
  async getByDate(
    date: string, 
    page: number = 1, 
    limit: number = 20
  ): Promise<ApiResponse<ReviewResponse>> {
    const params = new URLSearchParams({
      date,
      page: page.toString(),
      limit: limit.toString()
    })

    return httpClient.get<ReviewResponse>(`/reviews/by-date?${params.toString()}`)
  },

  // Récupérer les avis récents
  async getRecent(
    limit: number = 10
  ): Promise<ApiResponse<Review[]>> {
    return httpClient.get<Review[]>(`/reviews/recent?limit=${limit}`)
  },

  // Récupérer les avis populaires
  async getPopular(
    limit: number = 10
  ): Promise<ApiResponse<Review[]>> {
    return httpClient.get<Review[]>(`/reviews/popular?limit=${limit}`)
  },

  // Récupérer les statistiques des avis
  async getStats(): Promise<ApiResponse<{
    total: number
    averageRating: number
    ratingDistribution: {
      1: number
      2: number
      3: number
      4: number
      5: number
    }
    verifiedCount: number
    pendingCount: number
    reportedCount: number
    thisMonth: {
      total: number
      averageRating: number
    }
  }>> {
    return httpClient.get<{
      total: number
      averageRating: number
      ratingDistribution: {
        1: number
        2: number
        3: number
        4: number
        5: number
      }
      verifiedCount: number
      pendingCount: number
      reportedCount: number
      thisMonth: {
        total: number
        averageRating: number
      }
    }>('/reviews/stats')
  },

  // Récupérer les statistiques des avis d'un infirmier
  async getNurseStats(nurseId: string): Promise<ApiResponse<{
    total: number
    averageRating: number
    ratingDistribution: {
      1: number
      2: number
      3: number
      4: number
      5: number
    }
    verifiedCount: number
    thisMonth: {
      total: number
      averageRating: number
    }
  }>> {
    return httpClient.get<{
      total: number
      averageRating: number
      ratingDistribution: {
        1: number
        2: number
        3: number
        4: number
        5: number
      }
      verifiedCount: number
      thisMonth: {
        total: number
        averageRating: number
      }
    }>(`/reviews/nurse/${nurseId}/stats`)
  },

  // Rechercher dans les avis
  async search(
    query: string, 
    page: number = 1, 
    limit: number = 20
  ): Promise<ApiResponse<ReviewResponse>> {
    const params = new URLSearchParams({
      query,
      page: page.toString(),
      limit: limit.toString()
    })

    return httpClient.get<ReviewResponse>(`/reviews/search?${params.toString()}`)
  },

  // Exporter les avis
  async export(
    format: 'csv' | 'pdf' | 'excel',
    filters?: {
      startDate?: string
      endDate?: string
      rating?: number
      nurseId?: string
      patientId?: string
      isVerified?: boolean
    }
  ): Promise<ApiResponse<{ downloadUrl: string }>> {
    const params = new URLSearchParams({
      format
    })

    if (filters) {
      if (filters.startDate) params.append('startDate', filters.startDate)
      if (filters.endDate) params.append('endDate', filters.endDate)
      if (filters.rating) params.append('rating', filters.rating.toString())
      if (filters.nurseId) params.append('nurseId', filters.nurseId)
      if (filters.patientId) params.append('patientId', filters.patientId)
      if (filters.isVerified !== undefined) params.append('isVerified', filters.isVerified.toString())
    }

    return httpClient.get<{ downloadUrl: string }>(`/reviews/export?${params.toString()}`)
  },

  // Récupérer les avis similaires
  async getSimilar(
    reviewId: string, 
    limit: number = 5
  ): Promise<ApiResponse<Review[]>> {
    return httpClient.get<Review[]>(`/reviews/${reviewId}/similar?limit=${limit}`)
  },

  // Marquer un avis comme utile
  async markAsHelpful(id: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>(`/reviews/${id}/helpful`)
  },

  // Marquer un avis comme inutile
  async markAsUnhelpful(id: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>(`/reviews/${id}/unhelpful`)
  },

  // Récupérer le nombre d'avis utiles
  async getHelpfulCount(id: string): Promise<ApiResponse<{ count: number }>> {
    return httpClient.get<{ count: number }>(`/reviews/${id}/helpful-count`)
  }
}

export default reviewApi
