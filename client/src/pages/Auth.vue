<template>
  <div class="auth-page">
    <!-- Hero Section -->
    <section class="hero-section" :style="{'background-image':'linear-gradient(180deg, rgba(255,255,255,.80), rgba(255,255,255,.80)), url(/images/laser2.jpg)'}">
      <v-container class="text-center py-16">
        <h1 class="text-h2 text-md-h1 mb-4">Espace Client</h1>
        <p class="text-h6 text-medium-emphasis">Connectez-vous ou créez votre compte pour accéder à vos rendez-vous</p>
      </v-container>
    </section>

    <v-container class="py-12">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <!-- Onglets Connexion/Inscription -->
          <v-card class="pa-6" elevation="3">
            <v-tabs v-model="activeTab" color="primary" grow>
              <v-tab value="login">Connexion</v-tab>
              <v-tab value="register">Inscription</v-tab>
            </v-tabs>

            <!-- Contenu des onglets -->
            <v-window v-model="activeTab">
              <!-- Onglet Connexion -->
              <v-window-item value="login">
                <div class="pa-6">
                  <h2 class="text-h4 mb-6 text-center">Connexion</h2>
                  
                  <v-form ref="loginForm" v-model="loginValid">
                    <v-text-field
                      v-model="login.email"
                      label="Email"
                      type="email"
                      variant="outlined"
                      required
                      class="mb-4"
                      prepend-inner-icon="mdi-email"
                    />

                    <v-text-field
                      v-model="login.password"
                      label="Mot de passe"
                      type="password"
                      variant="outlined"
                      required
                      class="mb-4"
                      prepend-inner-icon="mdi-lock"
                    />

                    <div class="d-flex justify-space-between align-center mb-6">
                      <v-checkbox
                        v-model="login.rememberMe"
                        label="Se souvenir de moi"
                      />
                      <v-btn variant="text" color="primary" size="small">
                        Mot de passe oublié ?
                      </v-btn>
                    </div>

                    <v-btn
                      color="primary"
                      size="large"
                      variant="elevated"
                      block
                      @click="submitLogin"
                      :loading="loginLoading"
                      :disabled="!loginValid"
                      class="mb-4"
                    >
                      Se connecter
                    </v-btn>

                    <v-alert
                      v-if="loginMessage"
                      :type="loginMessage.type"
                      variant="tonal"
                      class="mb-4"
                    >
                      {{ loginMessage.text }}
                    </v-alert>
                  </v-form>

                  <!-- Connexion sociale -->
                  <v-divider class="my-6">
                    <span class="text-caption text-medium-emphasis">Ou connectez-vous avec</span>
                  </v-divider>

                  <div class="d-flex gap-3">
                    <v-btn
                      variant="outlined"
                      block
                      prepend-icon="mdi-google"
                      @click="socialLogin('google')"
                    >
                      Google
                    </v-btn>
                    <v-btn
                      variant="outlined"
                      block
                      prepend-icon="mdi-facebook"
                      @click="socialLogin('facebook')"
                    >
                      Facebook
                    </v-btn>
                  </div>
                </div>
              </v-window-item>

              <!-- Onglet Inscription -->
              <v-window-item value="register">
                <div class="pa-6">
                  <h2 class="text-h4 mb-6 text-center">Créer un compte</h2>
                  
                  <v-form ref="registerForm" v-model="registerValid">
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="register.firstName"
                          label="Prénom"
                          variant="outlined"
                          required
                          class="mb-4"
                          prepend-inner-icon="mdi-account"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="register.lastName"
                          label="Nom"
                          variant="outlined"
                          required
                          class="mb-4"
                          prepend-inner-icon="mdi-account"
                        />
                      </v-col>
                    </v-row>

                    <v-text-field
                      v-model="register.email"
                      label="Email"
                      type="email"
                      variant="outlined"
                      required
                      class="mb-4"
                      prepend-inner-icon="mdi-email"
                    />

                    <v-text-field
                      v-model="register.phone"
                      label="Téléphone"
                      variant="outlined"
                      class="mb-4"
                      prepend-inner-icon="mdi-phone"
                    />

                    <v-text-field
                      v-model="register.birthDate"
                      label="Date de naissance"
                      type="date"
                      variant="outlined"
                      required
                      class="mb-4"
                      prepend-inner-icon="mdi-calendar"
                    />

                    <v-select
                      v-model="register.phototype"
                      :items="phototypes"
                      label="Phototype (type de peau)"
                      variant="outlined"
                      required
                      class="mb-4"
                      prepend-inner-icon="mdi-palette"
                    />

                    <v-text-field
                      v-model="register.password"
                      label="Mot de passe"
                      type="password"
                      variant="outlined"
                      required
                      class="mb-4"
                      prepend-inner-icon="mdi-lock"
                    />

                    <v-text-field
                      v-model="register.confirmPassword"
                      label="Confirmer le mot de passe"
                      type="password"
                      variant="outlined"
                      required
                      class="mb-4"
                      prepend-inner-icon="mdi-lock-check"
                    />

                    <v-checkbox
                      v-model="register.terms"
                      label="J'accepte les conditions d'utilisation et la politique de confidentialité *"
                      required
                      class="mb-4"
                    />

                    <v-checkbox
                      v-model="register.newsletter"
                      label="Je souhaite recevoir la newsletter et les offres spéciales"
                      class="mb-6"
                    />

                    <v-btn
                      color="primary"
                      size="large"
                      variant="elevated"
                      block
                      @click="submitRegister"
                      :loading="registerLoading"
                      :disabled="!registerValid || !register.terms"
                      class="mb-4"
                    >
                      Créer mon compte
                    </v-btn>

                    <v-alert
                      v-if="registerMessage"
                      :type="registerMessage.type"
                      variant="tonal"
                      class="mb-4"
                    >
                      {{ registerMessage.text }}
                    </v-alert>
                  </v-form>
                </div>
              </v-window-item>
            </v-window>
          </v-card>

          <!-- Informations supplémentaires -->
          <v-card class="pa-6 mt-6" color="primary" theme="dark">
            <h3 class="text-h6 mb-4">Pourquoi créer un compte ?</h3>
            <v-list class="bg-transparent">
              <v-list-item prepend-icon="mdi-check-circle" class="px-0">
                <v-list-item-title class="text-body-2">Accédez à votre historique de rendez-vous</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" class="px-0">
                <v-list-item-title class="text-body-2">Gérez vos préférences et informations</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" class="px-0">
                <v-list-item-title class="text-body-2">Recevez des offres personnalisées</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" class="px-0">
                <v-list-item-title class="text-body-2">Prenez rendez-vous en ligne facilement</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Onglet actif
const activeTab = ref('login')

// Formulaires
const loginForm = ref(null)
const registerForm = ref(null)
const loginValid = ref(false)
const registerValid = ref(false)

// États de chargement
const loginLoading = ref(false)
const registerLoading = ref(false)

// Données de connexion
const login = ref({
  email: '',
  password: '',
  rememberMe: false
})

// Données d'inscription
const register = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  phototype: '',
  password: '',
  confirmPassword: '',
  terms: false,
  newsletter: false
})

// Messages
const loginMessage = ref(null)
const registerMessage = ref(null)

// Phototypes
const phototypes = [
  'Phototype I - Peau très claire, brûle toujours',
  'Phototype II - Peau claire, brûle souvent',
  'Phototype III - Peau claire à moyenne, brûle modérément',
  'Phototype IV - Peau moyenne, brûle rarement',
  'Phototype V - Peau mate, brûle très rarement',
  'Phototype VI - Peau très mate, ne brûle jamais'
]

// Méthodes
async function submitLogin() {
  if (!loginForm.value.validate()) return
  
  loginLoading.value = true
  loginMessage.value = null
  
  try {
    // Simulation de connexion
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Vérification des identifiants (simulation)
    if (login.value.email === 'demo@example.com' && login.value.password === 'password') {
      // Connexion réussie
      const user = {
        id: 1,
        name: 'Utilisateur Demo',
        email: login.value.email,
        avatar: '/avatars/a1.svg'
      }
      
      // Stockage des données utilisateur
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', 'demo-token-123')
      
      // Émission d'événement pour mettre à jour l'état global
      window.dispatchEvent(new CustomEvent('veloria-auth'))
      
      // Redirection vers la page d'accueil
      router.push('/')
      
    } else {
      // Identifiants incorrects
      loginMessage.value = {
        type: 'error',
        text: 'Email ou mot de passe incorrect. Veuillez réessayer.'
      }
    }
    
  } catch (error) {
    loginMessage.value = {
      type: 'error',
      text: 'Une erreur est survenue lors de la connexion. Veuillez réessayer.'
    }
  } finally {
    loginLoading.value = false
  }
}

async function submitRegister() {
  if (!registerForm.value.validate()) return
  
  // Vérification des mots de passe
  if (register.value.password !== register.value.confirmPassword) {
    registerMessage.value = {
      type: 'error',
      text: 'Les mots de passe ne correspondent pas.'
    }
    return
  }
  
  registerLoading.value = true
  registerMessage.value = null
  
  try {
    // Simulation d'inscription
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Inscription réussie
    registerMessage.value = {
      type: 'success',
      text: 'Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.'
    }
    
    // Reset du formulaire
    register.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      phototype: '',
      password: '',
      confirmPassword: '',
      terms: false,
      newsletter: false
    }
    
    // Basculement vers l'onglet connexion
    activeTab.value = 'login'
    
  } catch (error) {
    registerMessage.value = {
      type: 'error',
      text: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.'
    }
  } finally {
    registerLoading.value = false
  }
}

function socialLogin(provider) {
  // Simulation de connexion sociale
  console.log(`Connexion avec ${provider}`)
  
  // Ici, vous intégreriez l'authentification sociale réelle
  // (Google OAuth, Facebook Login, etc.)
}
</script>

<style scoped>
.auth-page {
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

.v-list-item {
  min-height: auto;
  padding: 8px 0;
}

.v-tabs {
  margin-bottom: 24px;
}
</style>
