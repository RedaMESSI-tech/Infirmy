<template>
  <div class="patient-dashboard">
    <!-- Header -->
    <section class="dashboard-header">
      <v-container>
        <div class="d-flex align-center justify-space-between">
          <div>
            <h1 class="text-h3 font-weight-bold mb-2">
              Espace Patient
            </h1>
            <p class="text-h6 text-medium-emphasis">
              Gérez vos rendez-vous et vos soins infirmiers
            </p>
          </div>
          
          <v-btn
            color="primary"
            size="large"
            variant="elevated"
            rounded="lg"
            @click="showBookingDialog = true"
          >
            <v-icon start>mdi-calendar-plus</v-icon>
            Prendre un RDV
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
            <v-avatar size="64" color="primary" class="mr-4">
              <v-icon size="32" color="white">
                mdi-account-heart
              </v-icon>
            </v-avatar>
            <div>
              <h2 class="text-h4 font-weight-bold mb-2">
                Bonjour {{ authStore.user?.firstName || 'Patient' }} !
              </h2>
              <p class="text-body-1 text-medium-emphasis">
                {{ getWelcomeMessage() }}
              </p>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- Quick Actions -->
      <v-row class="mb-8">
        <v-col cols="12" md="4">
          <v-card class="action-card text-center pa-6" elevation="4" rounded="xl">
            <v-icon size="48" color="primary" class="mb-4">
              mdi-calendar-search
            </v-icon>
            <h3 class="text-h5 font-weight-bold mb-3">Rechercher un infirmier</h3>
            <p class="text-body-2 text-medium-emphasis mb-4">
              Trouvez l'infirmier idéal pour vos besoins
            </p>
            <v-btn
              color="primary"
              variant="outlined"
              rounded="lg"
              to="/rechercher"
              block
            >
              Rechercher
            </v-btn>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="4">
          <v-card class="action-card text-center pa-6" elevation="4" rounded="xl">
            <v-icon size="48" color="secondary" class="mb-4">
              mdi-calendar-clock
            </v-icon>
            <h3 class="text-h5 font-weight-bold mb-3">Mes Rendez-vous</h3>
            <p class="text-body-2 text-medium-emphasis mb-4">
              Consultez et gérez vos rendez-vous
            </p>
            <v-btn
              color="secondary"
              variant="outlined"
              rounded="lg"
              @click="showAppointments = true"
              block
            >
              Voir mes RDV
            </v-btn>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="4">
          <v-card class="action-card text-center pa-6" elevation="4" rounded="xl">
            <v-icon size="48" color="accent" class="mb-4">
              mdi-file-document
            </v-icon>
            <h3 class="text-h5 font-weight-bold mb-3">Mes Documents</h3>
            <p class="text-body-2 text-medium-emphasis mb-4">
              Accédez à vos documents médicaux
            </p>
            <v-btn
              color="accent"
              variant="outlined"
              rounded="lg"
              @click="showDocuments = true"
              block
            >
              Voir mes documents
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <!-- Recent Appointments -->
      <v-card class="mb-8" elevation="4" rounded="xl">
        <v-card-title class="d-flex align-center justify-space-between pa-6">
          <div>
            <h3 class="text-h5 font-weight-bold">Rendez-vous récents</h3>
            <p class="text-body-2 text-medium-emphasis">
              Vos prochains rendez-vous
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
          <div v-if="recentAppointments.length === 0" class="text-center py-8">
            <v-icon size="64" color="text-disabled" class="mb-4">
              mdi-calendar-blank
            </v-icon>
            <h4 class="text-h6 text-medium-emphasis mb-2">Aucun rendez-vous</h4>
            <p class="text-body-2 text-medium-emphasis">
              Prenez votre premier rendez-vous pour commencer
            </p>
            <v-btn
              color="primary"
              variant="outlined"
              rounded="lg"
              class="mt-4"
              @click="showBookingDialog = true"
            >
              Prendre un RDV
            </v-btn>
          </div>
          
          <v-list v-else>
            <v-list-item
              v-for="appointment in recentAppointments"
              :key="appointment.id"
              class="mb-2"
            >
              <template #prepend>
                <v-avatar color="primary" size="40">
                  <v-icon color="white">
                    mdi-account-tie
                  </v-icon>
                </v-avatar>
              </template>
              
              <v-list-item-title class="font-weight-bold">
                {{ appointment.nurseName }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ appointment.date }} à {{ appointment.time }}
              </v-list-item-subtitle>
              
              <template #append>
                <v-chip
                  :color="getStatusColor(appointment.status)"
                  size="small"
                  variant="flat"
                >
                  {{ appointment.status }}
                </v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>

      <!-- Health Summary -->
      <v-card class="mb-8" elevation="4" rounded="xl">
        <v-card-title class="pa-6">
          <h3 class="text-h5 font-weight-bold">Résumé de santé</h3>
        </v-card-title>
        
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12" md="6">
              <div class="health-stat">
                <div class="d-flex align-center mb-2">
                  <v-icon color="success" class="mr-2">
                    mdi-check-circle
                  </v-icon>
                  <span class="text-h6 font-weight-bold">Rendez-vous effectués</span>
                </div>
                <div class="text-h3 font-weight-bold text-success">
                  {{ healthStats.completedAppointments }}
                </div>
              </div>
            </v-col>
            
            <v-col cols="12" md="6">
              <div class="health-stat">
                <div class="d-flex align-center mb-2">
                  <v-icon color="primary" class="mr-2">
                    mdi-calendar-clock
                  </v-icon>
                  <span class="text-h6 font-weight-bold">Prochains RDV</span>
                </div>
                <div class="text-h3 font-weight-bold text-primary">
                  {{ healthStats.upcomingAppointments }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>

    <!-- Booking Dialog -->
    <v-dialog v-model="showBookingDialog" max-width="600px" persistent>
      <v-card rounded="lg">
        <v-card-title class="d-flex align-center pa-6">
          <v-icon color="primary" class="mr-3">
            mdi-calendar-plus
          </v-icon>
          Prendre un rendez-vous
        </v-card-title>
        
        <v-card-text class="pa-6">
          <p class="text-body-1 mb-6">
            Pour prendre un rendez-vous, veuillez d'abord rechercher un infirmier disponible.
          </p>
          
          <v-btn
            color="primary"
            variant="elevated"
            rounded="lg"
            size="large"
            to="/rechercher"
            block
            @click="showBookingDialog = false"
          >
            Rechercher un infirmier
          </v-btn>
        </v-card-text>
        
        <v-card-actions class="pa-6">
          <v-spacer />
          <v-btn
            variant="outlined"
            @click="showBookingDialog = false"
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
const showBookingDialog = ref(false)
const showAppointments = ref(false)
const showDocuments = ref(false)

// Mock data
const recentAppointments = ref([
  {
    id: 1,
    nurseName: 'Marie Dupont',
    date: '15 Jan 2024',
    time: '14:00',
    status: 'Confirmé'
  },
  {
    id: 2,
    nurseName: 'Jean Martin',
    date: '18 Jan 2024',
    time: '10:30',
    status: 'En attente'
  }
])

const healthStats = ref({
  completedAppointments: 12,
  upcomingAppointments: 2
})

// Computed
const isAuthenticated = computed(() => authStore.isAuthenticated)

// Methods
const getWelcomeMessage = () => {
  if (!isAuthenticated.value) {
    return 'Connectez-vous pour accéder à toutes les fonctionnalités'
  }
  
  const hour = new Date().getHours()
  if (hour < 12) return 'Bonne matinée ! Comment allez-vous aujourd\'hui ?'
  if (hour < 18) return 'Bon après-midi ! Avez-vous des questions sur vos soins ?'
  return 'Bonne soirée ! N\'oubliez pas de prendre vos rendez-vous'
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmé':
      return 'success'
    case 'en attente':
      return 'warning'
    case 'annulé':
      return 'error'
    default:
      return 'primary'
  }
}

// Lifecycle
onMounted(() => {
  if (!isAuthenticated.value) {
    uiStore.showInfo('Connectez-vous pour accéder à toutes les fonctionnalités')
  }
})
</script>

<style scoped>
.patient-dashboard {
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

.action-card {
  transition: all 0.3s ease;
  height: 100%;
}

.action-card:hover {
  transform: translateY(-4px);
}

.health-stat {
  padding: 1rem;
  border-radius: 12px;
  background-color: var(--v-surface-variant);
}
</style>
