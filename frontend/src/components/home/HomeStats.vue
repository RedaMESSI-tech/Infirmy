<template>
  <div class="home-stats">
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="4" v-for="stat in stats" :key="stat.id">
          <div class="stat-card text-center">
            <div class="stat-icon-wrapper">
              <v-icon size="64" :color="stat.color" class="stat-icon">
                {{ stat.icon }}
              </v-icon>
            </div>
            <h3 class="stat-number">{{ stat.number }}</h3>
            <p class="stat-label">{{ stat.label }}</p>
            <p class="stat-description">{{ stat.description }}</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
// Stats data
const stats = [
  {
    id: 1,
    icon: 'mdi-clock-outline',
    number: '24/7',
    label: 'Réservation en ligne',
    description: 'Disponible à tout moment',
    color: 'success'
  },
  {
    id: 2,
    icon: 'mdi-heart-multiple',
    number: '+5k',
    label: 'Soins réalisés',
    description: 'Depuis notre création',
    color: 'primary'
  },
  {
    id: 3,
    icon: 'mdi-star',
    number: '4,8/5',
    label: 'Satisfaction',
    description: 'Note moyenne des patients',
    color: 'warning'
  }
]
</script>

<style scoped>
.home-stats {
  padding: 3rem 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.stat-card {
  padding: 2rem 1rem;
}

.stat-icon-wrapper {
  margin-bottom: 1.5rem;
}

.stat-icon {
  opacity: 0.9;
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.5rem 0;
  line-height: 1;
}

.stat-label {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin: 0 0 0.5rem 0;
  opacity: 0.9;
}

.stat-description {
  font-size: 0.9rem;
  color: white;
  margin: 0;
  opacity: 0.7;
}

/* Responsive */
@media (max-width: 960px) {
  .stat-number {
    font-size: 2.5rem;
  }
  
  .stat-label {
    font-size: 1.1rem;
  }
}

@media (max-width: 600px) {
  .home-stats {
    padding: 2rem 0;
  }
  
  .stat-card {
    padding: 1.5rem 0.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>
