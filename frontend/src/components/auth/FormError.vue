<template>
  <div v-if="error" class="form-error">
    <v-alert
      :model-value="!!error"
      type="error"
      variant="tonal"
      rounded="lg"
      class="mb-4"
      closable
      @click:close="$emit('close')"
    >
      <div class="d-flex align-center">
        <v-icon start>mdi-alert-circle</v-icon>
        <span>{{ error }}</span>
      </div>
    </v-alert>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error?: string | null
}

interface Emits {
  (e: 'close'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.form-error {
  margin-bottom: 1rem;
}

.form-error :deep(.v-alert) {
  border-left: 4px solid #ef4444;
}
</style>
