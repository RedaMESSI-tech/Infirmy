<template>
  <PublicLayout>
    <div class="test-page">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="text-h3 font-weight-bold text-center mb-8">
              Page de Test - Composants
            </h1>
          </v-col>
        </v-row>

        <!-- Test des composants communs -->
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="pa-6">
              <h2 class="text-h5 font-weight-bold mb-4">Test des Composants</h2>
              
              <!-- Test EmptyState -->
              <EmptyState
                icon="mdi-test-tube"
                title="Composant EmptyState"
                description="Ce composant affiche un état vide avec des actions personnalisables."
                :actions="emptyStateActions"
              />
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card class="pa-6">
              <h2 class="text-h5 font-weight-bold mb-4">Test des Stores</h2>
              
              <!-- Test du store UI -->
              <div class="d-flex flex-column gap-3">
                <v-btn
                  @click="showSuccessMessage"
                  color="success"
                  variant="elevated"
                >
                  Afficher Succès
                </v-btn>
                
                <v-btn
                  @click="showErrorMessage"
                  color="error"
                  variant="elevated"
                >
                  Afficher Erreur
                </v-btn>
                
                <v-btn
                  @click="showConfirmDialog"
                  color="warning"
                  variant="elevated"
                >
                  Afficher Confirmation
                </v-btn>
                
                <v-btn
                  @click="toggleAppTheme"
                  color="primary"
                  variant="elevated"
                >
                  Changer Thème
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Test des layouts -->
        <v-row class="mt-6">
          <v-col cols="12">
            <v-card class="pa-6">
              <h2 class="text-h5 font-weight-bold mb-4">Test des Layouts</h2>
              
              <div class="d-flex flex-wrap gap-3">
                <v-btn
                  @click="currentLayout = 'public'"
                  :color="currentLayout === 'public' ? 'primary' : 'default'"
                  variant="elevated"
                >
                  Layout Public
                </v-btn>
                
                <v-btn
                  @click="currentLayout = 'auth'"
                  :color="currentLayout === 'auth' ? 'primary' : 'default'"
                  variant="elevated"
                >
                  Layout Auth
                </v-btn>
                
                <v-btn
                  @click="currentLayout = 'dashboard'"
                  :color="currentLayout === 'dashboard' ? 'primary' : 'default'"
                  variant="elevated"
                >
                  Layout Dashboard
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Affichage du layout actuel -->
        <v-row class="mt-6">
          <v-col cols="12">
            <v-card class="pa-6">
              <h2 class="text-h5 font-weight-bold mb-4">Layout Actuel</h2>
              <p class="text-body-1">
                Layout sélectionné : <strong>{{ currentLayout }}</strong>
              </p>
              <p class="text-body-2 text-medium-emphasis">
                Thème actuel : <strong>{{ uiStore.theme }}</strong>
              </p>
            </v-card>
          </v-col>
        </v-row>

        <!-- Test Loading Overlay -->
        <v-row class="mt-6">
          <v-col cols="12">
            <v-card class="pa-6">
              <h3 class="text-h6 mb-4">Test Loading Overlay</h3>
              <div class="d-flex gap-3 flex-wrap">
                <v-btn
                  color="primary"
                  @click="showLoadingTest"
                >
                  Afficher Loading
                </v-btn>
                <v-btn
                  color="secondary"
                  @click="hideLoadingTest"
                >
                  Masquer Loading
                </v-btn>
                <v-btn
                  color="warning"
                  @click="showLoadingWithOptions"
                >
                  Loading avec options
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </PublicLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUIStore } from '@/stores/ui'
import PublicLayout from '@/layouts/PublicLayout.vue'
import EmptyState from '@/components/common/EmptyState.vue'

// Router
const router = useRouter()

// Store
const uiStore = useUIStore()

// State
const currentLayout = ref('public')

// Actions pour EmptyState
const emptyStateActions = [
  {
    key: 'action1',
    text: 'Action 1',
    icon: 'mdi-plus',
    color: 'primary',
    onClick: () => {
      uiStore.showSuccess('Action 1 exécutée !')
    }
  },
  {
    key: 'action2',
    text: 'Action 2',
    icon: 'mdi-star',
    color: 'secondary',
    onClick: () => {
      uiStore.showInfo('Action 2 exécutée !')
    }
  }
]

// Methods
const showSuccessMessage = () => {
  uiStore.showSuccess('Ceci est un message de succès !')
}

const showErrorMessage = () => {
  uiStore.showError('Ceci est un message d\'erreur !')
}

const showConfirmDialog = () => {
  uiStore.showConfirm(
    'Confirmation',
    'Êtes-vous sûr de vouloir continuer ?',
    () => {
      uiStore.showSuccess('Action confirmée !')
    },
    () => {
      uiStore.showInfo('Action annulée')
    }
  )
}

const toggleAppTheme = () => {
  uiStore.toggleTheme()
}

// Test Loading methods
const showLoadingTest = () => {
  uiStore.showLoading()
}

const hideLoadingTest = () => {
  uiStore.hideLoading()
}

const showLoadingWithOptions = () => {
  uiStore.showLoading({
    title: 'Chargement en cours...',
    message: 'Veuillez patienter pendant que nous traitons votre demande.',
    persistent: true,
    cancelable: true,
    onCancel: () => {
      uiStore.hideLoading()
      uiStore.showInfo('Chargement annulé')
    }
  })
}
</script>

<style scoped>
.test-page {
  min-height: 100vh;
  padding: 2rem 0;
}

.gap-3 {
  gap: 12px;
}

/* Responsive */
@media (max-width: 600px) {
  .test-page {
    padding: 1rem 0;
  }
  
  .gap-3 {
    gap: 8px;
  }
}
</style>
