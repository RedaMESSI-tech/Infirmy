<template>
  <v-text-field
    v-model="emailValue"
    :label="label"
    type="email"
    variant="outlined"
    rounded="lg"
    prepend-inner-icon="mdi-email"
    :rules="emailRules"
    :error-messages="errorMessage"
    :disabled="disabled"
    :required="required"
    :placeholder="placeholder"
    :hint="hint"
    :persistent-hint="persistentHint"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string
  label?: string
  errorMessage?: string
  disabled?: boolean
  required?: boolean
  placeholder?: string
  hint?: string
  persistentHint?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Email',
  errorMessage: '',
  disabled: false,
  required: false,
  placeholder: 'votre@email.com',
  hint: '',
  persistentHint: false
})

const emit = defineEmits<Emits>()

// Computed
const emailValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})

// Validation rules
const emailRules = computed(() => [
  (v: string) => !!v || 'L\'email est requis',
  (v: string) => /.+@.+\..+/.test(v) || 'L\'email doit être valide',
  (v: string) => v.length <= 255 || 'L\'email est trop long'
])

// Methods
const handleInput = (value: string) => {
  emit('input', value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script>

<style scoped>
.v-text-field :deep(.v-field--focused) {
  border-color: #667eea;
}

.v-text-field :deep(.v-field--error) {
  border-color: #ef4444;
}

.v-text-field :deep(.v-field__outline) {
  border-radius: 12px;
}

.v-text-field :deep(.v-field__prepend-inner) {
  color: #66748b;
}
</style>
