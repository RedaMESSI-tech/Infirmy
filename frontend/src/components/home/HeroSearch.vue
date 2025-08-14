<template>
  <div class="hero-search">
    <v-card class="search-card" elevation="12" rounded="xl">
      <v-card-text class="pa-6">
        <h3 class="search-title mb-4">Trouvez une infirmière à domicile</h3>
        
        <v-form ref="searchForm" @submit.prevent="handleSearch">
          <v-row>
            <!-- Address Input -->
            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.address"
                label="Adresse, ville ou code postal"
                variant="outlined"
                rounded="lg"
                prepend-inner-icon="mdi-map-marker"
                placeholder="Ex: Paris, 75001"
                :rules="addressRules"
                @keyup.enter="handleSearch"
              />
            </v-col>

            <!-- Specialty Input -->
            <v-col cols="12" md="3">
              <v-select
                v-model="form.specialty"
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

            <!-- Radius Input -->
            <v-col cols="12" md="3">
              <v-select
                v-model="form.radius"
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

            <!-- Search Button -->
            <v-col cols="12" md="2">
              <v-btn
                type="submit"
                color="primary"
                variant="elevated"
                size="x-large"
                rounded="lg"
                block
                :loading="isSearching"
                :disabled="!isFormValid"
                class="search-btn"
                height="56"
              >
                <v-icon start>mdi-magnify</v-icon>
                Rechercher
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

        <!-- Quick Actions -->
        <div class="quick-actions mt-4">
          <v-chip
            v-for="action in quickActions"
            :key="action.label"
            variant="outlined"
            color="primary"
            class="mr-2 mb-2"
            @click="quickSearch(action)"
          >
            <v-icon start size="small">{{ action.icon }}</v-icon>
            {{ action.label }}
          </v-chip>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUIStore } from '@/stores/ui'

// Router
const router = useRouter()

// Store
const uiStore = useUIStore()

// Form ref
const searchForm = ref<any>(null)

// State
const isSearching = ref(false)

// Form data
const form = ref({
  address: '',
  specialty: '',
  radius: 10
})

// Validation rules
const addressRules = [
  (v: string) => !!v || 'L\'adresse est requise',
  (v: string) => v.length >= 3 || 'L\'adresse doit contenir au moins 3 caractères'
]

// Data
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

const quickActions = [
  { label: 'Urgence', icon: 'mdi-alert', specialty: '', radius: 5 },
  { label: 'Prise de sang', icon: 'mdi-needle', specialty: 'blood', radius: 10 },
  { label: 'Pansements', icon: 'mdi-bandage', specialty: 'dressings', radius: 15 }
]

// Computed
const isFormValid = computed(() => {
  return form.value.address.trim().length >= 3
})

// Methods
const handleSearch = async () => {
  if (!isFormValid.value) {
    uiStore.showError('Veuillez saisir une adresse valide')
    return
  }

  isSearching.value = true

  try {
    // Build query parameters
    const query: any = {
      q: form.value.address.trim()
    }

    if (form.value.specialty) {
      query.specialite = form.value.specialty
    }

    if (form.value.radius !== 10) {
      query.rayon = form.value.radius
    }

    // Navigate to search page with query
    await router.push({
      path: '/rechercher',
      query
    })

    uiStore.showSuccess('Recherche lancée')
  } catch (error: any) {
    uiStore.showError('Erreur lors de la recherche')
  } finally {
    isSearching.value = false
  }
}

const quickSearch = (action: any) => {
  form.value.specialty = action.specialty
  form.value.radius = action.radius
  handleSearch()
}

// Lifecycle
onMounted(() => {
  // Focus address input on mount
  const addressInput = document.querySelector('input[label="Adresse, ville ou code postal"]')
  if (addressInput) {
    (addressInput as HTMLElement).focus()
  }
})
</script>

<style scoped>
.hero-search {
  margin-top: 2rem;
}

.search-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  text-align: center;
}

.search-btn {
  height: 56px;
  font-weight: 600;
  text-transform: none;
  font-size: 1rem;
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.quick-actions .v-chip {
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-actions .v-chip:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive */
@media (max-width: 960px) {
  .search-card {
    margin: 0 1rem;
  }
  
  .search-title {
    font-size: 1.25rem;
  }
  
  .quick-actions {
    justify-content: flex-start;
  }
}

@media (max-width: 600px) {
  .hero-search {
    margin-top: 1rem;
  }
  
  .search-card {
    margin: 0 0.5rem;
  }
}
</style>
