<template>
  <v-app-bar
    :elevation="2"
    color="surface"
    class="px-4"
  >
    <!-- Bouton menu pour mobile -->
    <v-app-bar-nav-icon
      @click="$emit('toggle-drawer')"
      class="d-md-none"
      data-cy="menu-button"
    />

    <!-- Logo et titre -->
    <div class="d-flex align-center">
      <router-link to="/" class="text-decoration-none">
        <div class="d-flex align-center">
          <v-icon
            icon="mdi-heart-pulse"
            color="primary"
            size="32"
            class="me-2"
          />
          <span class="text-h5 font-weight-bold text-primary">Infirmy</span>
        </div>
      </router-link>
    </div>

    <!-- Navigation desktop -->
    <v-tabs
      v-model="activeTab"
      class="d-none d-md-flex ml-8"
      color="primary"
    >
      <v-tab
        v-for="item in navigationItems"
        :key="item.path"
        :to="item.path"
        :value="item.path"
        class="text-none"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-spacer />

    <!-- Actions côté droit -->
    <div class="d-flex align-center">
      <!-- Basculeur de thème -->
      <v-btn
        icon
        variant="text"
        @click="toggleTheme"
        class="me-2"
        data-cy="theme-toggle"
      >
        <v-icon>
          {{ theme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
        </v-icon>
      </v-btn>

      <!-- Boutons d'authentification (visibles si non connecté) -->
      <template v-if="!authStore.isAuthenticated">
        <v-btn
          to="/login"
          variant="text"
          class="me-2"
          data-cy="login-button"
        >
          {{ t('auth.login') }}
        </v-btn>
        <v-btn
          to="/register"
          color="primary"
          data-cy="register-button"
        >
          {{ t('auth.register') }}
        </v-btn>
      </template>

      <!-- Menu utilisateur (visible si connecté) -->
      <template v-else>
        <v-menu
          v-model="userMenuOpen"
          :close-on-content-click="false"
          location="bottom end"
        >
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              class="d-flex align-center"
              data-cy="user-menu"
            >
              <v-avatar
                :image="authStore.user?.avatar"
                size="32"
                class="me-2"
              >
                <v-icon v-if="!authStore.user?.avatar">
                  mdi-account-circle
                </v-icon>
              </v-avatar>
              <span class="d-none d-sm-block">{{ authStore.fullName }}</span>
              <v-icon class="ms-1">mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-card min-width="250" class="pa-2">
            <v-list>
              <v-list-item
                to="/profile"
                prepend-icon="mdi-account"
                :title="t('navigation.profile')"
                @click="userMenuOpen = false"
              />
              <v-list-item
                to="/dashboard"
                prepend-icon="mdi-view-dashboard"
                :title="t('navigation.dashboard')"
                @click="userMenuOpen = false"
              />
              <v-list-item
                to="/appointments"
                prepend-icon="mdi-calendar"
                :title="t('navigation.appointments')"
                @click="userMenuOpen = false"
              />
              <v-list-item
                to="/messages"
                prepend-icon="mdi-message"
                :title="t('navigation.messages')"
                @click="userMenuOpen = false"
              />
              <v-divider class="my-2" />
              <v-list-item
                @click="handleLogout"
                prepend-icon="mdi-logout"
                :title="t('auth.logout')"
                color="error"
                data-cy="logout-button"
              />
            </v-list>
          </v-card>
        </v-menu>
      </template>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useUIStore } from '../../stores/ui'
import { useI18n } from 'vue-i18n'

// Props et emits
defineEmits<{
  toggleDrawer: []
}>()

// Stores
const authStore = useAuthStore()
const uiStore = useUIStore()

// Router
const route = useRoute()
const router = useRouter()

// I18n
const { t } = useI18n()

// State
const userMenuOpen = ref(false)
const activeTab = ref(route.path)

// Computed
const theme = computed(() => uiStore.theme)

const navigationItems = computed(() => [
  { path: '/', title: t('navigation.home') },
  { path: '/search', title: t('navigation.search') },
  { path: '/about', title: t('navigation.about') },
  { path: '/contact', title: t('navigation.contact') }
])

// Watchers
watch(() => route.path, (newPath) => {
  activeTab.value = newPath
})

// Methods
const toggleTheme = () => {
  uiStore.toggleTheme()
}

const handleLogout = async () => {
  userMenuOpen.value = false
  authStore.logout()
  await router.push('/')
}
</script>

<style scoped>
.v-tab {
  text-transform: none;
  font-weight: 500;
}

.v-tab--selected {
  font-weight: 600;
}
</style>
