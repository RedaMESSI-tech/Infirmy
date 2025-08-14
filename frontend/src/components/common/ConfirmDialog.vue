<template>
  <v-dialog :model-value="visible" @update:modelValue="onUpdate" max-width="520" class="confirm-dialog">
    <v-card>
      <v-card-title class="text-h6 d-flex align-center">
        <v-icon :icon="icon" class="me-2" />
        <span>{{ title }}</span>
      </v-card-title>
      <v-card-text v-if="text">{{ text }}</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="cancel" v-if="showCancel">{{ cancelText }}</v-btn>
        <v-btn color="primary" @click="confirm">{{ confirmText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUIStore } from '@/stores/ui'

const { t } = useI18n()
const ui = useUIStore()

const current = computed(() => ui.currentDialog)

const visible = computed({
  get: () => !!current.value,
  set: (val: boolean) => { if (!val) dismiss() }
})

const title = computed(() => current.value?.title ?? t('common.confirm'))
const text = computed(() => current.value?.text ?? '')
const type = computed(() => current.value?.type ?? 'confirm')
const showCancel = computed(() => type.value === 'confirm')

const confirmText = computed(() => current.value?.confirmText ?? t('common.ok'))
const cancelText = computed(() => current.value?.cancelText ?? t('common.cancel'))

const icon = computed(() => {
  switch (type.value) {
    case 'error': return 'mdi-alert-circle-outline'
    case 'warning': return 'mdi-alert-outline'
    case 'info': return 'mdi-information-outline'
    default: return 'mdi-help-circle-outline'
  }
})

function confirm() {
  const d = current.value
  if (d?.onConfirm) d.onConfirm()
  dismiss()
}
function cancel() {
  const d = current.value
  if (d?.onCancel) d.onCancel()
  dismiss()
}
function dismiss() {
  const id = current.value?.id
  ui.removeDialog(id)
}
function onUpdate(val: boolean) {
  if (!val) dismiss()
}
</script>

<style scoped>
.confirm-dialog :deep(.v-card-title) {
  padding-bottom: 8px;
}
.confirm-dialog :deep(.v-card-text) {
  padding-top: 16px;
  padding-bottom: 16px;
}
.confirm-dialog :deep(.v-card-actions) {
  padding-top: 16px;
}
</style>