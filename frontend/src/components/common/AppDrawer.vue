<template>
  <v-navigation-drawer
    v-model="drawer"
    :temporary="$vuetify.display.mdAndDown"
    :permanent="$vuetify.display.lgAndUp"
    location="left"
    class="border-r"
  >
    <!-- En-tête du drawer -->
    <div class="pa-4 border-b">
      <div class="d-flex align-center">
        <v-icon
          icon="mdi-heart-pulse"
          color="primary"
          size="28"
          class="me-3"
        />
        <span class="text-h6 font-weight-bold text-primary">Infirmy</span>
      </div>
    </div>

    <!-- Navigation principale -->
    <v-list class="pa-2">
      <v-list-item
        v-for="item in mainNavigationItems"
        :key="item.path"
        :to="item.path"
        :prepend-icon="item.icon"
        :title="item.title"
        :active="route.path === item.path"
        rounded="lg"
        class="mb-1"
      />
    </v-list>

    <!-- Séparateur -->
    <v-divider class="mx-4 my-2" />

    <!-- Navigation utilisateur (si connecté) -->
    <template v-if="authStore.isAuthenticated">
      <v-list class="pa-2">
        <v-list-subheader class="text-caption text-uppercase font-weight-bold">
          {{ $t('navigation.account') }}
        </v-list-subheader>
        
        <v-list-item
          v-for="item in userNavigationItems"
          :key="item.path"
          :to="item.path"
          :prepend-icon="item.icon"
          :title="item.title"
          :active="route.path === item.path"
          rounded="lg"
          class="mb-1"
        />
      </v-list>

      <!-- Navigation spécifique au rôle -->
      <template v-if="authStore.isPatient">
        <v-list class="pa-2">
          <v-list-subheader class="text-caption text-uppercase font-weight-bold">
            {{ $t('navigation.patient') }}
          </v-list-subheader>
          
          <v-list-item
            v-for="item in patientNavigationItems"
            :key="item.path"
            :to="item.path"
            :prepend-icon="item.icon"
            :title="item.title"
            :active="route.path === item.path"
            rounded="lg"
            class="mb-1"
          />
        </v-list>
      </template>

      <template v-else-if="authStore.isNurse">
        <v-list class="pa-2">
          <v-list-subheader class="text-caption text-uppercase font-weight-bold">
            {{ $t('navigation.nurse') }}
          </v-list-subheader>
          
          <v-list-item
            v-for="item in nurseNavigationItems"
            :key="item.path"
            :to="item.path"
            :prepend-icon="item.icon"
            :title="item.title"
            :active="route.path === item.path"
            rounded="lg"
            class="mb-1"
          />
        </v-list>
      </template>
    </template>

    <!-- Navigation publique -->
    <v-list class="pa-2">
      <v-list-subheader class="text-caption text-uppercase font-weight-bold">
        {{ $t('navigation.information') }}
      </v-list-subheader>
      
      <v-list-item
        v-for="item in publicNavigationItems"
        :key="item.path"
        :to="item.path"
        :prepend-icon="item.icon"
        :title="item.title"
        :active="route.path === item.path"
        rounded="lg"
        class="mb-1"
      />
    </v-list>

    <!-- Pied de page du drawer -->
    <template #append>
      <div class="pa-4 border-t">
        <div class="text-caption text-medium-emphasis mb-2">
          {{ $t('navigation.help') }}
        </div>
        <div class="d-flex">
          <v-btn
            icon
            variant="text"
            size="small"
            href="mailto:support@infirmy.com"
            class="me-2"
          >
            <v-icon>mdi-email</v-icon>
          </v-btn>
          <v-btn
            icon
            variant="text"
            size="small"
            href="https://help.infirmy.com"
            target="_blank"
            class="me-2"
          >
            <v-icon>mdi-help-circle</v-icon>
          </v-btn>
          <v-btn
            icon
            variant="text"
            size="small"
            href="https://status.infirmy.com"
            target="_blank"
          >
            <v-icon>mdi-information</v-icon>
          </v-btn>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useI18n } from 'vue-i18n'

// Props
interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Computed
const drawer = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Stores et router
const authStore = useAuthStore()
const route = useRoute()
const { t } = useI18n()

// Navigation items
const mainNavigationItems = computed(() => [
  { path: '/', title: t('navigation.home'), icon: 'mdi-home' },
  { path: '/search', title: t('navigation.search'), icon: 'mdi-magnify' }
])

const userNavigationItems = computed(() => [
  { path: '/profile', title: t('navigation.profile'), icon: 'mdi-account' },
  { path: '/dashboard', title: t('navigation.dashboard'), icon: 'mdi-view-dashboard' }
])

const patientNavigationItems = computed(() => [
  { path: '/appointments', title: t('navigation.appointments'), icon: 'mdi-calendar' },
  { path: '/messages', title: t('navigation.messages'), icon: 'mdi-message' },
  { path: '/reviews', title: t('navigation.reviews'), icon: 'mdi-star' }
])

const nurseNavigationItems = computed(() => [
  { path: '/nurse/calendar', title: t('navigation.calendar'), icon: 'mdi-calendar-month' },
  { path: '/nurse/requests', title: t('navigation.requests'), icon: 'mdi-account-multiple' },
  { path: '/nurse/appointments', title: t('navigation.appointments'), icon: 'mdi-calendar-check' },
  { path: '/nurse/messages', title: t('navigation.messages'), icon: 'mdi-message' },
  { path: '/nurse/pricing', title: t('navigation.pricing'), icon: 'mdi-currency-eur' }
])

const publicNavigationItems = computed(() => [
  { path: '/about', title: t('navigation.about'), icon: 'mdi-information' },
  { path: '/nurse/faq', title: t('navigation.faq'), icon: 'mdi-help-circle' },
  { path: '/contact', title: t('navigation.contact'), icon: 'mdi-email' },
  { path: '/legal', title: t('navigation.legal'), icon: 'mdi-file-document' },
  { path: '/privacy', title: t('navigation.privacy'), icon: 'mdi-shield-check' }
])
</script>

<style scoped>
.v-list-item--active {
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
}

.v-list-item--active .v-icon {
  color: rgb(var(--v-theme-on-primary));
}
</style>
