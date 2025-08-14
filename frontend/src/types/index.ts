// User types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'patient' | 'nurse'
  phone?: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface Patient extends User {
  role: 'patient'
  dateOfBirth?: string
  addresses: Address[]
  emergencyContact?: EmergencyContact
  medicalHistory?: string
  preferences: PatientPreferences
}

export interface Nurse extends User {
  role: 'nurse'
  profile: NurseProfile
  specialities: string[]
  availabilities: AvailabilityRule[]
  rating: number
  reviewCount: number
  verified: boolean
  hdsCertified: boolean
}

// Profile types
export interface NurseProfile {
  id: string
  nurseId: string
  bio: string
  experience: number
  education: string[]
  certifications: string[]
  languages: string[]
  interventionZones: InterventionZone[]
  pricing: PricingInfo
  documents: Document[]
}

export interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  street: string
  city: string
  postalCode: string
  country: string
  latitude?: number
  longitude?: number
  isDefault: boolean
}

export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  email?: string
}

export interface PatientPreferences {
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
  language: 'fr' | 'en'
  accessibility: {
    highContrast: boolean
    largeText: boolean
  }
}

export interface InterventionZone {
  id: string
  center: {
    latitude: number
    longitude: number
  }
  radius: number
  cities: string[]
}

export interface PricingInfo {
  consultation: number
  homeVisit: number
  nightVisit: number
  weekendVisit: number
  currency: 'EUR'
}

export interface Document {
  id: string
  type: 'id' | 'diploma' | 'certification' | 'insurance' | 'other'
  name: string
  url: string
  verified: boolean
  uploadedAt: string
}

// Availability types
export interface AvailabilityRule {
  id: string
  nurseId: string
  type: 'weekly' | 'specific' | 'exception'
  dayOfWeek?: number // 0-6 (Sunday-Saturday)
  startTime: string // HH:mm
  endTime: string // HH:mm
  startDate?: string // YYYY-MM-DD
  endDate?: string // YYYY-MM-DD
  isAvailable: boolean
  location: 'home' | 'cabinet' | 'both'
}

export interface TimeSlot {
  id: string
  nurseId: string
  date: string
  startTime: string
  endTime: string
  duration: number // minutes
  isAvailable: boolean
  location: 'home' | 'cabinet'
  price: number
}

// Appointment types
export interface Appointment {
  id: string
  patientId: string
  nurseId: string
  timeSlotId: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show'
  type: 'consultation' | 'home-visit' | 'follow-up'
  location: 'home' | 'cabinet'
  address?: Address
  notes?: string
  symptoms?: string
  createdAt: string
  updatedAt: string
  scheduledAt: string
  duration: number
  price: number
}

// Message types
export interface Message {
  id: string
  threadId: string
  senderId: string
  senderType: 'patient' | 'nurse'
  content: string
  type: 'text' | 'image' | 'file'
  attachments?: Attachment[]
  status: 'sent' | 'delivered' | 'read'
  createdAt: string
  readAt?: string
}

export interface MessageThread {
  id: string
  patientId: string
  nurseId: string
  lastMessage?: Message
  unreadCount: number
  createdAt: string
  updatedAt: string
}

export interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
}

// Review types
export interface Review {
  id: string
  appointmentId: string
  patientId: string
  nurseId: string
  rating: number // 1-5
  comment?: string
  anonymous: boolean
  createdAt: string
  updatedAt: string
}

// Search types
export interface SearchFilters {
  query?: string
  location?: {
    latitude: number
    longitude: number
    city?: string
  }
  radius?: number
  speciality?: string
  date?: string
  time?: string
  locationType?: 'home' | 'cabinet' | 'both'
  rating?: number
  priceRange?: {
    min: number
    max: number
  }
  availableToday?: boolean
  availableWeekend?: boolean
}

export interface SearchResult {
  nurse: Nurse
  distance: number
  nextAvailableSlot?: TimeSlot
  averageResponseTime: number
}

// API types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// UI types
export interface LoadingState {
  show: boolean
  persistent: boolean
  scrim: boolean
  width: string
  height: string
  size: number
  color: string
  title: string
  message: string
  cancelable: boolean
  onCancel?: () => void
}

export interface Snackbar {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  timeout?: number
  actionText?: string
  action?: () => void
}

export interface Dialog {
  id: string
  title: string
  text?: string
  type?: 'info' | 'warning' | 'error' | 'confirm'
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'tel' | 'number' | 'select' | 'textarea' | 'date'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  validation?: ValidationRule[]
  disabled?: boolean
}

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom'
  value?: any
  message: string
  validator?: (value: any) => boolean
}

// Navigation types
export interface Breadcrumb {
  text: string
  to?: string
  disabled?: boolean
}

export interface MenuItem {
  title: string
  icon: string
  to?: string
  action?: () => void
  children?: MenuItem[]
  badge?: string | number
  disabled?: boolean
}

// Map types
export interface MapMarker {
  id: string
  position: [number, number] // [lat, lng]
  title: string
  type: 'nurse' | 'clinic' | 'pharmacy'
  data: any
}

export interface MapCluster {
  position: [number, number]
  count: number
  markers: MapMarker[]
}
