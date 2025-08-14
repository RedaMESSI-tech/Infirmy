<template>
  <div class="booking-page">
    <!-- Hero Section -->
    <section class="hero-section" :style="{'background-image':'linear-gradient(180deg, rgba(255,255,255,.80), rgba(255,255,255,.80)), url(/images/laser3.jpg)'}">
      <v-container class="text-center py-16">
        <h1 class="text-h2 text-md-h1 mb-4">Prendre Rendez-vous</h1>
        <p class="text-h6 text-medium-emphasis">Réservez votre séance d'épilation laser en quelques clics</p>
      </v-container>
    </section>

    <v-container class="py-12">
      <v-row>
        <!-- Formulaire de réservation -->
        <v-col cols="12" md="6" class="mb-8">
          <v-card class="pa-6" elevation="2">
            <h2 class="text-h4 mb-6">Informations de réservation</h2>
            
            <v-form ref="form" v-model="valid">
              <!-- Type de consultation -->
              <v-select
                v-model="booking.type"
                :items="consultationTypes"
                label="Type de consultation"
                variant="outlined"
                required
                class="mb-4"
              />

              <!-- Zone à traiter -->
              <v-select
                v-model="booking.zone"
                :items="treatmentZones"
                label="Zone à traiter"
                variant="outlined"
                required
                class="mb-4"
              />

              <!-- Nom et prénom -->
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="booking.firstName"
                    label="Prénom"
                    variant="outlined"
                    required
                    class="mb-4"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="booking.lastName"
                    label="Nom"
                    variant="outlined"
                    required
                    class="mb-4"
                  />
                </v-col>
              </v-row>

              <!-- Email et téléphone -->
              <v-text-field
                v-model="booking.email"
                label="Email"
                type="email"
                variant="outlined"
                required
                class="mb-4"
              />

              <v-text-field
                v-model="booking.phone"
                label="Téléphone"
                variant="outlined"
                required
                class="mb-4"
              />

              <!-- Date de naissance -->
              <v-text-field
                v-model="booking.birthDate"
                label="Date de naissance"
                type="date"
                variant="outlined"
                required
                class="mb-4"
              />

              <!-- Phototype -->
              <v-select
                v-model="booking.phototype"
                :items="phototypes"
                label="Phototype (type de peau)"
                variant="outlined"
                required
                class="mb-4"
              />

              <!-- Antécédents médicaux -->
              <v-textarea
                v-model="booking.medicalHistory"
                label="Antécédents médicaux (optionnel)"
                variant="outlined"
                rows="3"
                class="mb-4"
                placeholder="Médicaments en cours, allergies, conditions particulières..."
              />

              <!-- Message -->
              <v-textarea
                v-model="booking.message"
                label="Message (optionnel)"
                variant="outlined"
                rows="3"
                class="mb-4"
                placeholder="Informations complémentaires, questions..."
              />

              <!-- Bouton de réservation -->
              <v-btn
                color="primary"
                size="large"
                variant="elevated"
                block
                @click="submitBooking"
                :loading="loading"
                :disabled="!valid"
                class="mb-4"
              >
                Confirmer la réservation
              </v-btn>

              <v-alert
                v-if="bookingMessage"
                :type="bookingMessage.type"
                variant="tonal"
                class="mb-4"
              >
                {{ bookingMessage.text }}
              </v-alert>
            </v-form>
          </v-card>
        </v-col>

        <!-- Calendrier et disponibilités -->
        <v-col cols="12" md="6">
          <v-card class="pa-6" elevation="2">
            <h2 class="text-h4 mb-6">Calendrier des disponibilités</h2>
            
            <!-- Sélecteur de mois -->
            <div class="d-flex align-center justify-space-between mb-6">
              <v-btn icon @click="previousMonth">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <h3 class="text-h5">{{ currentMonthYear }}</h3>
              <v-btn icon @click="nextMonth">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>

            <!-- Calendrier -->
            <div class="calendar-container">
              <!-- Jours de la semaine -->
              <div class="calendar-header">
                <div v-for="day in weekDays" :key="day" class="calendar-day-header">
                  {{ day }}
                </div>
              </div>

              <!-- Grille du calendrier -->
              <div class="calendar-grid">
                <div
                  v-for="date in calendarDates"
                  :key="date.key"
                  class="calendar-date"
                  :class="{
                    'other-month': !date.currentMonth,
                    'today': date.isToday,
                    'booked': date.isBooked,
                    'selected': date.isSelected
                  }"
                  @click="selectDate(date)"
                >
                  <span class="date-number">{{ date.day }}</span>
                  <div v-if="date.isBooked" class="booking-info">
                    <div class="booking-dot"></div>
                    <span class="booking-text">Moi</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Légende -->
            <div class="calendar-legend mt-6">
              <div class="d-flex align-center mb-2">
                <div class="legend-item">
                  <div class="legend-dot available"></div>
                  <span class="text-caption">Disponible</span>
                </div>
                <div class="legend-item ms-4">
                  <div class="legend-dot booked"></div>
                  <span class="text-caption">Réservé</span>
                </div>
                <div class="legend-item ms-4">
                  <div class="legend-dot selected"></div>
                  <span class="text-caption">Sélectionné</span>
                </div>
              </div>
            </div>

            <!-- Horaires disponibles -->
            <div class="mt-6">
              <h3 class="text-h6 mb-4">Horaires disponibles</h3>
              <div class="time-slots">
                <v-btn
                  v-for="time in availableTimes"
                  :key="time"
                  :variant="selectedTime === time ? 'elevated' : 'outlined'"
                  :color="selectedTime === time ? 'primary' : 'default'"
                  class="me-2 mb-2"
                  @click="selectTime(time)"
                >
                  {{ time }}
                </v-btn>
              </div>
            </div>

            <!-- Informations importantes -->
            <v-alert type="info" variant="tonal" class="mt-6">
              <template #title>
                <strong>Informations importantes</strong>
              </template>
              <p class="mb-2">• Consultation gratuite obligatoire pour les nouveaux clients</p>
              <p class="mb-2">• Test de spot gratuit inclus</p>
              <p>• Annulation possible jusqu'à 24h avant le rendez-vous</p>
            </v-alert>
          </v-card>
        </v-col>
      </v-row>

      <!-- Informations complémentaires -->
      <v-row class="mt-12">
        <v-col cols="12">
          <v-card class="pa-6" color="primary" theme="dark">
            <h3 class="text-h5 mb-4">Préparation pour votre rendez-vous</h3>
            <v-row>
              <v-col cols="12" md="4">
                <div class="d-flex align-center mb-3">
                  <v-icon size="24" class="me-3">mdi-clock</v-icon>
                  <div>
                    <h4 class="text-h6">Avant la séance</h4>
                    <p class="text-body-2">Arrêter l'épilation 4-6 semaines avant</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="d-flex align-center mb-3">
                  <v-icon size="24" class="me-3">mdi-sun</v-icon>
                  <div>
                    <h4 class="text-h6">Protection solaire</h4>
                    <p class="text-body-2">Éviter l'exposition 2 semaines avant</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="d-flex align-center mb-3">
                  <v-icon size="24" class="me-3">mdi-account</v-icon>
                  <div>
                    <h4 class="text-h6">Le jour même</h4>
                    <p class="text-body-2">Arriver sans maquillage sur la zone</p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'

// État du formulaire
const form = ref(null)
const valid = ref(false)
const loading = ref(false)
const selectedDate = ref(null)
const selectedTime = ref(null)

// Données de réservation
const booking = ref({
  type: '',
  zone: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  phototype: '',
  medicalHistory: '',
  message: ''
})

// Messages
const bookingMessage = ref(null)

// Options des sélecteurs
const consultationTypes = [
  'Consultation gratuite (nouveau client)',
  'Séance d\'épilation laser',
  'Test de spot gratuit',
  'Suivi post-traitement'
]

const treatmentZones = [
  'Visage (lèvre, menton, joues)',
  'Aisselles',
  'Bras (avant-bras ou complet)',
  'Dos',
  'Poitrine',
  'Abdomen',
  'Jambes (1/2 jambe ou complet)',
  'Pieds',
  'Maillot (classique, brésilien, complet)',
  'Zone périanale'
]

const phototypes = [
  'Phototype I - Peau très claire, brûle toujours',
  'Phototype II - Peau claire, brûle souvent',
  'Phototype III - Peau claire à moyenne, brûle modérément',
  'Phototype IV - Peau moyenne, brûle rarement',
  'Phototype V - Peau mate, brûle très rarement',
  'Phototype VI - Peau très mate, ne brûle jamais'
]

// Calendrier
const currentDate = ref(dayjs())
const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

// Rendez-vous existants (simulation)
const existingBookings = ref([
  { date: '2024-01-15', time: '09:00', client: 'Moi' },
  { date: '2024-01-22', time: '14:00', client: 'Moi' },
  { date: '2024-01-29', time: '10:00', client: 'Moi' }
])

// Horaires disponibles
const availableTimes = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
]

// Computed properties
const currentMonthYear = computed(() => {
  return currentDate.value.format('MMMM YYYY')
})

const calendarDates = computed(() => {
  const start = currentDate.value.startOf('month').startOf('week')
  const end = currentDate.value.endOf('month').endOf('week')
  const dates = []
  
  let current = start
  while (current.isBefore(end) || current.isSame(end, 'day')) {
    const dateKey = current.format('YYYY-MM-DD')
    const isBooked = existingBookings.value.some(booking => 
      booking.date === dateKey
    )
    
    dates.push({
      key: dateKey,
      day: current.date(),
      currentMonth: current.month() === currentDate.value.month(),
      isToday: current.isSame(dayjs(), 'day'),
      isBooked,
      isSelected: selectedDate.value === dateKey
    })
    
    current = current.add(1, 'day')
  }
  
  return dates
})

// Méthodes
function previousMonth() {
  currentDate.value = currentDate.value.subtract(1, 'month')
}

function nextMonth() {
  currentDate.value = currentDate.value.add(1, 'month')
}

function selectDate(date) {
  if (date.currentMonth && !date.isBooked) {
    selectedDate.value = date.key
  }
}

function selectTime(time) {
  selectedTime.value = time
}

async function submitBooking() {
  if (!form.value.validate()) return
  
  loading.value = true
  
  try {
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    bookingMessage.value = {
      type: 'success',
      text: 'Votre réservation a été confirmée ! Vous recevrez un email de confirmation dans quelques minutes.'
    }
    
    // Reset form
    booking.value = {
      type: '',
      zone: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      phototype: '',
      medicalHistory: '',
      message: ''
    }
    
    selectedDate.value = null
    selectedTime.value = null
    
  } catch (error) {
    bookingMessage.value = {
      type: 'error',
      text: 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // Initialiser la date sélectionnée à aujourd'hui
  selectedDate.value = dayjs().format('YYYY-MM-DD')
})
</script>

<style scoped>
.booking-page {
  background-color: rgb(var(--v-theme-surface));
}

.hero-section {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 400px;
  display: flex;
  align-items: center;
}

.calendar-container {
  border: 1px solid rgb(var(--v-theme-outline));
  border-radius: 8px;
  overflow: hidden;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: rgb(var(--v-theme-primary));
  color: white;
}

.calendar-day-header {
  padding: 12px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-date {
  min-height: 60px;
  padding: 8px;
  border: 1px solid rgb(var(--v-theme-outline));
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.calendar-date:hover:not(.other-month) {
  background-color: rgb(var(--v-theme-primary-container));
}

.calendar-date.other-month {
  color: rgb(var(--v-theme-outline));
  background-color: rgb(var(--v-theme-surface-variant));
}

.calendar-date.today {
  background-color: rgb(var(--v-theme-secondary-container));
  font-weight: bold;
}

.calendar-date.booked {
  background-color: rgb(var(--v-theme-primary-container));
  color: rgb(var(--v-theme-on-primary-container));
}

.calendar-date.selected {
  background-color: rgb(var(--v-theme-secondary));
  color: rgb(var(--v-theme-on-secondary));
}

.date-number {
  font-size: 16px;
  font-weight: 500;
}

.booking-info {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.booking-dot {
  width: 8px;
  height: 8px;
  background-color: rgb(var(--v-theme-primary));
  border-radius: 50%;
  margin: 0 auto 2px;
}

.booking-text {
  font-size: 10px;
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
}

.calendar-legend {
  display: flex;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  margin: 0 8px;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
}

.legend-dot.available {
  background-color: rgb(var(--v-theme-surface));
  border: 2px solid rgb(var(--v-theme-outline));
}

.legend-dot.booked {
  background-color: rgb(var(--v-theme-primary-container));
}

.legend-dot.selected {
  background-color: rgb(var(--v-theme-secondary));
}

.time-slots {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
