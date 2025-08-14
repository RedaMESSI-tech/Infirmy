<template>
  <div class="auth-layout">
    <!-- Background decoration -->
    <div class="auth-background">
      <div class="auth-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>

    <!-- Header simplifié -->
    <div class="auth-header">
      <router-link to="/" class="auth-logo">
        <v-icon
          icon="mdi-heart-pulse"
          color="primary"
          size="40"
          class="me-3"
        />
        <span class="text-h4 font-weight-bold text-primary">Infirmy</span>
      </router-link>
    </div>

    <!-- Main Content -->
    <v-main class="auth-main">
      <v-container class="auth-container">
        <v-row justify="center" align="center" class="h-100">
          <v-col cols="12" sm="10" md="8" lg="6" xl="5">
            <!-- Card d'authentification -->
            <v-card
              class="auth-card"
              elevation="24"
              rounded="xl"
            >
              <!-- En-tête de la card -->
              <div class="auth-card-header text-center pa-6 pb-4">
                <h1 class="text-h4 font-weight-bold mb-2">
                  {{ title }}
                </h1>
                <p class="text-body-1 text-medium-emphasis mb-0">
                  {{ subtitle }}
                </p>
              </div>

              <!-- Contenu de la card -->
              <div class="auth-card-content pa-6 pt-0">
                <slot />
              </div>

              <!-- Pied de la card -->
              <div class="auth-card-footer text-center pa-6 pt-0">
                <slot name="footer" />
              </div>
            </v-card>

            <!-- Liens supplémentaires -->
            <div class="auth-links text-center mt-6">
              <slot name="links" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer simplifié -->
    <div class="auth-footer text-center pa-4">
      <p class="text-body-2 text-medium-emphasis mb-0">
        © {{ new Date().getFullYear() }} Infirmy. {{ $t('footer.allRightsReserved') }}
      </p>
    </div>

    <!-- Global Components -->
    <AppSnackbar />
    <ConfirmDialog />
    <LoadingOverlay />
  </div>
</template>

<script setup lang="ts">
import AppSnackbar from '@/components/common/AppSnackbar.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'

// Props
interface Props {
  title: string
  subtitle: string
}

defineProps<Props>()
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%);
  position: relative;
  overflow: hidden;
}

.auth-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.auth-shapes {
  position: relative;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

.auth-header {
  position: relative;
  z-index: 1;
  padding: 2rem;
}

.auth-logo {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.auth-main {
  flex: 1;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
}

.auth-container {
  height: 100%;
}

.auth-card {
  background: rgba(var(--v-theme-surface), 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(var(--v-theme-outline), 0.1);
}

.auth-card-header {
  border-bottom: 1px solid rgba(var(--v-theme-outline), 0.1);
}

.auth-card-footer {
  border-top: 1px solid rgba(var(--v-theme-outline), 0.1);
}

.auth-links {
  position: relative;
  z-index: 1;
}

.auth-footer {
  position: relative;
  z-index: 1;
  color: rgba(255, 255, 255, 0.8);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .auth-header {
    padding: 1rem;
  }
  
  .auth-card {
    margin: 1rem;
  }
  
  .auth-card-header,
  .auth-card-content,
  .auth-card-footer {
    padding: 1.5rem;
  }
}
</style>
