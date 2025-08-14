<template>
  <div class="appointment-booking">
    <v-card class="booking-card" elevation="8" rounded="xl">
      <v-card-title class="d-flex align-center pa-6">
        <v-icon color="primary" class="mr-3" size="32">
          mdi-calendar-plus
        </v-icon>
        <div>
          <h2 class="text-h4 font-weight-bold">Prendre un rendez-vous</h2>
          <p class="text-body-1 text-medium-emphasis mt-1">
            avec {{ nurse.name }}
          </p>
        </div>
      </v-card-title>
      
      <v-card-text class="pa-6">
        <v-form @submit.prevent="bookAppointment" ref="form">
          <!-- Service Selection -->
          <v-select
            v-model="booking.service"
            :items="nurse.services"
            label="Service demandé"
            variant="outlined"
            required
            prepend-icon="mdi-stethoscope"
            class="mb-6"
            :rules="[v => !!v || 'Le service est requis']"
          />
          
          <!-- Date Selection -->
          <v-date-picker
            v-model="booking.date"
            :min="minDate"
            :max="maxDate"
            :allowed-dates="allowedDates"
            class="mb-6"
            full-width
            elevation="4"
            rounded="lg"
          />
          
          <!-- Time Selection -->
          <v-select
            v-model="booking.time"
            :items="availableTimeSlots"
            label="Heure du rendez-vous"
            variant="outlined"
            required
            prepend-icon="mdi-clock"
            class="mb-6"
            :rules="[v => !!v || 'L\'heure est requise']"
            :disabled="!booking.date"
          />
          
          <!-- Address -->
          <v-text-field
            v-model="booking.address"
            label="Adresse d'intervention"
            variant="outlined"
            required
            prepend-icon="mdi-map-marker"
            class="mb-6"
            :rules="[v => !!v || 'L\'adresse est requise']"
            placeholder="123 Rue de la Paix, 75001 Paris"
          />
          
          <!-- Notes -->
          <v-textarea
            v-model="booking.notes"
            label="Notes supplémentaires (optionnel)"
            variant="outlined"
            prepend-icon="mdi-note-text"
            class="mb-6"
            rows="3"
            placeholder="Décrivez brièvement vos besoins ou symptômes..."
          />
          
          <!-- Price Display -->
          <v-card class="price-card pa-4 mb-6" elevation="2" rounded="lg">
            <div class="d-flex align-center justify-space-between">
              <div>
                <h4 class="text-h6 font-weight-bold">Prix estimé</h4>
                <p class="text-body-2 text-medium-emphasis">
                  Basé sur le service et la distance
                </p>
              </div>
              <div class="text-right">
                <div class="text-h4 font-weight-bold text-primary">
                  {{ estimatedPrice }}€
                </div>
                <div class="text-caption text-medium-emphasis">
                  TTC
                </div>
              </div>
            </div>
          </v-card>
          
          <!-- Submit Button -->
          <v-btn
            type="submit"
            color="primary"
            size="large"
            variant="elevated"
            rounded="lg"
            block
            :loading="isLoading"
            :disabled="!isFormValid"
          >
            <v-icon start>mdi-calendar-check</v-icon>
            Confirmer le rendez-vous
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    
    <!-- Success Dialog -->
    <v-dialog v-model="showSuccessDialog" max-width="500px" persistent>
      <v-card rounded="lg">
        <v-card-title class="d-flex align-center pa-6">
          <v-icon color="success" class="mr-3">
            mdi-check-circle
          </v-icon>
          Rendez-vous confirmé !
        </v-card-title>
        
        <v-card-text class="pa-6">
          <p class="text-body-1 mb-4">
            Votre rendez-vous avec {{ nurse.name }} a été confirmé pour le 
            <strong>{{ formatDate(booking.date) }}</strong> à <strong>{{ booking.time }}</strong>.
          </p>
          
          <v-alert
            type="info"
            variant="tonal"
            class="mb-4"
          >
            <div class="d-flex align-center">
              <v-icon class="mr-2">mdi-information</v-icon>
              <span>Un email de confirmation vous a été envoyé avec tous les détails.</span>
            </div>
          </v-alert>
        </v-card-text>
        
        <v-card-actions class="pa-6">
          <v-spacer />
          <v-btn
            color="primary"
            variant="elevated"
            rounded="lg"
            @click="goToDashboard"
          >
            Aller au tableau de bord
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUIStore } from '@/stores/ui'

// Props
interface Props {
  nurse: {
    id: number
    name: string
    services: string[]
    basePrice: number
    rating: number
  }
}

const props = defineProps<Props>()

// Router
const router = useRouter()

// Store
const uiStore = useUIStore()

// Form ref
const form = ref()

// State
const isLoading = ref(false)
const showSuccessDialog = ref(false)
const booking = ref({
  service: '',
  date: '',
  time: '',
  address: '',
  notes: ''
})

// Computed
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const maxDate = computed(() => {
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 2)
  return maxDate.toISOString().split('T')[0]
})

const availableTimeSlots = computed(() => {
  if (!booking.value.date) return []
  
  // Mock time slots - in real app, this would come from nurse's availability
  return [
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ]
})

const estimatedPrice = computed(() => {
  if (!booking.value.service || !booking.value.address) return props.nurse.basePrice
  
  // Simple price calculation based on service and distance
  let price = props.nurse.basePrice
  
  // Add service-specific pricing
  if (booking.value.service.includes('domicile')) {
    price += 10
  }
  
  // Add distance-based pricing (mock calculation)
  if (booking.value.address.includes('Paris')) {
    price += 5
  }
  
  return price
})

const isFormValid = computed(() => {
  return booking.value.service && 
         booking.value.date && 
         booking.value.time && 
         booking.value.address
})

// Methods
const allowedDates = (date: string) => {
  const selectedDate = new Date(date)
  const today = new Date()
  const dayOfWeek = selectedDate.getDay()
  
  // Only allow weekdays (Monday = 1, Sunday = 0)
  return dayOfWeek !== 0 && dayOfWeek !== 6
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const bookAppointment = async () => {
  if (!form.value?.validate()) return
  
  isLoading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Show success dialog
    showSuccessDialog.value = true
    
    // Show success message
    uiStore.showSuccess('Rendez-vous confirmé avec succès !')
    
  } catch (error: any) {
    uiStore.showError(error.message || 'Erreur lors de la réservation')
  } finally {
    isLoading.value = false
  }
}

const goToDashboard = () => {
  showSuccessDialog.value = false
  router.push('/patient')
}

// Lifecycle
onMounted(() => {
  // Set default service if available
  if (props.nurse.services.length > 0) {
    booking.value.service = props.nurse.services[0]
  }
})
</script>

<style scoped>
.appointment-booking {
  max-width: 800px;
  margin: 0 auto;
}

.booking-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
}

.price-card {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px solid #0ea5e9;
}

.v-date-picker {
  border-radius: 16px;
}
</style>
