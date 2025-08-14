<template>
  <div class="unread-badge-wrapper">
    <v-btn
      icon
      variant="text"
      color="primary"
      class="messages-btn"
      @click="goToMessages"
    >
      <v-icon>mdi-message-text</v-icon>
      <v-badge
        v-if="unreadCount > 0"
        :content="unreadCount > 99 ? '99+' : unreadCount"
        :model-value="unreadCount > 0"
        color="error"
        dot
        location="top end"
        offset-x="8"
        offset-y="-8"
      />
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Router
const router = useRouter()

// Store
const authStore = useAuthStore()

// Computed
const unreadCount = computed(() => {
  // Mock data - replace with real API call
  if (authStore.isNurse) return 3
  if (authStore.isPatient) return 1
  return 0
})

// Methods
const goToMessages = () => {
  if (authStore.isNurse) {
    router.push('/infirmier/messages')
  } else if (authStore.isPatient) {
    router.push('/patient/messages')
  }
}
</script>

<style scoped>
.unread-badge-wrapper {
  position: relative;
}

.messages-btn {
  position: relative;
}

.messages-btn:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
</style>
