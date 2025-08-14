import { createI18n } from 'vue-i18n'

const messages = {
  fr: {
    common: {
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      search: 'Rechercher',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      confirm: 'Confirmer',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      close: 'Fermer',
      yes: 'Oui',
      no: 'Non',
      view: 'Voir',
      book: 'Réserver',
      contact: 'Contacter',
      more: 'En savoir plus',
      less: 'Voir moins',
      all: 'Tous',
      none: 'Aucun',
      optional: 'Optionnel',
      required: 'Requis',
      saveChanges: 'Sauvegarder les modifications',
      discardChanges: 'Annuler les modifications',
      loadingData: 'Chargement des données...',
      noData: 'Aucune donnée disponible',
      retry: 'Réessayer',
      refresh: 'Actualiser'
    },
    auth: {
      login: 'Connexion',
      register: 'Inscription',
      logout: 'Déconnexion',
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      forgotPassword: 'Mot de passe oublié ?',
      resetPassword: 'Réinitialiser le mot de passe',
      alreadyHaveAccount: 'Déjà un compte ?',
      dontHaveAccount: 'Pas encore de compte ?',
      loginTitle: 'Connectez-vous à votre compte',
      registerTitle: 'Créez votre compte Infirmy',
      forgotPasswordTitle: 'Réinitialisation du mot de passe',
      resetPasswordTitle: 'Nouveau mot de passe',
      loginSuccess: 'Connexion réussie !',
      registerSuccess: 'Inscription réussie !',
      passwordResetSent: 'Email de réinitialisation envoyé',
      passwordResetSuccess: 'Mot de passe mis à jour',
      invalidCredentials: 'Email ou mot de passe incorrect',
      emailAlreadyExists: 'Cet email est déjà utilisé',
      weakPassword: 'Le mot de passe doit contenir au moins 8 caractères',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
      acceptTerms: 'J\'accepte les conditions d\'utilisation',
      acceptMarketing: 'J\'accepte de recevoir des communications marketing'
    },
    navigation: {
      home: 'Accueil',
      search: 'Rechercher',
      appointments: 'Rendez-vous',
      messages: 'Messages',
      profile: 'Profil',
      dashboard: 'Tableau de bord',
      about: 'À propos',
      contact: 'Contact',
      faq: 'FAQ',
      legal: 'Mentions légales',
      privacy: 'Confidentialité',
      account: 'Mon compte',
      patient: 'Patient',
      nurse: 'Infirmier',
      information: 'Informations',
      help: 'Aide',
      calendar: 'Calendrier',
      requests: 'Demandes',
      pricing: 'Tarifs',
      reviews: 'Avis',
      settings: 'Paramètres',
      notifications: 'Notifications',
      documents: 'Documents',
      billing: 'Facturation'
    },
    home: {
      hero: {
        title: 'Trouvez l\'infirmier qu\'il vous faut, près de chez vous',
        subtitle: 'Soins de qualité, réservation simple, intervention rapide',
        searchButton: 'Rechercher un infirmier',
        nurseButton: 'Espace infirmier',
        stats: {
          available: '24/7',
          careCount: '+5k soins réalisés',
          satisfaction: '4,8/5 de satisfaction'
        }
      },
      whyInfirmy: {
        title: 'Pourquoi choisir Infirmy ?',
        rapid: {
          title: 'Réservation rapide',
          description: 'Trouvez et réservez un créneau en quelques clics'
        },
        proximity: {
          title: 'Proche de chez vous',
          description: 'Des infirmiers disponibles dans votre zone'
        },
        quality: {
          title: 'Soins de qualité',
          description: 'Des professionnels diplômés et expérimentés'
        }
      },
      howItWorks: {
        title: 'Comment ça marche ?',
        step1: {
          title: 'Recherchez',
          description: 'Entrez votre adresse et vos besoins'
        },
        step2: {
          title: 'Choisissez',
          description: 'Sélectionnez l\'infirmier qui vous convient'
        },
        step3: {
          title: 'Confirmez',
          description: 'Réservez votre créneau en toute simplicité'
        }
      },
      testimonials: {
        title: 'Ce que disent nos utilisateurs',
        subtitle: 'Découvrez les témoignages de patients et d\'infirmiers'
      },
      topCities: {
        title: 'Top des villes',
        subtitle: 'Infirmiers disponibles dans les principales villes'
      },
      nurseCTA: {
        title: 'Vous êtes infirmier ?',
        subtitle: 'Rejoignez Infirmy et développez votre activité',
        benefits: [
          'Gérez vos disponibilités facilement',
          'Trouvez de nouveaux patients',
          'Facturation simplifiée',
          'Support dédié'
        ],
        button: 'Créer un compte Pro'
      }
    },
    search: {
      title: 'Rechercher un infirmier',
      placeholder: 'Adresse, ville ou code postal...',
      filters: {
        title: 'Filtres',
        speciality: 'Spécialité',
        radius: 'Rayon de recherche',
        date: 'Date souhaitée',
        time: 'Horaire',
        locationType: 'Type d\'intervention',
        rating: 'Note minimum',
        priceRange: 'Fourchette de prix',
        availableToday: 'Disponible aujourd\'hui',
        availableWeekend: 'Disponible le week-end'
      },
      results: {
        title: 'Résultats de recherche',
        noResults: 'Aucun infirmier trouvé',
        tryAdjusting: 'Essayez d\'ajuster vos critères de recherche',
        sortBy: 'Trier par',
        distance: 'Distance',
        rating: 'Note',
        price: 'Prix',
        availability: 'Disponibilité'
      }
    },
    nurse: {
      profile: {
        about: 'À propos',
        specialities: 'Spécialités',
        experience: 'Expérience',
        education: 'Formation',
        certifications: 'Certifications',
        languages: 'Langues parlées',
        interventionZones: 'Zones d\'intervention',
        pricing: 'Tarifs',
        availability: 'Disponibilités',
        reviews: 'Avis patients',
        bookSlot: 'Réserver un créneau',
        contact: 'Contacter',
        verified: 'Vérifié',
        hdsCertified: 'Certifié HDS',
        stateDiploma: 'Diplômé d\'État'
      },
      availability: {
        title: 'Disponibilités',
        today: 'Aujourd\'hui',
        tomorrow: 'Demain',
        thisWeek: 'Cette semaine',
        nextWeek: 'Semaine prochaine',
        available: 'Disponible',
        unavailable: 'Indisponible',
        bookSlot: 'Réserver ce créneau'
      }
    },
    appointment: {
      title: 'Rendez-vous',
      new: 'Nouveau rendez-vous',
      edit: 'Modifier le rendez-vous',
      details: 'Détails du rendez-vous',
      status: {
        pending: 'En attente',
        confirmed: 'Confirmé',
        cancelled: 'Annulé',
        completed: 'Terminé',
        noShow: 'Absence'
      },
      actions: {
        confirm: 'Confirmer',
        cancel: 'Annuler',
        reschedule: 'Reporter',
        complete: 'Marquer comme terminé'
      },
      form: {
        date: 'Date',
        time: 'Heure',
        duration: 'Durée',
        type: 'Type d\'intervention',
        location: 'Lieu',
        address: 'Adresse',
        notes: 'Notes',
        symptoms: 'Symptômes'
      }
    },
    footer: {
      description: 'Infirmy est la plateforme de référence pour connecter patients et infirmiers libéraux. Soins de qualité, proximité et simplicité.',
      quickLinks: 'Liens rapides',
      services: 'Services',
      support: 'Support',
      contact: 'Contact',
      businessHours: 'Lun-Ven 8h-18h',
      allRightsReserved: 'Tous droits réservés',
      findNurse: 'Trouver un infirmier',
      joinAsNurse: 'Devenir infirmier',
      helpCenter: 'Centre d\'aide',
      contactUs: 'Nous contacter',
      systemStatus: 'État du système',
      feedback: 'Retour utilisateur',
      termsOfService: 'Conditions d\'utilisation',
      cookiePolicy: 'Politique des cookies',
      pricing: 'Tarifs',
      faq: 'FAQ'
    }
  },
  en: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
      yes: 'Yes',
      no: 'No',
      view: 'View',
      book: 'Book',
      contact: 'Contact',
      more: 'Learn more',
      less: 'Show less',
      all: 'All',
      none: 'None',
      optional: 'Optional',
      required: 'Required',
      saveChanges: 'Save changes',
      discardChanges: 'Discard changes',
      loadingData: 'Loading data...',
      noData: 'No data available',
      retry: 'Retry',
      refresh: 'Refresh'
    },
    auth: {
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot Password?',
      resetPassword: 'Reset Password',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      loginTitle: 'Sign in to your account',
      registerTitle: 'Create your Infirmy account',
      forgotPasswordTitle: 'Password Reset',
      resetPasswordTitle: 'New Password',
      loginSuccess: 'Login successful!',
      registerSuccess: 'Registration successful!',
      passwordResetSent: 'Password reset email sent',
      passwordResetSuccess: 'Password updated successfully',
      invalidCredentials: 'Invalid email or password',
      emailAlreadyExists: 'This email is already in use',
      weakPassword: 'Password must be at least 8 characters',
      passwordMismatch: 'Passwords do not match',
      acceptTerms: 'I accept the terms of service',
      acceptMarketing: 'I agree to receive marketing communications'
    },
    navigation: {
      home: 'Home',
      search: 'Search',
      appointments: 'Appointments',
      messages: 'Messages',
      profile: 'Profile',
      dashboard: 'Dashboard',
      about: 'About',
      contact: 'Contact',
      faq: 'FAQ',
      legal: 'Legal',
      privacy: 'Privacy',
      account: 'My Account',
      patient: 'Patient',
      nurse: 'Nurse',
      information: 'Information',
      help: 'Help',
      calendar: 'Calendar',
      requests: 'Requests',
      pricing: 'Pricing',
      reviews: 'Reviews',
      settings: 'Settings',
      notifications: 'Notifications',
      documents: 'Documents',
      billing: 'Billing'
    },
    home: {
      hero: {
        title: 'Find the nurse you need, near you',
        subtitle: 'Quality care, simple booking, fast intervention',
        searchButton: 'Find a nurse',
        nurseButton: 'Nurse space',
        stats: {
          available: '24/7',
          careCount: '+5k care provided',
          satisfaction: '4.8/5 satisfaction'
        }
      },
      whyInfirmy: {
        title: 'Why choose Infirmy?',
        rapid: {
          title: 'Quick booking',
          description: 'Find and book a slot in a few clicks'
        },
        proximity: {
          title: 'Close to you',
          description: 'Nurses available in your area'
        },
        quality: {
          title: 'Quality care',
          description: 'Qualified and experienced professionals'
        }
      },
      howItWorks: {
        title: 'How it works?',
        step1: {
          title: 'Search',
          description: 'Enter your address and needs'
        },
        step2: {
          title: 'Choose',
          description: 'Select the nurse that suits you'
        },
        step3: {
          title: 'Confirm',
          description: 'Book your slot with ease'
        }
      },
      testimonials: {
        title: 'What our users say',
        subtitle: 'Discover testimonials from patients and nurses'
      },
      topCities: {
        title: 'Top cities',
        subtitle: 'Nurses available in major cities'
      },
      nurseCTA: {
        title: 'Are you a nurse?',
        subtitle: 'Join Infirmy and grow your business',
        benefits: [
          'Manage your availability easily',
          'Find new patients',
          'Simplified billing',
          'Dedicated support'
        ],
        button: 'Create Pro account'
      }
    },
    search: {
      title: 'Find a nurse',
      placeholder: 'Address, city or postal code...',
      filters: {
        title: 'Filters',
        speciality: 'Speciality',
        radius: 'Search radius',
        date: 'Desired date',
        time: 'Time',
        locationType: 'Intervention type',
        rating: 'Minimum rating',
        priceRange: 'Price range',
        availableToday: 'Available today',
        availableWeekend: 'Available on weekends'
      },
      results: {
        title: 'Search results',
        noResults: 'No nurse found',
        tryAdjusting: 'Try adjusting your search criteria',
        sortBy: 'Sort by',
        distance: 'Distance',
        rating: 'Rating',
        price: 'Price',
        availability: 'Availability'
      }
    },
    nurse: {
      profile: {
        about: 'About',
        specialities: 'Specialities',
        experience: 'Experience',
        education: 'Education',
        certifications: 'Certifications',
        languages: 'Spoken languages',
        interventionZones: 'Intervention zones',
        pricing: 'Pricing',
        availability: 'Availability',
        reviews: 'Patient reviews',
        bookSlot: 'Book a slot',
        contact: 'Contact',
        verified: 'Verified',
        hdsCertified: 'HDS Certified',
        stateDiploma: 'State Diploma'
      },
      availability: {
        title: 'Availability',
        today: 'Today',
        tomorrow: 'Tomorrow',
        thisWeek: 'This week',
        nextWeek: 'Next week',
        available: 'Available',
        unavailable: 'Unavailable',
        bookSlot: 'Book this slot'
      }
    },
    appointment: {
      title: 'Appointment',
      new: 'New appointment',
      edit: 'Edit appointment',
      details: 'Appointment details',
      status: {
        pending: 'Pending',
        confirmed: 'Confirmed',
        cancelled: 'Cancelled',
        completed: 'Completed',
        noShow: 'No show'
      },
      actions: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        reschedule: 'Reschedule',
        complete: 'Mark as completed'
      },
      form: {
        date: 'Date',
        time: 'Time',
        duration: 'Duration',
        type: 'Intervention type',
        location: 'Location',
        address: 'Address',
        notes: 'Notes',
        symptoms: 'Symptoms'
      }
    },
    footer: {
      description: 'Infirmy is the leading platform connecting patients and independent nurses. Quality care, proximity and simplicity.',
      quickLinks: 'Quick Links',
      services: 'Services',
      support: 'Support',
      contact: 'Contact',
      businessHours: 'Mon-Fri 8AM-6PM',
      allRightsReserved: 'All rights reserved',
      findNurse: 'Find a nurse',
      joinAsNurse: 'Become a nurse',
      helpCenter: 'Help Center',
      contactUs: 'Contact Us',
      systemStatus: 'System Status',
      feedback: 'User Feedback',
      termsOfService: 'Terms of Service',
      cookiePolicy: 'Cookie Policy',
      pricing: 'Pricing',
      faq: 'FAQ'
    }
  }
}

export default createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'en',
  messages,
  globalInjection: true,
  silentTranslationWarn: true
})
