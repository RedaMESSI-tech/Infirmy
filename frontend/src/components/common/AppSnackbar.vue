<template>
  <v-snackbar
    :model-value="visible"
    @update:modelValue="onUpdate"
    :color="color"
    :timeout="timeout"
    location="bottom"
    class="app-snackbar"
  >
    <div class="d-flex align-center">
      <v-icon :icon="icon" class="me-3" size="20" />
      <span>{{ message }}</span>
    </div>

    <template #actions>
      <v-btn
        v-if="actionText"
        variant="text"
        @click="onAction"
      >
        {{ actionText }}
      </v-btn>
      <v-btn variant="text" @click="hide">OK</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUIStore } from '@/stores/ui'

const ui = useUIStore()

const current = computed(() => ui.currentSnackbar)

const visible = computed({
  get: () => !!current.value,
  set: (val: boolean) => { if (!val) hide() }
})

const message = computed(() => current.value?.message ?? '')
const type = computed(() => current.value?.type ?? 'info')
const timeout = computed(() => current.value?.timeout ?? 4000)
const actionText = computed(() => current.value?.actionText ?? '')

const color = computed(() => {
  switch (type.value) {
    case 'success': return 'success'
    case 'error': return 'error'
    case 'warning': return 'warning'
    default: return 'info'
  }
})

const icon = computed(() => {
  switch (type.value) {
    case 'success': return 'mdi-check-circle-outline'
    case 'error': return 'mdi-alert-circle-outline'
    case 'warning': return 'mdi-alert-outline'
    default: return 'mdi-information-outline'
  }
})

function onAction() {
  const s = current.value
  if (s?.action) s.action()
  hide()
}

function hide() {
  const id = current.value?.id
  ui.removeSnackbar(id)
}

function onUpdate(val: boolean) {
  if (!val) hide()
}
</script>

<style scoped>
.app-snackbar {
  z-index: 9999;
}
.app-snackbar :deep(.v-snackbar__wrapper) {
  border-radius: 12px;
}
.app-snackbar :deep(.v-snackbar__content) {
  padding: 16px 20px;
}
</style>