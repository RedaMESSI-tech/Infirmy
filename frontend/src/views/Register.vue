<template>
  <div class="register-container">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-12 pa-8">
            <v-card-title class="text-center text-h4 mb-6">
              Inscription
            </v-card-title>
            
            <!-- Role Selection -->
            <div class="role-selection mb-6">
              <v-label class="text-subtitle-1 mb-3 d-block">Je suis :</v-label>
              <v-row>
                <v-col cols="6">
                  <v-card
                    :class="['role-card', { 'role-card-selected': selectedRole === 'patient' }]"
                    @click="selectedRole = 'patient'"
                    :elevation="selectedRole === 'patient' ? 8 : 2"
                    class="text-center pa-4 cursor-pointer"
                  >
                    <v-icon size="48" color="primary" class="mb-3">
                      mdi-account-heart
                    </v-icon>
                    <div class="text-h6">Patient</div>
                    <div class="text-caption text-medium-emphasis">
                      Je cherche des soins infirmiers
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card
                    :class="['role-card', { 'role-card-selected': selectedRole === 'nurse' }]"
                    @click="selectedRole = 'nurse'"
                    :elevation="selectedRole === 'nurse' ? 8 : 2"
                    class="text-center pa-4 cursor-pointer"
                  >
                    <v-icon size="48" color="secondary" class="mb-3">
                      mdi-account-tie
                    </v-icon>
                    <div class="text-h6">Infirmier</div>
                    <div class="text-caption text-medium-emphasis">
                      Je propose des soins infirmiers
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>
            
            <v-form @submit.prevent="handleRegister" v-if="selectedRole">
              <v-text-field
                v-model="firstName"
                label="Prénom"
                variant="outlined"
                required
                prepend-icon="mdi-account"
                class="mb-4"
                :rules="[v => !!v || 'Le prénom est requis']"
              />
              
              <v-text-field
                v-model="lastName"
                label="Nom"
                variant="outlined"
                required
                prepend-icon="mdi-account"
                class="mb-4"
                :rules="[v => !!v || 'Le nom est requis']"
              />
              
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                variant="outlined"
                required
                prepend-icon="mdi-email"
                class="mb-4"
                :rules="[
                  v => !!v || 'L\'email est requis',
                  v => /.+@.+\..+/.test(v) || 'L\'email doit être valide'
                ]"
              />
              
              <v-text-field
                v-model="password"
                label="Mot de passe"
                type="password"
                variant="outlined"
                required
                prepend-icon="mdi-lock"
                class="mb-4"
                :rules="[
                  v => !!v || 'Le mot de passe est requis',
                  v => v.length >= 8 || 'Le mot de passe doit contenir au moins 8 caractères'
                ]"
              />
              
              <v-text-field
                v-model="confirmPassword"
                label="Confirmer le mot de passe"
                type="password"
                variant="outlined"
                required
                prepend-icon="mdi-lock-check"
                class="mb-6"
                :rules="[
                  v => !!v || 'La confirmation est requise',
                  v => v === password || 'Les mots de passe ne correspondent pas'
                ]"
              />
              
              <!-- Additional fields for nurses -->
              <div v-if="selectedRole === 'nurse'" class="nurse-fields mb-6">
                <v-divider class="my-4" />
                <v-label class="text-subtitle-1 mb-3 d-block">Informations professionnelles</v-label>
                
                <v-text-field
                  v-model="nurseData.licenseNumber"
                  label="Numéro de licence professionnelle"
                  variant="outlined"
                  required
                  prepend-icon="mdi-card-account-details"
                  class="mb-4"
                  :rules="[v => !!v || 'Le numéro de licence est requis']"
                />
                
                <v-select
                  v-model="nurseData.specialty"
                  :items="specialties"
                  label="Spécialité principale"
                  variant="outlined"
                  required
                  prepend-icon="mdi-stethoscope"
                  class="mb-4"
                  :rules="[v => !!v || 'La spécialité est requise']"
                />
                
                <v-text-field
                  v-model="nurseData.yearsExperience"
                  label="Années d'expérience"
                  type="number"
                  variant="outlined"
                  required
                  prepend-icon="mdi-calendar"
                  class="mb-4"
                  :rules="[v => !!v || 'L\'expérience est requise']"
                />
              </div>
              
              <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                :loading="authStore.isLoading"
                class="mb-4"
                :disabled="!selectedRole"
              >
                S'inscrire en tant que {{ selectedRole === 'patient' ? 'patient' : 'infirmier' }}
              </v-btn>
              
              <div class="text-center">
                <v-btn variant="text" to="/login">
                  Déjà un compte ? Se connecter
                </v-btn>
              </div>
            </v-form>
            
            <!-- Error message -->
            <FormError
              v-if="authStore.error"
              :message="authStore.error"
              class="mt-4"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'
import FormError from '@/components/auth/FormError.vue'

// Stores
const authStore = useAuthStore()
const uiStore = useUIStore()

// Form data
const selectedRole = ref<'patient' | 'nurse' | null>(null)
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// Nurse-specific data
const nurseData = ref({
  licenseNumber: '',
  specialty: '',
  yearsExperience: ''
})

// Specialties for nurses
const specialties = [
  'Soins généraux',
  'Soins pédiatriques',
  'Soins gériatriques',
  'Soins intensifs',
  'Soins à domicile',
  'Soins en établissement',
  'Soins d\'urgence',
  'Soins palliatifs'
]

// Methods
const handleRegister = async () => {
  if (!selectedRole.value) {
    uiStore.showError('Veuillez sélectionner votre rôle')
    return
  }
  
  if (password.value !== confirmPassword.value) {
    uiStore.showError('Les mots de passe ne correspondent pas')
    return
  }
  
  try {
    const registerData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      role: selectedRole.value,
      ...(selectedRole.value === 'nurse' && {
        licenseNumber: nurseData.value.licenseNumber,
        specialty: nurseData.value.specialty,
        yearsExperience: parseInt(nurseData.value.yearsExperience)
      })
    }
    
    const result = await authStore.register(registerData)
    
    if (result.success) {
      uiStore.showSuccess(`Inscription réussie ! Bienvenue ${firstName.value}`)
      // The auth store will handle redirection based on role
    } else {
      uiStore.showError(result.error || 'Erreur lors de l\'inscription')
    }
  } catch (error: any) {
    uiStore.showError(error.message || 'Erreur lors de l\'inscription')
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
}

.role-card {
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.role-card:hover {
  transform: translateY(-2px);
}

.role-card-selected {
  border-color: var(--v-primary-base);
  background-color: var(--v-primary-lighten5);
}

.cursor-pointer {
  cursor: pointer;
}

.nurse-fields {
  background-color: var(--v-surface-variant);
  padding: 16px;
  border-radius: 12px;
}
</style>
