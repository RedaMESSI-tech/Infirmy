<template>
  <div class="dashboard-layout">
    <!-- Header -->
    <AppHeader @toggle-drawer="drawer = !drawer" />
    
    <!-- Navigation Drawer -->
    <AppDrawer v-model="drawer" />
    
    <!-- Main Content -->
    <v-main class="dashboard-main">
      <!-- Breadcrumbs -->
      <div v-if="showBreadcrumbs" class="breadcrumbs-container pa-4 pb-2">
        <AppBreadcrumbs />
      </div>
      
      <!-- Page Content -->
      <div class="dashboard-content">
        <slot />
      </div>
    </v-main>
    
    <!-- Footer -->
    <AppFooter />
    
    <!-- Global Components -->
    <AppSnackbar />
    <ConfirmDialog />
    <LoadingOverlay />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/common/AppHeader.vue'
import AppDrawer from '@/components/common/AppDrawer.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import AppBreadcrumbs from '@/components/common/AppBreadcrumbs.vue'
import AppSnackbar from '@/components/common/AppSnackbar.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'

// Props
interface Props {
  hideBreadcrumbs?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hideBreadcrumbs: false
})

// Router
const route = useRoute()

// State
const drawer = ref(false)

// Computed
const showBreadcrumbs = computed(() => {
  if (props.hideBreadcrumbs) return false
  return route.meta.showBreadcrumbs !== false
})
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.dashboard-main {
  flex: 1;
  background: rgb(var(--v-theme-surface));
}

.breadcrumbs-container {
  background: rgb(var(--v-theme-surface-variant));
  border-bottom: 1px solid rgb(var(--v-border-color));
}

.dashboard-content {
  padding: 1.5rem;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .dashboard-content {
    padding: 1rem;
  }
  
  .breadcrumbs-container {
    padding: 1rem 1rem 0.5rem 1rem;
  }
}

@media (max-width: 600px) {
  .dashboard-content {
    padding: 0.75rem;
  }
  
  .breadcrumbs-container {
    padding: 0.75rem 0.75rem 0.25rem 0.75rem;
  }
}
</style>
