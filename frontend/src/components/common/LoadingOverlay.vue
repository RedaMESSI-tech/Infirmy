<template>
  <v-overlay
    v-model="loading.show"
    :persistent="loading.persistent"
    :scrim="loading.scrim"
    class="loading-overlay"
  >
    <v-card
      :width="loading.width"
      :height="loading.height"
      class="d-flex flex-column align-center justify-center pa-6"
      color="surface"
      elevation="24"
      rounded="xl"
    >
      <!-- Spinner -->
      <v-progress-circular
        :size="loading.size"
        :width="loading.width"
        :color="loading.color"
        indeterminate
        class="mb-4"
      />

      <!-- Message -->
      <div class="text-center">
        <h3 class="text-h6 font-weight-medium mb-2">
          {{ loading.title || $t('common.loading') }}
        </h3>
        <p
          v-if="loading.message"
          class="text-body-2 text-medium-emphasis mb-0"
        >
          {{ loading.message }}
        </p>
      </div>

      <!-- Bouton d'annulation (si autorisé) -->
      <v-btn
        v-if="loading.cancelable"
        variant="outlined"
        @click="handleCancel"
        class="mt-4"
        size="small"
      >
        {{ $t('common.cancel') }}
      </v-btn>
    </v-card>
  </v-overlay>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUIStore } from '@/stores/ui'

// Store
const uiStore = useUIStore()

// Computed
const loading = computed(() => uiStore.loading)

// Methods
const handleCancel = () => {
  if (loading.value.onCancel) {
    loading.value.onCancel()
  }
  uiStore.hideLoading()
}
</script>

<style scoped>
.loading-overlay {
  z-index: 9998;
}

.loading-overlay :deep(.v-overlay__scrim) {
  backdrop-filter: blur(4px);
}

.loading-overlay :deep(.v-card) {
  background: rgba(var(--v-theme-surface), 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(var(--v-theme-outline), 0.1);
}
</style>
