<template>
  <v-app-bar
    :elevation="isScrolled ? 8 : 0"
    :color="isScrolled ? 'surface' : 'transparent'"
    class="app-navbar"
    sticky
    transition="elevation-transition"
  >
    <v-container class="d-flex align-center">
      <!-- Logo -->
      <router-link to="/" class="navbar-logo">
        <v-icon size="32" color="primary" class="mr-2">
          mdi-heart-pulse
        </v-icon>
        <span class="logo-text">Infirmy</span>
      </router-link>

      <!-- Desktop Navigation -->
      <div class="d-none d-md-flex align-center ml-8">
        <v-btn
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          variant="text"
          :color="isActive(item.path) ? 'primary' : 'text'"
          class="nav-link"
          :class="{ 'nav-link-active': isActive(item.path) }"
        >
          {{ item.label }}
        </v-btn>
      </div>

      <!-- Spacer -->
      <v-spacer />

      <!-- Right Side - Auth/User -->
      <div class="d-flex align-center">
        <!-- Theme Toggle -->
        <v-btn
          icon
          variant="text"
          color="text"
          class="mr-2"
          @click="toggleTheme"
          :title="theme === 'light' ? 'Passer au mode sombre' : 'Passer au mode clair'"
        >
          <v-icon>
            {{ theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
          </v-icon>
        </v-btn>

        <!-- Unread Messages Badge (if connected) -->
        <UnreadBadge v-if="authStore.isAuthenticated" class="mr-4" />

        <!-- Role-specific CTA -->
        <v-btn
          v-if="authStore.isNurse"
          to="/infirmier"
          variant="outlined"
          color="secondary"
          class="mr-4 d-none d-sm-flex"
        >
          <v-icon start>mdi-account-tie</v-icon>
          Espace infirmier
        </v-btn>

        <v-btn
          v-if="authStore.isPatient"
          to="/patient"
          variant="outlined"
          color="primary"
          class="mr-4 d-none d-sm-flex"
        >
          <v-icon start>mdi-calendar</v-icon>
          Mes RDV
        </v-btn>

        <!-- Guest Actions -->
        <template v-if="!authStore.isAuthenticated">
          <v-btn
            to="/login"
            variant="text"
            color="text"
            class="mr-2"
          >
            Se connecter
          </v-btn>
          <v-btn
            to="/register"
            color="primary"
            variant="elevated"
            rounded="lg"
          >
            Créer un compte
          </v-btn>
        </template>

        <!-- User Menu (if connected) -->
        <NavUserMenu v-else />
      </div>

      <!-- Mobile Menu Button -->
      <v-btn
        icon
        variant="text"
        class="d-md-none ml-2"
        @click="drawer = true"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-container>

    <!-- Mobile Navigation Drawer -->
    <AppMobileDrawer v-model="drawer" />
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'
import UnreadBadge from './UnreadBadge.vue'
import NavUserMenu from './NavUserMenu.vue'
import AppMobileDrawer from './AppMobileDrawer.vue'

// Route
const route = useRoute()

// Stores
const authStore = useAuthStore()
const uiStore = useUIStore()

// State
const drawer = ref(false)
const isScrolled = ref(false)

// Navigation items
const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/rechercher', label: 'Rechercher' },
  { path: '/tarifs', label: 'Tarifs' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact' },
  { path: '/a-propos', label: 'À propos' }
]

// Computed
const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const theme = computed(() => uiStore.theme)

// Methods
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const toggleTheme = () => {
  uiStore.toggleTheme()
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.app-navbar {
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.navbar-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--v-primary-base);
}

.nav-link {
  margin: 0 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link:hover {
  transform: translateY(-1px);
}

.nav-link-active {
  font-weight: 600;
}

.nav-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: var(--v-primary-base);
  border-radius: 1px;
}

/* Responsive */
@media (max-width: 960px) {
  .nav-link {
    margin: 0 0.25rem;
  }
}
</style>
