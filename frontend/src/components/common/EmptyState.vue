<template>
  <div class="empty-state text-center pa-8">
    <!-- Icône -->
    <v-icon
      :icon="icon"
      :color="iconColor"
      size="64"
      class="mb-4"
    />

    <!-- Titre -->
    <h3 class="text-h5 font-weight-medium mb-2">
      {{ title }}
    </h3>

    <!-- Description -->
    <p class="text-body-1 text-medium-emphasis mb-6 max-width-400 mx-auto">
      {{ description }}
    </p>

    <!-- Actions -->
    <div v-if="actions && actions.length > 0" class="d-flex justify-center gap-3">
      <v-btn
        v-for="action in actions"
        :key="action.key"
        :color="action.color || 'primary'"
        :variant="action.variant || 'elevated'"
        :size="action.size || 'default'"
        :loading="action.loading"
        :disabled="action.disabled"
        @click="action.onClick"
      >
        <v-icon
          v-if="action.icon"
          :icon="action.icon"
          :start="true"
        />
        {{ action.text }}
      </v-btn>
    </div>

    <!-- Contenu personnalisé -->
    <slot />
  </div>
</template>

<script setup lang="ts">
// Props
interface Action {
  key: string
  text: string
  icon?: string
  color?: string
  variant?: 'text' | 'outlined' | 'elevated' | 'tonal' | 'flat'
  size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large'
  loading?: boolean
  disabled?: boolean
  onClick: () => void
}

interface Props {
  icon?: string
  iconColor?: string
  title: string
  description: string
  actions?: Action[]
}

withDefaults(defineProps<Props>(), {
  icon: 'mdi-inbox-outline',
  iconColor: 'medium-emphasis',
  actions: () => []
})
</script>

<style scoped>
.empty-state {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.max-width-400 {
  max-width: 400px;
}

.gap-3 {
  gap: 12px;
}

/* Responsive */
@media (max-width: 600px) {
  .empty-state {
    padding: 2rem 1rem;
  }
  
  .gap-3 {
    gap: 8px;
  }
}
</style>
