<template>
  <div class="pricing-page">
    <!-- Header -->
    <div class="pricing-header">
      <v-container>
        <div class="text-center mb-8">
          <h1 class="pricing-title">Nos tarifs transparents</h1>
          <p class="pricing-subtitle">
            Des prix clairs et sans surprise pour vos soins à domicile
          </p>
        </div>
      </v-container>
    </div>

    <!-- Pricing Cards -->
    <div class="pricing-cards">
      <v-container>
        <v-row justify="center" align="stretch">
          <v-col cols="12" md="4" v-for="plan in pricingPlans" :key="plan.id">
            <v-card 
              class="pricing-card h-100" 
              :class="{ 'pricing-card-featured': plan.featured }"
              elevation="4" 
              rounded="xl"
            >
              <v-card-text class="pa-6">
                <!-- Plan Header -->
                <div class="plan-header text-center mb-6">
                  <div v-if="plan.featured" class="featured-badge">
                    <v-chip color="primary" variant="elevated" size="small">
                      Recommandé
                    </v-chip>
                  </div>
                  
                  <h3 class="plan-name">{{ plan.name }}</h3>
                  <p class="plan-description">{{ plan.description }}</p>
                  
                  <div class="plan-price">
                    <span class="price-currency">€</span>
                    <span class="price-amount">{{ plan.price }}</span>
                    <span class="price-period">/{{ plan.period }}</span>
                  </div>
                </div>

                <!-- Plan Features -->
                <div class="plan-features mb-6">
                  <div
                    v-for="feature in plan.features"
                    :key="feature.id"
                    class="feature-item"
                  >
                    <v-icon
                      :color="feature.included ? 'success' : 'text-disabled'"
                      size="small"
                      class="feature-icon"
                    >
                      {{ feature.included ? 'mdi-check-circle' : 'mdi-close-circle' }}
                    </v-icon>
                    <span 
                      class="feature-text"
                      :class="{ 'feature-disabled': !feature.included }"
                    >
                      {{ feature.text }}
                    </span>
                  </div>
                </div>

                <!-- Plan Actions -->
                <div class="plan-actions">
                  <v-btn
                    :color="plan.featured ? 'primary' : 'outlined'"
                    :variant="plan.featured ? 'elevated' : 'outlined'"
                    size="large"
                    block
                    rounded="lg"
                    :disabled="!plan.available"
                    @click="selectPlan(plan)"
                  >
                    {{ plan.buttonText }}
                  </v-btn>
                  
                  <p v-if="plan.note" class="plan-note text-center mt-3">
                    {{ plan.note }}
                  </p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Service Pricing Table -->
    <div class="service-pricing">
      <v-container>
        <v-card class="pricing-table-card" elevation="4" rounded="lg">
          <v-card-title class="text-center pa-6">
            <h2>Tarifs détaillés par service</h2>
            <p class="text-medium-emphasis mt-2">
              Consultez nos tarifs pour chaque type de soin
            </p>
          </v-card-title>
          
          <v-card-text class="pa-0">
            <v-table class="pricing-table">
              <thead>
                <tr>
                  <th class="text-left">Service</th>
                  <th class="text-center">Tarif de base</th>
                  <th class="text-center">Tarif urgent</th>
                  <th class="text-center">Détails</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="service in servicePricing" :key="service.id">
                  <td>
                    <div class="service-info">
                      <v-icon :color="service.iconColor" class="mr-3">
                        {{ service.icon }}
                      </v-icon>
                      <span class="service-name">{{ service.name }}</span>
                    </div>
                  </td>
                  <td class="text-center">
                    <span class="service-price">{{ service.basePrice }}€</span>
                  </td>
                  <td class="text-center">
                    <span class="service-price urgent">{{ service.urgentPrice }}€</span>
                  </td>
                  <td class="text-center">
                    <v-chip
                      :color="service.difficulty === 'Facile' ? 'success' : 
                              service.difficulty === 'Moyen' ? 'warning' : 'error'"
                      variant="tonal"
                      size="small"
                    >
                      {{ service.difficulty }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-container>
    </div>

    <!-- Additional Information -->
    <div class="additional-info">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="info-card" elevation="2" rounded="lg">
              <v-card-title class="d-flex align-center pa-4">
                <v-icon color="info" class="mr-3">mdi-information</v-icon>
                Comment ça marche ?
              </v-card-title>
              <v-card-text>
                <ol class="how-it-works">
                  <li>Recherchez une infirmière disponible dans votre zone</li>
                  <li>Consultez son profil et ses tarifs</li>
                  <li>Réservez un créneau qui vous convient</li>
                  <li>L'infirmière vous confirme le rendez-vous</li>
                  <li>Paiement sécurisé après le soin</li>
                </ol>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="6">
            <v-card class="info-card" elevation="2" rounded="lg">
              <v-card-title class="d-flex align-center pa-4">
                <v-icon color="success" class="mr-3">mdi-shield-check</v-icon>
                Garanties et sécurité
              </v-card-title>
              <v-card-text>
                <ul class="guarantees">
                  <li>Infirmières diplômées et vérifiées</li>
                  <li>Assurance responsabilité civile incluse</li>
                  <li>Paiement sécurisé et tracé</li>
                  <li>Support client 24/7</li>
                  <li>Remboursement si problème</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- FAQ Section -->
    <div class="pricing-faq">
      <v-container>
        <v-card class="faq-card" elevation="2" rounded="lg">
          <v-card-title class="text-center pa-6">
            <h2>Questions fréquentes sur les tarifs</h2>
          </v-card-title>
          
          <v-card-text class="pa-6">
            <v-expansion-panels variant="accordion">
              <v-expansion-panel
                v-for="faq in pricingFaq"
                :key="faq.id"
                class="faq-panel"
              >
                <v-expansion-panel-title class="faq-question">
                  {{ faq.question }}
                </v-expansion-panel-title>
                <v-expansion-panel-text class="faq-answer">
                  {{ faq.answer }}
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-container>
    </div>

    <!-- CTA Section -->
    <div class="pricing-cta">
      <v-container>
        <v-card class="cta-card" elevation="8" rounded="xl">
          <v-card-text class="text-center pa-8">
            <h2 class="cta-title mb-4">Prêt à commencer ?</h2>
            <p class="cta-subtitle mb-6">
              Rejoignez des milliers de patients qui font confiance à Infirmy
            </p>
            <div class="cta-buttons">
              <v-btn
                color="primary"
                variant="elevated"
                size="x-large"
                rounded="lg"
                class="mr-4"
                @click="goToSearch"
              >
                <v-icon start>mdi-magnify</v-icon>
                Rechercher une infirmière
              </v-btn>
              <v-btn
                variant="outlined"
                color="primary"
                size="x-large"
                rounded="lg"
                @click="goToContact"
              >
                <v-icon start>mdi-phone</v-icon>
                Nous contacter
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUIStore } from '@/stores/ui'

// Router
const router = useRouter()

// Store
const uiStore = useUIStore()

// Pricing plans data
const pricingPlans = ref([
  {
    id: 1,
    name: 'Gratuit',
    description: 'Accès de base pour les patients',
    price: '0',
    period: 'mois',
    featured: false,
    available: true,
    buttonText: 'Commencer gratuitement',
    note: '',
    features: [
      { id: 1, text: 'Recherche d\'infirmières', included: true },
      { id: 2, text: 'Consultation des profils', included: true },
      { id: 3, text: 'Réservation de rendez-vous', included: true },
      { id: 4, text: 'Support client basique', included: true },
      { id: 5, text: 'Historique des soins', included: false },
      { id: 6, text: 'Suivi personnalisé', included: false },
      { id: 7, text: 'Support prioritaire', included: false }
    ]
  },
  {
    id: 2,
    name: 'Premium',
    description: 'Pour un suivi personnalisé',
    price: '9.99',
    period: 'mois',
    featured: true,
    available: true,
    buttonText: 'Choisir Premium',
    note: 'Annulation gratuite à tout moment',
    features: [
      { id: 1, text: 'Recherche d\'infirmières', included: true },
      { id: 2, text: 'Consultation des profils', included: true },
      { id: 3, text: 'Réservation de rendez-vous', included: true },
      { id: 4, text: 'Support client basique', included: true },
      { id: 5, text: 'Historique des soins', included: true },
      { id: 6, text: 'Suivi personnalisé', included: true },
      { id: 7, text: 'Support prioritaire', included: true }
    ]
  },
  {
    id: 3,
    name: 'Infirmier Pro',
    description: 'Pour les professionnels de santé',
    price: '29.99',
    period: 'mois',
    featured: false,
    available: true,
    buttonText: 'Devenir partenaire',
    note: 'Accès aux outils de gestion',
    features: [
      { id: 1, text: 'Gestion des rendez-vous', included: true },
      { id: 2, text: 'Tableau de bord avancé', included: true },
      { id: 3, text: 'Gestion des patients', included: true },
      { id: 4, text: 'Facturation intégrée', included: true },
      { id: 5, text: 'Support dédié', included: true },
      { id: 6, text: 'Formation continue', included: true },
      { id: 7, text: 'Statistiques détaillées', included: true }
    ]
  }
])

// Service pricing data
const servicePricing = ref([
  {
    id: 1,
    name: 'Prise de sang',
    icon: 'mdi-needle',
    iconColor: 'error',
    basePrice: 25,
    urgentPrice: 35,
    difficulty: 'Facile'
  },
  {
    id: 2,
    name: 'Pansements',
    icon: 'mdi-bandage',
    iconColor: 'warning',
    basePrice: 20,
    urgentPrice: 30,
    difficulty: 'Facile'
  },
  {
    id: 3,
    name: 'Injection',
    icon: 'mdi-syringe',
    iconColor: 'info',
    basePrice: 30,
    urgentPrice: 40,
    difficulty: 'Moyen'
  },
  {
    id: 4,
    name: 'Perfusion',
    icon: 'mdi-drip',
    iconColor: 'primary',
    basePrice: 45,
    urgentPrice: 60,
    difficulty: 'Difficile'
  },
  {
    id: 5,
    name: 'Soins palliatifs',
    icon: 'mdi-heart',
    iconColor: 'error',
    basePrice: 35,
    urgentPrice: 50,
    difficulty: 'Difficile'
  },
  {
    id: 6,
    name: 'Suivi diabète',
    icon: 'mdi-blood-sugar',
    iconColor: 'warning',
    basePrice: 28,
    urgentPrice: 38,
    difficulty: 'Moyen'
  }
])

// FAQ data
const pricingFaq = ref([
  {
    id: 1,
    question: 'Les tarifs incluent-ils les frais de déplacement ?',
    answer: 'Oui, nos tarifs incluent les frais de déplacement dans un rayon de 10km. Au-delà, un supplément peut s\'appliquer selon la distance.'
  },
  {
    id: 2,
    question: 'Puis-je annuler un rendez-vous gratuitement ?',
    answer: 'Oui, vous pouvez annuler gratuitement jusqu\'à 24h avant le rendez-vous. Passé ce délai, des frais peuvent s\'appliquer.'
  },
  {
    id: 3,
    question: 'Comment se fait le paiement ?',
    answer: 'Le paiement se fait de manière sécurisée après le soin, directement sur la plateforme. Nous acceptons cartes bancaires et virements.'
  },
  {
    id: 4,
    question: 'Y a-t-il des frais cachés ?',
    answer: 'Non, nos tarifs sont transparents et incluent tous les frais. Aucun supplément ne sera ajouté sans votre accord préalable.'
  },
  {
    id: 5,
    question: 'Les soins sont-ils remboursés par la sécurité sociale ?',
    answer: 'Oui, la plupart de nos soins sont conventionnés et remboursés par la sécurité sociale. Votre mutuelle peut également prendre en charge le reste à charge.'
  }
])

// Methods
const selectPlan = (plan: any) => {
  if (plan.id === 1) {
    // Free plan - go to search
    router.push('/rechercher')
  } else if (plan.id === 2) {
    // Premium plan - show upgrade modal
    uiStore.showInfo('Fonctionnalité Premium à venir')
  } else if (plan.id === 3) {
    // Pro plan - go to nurse registration
    router.push('/nurse/join')
  }
}

const goToSearch = () => {
  router.push('/rechercher')
}

const goToContact = () => {
  router.push('/contact')
}
</script>

<style scoped>
.pricing-page {
  min-height: 100vh;
  background: #f8fafc;
}

.pricing-header {
  background: white;
  padding: 4rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.pricing-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1rem 0;
}

.pricing-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.pricing-cards {
  padding: 4rem 0;
}

.pricing-card {
  background: white;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.pricing-card-featured {
  border-color: #667eea;
  transform: scale(1.05);
}

.pricing-card-featured:hover {
  transform: scale(1.05) translateY(-4px);
}

.featured-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
}

.plan-header {
  padding-top: 1rem;
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.plan-description {
  font-size: 1rem;
  color: #64748b;
  margin: 0 0 1.5rem 0;
}

.plan-price {
  margin-bottom: 1rem;
}

.price-currency {
  font-size: 1.5rem;
  font-weight: 600;
  color: #66748b;
  vertical-align: top;
}

.price-amount {
  font-size: 3.5rem;
  font-weight: 800;
  color: #667eea;
  line-height: 1;
}

.price-period {
  font-size: 1rem;
  color: #64748b;
  font-weight: 500;
}

.plan-features {
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.feature-icon {
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.feature-text {
  font-size: 0.95rem;
  color: #1e293b;
}

.feature-disabled {
  color: #94a3b8;
  text-decoration: line-through;
}

.plan-actions {
  text-align: center;
}

.plan-note {
  font-size: 0.875rem;
  color: #64748b;
  font-style: italic;
}

.service-pricing {
  padding: 4rem 0;
}

.pricing-table-card {
  background: white;
  border: 1px solid #e2e8f0;
}

.pricing-table {
  width: 100%;
}

.pricing-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #1e293b;
  padding: 1rem;
}

.pricing-table td {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.service-info {
  display: flex;
  align-items: center;
}

.service-name {
  font-weight: 500;
  color: #1e293b;
}

.service-price {
  font-size: 1.25rem;
  font-weight: 600;
  color: #667eea;
}

.service-price.urgent {
  color: #ef4444;
}

.additional-info {
  padding: 4rem 0;
}

.info-card {
  background: white;
  border: 1px solid #e2e8f0;
  height: 100%;
}

.how-it-works,
.guarantees {
  padding-left: 1.5rem;
  margin: 0;
}

.how-it-works li,
.guarantees li {
  margin-bottom: 0.75rem;
  color: #374151;
  line-height: 1.6;
}

.pricing-faq {
  padding: 4rem 0;
}

.faq-card {
  background: white;
  border: 1px solid #e2e8f0;
}

.faq-panel {
  margin-bottom: 1rem;
}

.faq-question {
  font-weight: 600;
  color: #1e293b;
}

.faq-answer {
  color: #64748b;
  line-height: 1.6;
}

.pricing-cta {
  padding: 4rem 0;
}

.cta-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
}

.cta-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin: 0;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 960px) {
  .pricing-title {
    font-size: 2.5rem;
  }
  
  .pricing-card-featured {
    transform: none;
  }
  
  .pricing-card-featured:hover {
    transform: translateY(-4px);
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-buttons .v-btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 600px) {
  .pricing-title {
    font-size: 2rem;
  }
  
  .price-amount {
    font-size: 3rem;
  }
  
  .cta-title {
    font-size: 2rem;
  }
}
</style>
