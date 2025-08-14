import type { GeoLocation, NominatimResult, PhotonResult } from '@/types'

// Configuration des services de géolocalisation
const NOMINATIM_BASE_URL = import.meta.env.VITE_NOMINATIM_URL || 'https://nominatim.openstreetmap.org'
const PHOTON_BASE_URL = import.meta.env.VITE_PHOTON_URL || 'https://photon.komoot.io'

export interface GeocodingResult {
  lat: number
  lng: number
  address: string
  city: string
  postalCode: string
  country: string
  displayName: string
  confidence: number
}

export interface ReverseGeocodingResult {
  address: string
  city: string
  postalCode: string
  country: string
  street: string
  houseNumber?: string
  suburb?: string
  state?: string
}

export const geoApi = {
  // Géocodage avec Nominatim (OpenStreetMap)
  async geocodeNominatim(query: string): Promise<GeocodingResult[]> {
    try {
      const params = new URLSearchParams({
        q: query,
        format: 'json',
        limit: '10',
        addressdetails: '1',
        countrycodes: 'fr,be,ch,ca', // Pays francophones
        'accept-language': 'fr'
      })

      const response = await fetch(`${NOMINATIM_BASE_URL}/search?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error(`Erreur Nominatim: ${response.status}`)
      }

      const data: NominatimResult[] = await response.json()
      
      return data.map(result => ({
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        address: result.display_name,
        city: result.address.city || result.address.suburb || '',
        postalCode: result.address.postcode || '',
        country: result.address.country || '',
        displayName: result.display_name,
        confidence: result.importance
      }))
    } catch (error) {
      console.error('Erreur lors du géocodage Nominatim:', error)
      return []
    }
  },

  // Géocodage avec Photon (fallback)
  async geocodePhoton(query: string): Promise<GeocodingResult[]> {
    try {
      const params = new URLSearchParams({
        q: query,
        limit: '10',
        lang: 'fr'
      })

      const response = await fetch(`${PHOTON_BASE_URL}/api?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error(`Erreur Photon: ${response.status}`)
      }

      const data = await response.json()
      
      if (!data.features) {
        return []
      }

      return data.features.map((feature: PhotonResult) => ({
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0],
        address: feature.properties.formatted,
        city: feature.properties.city || feature.properties.county || '',
        postalCode: feature.properties.postcode || '',
        country: feature.properties.country || '',
        displayName: feature.properties.formatted,
        confidence: 0.5 // Photon n'a pas de score de confiance
      }))
    } catch (error) {
      console.error('Erreur lors du géocodage Photon:', error)
      return []
    }
  },

  // Géocodage principal avec fallback
  async geocode(query: string): Promise<GeocodingResult[]> {
    // Essayer d'abord Nominatim
    let results = await this.geocodeNominatim(query)
    
    // Si pas de résultats, essayer Photon
    if (results.length === 0) {
      results = await this.geocodePhoton(query)
    }
    
    return results
  },

  // Géocodage inverse avec Nominatim
  async reverseGeocode(lat: number, lng: number): Promise<ReverseGeocodingResult | null> {
    try {
      const params = new URLSearchParams({
        lat: lat.toString(),
        lon: lng.toString(),
        format: 'json',
        addressdetails: '1',
        'accept-language': 'fr'
      })

      const response = await fetch(`${NOMINATIM_BASE_URL}/reverse?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error(`Erreur Nominatim reverse: ${response.status}`)
      }

      const data: NominatimResult = await response.json()
      
      if (!data.address) {
        return null
      }

      return {
        address: data.display_name,
        city: data.address.city || data.address.suburb || '',
        postalCode: data.address.postcode || '',
        country: data.address.country || '',
        street: data.address.road || '',
        houseNumber: data.address.house_number,
        suburb: data.address.suburb,
        state: data.address.state
      }
    } catch (error) {
      console.error('Erreur lors du géocodage inverse:', error)
      return null
    }
  },

  // Calculer la distance entre deux points (formule de Haversine)
  calculateDistance(
    lat1: number, 
    lng1: number, 
    lat2: number, 
    lng2: number
  ): number {
    const R = 6371 // Rayon de la Terre en km
    const dLat = this.deg2rad(lat2 - lat1)
    const dLng = this.deg2rad(lng2 - lng1)
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  },

  // Convertir les degrés en radians
  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
  },

  // Calculer le temps de trajet estimé (approximatif)
  calculateTravelTime(distance: number, mode: 'driving' | 'walking' | 'cycling' = 'driving'): number {
    const speeds = {
      driving: 30, // km/h en ville
      walking: 5,  // km/h
      cycling: 15  // km/h
    }
    
    return Math.round((distance / speeds[mode]) * 60) // en minutes
  },

  // Vérifier si un point est dans un rayon donné
  isWithinRadius(
    centerLat: number, 
    centerLng: number, 
    pointLat: number, 
    pointLng: number, 
    radius: number
  ): boolean {
    const distance = this.calculateDistance(centerLat, centerLng, pointLat, pointLng)
    return distance <= radius
  },

  // Obtenir le centre d'un ensemble de points
  getCenter(points: Array<{ lat: number; lng: number }>): { lat: number; lng: number } | null {
    if (points.length === 0) return null
    
    const totalLat = points.reduce((sum, point) => sum + point.lat, 0)
    const totalLng = points.reduce((sum, point) => sum + point.lng, 0)
    
    return {
      lat: totalLat / points.length,
      lng: totalLng / points.length
    }
  },

  // Obtenir la boîte englobante d'un ensemble de points
  getBoundingBox(points: Array<{ lat: number; lng: number }>): {
    north: number
    south: number
    east: number
    west: number
  } | null {
    if (points.length === 0) return null
    
    const lats = points.map(p => p.lat)
    const lngs = points.map(p => p.lng)
    
    return {
      north: Math.max(...lats),
      south: Math.min(...lats),
      east: Math.max(...lngs),
      west: Math.min(...lngs)
    }
  },

  // Formater une adresse
  formatAddress(components: {
    street?: string
    houseNumber?: string
    city?: string
    postalCode?: string
    country?: string
  }): string {
    const parts = []
    
    if (components.houseNumber && components.street) {
      parts.push(`${components.houseNumber} ${components.street}`)
    } else if (components.street) {
      parts.push(components.street)
    }
    
    if (components.postalCode && components.city) {
      parts.push(`${components.postalCode} ${components.city}`)
    } else if (components.city) {
      parts.push(components.city)
    }
    
    if (components.country) {
      parts.push(components.country)
    }
    
    return parts.join(', ')
  },

  // Valider des coordonnées
  validateCoordinates(lat: number, lng: number): boolean {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
  },

  // Obtenir la position actuelle de l'utilisateur
  async getCurrentPosition(): Promise<{ lat: number; lng: number } | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null)
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error)
          resolve(null)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      )
    })
  }
}

export default geoApi
