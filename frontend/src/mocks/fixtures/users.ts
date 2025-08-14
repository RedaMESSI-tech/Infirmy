import type { User, Patient, Nurse } from '../../types'

// Utilisateurs de test
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'jean.dupont@email.com',
    firstName: 'Jean',
    lastName: 'Dupont',
    phone: '+33 6 12 34 56 78',
    avatar: '/avatars/jean-dupont.jpg',
    role: 'patient',
    isVerified: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-08-01T14:30:00Z'
  },
  {
    id: 'user-2',
    email: 'marie.martin@email.com',
    firstName: 'Marie',
    lastName: 'Martin',
    phone: '+33 6 98 76 54 32',
    avatar: '/avatars/marie-martin.jpg',
    role: 'nurse',
    isVerified: true,
    createdAt: '2023-06-20T09:00:00Z',
    updatedAt: '2024-08-01T16:45:00Z'
  },
  {
    id: 'user-3',
    email: 'pierre.durand@email.com',
    firstName: 'Pierre',
    lastName: 'Durand',
    phone: '+33 6 11 22 33 44',
    avatar: '/avatars/pierre-durand.jpg',
    role: 'patient',
    isVerified: false,
    createdAt: '2024-03-10T11:00:00Z',
    updatedAt: '2024-07-25T13:15:00Z'
  },
  {
    id: 'user-4',
    email: 'sophie.leroy@email.com',
    firstName: 'Sophie',
    lastName: 'Leroy',
    phone: '+33 6 55 66 77 88',
    avatar: '/avatars/sophie-leroy.jpg',
    role: 'nurse',
    isVerified: true,
    createdAt: '2022-12-05T08:00:00Z',
    updatedAt: '2024-08-01T10:20:00Z'
  },
  {
    id: 'user-5',
    email: 'lucas.moreau@email.com',
    firstName: 'Lucas',
    lastName: 'Moreau',
    phone: '+33 6 99 88 77 66',
    avatar: '/avatars/lucas-moreau.jpg',
    role: 'patient',
    isVerified: true,
    createdAt: '2024-02-28T15:00:00Z',
    updatedAt: '2024-07-30T17:30:00Z'
  }
]

// Patients de test
export const mockPatients: Patient[] = [
  {
    ...mockUsers[0],
    role: 'patient',
    dateOfBirth: '1985-03-15',
    address: {
      street: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
      coordinates: {
        lat: 48.8566,
        lng: 2.3522
      }
    },
    emergencyContact: {
      name: 'Claire Dupont',
      phone: '+33 6 12 34 56 79',
      relationship: 'Épouse'
    },
    preferences: {
      language: 'fr',
      notifications: true,
      marketing: false
    }
  },
  {
    ...mockUsers[2],
    role: 'patient',
    dateOfBirth: '1992-07-22',
    address: {
      street: '456 Avenue des Champs',
      city: 'Lyon',
      postalCode: '69001',
      country: 'France',
      coordinates: {
        lat: 45.7578,
        lng: 4.8320
      }
    },
    emergencyContact: {
      name: 'Anne Durand',
      phone: '+33 6 11 22 33 45',
      relationship: 'Sœur'
    },
    preferences: {
      language: 'fr',
      notifications: true,
      marketing: true
    }
  },
  {
    ...mockUsers[4],
    role: 'patient',
    dateOfBirth: '1978-11-08',
    address: {
      street: '789 Boulevard Central',
      city: 'Marseille',
      postalCode: '13001',
      country: 'France',
      coordinates: {
        lat: 43.2965,
        lng: 5.3698
      }
    },
    emergencyContact: {
      name: 'Emma Moreau',
      phone: '+33 6 99 88 77 67',
      relationship: 'Fille'
    },
    preferences: {
      language: 'fr',
      notifications: false,
      marketing: false
    }
  }
]

// Infirmiers de test
export const mockNurses: Nurse[] = [
  {
    ...mockUsers[1],
    role: 'nurse',
    isActive: true,
    isProfileComplete: true,
    specializations: ['Soins à domicile', 'Pansements', 'Injections'],
    experience: 8,
    bio: 'Infirmière diplômée d\'État avec 8 ans d\'expérience en soins à domicile. Spécialisée dans les soins post-opératoires et la prise en charge des personnes âgées.',
    address: {
      street: '321 Rue des Soins',
      city: 'Paris',
      postalCode: '75002',
      country: 'France',
      coordinates: {
        lat: 48.8606,
        lng: 2.3376
      }
    },
    interventionZones: [
      {
        id: 'zone-1',
        name: 'Paris Centre',
        postalCodes: ['75001', '75002', '75003', '75004'],
        radius: 5,
        coordinates: {
          lat: 48.8566,
          lng: 2.3522
        }
      }
    ],
    availabilities: [
      {
        id: 'avail-1',
        dayOfWeek: 1, // Lundi
        startTime: '08:00',
        endTime: '18:00',
        isRecurring: true,
        exceptions: []
      },
      {
        id: 'avail-2',
        dayOfWeek: 2, // Mardi
        startTime: '08:00',
        endTime: '18:00',
        isRecurring: true,
        exceptions: []
      },
      {
        id: 'avail-3',
        dayOfWeek: 3, // Mercredi
        startTime: '08:00',
        endTime: '18:00',
        isRecurring: true,
        exceptions: []
      },
      {
        id: 'avail-4',
        dayOfWeek: 4, // Jeudi
        startTime: '08:00',
        endTime: '18:00',
        isRecurring: true,
        exceptions: []
      },
      {
        id: 'avail-5',
        dayOfWeek: 5, // Vendredi
        startTime: '08:00',
        endTime: '18:00',
        isRecurring: true,
        exceptions: []
      }
    ],
    pricing: {
      consultationFee: 45,
      homeVisitFee: 60,
      emergencyFee: 80,
      currency: 'EUR',
      paymentMethods: ['Carte bancaire', 'Espèces', 'Chèque']
    },
    documents: [
      {
        id: 'doc-1',
        type: 'diploma',
        name: 'Diplôme d\'État Infirmier',
        url: '/documents/marie-martin-diploma.pdf',
        uploadedAt: '2023-06-20T09:00:00Z',
        status: 'approved'
      },
      {
        id: 'doc-2',
        type: 'license',
        name: 'Autorisation d\'exercice',
        url: '/documents/marie-martin-license.pdf',
        uploadedAt: '2023-06-20T09:00:00Z',
        status: 'approved'
      }
    ],
    kycStatus: 'approved',
    rating: 4.8,
    reviewCount: 127
  },
  {
    ...mockUsers[3],
    role: 'nurse',
    isActive: true,
    isProfileComplete: true,
    specializations: ['Pédiatrie', 'Soins post-nataux', 'Éducation thérapeutique'],
    experience: 12,
    bio: 'Infirmière pédiatrique expérimentée, spécialisée dans les soins aux nouveau-nés et aux enfants. Formée en éducation thérapeutique pour accompagner les familles.',
    address: {
      street: '654 Rue de la Santé',
      city: 'Lyon',
      postalCode: '69002',
      country: 'France',
      coordinates: {
        lat: 45.7640,
        lng: 4.8357
      }
    },
    interventionZones: [
      {
        id: 'zone-2',
        name: 'Lyon Centre',
        postalCodes: ['69001', '69002', '69003', '69004'],
        radius: 8,
        coordinates: {
          lat: 45.7578,
          lng: 4.8320
        }
      }
    ],
    availabilities: [
      {
        id: 'avail-6',
        dayOfWeek: 1, // Lundi
        startTime: '09:00',
        endTime: '17:00',
        isRecurring: true,
        exceptions: []
      },
      {
        id: 'avail-7',
        dayOfWeek: 2, // Mardi
        startTime: '09:00',
        endTime: '17:00',
        isRecurring: true,
        exceptions: []
      },
      {
        id: 'avail-8',
        dayOfWeek: 3, // Mercredi
        startTime: '09:00',
        endTime: '17:00',
        isRecurring: true,
        exceptions: []
      },
      {
        id: 'avail-9',
        dayOfWeek: 4, // Jeudi
        startTime: '09:00',
        endTime: '17:00',
        isRecurring: true,
        exceptions: []
      },
      {
        id: 'avail-10',
        dayOfWeek: 5, // Vendredi
        startTime: '09:00',
        endTime: '17:00',
        isRecurring: true,
        exceptions: []
      }
    ],
    pricing: {
      consultationFee: 50,
      homeVisitFee: 65,
      emergencyFee: 85,
      currency: 'EUR',
      paymentMethods: ['Carte bancaire', 'Espèces', 'Chèque']
    },
    documents: [
      {
        id: 'doc-3',
        type: 'diploma',
        name: 'Diplôme d\'État Infirmier',
        url: '/documents/sophie-leroy-diploma.pdf',
        uploadedAt: '2022-12-05T08:00:00Z',
        status: 'approved'
      },
      {
        id: 'doc-4',
        type: 'license',
        name: 'Autorisation d\'exercice',
        url: '/documents/sophie-leroy-license.pdf',
        uploadedAt: '2022-12-05T08:00:00Z',
        status: 'approved'
      }
    ],
    kycStatus: 'approved',
    rating: 4.9,
    reviewCount: 203
  }
]

// Fonction utilitaire pour trouver un utilisateur par ID
export const findUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id)
}

// Fonction utilitaire pour trouver un patient par ID
export const findPatientById = (id: string): Patient | undefined => {
  return mockPatients.find(patient => patient.id === id)
}

// Fonction utilitaire pour trouver un infirmier par ID
export const findNurseById = (id: string): Nurse | undefined => {
  return mockNurses.find(nurse => nurse.id === id)
}

// Fonction utilitaire pour filtrer les utilisateurs par rôle
export const getUsersByRole = (role: 'patient' | 'nurse' | 'admin'): User[] => {
  return mockUsers.filter(user => user.role === role)
}

// Fonction utilitaire pour vérifier si un utilisateur existe
export const userExists = (email: string): boolean => {
  return mockUsers.some(user => user.email === email)
}

// Fonction utilitaire pour créer un nouvel utilisateur
export const createUser = (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
  const newUser: User = {
    ...userData,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  mockUsers.push(newUser)
  return newUser
}

// Fonction utilitaire pour mettre à jour un utilisateur
export const updateUser = (id: string, updates: Partial<User>): User | null => {
  const userIndex = mockUsers.findIndex(user => user.id === id)
  if (userIndex === -1) return null
  
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  return mockUsers[userIndex]
}

// Fonction utilitaire pour supprimer un utilisateur
export const deleteUser = (id: string): boolean => {
  const userIndex = mockUsers.findIndex(user => user.id === id)
  if (userIndex === -1) return false
  
  mockUsers.splice(userIndex, 1)
  return true
}
