<template>
  <v-navigation-drawer
    v-model="drawerModel"
    location="right"
    temporary
    width="320"
    class="mobile-drawer"
  >
    <v-card class="mobile-drawer-card" flat>
      <!-- Header -->
      <div class="drawer-header pa-4">
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-icon size="32" color="primary" class="mr-2">
              mdi-heart-pulse
            </v-icon>
            <span class="drawer-title">Infirmy</span>
          </div>
          <div class="d-flex align-center">
            <!-- Theme Toggle -->
            <v-btn
              icon
              variant="text"
              color="text"
              class="mr-2"
              @click="toggleTheme"
              :title="theme === 'light' ? 'Mode sombre' : 'Mode clair'"
            >
              <v-icon>
                {{ theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
              </v-icon>
            </v-btn>
            
            <v-btn
              icon
              variant="text"
              @click="drawerModel = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <v-divider />

      <!-- Navigation Links -->
      <v-list class="drawer-nav-list">
        <v-list-item
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :prepend-icon="item.icon"
          :title="item.label"
          class="drawer-nav-item"
          @click="drawerModel = false"
        />
      </v-list>

      <v-divider />

      <!-- Auth Section -->
      <div class="drawer-auth-section pa-4">
        <template v-if="!authStore.isAuthenticated">
          <h4 class="auth-section-title mb-3">Mon compte</h4>
          <v-btn
            to="/login"
            variant="outlined"
            color="primary"
            block
            class="mb-2"
            @click="drawerModel = false"
          >
            <v-icon start>mdi-login</v-icon>
            Se connecter
          </v-btn>
          <v-btn
            to="/register"
            color="primary"
            variant="elevated"
            block
            rounded="lg"
            @click="drawerModel = false"
          >
            <v-icon start>mdi-account-plus</v-icon>
            Créer un compte
          </v-btn>
        </template>

        <template v-else>
          <h4 class="auth-section-title mb-3">Mon espace</h4>
          
          <!-- User Info -->
          <div class="user-info mb-4">
            <div class="d-flex align-center">
              <v-avatar size="48" class="mr-3">
                <v-img
                  v-if="authStore.user?.avatar"
                  :src="authStore.user.avatar"
                  :alt="authStore.user.firstName"
                />
                <v-icon v-else size="48">mdi-account-circle</v-icon>
              </v-avatar>
              <div>
                <h5 class="user-name">{{ userDisplayName }}</h5>
                <p class="user-role">{{ userRoleLabel }}</p>
              </div>
            </div>
          </div>

          <!-- Role-specific Actions -->
          <v-btn
            v-if="authStore.isNurse"
            to="/infirmier"
            variant="outlined"
            color="secondary"
            block
            class="mb-2"
            @click="drawerModel = false"
          >
            <v-icon start>mdi-account-tie</v-icon>
            Espace infirmier
          </v-btn>

          <v-btn
            v-if="authStore.isPatient"
            to="/patient"
            variant="outlined"
            color="primary"
            block
            class="mb-2"
            @click="drawerModel = false"
          >
            <v-icon start>mdi-calendar</v-icon>
            Mes RDV
          </v-btn>

          <!-- Common Actions -->
          <v-btn
            to="/profil"
            variant="text"
            color="text"
            block
            class="mb-2"
            @click="drawerModel = false"
          >
            <v-icon start>mdi-account</v-icon>
            Mon profil
          </v-btn>

          <v-btn
            to="/messages"
            variant="text"
            color="text"
            block
            class="mb-2"
            @click="drawerModel = false"
          >
            <v-icon start>mdi-message-text</v-icon>
            Messages
            <v-badge
              v-if="unreadCount > 0"
              :content="unreadCount > 99 ? '99+' : unreadCount"
              :model-value="unreadCount > 0"
              color="error"
              dot
              location="end"
              offset-x="8"
              offset-y="-8"
            />
          </v-btn>

          <v-divider class="my-3" />

          <v-btn
            variant="outlined"
            color="error"
            block
            @click="handleLogout"
          >
            <v-icon start>mdi-logout</v-icon>
            Déconnexion
          </v-btn>
        </template>
      </div>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'

// Props
interface Props {
  modelValue: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Router
const router = useRouter()

// Stores
const authStore = useAuthStore()
const uiStore = useUIStore()

// Computed
const drawerModel = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

const theme = computed(() => uiStore.theme)

const navItems = [
  { path: '/', label: 'Accueil', icon: 'mdi-home' },
  { path: '/rechercher', label: 'Rechercher', icon: 'mdi-magnify' },
  { path: '/tarifs', label: 'Tarifs', icon: 'mdi-currency-eur' },
  { path: '/faq', label: 'FAQ', icon: 'mdi-help-circle' },
  { path: '/contact', label: 'Contact', icon: 'mdi-email' },
  { path: '/a-propos', label: 'À propos', icon: 'mdi-information' }
]

const userDisplayName = computed(() => {
  if (!authStore.user) return ''
  if (authStore.user.firstName && authStore.user.lastName) {
    return `${authStore.user.firstName} ${authStore.user.lastName}`
  }
  return authStore.user.firstName || authStore.user.email
})

const userRoleLabel = computed(() => {
  if (authStore.isNurse) return 'Infirmier'
  if (authStore.isPatient) return 'Patient'
  if (authStore.isAdmin) return 'Administrateur'
  return 'Utilisateur'
})

const unreadCount = computed(() => {
  // Mock data - replace with real API call
  if (authStore.isNurse) return 3
  if (authStore.isPatient) return 1
  return 0
})

// Methods
const toggleTheme = () => {
  uiStore.toggleTheme()
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    uiStore.showSuccess('Déconnexion réussie')
    drawerModel.value = false
    router.push('/')
  } catch (error: any) {
    uiStore.showError('Erreur lors de la déconnexion')
  }
}
</script>

<style scoped>
.mobile-drawer {
  z-index: 1000;
}

.mobile-drawer-card {
  height: 100%;
}

.drawer-header {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.drawer-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--v-primary-base);
}

.drawer-nav-list {
  padding: 0;
}

.drawer-nav-item {
  padding: 0.75rem 1rem;
  min-height: 48px;
}

.drawer-nav-item:hover {
  background: rgba(0, 0, 0, 0.04);
}

.drawer-nav-item :deep(.v-list-item-title) {
  font-size: 1rem;
  font-weight: 500;
}

.drawer-nav-item :deep(.v-list-item__prepend) {
  margin-right: 0.75rem;
}

.drawer-auth-section {
  background: #f8fafc;
}

.auth-section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.user-info {
  background: white;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.user-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.user-role {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}
</style>
