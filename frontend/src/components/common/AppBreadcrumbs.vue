<template>
  <nav aria-label="breadcrumb" class="breadcrumbs">
    <v-breadcrumbs
      :items="breadcrumbItems"
      class="pa-0"
      divider="mdi-chevron-right"
    >
      <template #divider>
        <v-icon
          icon="mdi-chevron-right"
          size="small"
          color="medium-emphasis"
        />
      </template>
      
      <template #title="{ item }">
        <span
          :class="{
            'text-medium-emphasis': item.disabled,
            'text-primary': !item.disabled && item.to === $route.path,
            'cursor-pointer': !item.disabled && item.to !== $route.path
          }"
          @click="!item.disabled && item.to !== $route.path ? navigateTo(item.to) : null"
        >
          {{ item.text }}
        </span>
      </template>
    </v-breadcrumbs>
  </nav>
</template>

<script setup lang="ts">import { useI18n } from 'vue-i18n'
const { t } = useI18n()


import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUIStore } from '@/stores/ui'

// Router
const route = useRoute()
const router = useRouter()

// Store
const uiStore = useUIStore()

// Computed
const breadcrumbItems = computed(() => {
  const breadcrumbs = uiStore.breadcrumbs
  
  // Si pas de breadcrumbs définis, générer automatiquement depuis la route
  if (breadcrumbs.length === 0) {
    return generateBreadcrumbsFromRoute(route)
  }
  
  return breadcrumbs
})

// Methods
const navigateTo = (path: string) => {
  if (path && path !== route.path) {
    router.push(path)
  }
}

const generateBreadcrumbsFromRoute = (route: any) => {
  const breadcrumbs = []
  const pathSegments = route.path.split('/').filter(Boolean)
  
  // Ajouter l'accueil
  breadcrumbs.push({
    text: t('navigation.home'),
    to: '/',
    disabled: false
  })
  
  // Générer les breadcrumbs à partir des segments de route
  let currentPath = ''
  pathSegments.forEach((segment: string, index: number) => {
    currentPath += `/${segment}`
    
    // Essayer de trouver le titre dans les meta de la route
    const routeTitle = getRouteTitle(route.matched[index + 1]?.meta?.title)
    
    breadcrumbs.push({
      text: routeTitle || formatSegment(segment),
      to: currentPath,
      disabled: index === pathSegments.length - 1 // Dernier segment désactivé
    })
  })
  
  return breadcrumbs
}

const getRouteTitle = (title: string | undefined) => {
  if (!title) return undefined
  
  // Si c'est une clé de traduction, la traduire
  if (title.startsWith('navigation.') || title.startsWith('common.')) {
    return t(title)
  }
  
  return title
}

const formatSegment = (segment: string) => {
  // Formater le segment pour l'affichage
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<style scoped>
.breadcrumbs {
  font-size: 0.875rem;
}

.breadcrumbs :deep(.v-breadcrumbs) {
  padding: 0;
}

.breadcrumbs :deep(.v-breadcrumbs__item) {
  padding: 0;
}

.breadcrumbs :deep(.v-breadcrumbs__title) {
  font-size: 0.875rem;
  font-weight: 500;
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-pointer:hover {
  text-decoration: underline;
}
</style>
