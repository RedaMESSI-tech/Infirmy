<template>
  <v-card class="auth-card" elevation="12" rounded="xl">
    <v-card-text class="pa-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="logo-wrapper mb-4">
          <v-icon size="64" color="primary" class="logo-icon">
            mdi-heart-pulse
          </v-icon>
        </div>
        <h1 class="auth-title">{{ title }}</h1>
        <p v-if="subtitle" class="auth-subtitle">
          {{ subtitle }}
        </p>
      </div>

      <!-- Content Slot -->
      <slot />

      <!-- Footer Slot -->
      <div v-if="$slots.footer" class="mt-6">
        <slot name="footer" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>

<style scoped>
.auth-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 500px;
  width: 100%;
}

.logo-wrapper {
  display: inline-block;
  padding: 1rem;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 50%;
}

.logo-icon {
  opacity: 0.9;
}

.auth-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.auth-subtitle {
  color: #64748b;
  font-size: 1rem;
  line-height: 1.5;
}

/* Animations */
.auth-card {
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 600px) {
  .auth-card {
    margin: 0 1rem;
  }
  
  .auth-title {
    font-size: 1.5rem;
  }
}
</style>
