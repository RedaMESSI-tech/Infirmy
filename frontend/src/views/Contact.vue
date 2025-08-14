<template>
  <div class="contact-page">
    <!-- Header -->
    <div class="contact-header">
      <v-container>
        <div class="text-center mb-8">
          <h1 class="contact-title">Contactez-nous</h1>
          <p class="contact-subtitle">
            Notre équipe est là pour vous aider et répondre à toutes vos questions
          </p>
        </div>
      </v-container>
    </div>

    <!-- Contact Content -->
    <div class="contact-content">
      <v-container>
        <v-row>
          <!-- Contact Form -->
          <v-col cols="12" lg="8">
            <v-card class="contact-form-card" elevation="4" rounded="lg">
              <v-card-title class="pa-6">
                <h2>Envoyez-nous un message</h2>
                <p class="text-medium-emphasis mt-2">
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais
                </p>
              </v-card-title>
              
              <v-card-text class="pa-6">
                <v-form ref="contactForm" @submit.prevent="submitForm">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="form.firstName"
                        label="Prénom *"
                        variant="outlined"
                        rounded="lg"
                        :rules="firstNameRules"
                        required
                      />
                    </v-col>
                    
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="form.lastName"
                        label="Nom *"
                        variant="outlined"
                        rounded="lg"
                        :rules="lastNameRules"
                        required
                      />
                    </v-col>
                  </v-row>
                  
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="form.email"
                        label="Email *"
                        type="email"
                        variant="outlined"
                        rounded="lg"
                        :rules="emailRules"
                        required
                      />
                    </v-col>
                    
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="form.phone"
                        label="Téléphone"
                        variant="outlined"
                        rounded="lg"
                        :rules="phoneRules"
                      />
                    </v-col>
                  </v-row>
                  
                  <v-row>
                    <v-col cols="12">
                      <v-select
                        v-model="form.subject"
                        label="Sujet *"
                        variant="outlined"
                        rounded="lg"
                        :items="subjectOptions"
                        item-title="label"
                        item-value="value"
                        :rules="subjectRules"
                        required
                      />
                    </v-col>
                  </v-row>
                  
                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        v-model="form.message"
                        label="Message *"
                        variant="outlined"
                        rounded="lg"
                        rows="6"
                        :rules="messageRules"
                        required
                        placeholder="Décrivez votre demande en détail..."
                      />
                    </v-col>
                  </v-row>
                  
                  <v-row>
                    <v-col cols="12">
                      <v-checkbox
                        v-model="form.newsletter"
                        label="Je souhaite recevoir la newsletter Infirmy"
                        color="primary"
                        hide-details
                      />
                    </v-col>
                  </v-row>
                  
                  <v-row>
                    <v-col cols="12">
                      <v-btn
                        type="submit"
                        color="primary"
                        variant="elevated"
                        size="x-large"
                        rounded="lg"
                        block
                        :loading="isSubmitting"
                        :disabled="!isFormValid"
                      >
                        <v-icon start>mdi-send</v-icon>
                        Envoyer le message
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          
          <!-- Contact Information -->
          <v-col cols="12" lg="4">
            <div class="contact-info">
              <!-- Direct Contact -->
              <v-card class="info-card mb-4" elevation="2" rounded="lg">
                <v-card-title class="d-flex align-center pa-4">
                  <v-icon color="primary" class="mr-3">mdi-phone</v-icon>
                  Contact direct
                </v-card-title>
                <v-card-text>
                  <div class="contact-item mb-3">
                    <v-icon color="success" size="small" class="mr-2">mdi-phone</v-icon>
                    <span class="contact-text">+33 1 23 45 67 89</span>
                  </div>
                  <div class="contact-item mb-3">
                    <v-icon color="success" size="small" class="mr-2">mdi-email</v-icon>
                    <span class="contact-text">contact@infirmy.com</span>
                  </div>
                  <div class="contact-item">
                    <v-icon color="success" size="small" class="mr-2">mdi-clock</v-icon>
                    <span class="contact-text">Lun-Ven: 9h-18h</span>
                  </div>
                </v-card-text>
              </v-card>
              
              <!-- Office Address -->
              <v-card class="info-card mb-4" elevation="2" rounded="lg">
                <v-card-title class="d-flex align-center pa-4">
                  <v-icon color="primary" class="mr-3">mdi-map-marker</v-icon>
                  Notre adresse
                </v-card-title>
                <v-card-text>
                  <p class="address-text">
                    Infirmy SAS<br>
                    123 Avenue de la Santé<br>
                    75001 Paris, France
                  </p>
                  <v-btn
                    color="primary"
                    variant="outlined"
                    size="small"
                    block
                    class="mt-3"
                    @click="openMap"
                  >
                    <v-icon start>mdi-map</v-icon>
                    Voir sur la carte
                  </v-btn>
                </v-card-text>
              </v-card>
              
              <!-- Social Media -->
              <v-card class="info-card" elevation="2" rounded="lg">
                <v-card-title class="d-flex align-center pa-4">
                  <v-icon color="primary" class="mr-3">mdi-share-variant</v-icon>
                  Suivez-nous
                </v-card-title>
                <v-card-text>
                  <div class="social-links">
                    <v-btn
                      icon
                      variant="text"
                      color="primary"
                      size="large"
                      class="mr-2"
                      @click="openSocial('facebook')"
                    >
                      <v-icon>mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      variant="text"
                      color="primary"
                      size="large"
                      class="mr-2"
                      @click="openSocial('twitter')"
                    >
                      <v-icon>mdi-twitter</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      variant="text"
                      color="primary"
                      size="large"
                      class="mr-2"
                      @click="openSocial('linkedin')"
                    >
                      <v-icon>mdi-linkedin</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      variant="text"
                      color="primary"
                      size="large"
                      @click="openSocial('instagram')"
                    >
                      <v-icon>mdi-instagram</v-icon>
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- FAQ Section -->
    <div class="contact-faq">
      <v-container>
        <v-card class="faq-card" elevation="2" rounded="lg">
          <v-card-title class="text-center pa-6">
            <h2>Questions fréquentes</h2>
            <p class="text-medium-emphasis mt-2">
              Trouvez rapidement des réponses aux questions les plus courantes
            </p>
          </v-card-title>
          
          <v-card-text class="pa-6">
            <v-expansion-panels variant="accordion">
              <v-expansion-panel
                v-for="faq in contactFaq"
                :key="faq.id"
                class="faq-panel"
              >
                <v-expansion-panel-title class="faq-question">
                  {{ faq.question }}
                </v-expansion-panel-title>
                <v-expansion-panel-text class="faq-answer">
                  {{ faq.answer }}
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUIStore } from '@/stores/ui'

// Store
const uiStore = useUIStore()

// Form ref
const contactForm = ref<any>(null)

// State
const isSubmitting = ref(false)

// Form data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  newsletter: false
})

// Form validation rules
const firstNameRules = [
  (v: string) => !!v || 'Le prénom est requis',
  (v: string) => v.length >= 2 || 'Le prénom doit contenir au moins 2 caractères'
]

const lastNameRules = [
  (v: string) => !!v || 'Le nom est requis',
  (v: string) => v.length >= 2 || 'Le nom doit contenir au moins 2 caractères'
]

const emailRules = [
  (v: string) => !!v || 'L\'email est requis',
  (v: string) => /.+@.+\..+/.test(v) || 'L\'email doit être valide'
]

const phoneRules = [
  (v: string) => !v || /^[\d\s\-\+\(\)]+$/.test(v) || 'Le numéro de téléphone doit être valide'
]

const subjectRules = [
  (v: string) => !!v || 'Le sujet est requis'
]

const messageRules = [
  (v: string) => !!v || 'Le message est requis',
  (v: string) => v.length >= 10 || 'Le message doit contenir au moins 10 caractères'
]

// Subject options
const subjectOptions = [
  { label: 'Sélectionnez un sujet', value: '' },
  { label: 'Question générale', value: 'general' },
  { label: 'Support technique', value: 'technical' },
  { label: 'Partenariat', value: 'partnership' },
  { label: 'Réclamation', value: 'complaint' },
  { label: 'Suggestion', value: 'suggestion' },
  { label: 'Autre', value: 'other' }
]

// FAQ data
const contactFaq = ref([
  {
    id: 1,
    question: 'Quel est le délai de réponse ?',
    answer: 'Nous nous engageons à répondre à toutes les demandes dans un délai maximum de 24h en semaine et 48h le weekend.'
  },
  {
    id: 2,
    question: 'Puis-je appeler directement ?',
    answer: 'Oui, vous pouvez nous appeler au +33 1 23 45 67 89 du lundi au vendredi de 9h à 18h.'
  },
  {
    id: 3,
    question: 'Comment signaler un problème technique ?',
    answer: 'Utilisez le formulaire ci-dessus en sélectionnant "Support technique" comme sujet, ou appelez-nous directement.'
  }
])

// Computed
const isFormValid = computed(() => {
  return form.value.firstName && 
         form.value.lastName && 
         form.value.email && 
         form.value.subject && 
         form.value.message
})

// Methods
const submitForm = async () => {
  if (!isFormValid.value) {
    uiStore.showError('Veuillez remplir tous les champs obligatoires')
    return
  }

  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Show success message
    uiStore.showSuccess('Votre message a été envoyé avec succès !')
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      newsletter: false
    }
    
    // Reset validation
    if (contactForm.value) {
      contactForm.value.reset()
    }
  } catch (error) {
    uiStore.showError('Erreur lors de l\'envoi du message. Veuillez réessayer.')
  } finally {
    isSubmitting.value = false
  }
}

const openMap = () => {
  // In real app, this would open Google Maps or similar
  window.open('https://maps.google.com/?q=123+Avenue+de+la+Santé+75001+Paris', '_blank')
}

const openSocial = (platform: string) => {
  const urls = {
    facebook: 'https://facebook.com/infirmy',
    twitter: 'https://twitter.com/infirmy',
    linkedin: 'https://linkedin.com/company/infirmy',
    instagram: 'https://instagram.com/infirmy'
  }
  
  if (urls[platform as keyof typeof urls]) {
    window.open(urls[platform as keyof typeof urls], '_blank')
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: #f8fafc;
}

.contact-header {
  background: white;
  padding: 4rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.contact-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1rem 0;
}

.contact-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.contact-content {
  padding: 4rem 0;
}

.contact-form-card {
  background: white;
  border: 1px solid #e2e8f0;
  height: 100%;
}

.contact-info {
  height: 100%;
}

.info-card {
  background: white;
  border: 1px solid #e2e8f0;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.contact-text {
  color: #374151;
  font-weight: 500;
}

.address-text {
  color: #374151;
  line-height: 1.6;
  margin: 0;
}

.social-links {
  display: flex;
  justify-content: center;
}

.contact-faq {
  padding: 4rem 0;
}

.faq-card {
  background: white;
  border: 1px solid #e2e8f0;
}

.faq-panel {
  margin-bottom: 1rem;
}

.faq-question {
  font-weight: 600;
  color: #1e293b;
}

.faq-answer {
  color: #64748b;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 960px) {
  .contact-title {
    font-size: 2.5rem;
  }
  
  .contact-info {
    margin-top: 2rem;
  }
}

@media (max-width: 600px) {
  .contact-title {
    font-size: 2rem;
  }
  
  .contact-content {
    padding: 2rem 0;
  }
}
</style>
