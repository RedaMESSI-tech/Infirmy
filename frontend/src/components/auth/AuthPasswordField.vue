<template>
  <div class="auth-password-field">
    <v-text-field
      v-model="passwordValue"
      :label="label"
      :type="showPassword ? 'text' : 'password'"
      variant="outlined"
      rounded="lg"
      prepend-inner-icon="mdi-lock"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :rules="passwordRules"
      :error-messages="errorMessage"
      :disabled="disabled"
      :required="required"
      :placeholder="placeholder"
      :hint="hint"
      :persistent-hint="persistentHint"
      :minlength="minLength"
      :maxlength="maxLength"
      @click:append-inner="togglePasswordVisibility"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <!-- Password Strength Bar -->
    <PasswordStrengthBar
      v-if="showStrengthIndicator && passwordValue"
      :password="passwordValue"
      :show-requirements="true"
      :min-length="minLength"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import PasswordStrengthBar from './PasswordStrengthBar.vue'

interface Props {
  modelValue: string
  label?: string
  errorMessage?: string
  disabled?: boolean
  required?: boolean
  placeholder?: string
  hint?: string
  persistentHint?: boolean
  minLength?: number
  maxLength?: number
  showStrengthIndicator?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Mot de passe',
  errorMessage: '',
  disabled: false,
  required: false,
  placeholder: 'Votre mot de passe',
  hint: '',
  persistentHint: false,
  minLength: 8,
  maxLength: 128,
  showStrengthIndicator: false
})

const emit = defineEmits<Emits>()

// State
const showPassword = ref(false)

// Computed
const passwordValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})

// Validation rules
const passwordRules = computed(() => {
  const rules = [
    (v: string) => !!v || 'Le mot de passe est requis',
    (v: string) => v.length >= props.minLength || `Le mot de passe doit contenir au moins ${props.minLength} caractères`,
    (v: string) => v.length <= props.maxLength || `Le mot de passe est trop long`
  ]
  
  if (props.required) {
    rules.push(
      (v: string) => /[a-z]/.test(v) || 'Le mot de passe doit contenir au moins une minuscule',
      (v: string) => /[A-Z]/.test(v) || 'Le mot de passe doit contenir au moins une majuscule',
      (v: string) => /[0-9]/.test(v) || 'Le mot de passe doit contenir au moins un chiffre'
    )
  }
  
  return rules
})

// Methods
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

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
.auth-password-field {
  margin-bottom: 1rem;
}

.auth-password-field :deep(.v-text-field) {
  margin-bottom: 0.5rem;
}

.auth-password-field :deep(.v-field--focused) {
  border-color: #667eea;
}

.auth-password-field :deep(.v-field--error) {
  border-color: #ef4444;
}

.auth-password-field :deep(.v-field__outline) {
  border-radius: 12px;
}

.auth-password-field :deep(.v-field__prepend-inner) {
  color: #66748b;
}

.auth-password-field :deep(.v-field__append-inner) {
  cursor: pointer;
  color: #66748b;
  transition: color 0.2s ease;
}

.auth-password-field :deep(.v-field__append-inner:hover) {
  color: #667eea;
}

.auth-password-field :deep(.v-field__append-inner:active) {
  color: #1e40af;
}
</style>
