import { z } from 'zod'

// Schémas de validation de base
export const emailSchema = z
  .string()
  .min(1, 'L\'email est requis')
  .email('Format d\'email invalide')

export const passwordSchema = z
  .string()
  .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre')

export const confirmPasswordSchema = z
  .string()
  .min(1, 'La confirmation du mot de passe est requise')

export const phoneSchema = z
  .string()
  .regex(/^(\+33|0)[1-9](\d{8})$/, 'Format de téléphone invalide (ex: 0123456789 ou +33123456789)')
  .optional()

export const nameSchema = z
  .string()
  .min(2, 'Le nom doit contenir au moins 2 caractères')
  .max(50, 'Le nom ne peut pas dépasser 50 caractères')
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes')

export const postalCodeSchema = z
  .string()
  .regex(/^\d{5}$/, 'Le code postal doit contenir 5 chiffres')

export const citySchema = z
  .string()
  .min(2, 'La ville doit contenir au moins 2 caractères')
  .max(100, 'La ville ne peut pas dépasser 100 caractères')

export const streetSchema = z
  .string()
  .min(5, 'L\'adresse doit contenir au moins 5 caractères')
  .max(200, 'L\'adresse ne peut pas dépasser 200 caractères')

// Schémas de validation pour l'authentification
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Le mot de passe est requis'),
  rememberMe: z.boolean().optional()
})

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  phone: phoneSchema,
  role: z.enum(['patient', 'nurse'], {
    required_error: 'Veuillez sélectionner un rôle'
  }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter les conditions d\'utilisation'
  }),
  acceptMarketing: z.boolean().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
})

export const forgotPasswordSchema = z.object({
  email: emailSchema
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Le token est requis'),
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Le mot de passe actuel est requis'),
  newPassword: passwordSchema,
  confirmNewPassword: confirmPasswordSchema
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'Les nouveaux mots de passe ne correspondent pas',
  path: ['confirmNewPassword']
})

// Schémas de validation pour les profils
export const profileUpdateSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  phone: phoneSchema,
  avatar: z.instanceof(File).optional()
})

export const addressSchema = z.object({
  street: streetSchema,
  city: citySchema,
  postalCode: postalCodeSchema,
  country: z.string().min(2, 'Le pays doit contenir au moins 2 caractères').max(100, 'Le pays ne peut pas dépasser 100 caractères')
})

export const patientProfileSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  phone: phoneSchema,
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide (YYYY-MM-DD)').optional(),
  address: addressSchema.optional(),
  emergencyContact: z.object({
    name: nameSchema,
    phone: phoneSchema,
    relationship: z.string().min(2, 'La relation doit contenir au moins 2 caractères').max(50, 'La relation ne peut pas dépasser 50 caractères')
  }).optional(),
  preferences: z.object({
    language: z.enum(['fr', 'en']).optional(),
    notifications: z.boolean().optional(),
    marketing: z.boolean().optional()
  }).optional()
})

export const nurseProfileSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  phone: phoneSchema,
  bio: z.string().max(1000, 'La bio ne peut pas dépasser 1000 caractères').optional(),
  experience: z.number().min(0, 'L\'expérience ne peut pas être négative').max(50, 'L\'expérience ne peut pas dépasser 50 ans').optional(),
  specializations: z.array(z.string().min(2, 'Chaque spécialisation doit contenir au moins 2 caractères')).min(1, 'Au moins une spécialisation est requise').optional(),
  address: addressSchema,
  interventionZones: z.array(z.object({
    name: z.string().min(2, 'Le nom de la zone doit contenir au moins 2 caractères').max(100, 'Le nom de la zone ne peut pas dépasser 100 caractères'),
    postalCodes: z.array(z.string().regex(/^\d{5}$/, 'Format de code postal invalide')).min(1, 'Au moins un code postal est requis'),
    radius: z.number().min(1, 'Le rayon doit être d\'au moins 1 km').max(100, 'Le rayon ne peut pas dépasser 100 km')
  })).min(1, 'Au moins une zone d\'intervention est requise').optional(),
  pricing: z.object({
    consultationFee: z.number().min(0, 'Le tarif de consultation ne peut pas être négatif').max(1000, 'Le tarif de consultation ne peut pas dépasser 1000€'),
    homeVisitFee: z.number().min(0, 'Le tarif de visite à domicile ne peut pas être négatif').max(1000, 'Le tarif de visite à domicile ne peut pas dépasser 1000€'),
    emergencyFee: z.number().min(0, 'Le tarif d\'urgence ne peut pas être négatif').max(1000, 'Le tarif d\'urgence ne peut pas dépasser 1000€').optional()
  }).optional()
})

// Schémas de validation pour les rendez-vous
export const bookingRequestSchema = z.object({
  nurseId: z.string().min(1, 'L\'infirmier est requis'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide (YYYY-MM-DD)'),
  startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format d\'heure invalide (HH:MM)'),
  duration: z.number().min(15, 'La durée minimale est de 15 minutes').max(480, 'La durée maximale est de 8 heures'),
  type: z.enum(['consultation', 'home_visit'], {
    required_error: 'Veuillez sélectionner un type de rendez-vous'
  }),
  address: addressSchema,
  notes: z.string().max(500, 'Les notes ne peuvent pas dépasser 500 caractères').optional()
})

export const appointmentUpdateSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide (YYYY-MM-DD)').optional(),
  startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format d\'heure invalide (HH:MM)').optional(),
  duration: z.number().min(15, 'La durée minimale est de 15 minutes').max(480, 'La durée maximale est de 8 heures').optional(),
  type: z.enum(['consultation', 'home_visit', 'emergency']).optional(),
  address: addressSchema.optional(),
  notes: z.string().max(500, 'Les notes ne peuvent pas dépasser 500 caractères').optional()
})

// Schémas de validation pour les avis
export const reviewSchema = z.object({
  rating: z.number().min(1, 'La note doit être d\'au moins 1').max(5, 'La note ne peut pas dépasser 5'),
  comment: z.string().max(1000, 'Le commentaire ne peut pas dépasser 1000 caractères').optional()
})

export const reviewUpdateSchema = z.object({
  rating: z.number().min(1, 'La note doit être d\'au moins 1').max(5, 'La note ne peut pas dépasser 5').optional(),
  comment: z.string().max(1000, 'Le commentaire ne peut pas dépasser 1000 caractères').optional()
})

// Schémas de validation pour les messages
export const messageSchema = z.object({
  content: z.string().min(1, 'Le message ne peut pas être vide').max(2000, 'Le message ne peut pas dépasser 2000 caractères'),
  attachments: z.array(z.instanceof(File)).max(5, 'Maximum 5 pièces jointes autorisées').optional()
})

// Schémas de validation pour la recherche
export const searchFiltersSchema = z.object({
  location: z.string().min(2, 'La localisation doit contenir au moins 2 caractères').optional(),
  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180)
  }).optional(),
  radius: z.number().min(1, 'Le rayon doit être d\'au moins 1 km').max(100, 'Le rayon ne peut pas dépasser 100 km').optional(),
  specializations: z.array(z.string()).optional(),
  availability: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide (YYYY-MM-DD)'),
    time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format d\'heure invalide (HH:MM)')
  }).optional(),
  rating: z.number().min(1, 'La note minimale doit être d\'au moins 1').max(5, 'La note minimale ne peut pas dépasser 5').optional(),
  maxPrice: z.number().min(0, 'Le prix maximum ne peut pas être négatif').max(1000, 'Le prix maximum ne peut pas dépasser 1000€').optional(),
  homeVisit: z.boolean().optional()
})

// Schémas de validation pour les disponibilités
export const availabilitySchema = z.object({
  dayOfWeek: z.number().min(0, 'Le jour de la semaine doit être entre 0 et 6').max(6, 'Le jour de la semaine doit être entre 0 et 6'),
  startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format d\'heure invalide (HH:MM)'),
  endTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format d\'heure invalide (HH:MM)'),
  isRecurring: z.boolean()
}).refine((data) => {
  const start = new Date(`2000-01-01T${data.startTime}:00`)
  const end = new Date(`2000-01-01T${data.endTime}:00`)
  return start < end
}, {
  message: 'L\'heure de fin doit être après l\'heure de début',
  path: ['endTime']
})

export const availabilityExceptionSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide (YYYY-MM-DD)'),
  startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format d\'heure invalide (HH:MM)').optional(),
  endTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format d\'heure invalide (HH:MM)').optional(),
  isAvailable: z.boolean(),
  reason: z.string().max(200, 'La raison ne peut pas dépasser 200 caractères').optional()
})

// Schémas de validation pour les tarifs
export const pricingSchema = z.object({
  consultationFee: z.number().min(0, 'Le tarif de consultation ne peut pas être négatif').max(1000, 'Le tarif de consultation ne peut pas dépasser 1000€'),
  homeVisitFee: z.number().min(0, 'Le tarif de visite à domicile ne peut pas être négatif').max(1000, 'Le tarif de visite à domicile ne peut pas dépasser 1000€'),
  emergencyFee: z.number().min(0, 'Le tarif d\'urgence ne peut pas être négatif').max(1000, 'Le tarif d\'urgence ne peut pas dépasser 1000€').optional(),
  currency: z.literal('EUR'),
  paymentMethods: z.array(z.string()).min(1, 'Au moins un moyen de paiement est requis')
})

// Schémas de validation pour les zones d'intervention
export const interventionZoneSchema = z.object({
  name: z.string().min(2, 'Le nom de la zone doit contenir au moins 2 caractères').max(100, 'Le nom de la zone ne peut pas dépasser 100 caractères'),
  postalCodes: z.array(z.string().regex(/^\d{5}$/, 'Format de code postal invalide')).min(1, 'Au moins un code postal est requis'),
  radius: z.number().min(1, 'Le rayon doit être d\'au moins 1 km').max(100, 'Le rayon ne peut pas dépasser 100 km')
})

// Schémas de validation pour les documents
export const documentSchema = z.object({
  type: z.enum(['id_card', 'diploma', 'license', 'insurance', 'other'], {
    required_error: 'Veuillez sélectionner un type de document'
  }),
  name: z.string().min(2, 'Le nom du document doit contenir au moins 2 caractères').max(200, 'Le nom du document ne peut pas dépasser 200 caractères'),
  file: z.instanceof(File).refine((file) => file.size > 0, 'Le fichier ne peut pas être vide')
})

// Schémas de validation pour les notifications
export const notificationPreferencesSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  appointmentReminders: z.boolean(),
  newMessages: z.boolean(),
  reviewRequests: z.boolean(),
  marketingEmails: z.boolean()
})

// Schémas de validation pour les préférences de sécurité
export const securityPreferencesSchema = z.object({
  twoFactorEnabled: z.boolean(),
  loginNotifications: z.boolean(),
  sessionTimeout: z.number().min(15, 'Le timeout de session doit être d\'au moins 15 minutes').max(1440, 'Le timeout de session ne peut pas dépasser 24 heures'),
  requirePasswordChange: z.boolean(),
  passwordExpiryDays: z.number().min(30, 'L\'expiration du mot de passe doit être d\'au moins 30 jours').max(365, 'L\'expiration du mot de passe ne peut pas dépasser 1 an').optional()
})

// Types TypeScript dérivés des schémas
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>
export type PatientProfileFormData = z.infer<typeof patientProfileSchema>
export type NurseProfileFormData = z.infer<typeof nurseProfileSchema>
export type AddressFormData = z.infer<typeof addressSchema>
export type BookingRequestFormData = z.infer<typeof bookingRequestSchema>
export type AppointmentUpdateFormData = z.infer<typeof appointmentUpdateSchema>
export type ReviewFormData = z.infer<typeof reviewSchema>
export type ReviewUpdateFormData = z.infer<typeof reviewUpdateSchema>
export type MessageFormData = z.infer<typeof messageSchema>
export type SearchFiltersFormData = z.infer<typeof searchFiltersSchema>
export type AvailabilityFormData = z.infer<typeof availabilitySchema>
export type AvailabilityExceptionFormData = z.infer<typeof availabilityExceptionSchema>
export type PricingFormData = z.infer<typeof pricingSchema>
export type InterventionZoneFormData = z.infer<typeof interventionZoneSchema>
export type DocumentFormData = z.infer<typeof documentSchema>
export type NotificationPreferencesFormData = z.infer<typeof notificationPreferencesSchema>
export type SecurityPreferencesFormData = z.infer<typeof securityPreferencesSchema>

// Fonctions utilitaires de validation
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: Record<string, string[]> } => {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {}
      error.errors.forEach((err) => {
        const path = err.path.join('.')
        if (!errors[path]) {
          errors[path] = []
        }
        errors[path].push(err.message)
      })
      return { success: false, errors }
    }
    return { success: false, errors: { _form: ['Erreur de validation inattendue'] } }
  }
}

export const validateField = <T>(schema: z.ZodSchema<T>, value: unknown): { success: true; data: T } | { success: false; error: string } => {
  try {
    const validatedData = schema.parse(value)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message || 'Valeur invalide' }
    }
    return { success: false, error: 'Erreur de validation inattendue' }
  }
}

// Validation en temps réel pour les formulaires
export const createFieldValidator = <T>(schema: z.ZodSchema<T>) => {
  return (value: unknown): string | null => {
    const result = validateField(schema, value)
    return result.success ? null : result.error
  }
}
