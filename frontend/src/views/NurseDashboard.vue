<template>
  <div class="nurse-dashboard">
    <!-- Header -->
    <section class="dashboard-header">
      <v-container>
        <div class="d-flex align-center justify-space-between">
          <div>
            <h1 class="text-h3 font-weight-bold mb-2">
              Espace Infirmier
            </h1>
            <p class="text-h6 text-medium-emphasis">
              Gérez vos patients et votre planning
            </p>
          </div>
          
          <v-btn
            color="secondary"
            size="large"
            variant="elevated"
            rounded="lg"
            @click="showAvailabilityDialog = true"
          >
            <v-icon start>mdi-calendar-edit</v-icon>
            Gérer disponibilités
          </v-btn>
        </div>
      </v-container>
    </section>

    <!-- Main Content -->
    <v-container class="py-8">
      <!-- Welcome Section -->
      <v-card class="welcome-card mb-6" elevation="4" rounded="xl">
        <v-card-text class="pa-6">
          <div class="d-flex align-center">
            <v-avatar size="64" color="secondary" class="mr-4">
              <v-icon size="32" color="white">
                mdi-account-tie
              </v-icon>
            </v-avatar>
            <div>
              <h2 class="text-h4 font-weight-bold mb-2">
                Bonjour {{ authStore.user?.firstName || 'Infirmier' }} !
              </h2>
              <p class="text-body-1 text-medium-emphasis">
                {{ getWelcomeMessage() }}
              </p>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- Quick Stats -->
      <v-row class="mb-8">
        <v-col cols="12" md="3">
          <v-card class="stat-card text-center pa-6" elevation="4" rounded="xl">
            <v-icon size="48" color="primary" class="mb-4">
              mdi-calendar-check
            </v-icon>
            <div class="text-h3 font-weight-bold text-primary mb-2">
              {{ stats.todayAppointments }}
            </div>
            <div class="text-h6">RDV aujourd'hui</div>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="3">
          <v-card class="stat-card text-center pa-6" elevation="4" rounded="xl">
            <v-icon size="48" color="secondary" class="mb-4">
              mdi-account-group
            </v-icon>
            <div class="text-h3 font-weight-bold text-secondary mb-2">
              {{ stats.totalPatients }}
            </div>
            <div class="text-h6">Patients totaux</div>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="3">
          <v-card class="stat-card text-center pa-6" elevation="4" rounded="xl">
            <v-icon size="48" color="success" class="mb-4">
              mdi-star
            </v-icon>
            <div class="text-h3 font-weight-bold text-success mb-2">
              {{ stats.rating }}
            </div>
            <div class="text-h6">Note moyenne</div>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="3">
          <v-card class="stat-card text-center pa-6" elevation="4" rounded="xl">
            <v-icon size="48" color="accent" class="mb-4">
              mdi-currency-eur
            </v-icon>
            <div class="text-h3 font-weight-bold text-accent mb-2">
              {{ stats.monthlyEarnings }}
            </div>
            <div class="text-h6">Gains du mois</div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Quick Actions -->
      <v-row class="mb-8">
        <v-col cols="12" md="4">
          <v-card class="action-card text-center pa-6" elevation="4" rounded="xl">
            <v-icon size="48" color="primary" class="mb-4">
              mdi-calendar-month
            </v-icon>
            <h3 class="text-h5 font-weight-bold mb-3">Mon Planning</h3>
            <p class="text-body-2 text-medium-emphasis mb-4">
              Consultez et gérez votre planning
            </p>
            <v-btn
              color="primary"
              variant="outlined"
              rounded="lg"
              @click="showCalendar = true"
              block
            >
              Voir planning
            </v-btn>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="4">
          <v-card class="action-card text-center pa-6" elevation="4" rounded="xl">
            <v-icon size="48" color="secondary" class="mb-4">
              mdi-account-multiple
            </v-icon>
            <h3 class="text-h5 font-weight-bold mb-3">Mes Patients</h3>
            <p class="text-body-2 text-medium-emphasis mb-4">
              Gérez votre liste de patients
            </p>
            <v-btn
              color="secondary"
              variant="outlined"
              rounded="lg"
              @click="showPatients = true"
              block
            >
              Voir patients
            </v-btn>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="4">
          <v-card class="action-card text-center pa-6" elevation="4" rounded="xl">
            <v-icon size="48" color="accent" class="mb-4">
              mdi-chart-line
            </v-icon>
            <h3 class="text-h5 font-weight-bold mb-3">Mes Statistiques</h3>
            <p class="text-body-2 text-medium-emphasis mb-4">
              Consultez vos performances
            </p>
            <v-btn
              color="accent"
              variant="outlined"
              rounded="lg"
              @click="showStats = true"
              block
            >
              Voir stats
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <!-- Today's Appointments -->
      <v-card class="mb-8" elevation="4" rounded="xl">
        <v-card-title class="d-flex align-center justify-space-between pa-6">
          <div>
            <h3 class="text-h5 font-weight-bold">Rendez-vous d'aujourd'hui</h3>
            <p class="text-body-2 text-medium-emphasis">
              {{ new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
            </p>
          </div>
          <v-btn
            color="primary"
            variant="text"
            to="/appointments"
          >
            Voir tous
          </v-btn>
        </v-card-title>
        
        <v-card-text class="pa-6">
          <div v-if="todayAppointments.length === 0" class="text-center py-8">
            <v-icon size="64" color="text-disabled" class="mb-4">
              mdi-calendar-blank
            </v-icon>
            <h4 class="text-h6 text-medium-emphasis mb-2">Aucun rendez-vous aujourd'hui</h4>
            <p class="text-body-2 text-medium-emphasis">
              Profitez-en pour mettre à jour votre profil ou gérer vos disponibilités
            </p>
          </div>
          
          <v-timeline v-else>
            <v-timeline-item
              v-for="appointment in todayAppointments"
              :key="appointment.id"
              :dot-color="getStatusColor(appointment.status)"
              size="large"
            >
              <template #opposite>
                <div class="text-caption text-medium-emphasis">
                  {{ appointment.time }}
                </div>
              </template>
              
              <v-card class="appointment-card" elevation="2" rounded="lg">
                <v-card-text class="pa-4">
                  <div class="d-flex align-center justify-space-between">
                    <div>
                      <h4 class="text-h6 font-weight-bold mb-1">
                        {{ appointment.patientName }}
                      </h4>
                      <p class="text-body-2 text-medium-emphasis mb-2">
                        {{ appointment.service }}
                      </p>
                      <p class="text-caption">
                        <v-icon size="16" class="mr-1">
                          mdi-map-marker
                        </v-icon>
                        {{ appointment.address }}
                      </p>
                    </div>
                    
                    <div class="text-right">
                      <v-chip
                        :color="getStatusColor(appointment.status)"
                        size="small"
                        variant="flat"
                        class="mb-2"
                      >
                        {{ appointment.status }}
                      </v-chip>
                      <div class="text-h6 font-weight-bold text-primary">
                        {{ appointment.price }}€
                      </div>
                    </div>
                  </div>
                  
                  <v-divider class="my-3" />
                  
                  <div class="d-flex justify-space-between">
                    <v-btn
                      size="small"
                      variant="outlined"
                      color="primary"
                      @click="viewPatientDetails(appointment.patientId)"
                    >
                      Voir patient
                    </v-btn>
                    
                    <v-btn
                      size="small"
                      variant="outlined"
                      color="secondary"
                      @click="updateAppointmentStatus(appointment.id)"
                    >
                      Mettre à jour
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>

      <!-- Recent Reviews -->
      <v-card class="mb-8" elevation="4" rounded="xl">
        <v-card-title class="pa-6">
          <h3 class="text-h5 font-weight-bold">Avis récents</h3>
        </v-card-title>
        
        <v-card-text class="pa-6">
          <div v-if="recentReviews.length === 0" class="text-center py-8">
            <v-icon size="64" color="text-disabled" class="mb-4">
              mdi-star-outline
            </v-icon>
            <h4 class="text-h6 text-medium-emphasis mb-2">Aucun avis pour le moment</h4>
            <p class="text-body-2 text-medium-emphasis">
              Continuez à fournir d'excellents soins pour recevoir des avis positifs
            </p>
          </div>
          
          <v-list v-else>
            <v-list-item
              v-for="review in recentReviews"
              :key="review.id"
              class="mb-2"
            >
              <template #prepend>
                <v-avatar color="warning" size="40">
                  <v-icon color="white">
                    mdi-star
                  </v-icon>
                </v-avatar>
              </template>
              
              <v-list-item-title class="font-weight-bold">
                {{ review.patientName }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ review.comment }}
              </v-list-item-subtitle>
              
              <template #append>
                <div class="text-right">
                  <div class="d-flex align-center mb-1">
                    <v-rating
                      :model-value="review.rating"
                      readonly
                      density="compact"
                      size="small"
                    />
                    <span class="ml-2 text-caption">{{ review.rating }}/5</span>
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    {{ review.date }}
                  </div>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-container>

    <!-- Availability Dialog -->
    <v-dialog v-model="showAvailabilityDialog" max-width="800px" persistent>
      <v-card rounded="lg">
        <v-card-title class="d-flex align-center pa-6">
          <v-icon color="secondary" class="mr-3">
            mdi-calendar-edit
          </v-icon>
          Gérer mes disponibilités
        </v-card-title>
        
        <v-card-text class="pa-6">
          <p class="text-body-1 mb-6">
            Gérez vos horaires de disponibilité pour recevoir des demandes de rendez-vous.
          </p>
          
          <v-btn
            color="secondary"
            variant="elevated"
            rounded="lg"
            size="large"
            to="/availability"
            block
            @click="showAvailabilityDialog = false"
          >
            Gérer disponibilités
          </v-btn>
        </v-card-text>
        
        <v-card-actions class="pa-6">
          <v-spacer />
          <v-btn
            variant="outlined"
            @click="showAvailabilityDialog = false"
          >
            Annuler
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'

// Stores
const authStore = useAuthStore()
const uiStore = useUIStore()

// State
const showAvailabilityDialog = ref(false)
const showCalendar = ref(false)
const showPatients = ref(false)
const showStats = ref(false)

// Mock data
const stats = ref({
  todayAppointments: 5,
  totalPatients: 127,
  rating: 4.8,
  monthlyEarnings: '2,450€'
})

const todayAppointments = ref([
  {
    id: 1,
    patientName: 'Sophie Martin',
    service: 'Soins à domicile',
    time: '09:00',
    address: '123 Rue de la Paix, Paris',
    status: 'Confirmé',
    price: 45,
    patientId: 1
  },
  {
    id: 2,
    patientName: 'Pierre Dubois',
    service: 'Pansement',
    time: '11:30',
    address: '456 Avenue des Champs, Lyon',
    status: 'En cours',
    price: 35,
    patientId: 2
  },
  {
    id: 3,
    patientName: 'Marie Leroy',
    service: 'Prise de sang',
    time: '14:00',
    address: '789 Boulevard Central, Marseille',
    status: 'Confirmé',
    price: 40,
    patientId: 3
  }
])

const recentReviews = ref([
  {
    id: 1,
    patientName: 'Jean Dupont',
    rating: 5,
    comment: 'Excellent professionnel, très attentionné et compétent.',
    date: 'Il y a 2 jours'
  },
  {
    id: 2,
    patientName: 'Claire Moreau',
    rating: 5,
    comment: 'Soins de qualité, je recommande vivement.',
    date: 'Il y a 1 semaine'
  }
])

// Computed
const isAuthenticated = computed(() => authStore.isAuthenticated)

// Methods
const getWelcomeMessage = () => {
  if (!isAuthenticated.value) {
    return 'Connectez-vous pour accéder à toutes les fonctionnalités'
  }
  
  const hour = new Date().getHours()
  if (hour < 12) return 'Bonne matinée ! Prêt pour une journée de soins ?'
  if (hour < 18) return 'Bon après-midi ! Comment se passe votre journée ?'
  return 'Bonne soirée ! N\'oubliez pas de mettre à jour votre planning'
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmé':
      return 'success'
    case 'en cours':
      return 'primary'
    case 'annulé':
      return 'error'
    case 'en attente':
      return 'warning'
    default:
      return 'primary'
  }
}

const viewPatientDetails = (patientId: number) => {
  uiStore.showInfo(`Voir les détails du patient ${patientId}`)
}

const updateAppointmentStatus = (appointmentId: number) => {
  uiStore.showInfo(`Mettre à jour le rendez-vous ${appointmentId}`)
}

// Lifecycle
onMounted(() => {
  if (!isAuthenticated.value) {
    uiStore.showInfo('Connectez-vous pour accéder à toutes les fonctionnalités')
  }
})
</script>

<style scoped>
.nurse-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.dashboard-header {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  padding: 4rem 0;
}

.welcome-card {
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
}

.stat-card {
  transition: all 0.3s ease;
  height: 100%;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.action-card {
  transition: all 0.3s ease;
  height: 100%;
}

.action-card:hover {
  transform: translateY(-4px);
}

.appointment-card {
  transition: all 0.2s ease;
}

.appointment-card:hover {
  transform: translateY(-2px);
}
</style>
