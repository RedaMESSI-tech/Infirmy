<template>
  <div class="password-strength">
    <!-- Strength Bar -->
    <div class="strength-bar-wrapper mb-2">
      <div class="strength-bar">
        <div
          class="strength-fill"
          :class="strengthClass"
          :style="{ width: strengthPercentage + '%' }"
        />
      </div>
      <span class="strength-text">{{ strengthText }}</span>
    </div>

    <!-- Requirements List -->
    <div v-if="showRequirements" class="requirements-list">
      <div
        v-for="requirement in requirements"
        :key="requirement.id"
        class="requirement-item"
        :class="{ 'requirement-met': requirement.met }"
      >
        <v-icon
          size="small"
          :color="requirement.met ? 'success' : 'text-disabled'"
          class="requirement-icon"
        >
          {{ requirement.met ? 'mdi-check-circle' : 'mdi-circle-outline' }}
        </v-icon>
        <span class="requirement-text">{{ requirement.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  password: string
  showRequirements?: boolean
  minLength?: number
}

const props = withDefaults(defineProps<Props>(), {
  showRequirements: true,
  minLength: 8
})

// Computed
const strengthScore = computed(() => {
  let score = 0
  const password = props.password

  if (password.length >= props.minLength) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^a-zA-Z0-9]/.test(password)) score += 1
  if (password.length >= props.minLength + 4) score += 1

  return Math.min(score, 5)
})

const strengthPercentage = computed(() => {
  return (strengthScore.value / 5) * 100
})

const strengthClass = computed(() => {
  if (strengthScore.value <= 1) return 'strength-very-weak'
  if (strengthScore.value <= 2) return 'strength-weak'
  if (strengthScore.value <= 3) return 'strength-medium'
  if (strengthScore.value <= 4) return 'strength-strong'
  return 'strength-very-strong'
})

const strengthText = computed(() => {
  if (strengthScore.value <= 1) return 'Très faible'
  if (strengthScore.value <= 2) return 'Faible'
  if (strengthScore.value <= 3) return 'Moyen'
  if (strengthScore.value <= 4) return 'Fort'
  return 'Très fort'
})

const requirements = computed(() => [
  {
    id: 'length',
    text: `Au moins ${props.minLength} caractères`,
    met: props.password.length >= props.minLength
  },
  {
    id: 'lowercase',
    text: 'Au moins une minuscule',
    met: /[a-z]/.test(props.password)
  },
  {
    id: 'uppercase',
    text: 'Au moins une majuscule',
    met: /[A-Z]/.test(props.password)
  },
  {
    id: 'number',
    text: 'Au moins un chiffre',
    met: /[0-9]/.test(props.password)
  },
  {
    id: 'special',
    text: 'Au moins un caractère spécial',
    met: /[^a-zA-Z0-9]/.test(props.password)
  }
])
</script>

<style scoped>
.password-strength {
  margin-top: 0.5rem;
}

.strength-bar-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.strength-bar {
  flex: 1;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.strength-very-weak {
  background: #ef4444;
}

.strength-weak {
  background: #f97316;
}

.strength-medium {
  background: #eab308;
}

.strength-strong {
  background: #22c55e;
}

.strength-very-strong {
  background: #16a34a;
}

.strength-text {
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 80px;
  text-align: right;
}

.requirements-list {
  margin-top: 0.75rem;
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
}

.requirement-icon {
  flex-shrink: 0;
}

.requirement-text {
  color: #64748b;
  transition: color 0.2s ease;
}

.requirement-met .requirement-text {
  color: #059669;
}
</style>
