<template>
  <v-app :theme="currentTheme">
    <!-- Navigation -->
    <AppNavBar />
    
    <!-- Main Content -->
    <v-main>
      <router-view />
    </v-main>
    
    <!-- Loading Overlay -->
    <LoadingOverlay />
    
    <!-- Global Snackbar -->
    <v-snackbar
      v-model="uiStore.snackbar.show"
      :color="uiStore.snackbar.color"
      :timeout="uiStore.snackbar.timeout"
      location="top"
      rounded="lg"
    >
      <div class="d-flex align-center">
        <v-icon class="mr-2">{{ uiStore.snackbar.icon }}</v-icon>
        {{ uiStore.snackbar.message }}
      </div>
      
      <template #actions>
        <v-btn
          variant="text"
          @click="uiStore.snackbar.show = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    
    <!-- Global Dialog -->
    <v-dialog
      v-model="uiStore.dialog.show"
      :max-width="uiStore.dialog.maxWidth"
      persistent
    >
      <v-card rounded="lg">
        <v-card-title class="d-flex align-center">
          <v-icon
            :color="uiStore.dialog.color"
            class="mr-2"
          >
            {{ uiStore.dialog.icon }}
          </v-icon>
          {{ uiStore.dialog.title }}
        </v-card-title>
        
        <v-card-text>
          {{ uiStore.dialog.message }}
        </v-card-text>
        
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-if="uiStore.dialog.showCancel"
            variant="outlined"
            @click="uiStore.dialog.show = false"
          >
            {{ uiStore.dialog.cancelText }}
          </v-btn>
          <v-btn
            :color="uiStore.dialog.color"
            variant="elevated"
            @click="uiStore.dialog.onConfirm"
          >
            {{ uiStore.dialog.confirmText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import AppNavBar from '@/components/layout/AppNavBar.vue'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import { useUIStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'

// Stores
const uiStore = useUIStore()
const authStore = useAuthStore()

// Computed
const currentTheme = computed(() => uiStore.theme)

// Lifecycle
onMounted(async () => {
  // Initialize stores
  await authStore.initialize()
  await uiStore.initialize()
})
</script>

<style>
/* Global styles */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Skip to content link for accessibility */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 10000;
}

.skip-link:focus {
  top: 6px;
}

/* Focus styles for accessibility */
*:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Vuetify overrides */
.v-application {
  font-family: 'Inter', 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.v-btn {
  text-transform: none;
  font-weight: 500;
}

.v-card {
  border-radius: 16px;
}

.v-text-field,
.v-select,
.v-textarea {
  border-radius: 12px;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* Utility classes */
.text-gradient {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
}

.bg-gradient-secondary {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
}

.shadow-soft {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-medium {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-large {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
