<template>
  <div class="search-page">
    <!-- Header -->
    <div class="search-header">
      <v-container>
        <div class="d-flex align-center justify-space-between mb-4">
          <div>
            <h1 class="search-title">Rechercher une infirmière</h1>
            <p class="search-subtitle">
              Trouvez l'infirmière idéale pour vos soins à domicile
            </p>
          </div>
          
          <!-- Search Filters -->
          <div class="search-filters">
            <v-btn
              variant="outlined"
              color="primary"
              @click="showFilters = !showFilters"
            >
              <v-icon start>mdi-filter</v-icon>
              Filtres
            </v-btn>
          </div>
        </div>

        <!-- Search Form -->
        <div class="search-form-wrapper mb-6">
          <v-card class="search-form-card" elevation="4" rounded="lg">
            <v-card-text class="pa-6">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="searchForm.address"
                    label="Adresse, ville ou code postal"
                    variant="outlined"
                    rounded="lg"
                    prepend-inner-icon="mdi-map-marker"
                    placeholder="Ex: Paris, 75001"
                    @keyup.enter="performSearch"
                  />
                </v-col>
                
                <v-col cols="12" md="3">
                  <v-select
                    v-model="searchForm.specialty"
                    label="Spécialité"
                    variant="outlined"
                    rounded="lg"
                    prepend-inner-icon="mdi-stethoscope"
                    :items="specialties"
                    item-title="label"
                    item-value="value"
                    placeholder="Toutes spécialités"
                    clearable
                  />
                </v-col>
                
                <v-col cols="12" md="3">
                  <v-select
                    v-model="searchForm.radius"
                    label="Rayon de recherche"
                    variant="outlined"
                    rounded="lg"
                    prepend-inner-icon="mdi-radar"
                    :items="radiusOptions"
                    item-title="label"
                    item-value="value"
                    placeholder="10 km"
                  />
                </v-col>
                
                <v-col cols="12" md="2">
                  <v-btn
                    color="primary"
                    variant="elevated"
                    size="x-large"
                    rounded="lg"
                    block
                    :loading="isSearching"
                    @click="performSearch"
                    height="56"
                  >
                    <v-icon start>mdi-magnify</v-icon>
                    Rechercher
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>

        <!-- Advanced Filters -->
        <v-expand-transition>
          <div v-show="showFilters" class="advanced-filters mb-6">
            <v-card class="filters-card" elevation="2" rounded="lg">
              <v-card-text class="pa-4">
                <v-row>
                  <v-col cols="12" md="3">
                    <v-checkbox
                      v-model="searchForm.availableToday"
                      label="Disponible aujourd'hui"
                      color="primary"
                    />
                  </v-col>
                  
                  <v-col cols="12" md="3">
                    <v-checkbox
                      v-model="searchForm.availableWeekend"
                      label="Disponible le weekend"
                      color="primary"
                    />
                  </v-col>
                  
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="searchForm.minRating"
                      :items="ratingOptions"
                      label="Note minimum"
                      variant="outlined"
                      rounded="lg"
                      clearable
                    />
                  </v-col>
                  
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="searchForm.maxPrice"
                      :items="priceOptions"
                      label="Prix maximum"
                      variant="outlined"
                      rounded="lg"
                      clearable
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </div>
        </v-expand-transition>
      </v-container>
    </div>

    <!-- Results Section -->
    <div class="search-results">
      <v-container>
        <v-row>
          <!-- Map Column -->
          <v-col cols="12" lg="8">
            <v-card class="map-card" elevation="4" rounded="lg">
              <v-card-title class="d-flex align-center justify-space-between pa-4">
                <span>Carte des infirmières</span>
                <v-chip color="primary" variant="tonal">
                  {{ filteredNurses.length }} infirmière(s) trouvée(s)
                </v-chip>
              </v-card-title>
              
              <v-card-text class="pa-0">
                <!-- Map Placeholder -->
                <div class="map-placeholder">
                  <div class="map-content">
                    <v-icon size="64" color="primary" class="mb-4">mdi-map</v-icon>
                    <h3>Carte interactive</h3>
                    <p class="text-medium-emphasis">
                      La carte sera intégrée ici pour afficher la localisation des infirmières
                    </p>
                    <v-btn
                      color="primary"
                      variant="outlined"
                      class="mt-4"
                      @click="showMapModal = true"
                    >
                      Ouvrir la carte
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Results List Column -->
          <v-col cols="12" lg="4">
            <v-card class="results-card" elevation="4" rounded="lg">
              <v-card-title class="pa-4">
                <span>Résultats</span>
                <v-spacer />
                <v-btn
                  icon
                  variant="text"
                  @click="toggleViewMode"
                >
                  <v-icon>
                    {{ viewMode === 'list' ? 'mdi-view-grid' : 'mdi-view-list' }}
                  </v-icon>
                </v-btn>
              </v-card-title>
              
              <v-card-text class="pa-0">
                <div v-if="filteredNurses.length === 0" class="no-results">
                  <v-icon size="48" color="text-disabled" class="mb-3">mdi-nurse</v-icon>
                  <h4>Aucune infirmière trouvée</h4>
                  <p class="text-medium-emphasis">
                    Essayez de modifier vos critères de recherche
                  </p>
                </div>
                
                <div v-else class="nurses-list">
                  <div
                    v-for="nurse in filteredNurses"
                    :key="nurse.id"
                    class="nurse-card"
                    :class="{ 'nurse-card-selected': selectedNurse?.id === nurse.id }"
                    @click="selectNurse(nurse)"
                  >
                    <div class="nurse-avatar">
                      <v-avatar size="48">
                        <v-img
                          v-if="nurse.avatar"
                          :src="nurse.avatar"
                          :alt="nurse.name"
                        />
                        <v-icon v-else size="48">mdi-account-circle</v-icon>
                      </v-avatar>
                    </div>
                    
                    <div class="nurse-info">
                      <h4 class="nurse-name">{{ nurse.name }}</h4>
                      <p class="nurse-specialty">{{ nurse.specialty }}</p>
                      <div class="nurse-rating">
                        <v-rating
                          :model-value="nurse.rating"
                          readonly
                          density="compact"
                          size="small"
                          color="warning"
                        />
                        <span class="rating-text">{{ nurse.rating }}/5</span>
                      </div>
                      <p class="nurse-distance">{{ nurse.distance }} km</p>
                    </div>
                    
                    <div class="nurse-actions">
                      <v-btn
                        color="primary"
                        variant="outlined"
                        size="small"
                        @click.stop="bookAppointment(nurse)"
                      >
                        Réserver
                      </v-btn>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Map Modal -->
    <v-dialog v-model="showMapModal" fullscreen>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-btn icon @click="showMapModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Carte des infirmières</v-toolbar-title>
          <v-spacer />
          <v-btn variant="text" @click="showMapModal = false">
            Fermer
          </v-btn>
        </v-toolbar>
        
        <v-card-text class="pa-0">
          <div class="fullscreen-map">
            <div class="map-content">
              <v-icon size="128" color="primary" class="mb-6">mdi-map</v-icon>
              <h2>Carte interactive en plein écran</h2>
              <p class="text-medium-emphasis">
                Intégration de Google Maps ou OpenStreetMap pour afficher la localisation des infirmières
              </p>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Booking Dialog -->
    <v-dialog v-model="showBookingDialog" max-width="900px" persistent>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-btn icon @click="showBookingDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Prendre un rendez-vous</v-toolbar-title>
          <v-spacer />
          <v-btn variant="text" @click="showBookingDialog = false">
            Fermer
          </v-btn>
        </v-toolbar>
        
        <v-card-text class="pa-0">
          <AppointmentBooking
            v-if="nurseToBook"
            :nurse="nurseToBook"
            @booking-completed="showBookingDialog = false"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUIStore } from '@/stores/ui'
import AppointmentBooking from '@/components/appointment/AppointmentBooking.vue'

// Types
interface Nurse {
  id: number
  name: string
  specialty: string
  rating: number
  distance: number
  avatar: string | null
  location: { lat: number; lng: number }
  services: string[]
  basePrice: number
}

// Route and Router
const route = useRoute()
const router = useRouter()

// Store
const uiStore = useUIStore()

// State
const searchForm = ref({
  address: '',
  specialty: '',
  radius: 10,
  availableToday: false,
  availableWeekend: false,
  minRating: 0,
  maxPrice: 100
})

const isSearching = ref(false)
const selectedNurse = ref<Nurse | null>(null)
const viewMode = ref('list')
const showMapModal = ref(false)
const showBookingDialog = ref(false)
const nurseToBook = ref<Nurse | null>(null)
const showFilters = ref(false)

// Options for form
const specialties = [
  { label: 'Toutes spécialités', value: '' },
  { label: 'Prise de sang', value: 'blood' },
  { label: 'Pansements', value: 'dressings' },
  { label: 'Injection', value: 'injection' },
  { label: 'Diabète', value: 'diabetes' },
  { label: 'Perfusions', value: 'infusion' },
  { label: 'Soins palliatifs', value: 'palliative' },
  { label: 'Suivi plaies', value: 'wound-care' }
]

const radiusOptions = [
  { label: '5 km', value: 5 },
  { label: '10 km', value: 10 },
  { label: '20 km', value: 20 },
  { label: '30 km', value: 30 },
  { label: '50 km', value: 50 }
]

const ratingOptions = [
  { label: 'Toutes les notes', value: 0 },
  { label: '4+ étoiles', value: 4 },
  { label: '4.5+ étoiles', value: 4.5 },
  { label: '5 étoiles', value: 5 }
]

const priceOptions = [
  { label: 'Tous les prix', value: 100 },
  { label: 'Moins de 30€', value: 30 },
  { label: 'Moins de 40€', value: 40 },
  { label: 'Moins de 50€', value: 50 }
]

const availabilityOptions = [
  { label: 'Disponible maintenant', value: 'now' },
  { label: 'Aujourd\'hui', value: 'today' },
  { label: 'Cette semaine', value: 'week' },
  { label: 'Ce mois', value: 'month' }
]

const languageOptions = [
  { label: 'Français', value: 'fr' },
  { label: 'Anglais', value: 'en' },
  { label: 'Espagnol', value: 'es' },
  { label: 'Allemand', value: 'de' },
  { label: 'Arabe', value: 'ar' }
]

// Mock nurses data
const nurses = ref<Nurse[]>([
  {
    id: 1,
    name: 'Marie Dupont',
    specialty: 'Soins à domicile',
    rating: 4.8,
    distance: 2.1,
    avatar: null,
    location: { lat: 48.8566, lng: 2.3522 },
    services: ['Soins à domicile', 'Pansements', 'Prise de sang'],
    basePrice: 35
  },
  {
    id: 2,
    name: 'Sophie Martin',
    specialty: 'Spécialiste diabète',
    rating: 4.9,
    distance: 3.2,
    avatar: null,
    location: { lat: 48.8566, lng: 2.3522 },
    services: ['Soins diabète', 'Éducation thérapeutique', 'Suivi glycémique'],
    basePrice: 40
  },
  {
    id: 3,
    name: 'Claire Bernard',
    specialty: 'Soins palliatifs',
    rating: 4.7,
    distance: 4.1,
    avatar: null,
    location: { lat: 48.8566, lng: 2.3522 },
    services: ['Soins palliatifs', 'Accompagnement', 'Soutien famille'],
    basePrice: 45
  }
])

// Computed
const filteredNurses = computed(() => {
  let filtered = nurses.value

  if (searchForm.value.specialty) {
    filtered = filtered.filter(nurse => 
      nurse.specialty.toLowerCase().includes(searchForm.value.specialty.toLowerCase())
    )
  }

  if (searchForm.value.minRating > 0) {
    filtered = filtered.filter(nurse => nurse.rating >= searchForm.value.minRating)
  }

  if (searchForm.value.maxPrice < 100) {
    filtered = filtered.filter(nurse => nurse.basePrice <= searchForm.value.maxPrice)
  }

  return filtered
})

// Methods
const performSearch = async () => {
  if (!searchForm.value.address.trim()) {
    uiStore.showError('Veuillez saisir une adresse')
    return
  }

  isSearching.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update search results based on form
    // In real app, this would call the API
    uiStore.showSuccess('Recherche effectuée')
  } catch (error) {
    uiStore.showError('Erreur lors de la recherche')
  } finally {
    isSearching.value = false
  }
}

const selectNurse = (nurse: Nurse) => {
  selectedNurse.value = nurse
}

const bookAppointment = (nurse: Nurse) => {
  nurseToBook.value = nurse
  showBookingDialog.value = true
}

const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'list' ? 'grid' : 'list'
}

// Lifecycle
onMounted(() => {
  // Load search parameters from route query
  if (route.query.q) {
    searchForm.value.address = route.query.q as string
  }
  if (route.query.specialite) {
    searchForm.value.specialty = route.query.specialite as string
  }
  if (route.query.rayon) {
    searchForm.value.radius = parseInt(route.query.rayon as string)
  }
  
  // Perform initial search if address is provided
  if (searchForm.value.address) {
    performSearch()
  }
})
</script>

<style scoped>
.search-page {
  min-height: 100vh;
  background: #f8fafc;
}

.search-header {
  background: white;
  padding: 2rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.search-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.search-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
}

.search-form-wrapper {
  margin-top: 2rem;
}

.search-form-card {
  background: white;
  border: 1px solid #e2e8f0;
}

.advanced-filters {
  margin-top: 1rem;
}

.filters-card {
  background: white;
  border: 1px solid #e2e8f0;
}

.search-results {
  padding: 2rem 0;
}

.map-card {
  background: white;
  border: 1px solid #e2e8f0;
  height: 600px;
}

.map-placeholder {
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  border-radius: 0 0 12px 12px;
}

.map-content {
  text-align: center;
  color: #64748b;
}

.map-content h3 {
  color: #1e293b;
  margin: 1rem 0 0.5rem 0;
}

.results-card {
  background: white;
  border: 1px solid #e2e8f0;
  height: 600px;
  overflow-y: auto;
}

.no-results {
  text-align: center;
  padding: 3rem 1rem;
  color: #64748b;
}

.no-results h4 {
  color: #1e293b;
  margin: 1rem 0 0.5rem 0;
}

.nurses-list {
  padding: 1rem;
}

.nurse-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
}

.nurse-card:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
}

.nurse-card-selected {
  border-color: #667eea;
  background: #f8fafc;
}

.nurse-avatar {
  margin-right: 1rem;
}

.nurse-info {
  flex: 1;
}

.nurse-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.nurse-specialty {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0 0 0.5rem 0;
}

.nurse-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.rating-text {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.nurse-distance {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.nurse-actions {
  margin-left: 1rem;
}

.fullscreen-map {
  height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
}

.fullscreen-map .map-content {
  text-align: center;
  color: #64748b;
}

.fullscreen-map h2 {
  color: #1e293b;
  margin: 1rem 0 0.5rem 0;
}

/* Responsive */
@media (max-width: 960px) {
  .search-title {
    font-size: 2rem;
  }
  
  .map-card,
  .results-card {
    height: 400px;
  }
  
  .nurse-card {
    flex-direction: column;
    text-align: center;
  }
  
  .nurse-avatar {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .nurse-actions {
    margin-left: 0;
    margin-top: 1rem;
  }
}
</style>
