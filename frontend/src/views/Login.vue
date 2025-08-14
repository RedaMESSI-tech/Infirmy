<template>
  <div class="login-page">
    <v-container class="login-container">
      <v-row justify="center" align="center" class="login-row">
        <v-col cols="12" sm="8" md="6" lg="4">
          <!-- Login Card -->
          <AuthCard
            title="Connexion"
            subtitle="Connectez-vous à votre compte Infirmy"
          >
            <!-- Form Error -->
            <FormError
              :error="authStore.error"
              @close="authStore.clearError"
            />

            <!-- Login Form -->
            <v-form ref="loginForm" v-model="isFormValid" @submit.prevent="handleLogin">
              <AuthEmailField
                v-model="form.email"
                :error-message="errors.email"
                @input="clearError('email')"
                required
              />

              <AuthPasswordField
                v-model="form.password"
                :error-message="errors.password"
                @input="clearError('password')"
                required
              />

              <div class="d-flex justify-space-between align-center mb-6">
                <v-checkbox
                  v-model="form.rememberMe"
                  label="Se souvenir de moi"
                  color="primary"
                  density="compact"
                  hide-details
                />
                
                <v-btn
                  variant="text"
                  color="primary"
                  size="small"
                  @click="$router.push('/forgot-password')"
                >
                  Mot de passe oublié ?
                </v-btn>
              </div>

              <v-btn
                type="submit"
                color="primary"
                size="large"
                variant="elevated"
                rounded="lg"
                block
                :loading="authStore.isLoading"
                :disabled="!isFormValid"
                class="login-btn"
              >
                <v-icon start>mdi-login</v-icon>
                Se connecter
              </v-btn>
            </v-form>

            <!-- Divider -->
            <v-divider class="my-6">
              <span class="divider-text">ou</span>
            </v-divider>

            <!-- Social Login -->
            <div class="social-login">
              <v-btn
                variant="outlined"
                size="large"
                rounded="lg"
                block
                class="social-btn google-btn mb-3"
                @click="socialLogin('google')"
              >
                <v-icon start>mdi-google</v-icon>
                Continuer avec Google
              </v-btn>
              
              <v-btn
                variant="outlined"
                size="large"
                rounded="lg"
                block
                class="social-btn apple-btn"
                @click="socialLogin('apple')"
              >
                <v-icon start>mdi-apple</v-icon>
                Continuer avec Apple
              </v-btn>
            </div>

            <!-- Footer -->
            <template #footer>
              <div class="text-center">
                <p class="register-text">
                  Pas encore de compte ?
                  <v-btn
                    variant="text"
                    color="primary"
                    size="small"
                    @click="$router.push('/register')"
                  >
                    S'inscrire
                  </v-btn>
                </p>
              </div>
            </template>
          </AuthCard>

          <!-- Trust Indicators -->
          <div class="trust-indicators text-center mt-6">
            <div class="trust-item">
              <v-icon size="24" color="success" class="mr-2">
                mdi-shield-check
              </v-icon>
              <span class="trust-text">Sécurisé et conforme RGPD</span>
            </div>
            
            <div class="trust-item">
              <v-icon size="24" color="primary" class="mr-2">
                mdi-heart
              </v-icon>
              <span class="trust-text">+5000 soins réalisés</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'
import AuthCard from '@/components/auth/AuthCard.vue'
import AuthEmailField from '@/components/auth/AuthEmailField.vue'
import AuthPasswordField from '@/components/auth/AuthPasswordField.vue'
import FormError from '@/components/auth/FormError.vue'

// Router & Route
const router = useRouter()
const route = useRoute()

// Stores
const authStore = useAuthStore()
const uiStore = useUIStore()

// Form ref
const loginForm = ref<any>(null)

// State
const isFormValid = ref(false)

// Form data
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

// Errors
const errors = reactive({
  email: '',
  password: ''
})

// Methods
const clearError = (field: keyof typeof errors) => {
  errors[field] = ''
}

const validateForm = (): boolean => {
  if (!loginForm.value) return false
  
  const { valid } = loginForm.value.validate()
  return valid
}

const handleLogin = async () => {
  if (!validateForm()) {
    return
  }

  try {
    const result = await authStore.login({
      email: form.email,
      password: form.password,
      rememberMe: form.rememberMe
    })
    
    if (result.success) {
      uiStore.showSuccess('Connexion réussie !')
      // Router will handle redirect based on user role
    } else {
      if (result.error) {
        uiStore.showError(result.error)
      }
    }
  } catch (error: any) {
    uiStore.showError(error.message || 'Erreur lors de la connexion')
  }
}

const socialLogin = async (provider: 'google' | 'apple') => {
  uiStore.showInfo(`Connexion avec ${provider} en cours de développement`)
  // TODO: Implement social login
}

// Lifecycle
onMounted(() => {
  uiStore.setPageInfo('Connexion - Infirmy', 'login')
  
  // Check for redirect query parameter
  const redirect = route.query.redirect as string
  if (redirect) {
    // Store redirect path for after login
    localStorage.setItem('redirectAfterLogin', redirect)
  }
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

.login-container {
  max-width: 1200px;
}

.login-row {
  min-height: calc(100vh - 4rem);
}

.login-btn {
  height: 48px;
  font-weight: 600;
  text-transform: none;
  font-size: 1rem;
}

.divider-text {
  background: white;
  padding: 0 1rem;
  color: #64748b;
  font-size: 0.9rem;
}

.social-login {
  margin-bottom: 1rem;
}

.social-btn {
  height: 48px;
  text-transform: none;
  font-size: 1rem;
  border-width: 2px;
}

.google-btn {
  border-color: #ea4335;
  color: #ea4335;
}

.google-btn:hover {
  background: #ea4335;
  color: white;
}

.apple-btn {
  border-color: #000;
  color: #000;
}

.apple-btn:hover {
  background: #000;
  color: white;
}

.register-text {
  color: #64748b;
  margin: 0;
}

.register-text .v-btn {
  font-weight: 600;
}

.trust-indicators {
  color: rgba(255, 255, 255, 0.9);
}

.trust-item {
  display: inline-flex;
  align-items: center;
  margin: 0 1rem;
  font-size: 0.9rem;
}

.trust-text {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 600px) {
  .login-page {
    padding: 1rem 0;
  }
  
  .trust-item {
    display: block;
    margin: 0.5rem 0;
  }
}

/* Focus states for accessibility */
.v-btn:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
</style>
