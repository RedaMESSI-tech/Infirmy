<template>
  <v-menu
    v-model="menuOpen"
    :close-on-content-click="false"
    location="bottom end"
    offset="8"
    transition="scale-transition"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        variant="text"
        class="user-menu-btn"
        @click="menuOpen = !menuOpen"
      >
        <v-avatar size="32" class="mr-2">
          <v-img
            v-if="authStore.user?.avatar"
            :src="authStore.user.avatar"
            :alt="authStore.user.firstName"
          />
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-avatar>
        <span class="user-name">{{ displayName }}</span>
        <v-icon class="ml-1">mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-card class="user-menu-card" elevation="8" rounded="lg">
      <v-card-text class="pa-0">
        <!-- User Info Header -->
        <div class="user-menu-header pa-4">
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
              <h4 class="user-full-name">{{ fullName }}</h4>
              <p class="user-role">{{ roleLabel }}</p>
            </div>
          </div>
        </div>

        <v-divider />

        <!-- Menu Items -->
        <v-list class="user-menu-list">
          <v-list-item
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            :prepend-icon="item.icon"
            :title="item.title"
            class="menu-item"
            @click="menuOpen = false"
          />
        </v-list>

        <v-divider />

        <!-- Logout -->
        <div class="pa-4">
          <v-btn
            block
            variant="outlined"
            color="error"
            @click="handleLogout"
          >
            <v-icon start>mdi-logout</v-icon>
            Déconnexion
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'

// Router
const router = useRouter()

// Stores
const authStore = useAuthStore()
const uiStore = useUIStore()

// State
const menuOpen = ref(false)

// Computed
const displayName = computed(() => {
  if (!authStore.user) return ''
  return authStore.user.firstName || authStore.user.email
})

const fullName = computed(() => {
  if (!authStore.user) return ''
  if (authStore.user.firstName && authStore.user.lastName) {
    return `${authStore.user.firstName} ${authStore.user.lastName}`
  }
  return authStore.user.firstName || authStore.user.email
})

const roleLabel = computed(() => {
  if (authStore.isNurse) return 'Infirmier'
  if (authStore.isPatient) return 'Patient'
  if (authStore.isAdmin) return 'Administrateur'
  return 'Utilisateur'
})

const menuItems = computed(() => {
  const baseItems = [
    {
      path: '/profil',
      icon: 'mdi-account',
      title: 'Mon profil'
    },
    {
      path: '/messages',
      icon: 'mdi-message-text',
      title: 'Messages'
    },
    {
      path: '/parametres',
      icon: 'mdi-cog',
      title: 'Paramètres'
    }
  ]

  // Add role-specific items
  if (authStore.isNurse) {
    baseItems.unshift({
      path: '/infirmier',
      icon: 'mdi-view-dashboard',
      title: 'Tableau de bord'
    })
  } else if (authStore.isPatient) {
    baseItems.unshift({
      path: '/patient',
      icon: 'mdi-view-dashboard',
      title: 'Tableau de bord'
    })
  }

  return baseItems
})

// Methods
const handleLogout = async () => {
  try {
    await authStore.logout()
    uiStore.showSuccess('Déconnexion réussie')
    menuOpen.value = false
    router.push('/')
  } catch (error: any) {
    uiStore.showError('Erreur lors de la déconnexion')
  }
}
</script>

<style scoped>
.user-menu-btn {
  text-transform: none;
  font-weight: 500;
}

.user-name {
  font-weight: 500;
  margin: 0 0.5rem;
}

.user-menu-card {
  min-width: 280px;
}

.user-menu-header {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.user-full-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.user-role {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
}

.user-menu-list {
  padding: 0;
}

.menu-item {
  padding: 0.75rem 1rem;
  min-height: 48px;
}

.menu-item:hover {
  background: rgba(0, 0, 0, 0.04);
}

.menu-item :deep(.v-list-item-title) {
  font-size: 0.9rem;
  font-weight: 500;
}

.menu-item :deep(.v-list-item__prepend) {
  margin-right: 0.75rem;
}
</style>
