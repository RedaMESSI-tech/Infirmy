<template>
  <div class="public-layout">
    <!-- Header -->
    <AppHeader @toggle-drawer="drawer = !drawer" />
    
    <!-- Navigation Drawer -->
    <AppDrawer v-model="drawer" />
    
    <!-- Main Content -->
    <v-main class="public-main">
      <slot />
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
import { ref } from 'vue'
import AppHeader from '@/components/common/AppHeader.vue'
import AppDrawer from '@/components/common/AppDrawer.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import AppSnackbar from '@/components/common/AppSnackbar.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'

// State
const drawer = ref(false)
</script>

<style scoped>
.public-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.public-main {
  flex: 1;
  background: linear-gradient(135deg, rgb(var(--v-theme-surface)) 0%, rgb(var(--v-theme-surface-variant)) 100%);
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .public-main {
    padding-top: 0;
  }
}
</style>
