<template>
  <div class="faq-page">
    <!-- Header -->
    <section class="faq-header">
      <v-container>
        <h1 class="text-h3 font-weight-bold mb-4">
          Foire aux Questions
        </h1>
        <p class="text-h6 text-medium-emphasis mb-6">
          Trouvez des réponses à vos questions les plus fréquentes
        </p>
        
        <v-text-field
          v-model="searchQuery"
          label="Rechercher une question..."
          variant="solo-filled"
          rounded="lg"
          flat
          density="comfortable"
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          class="faq-search-input"
          @input="filterQuestions"
        />
      </v-container>
    </section>

    <!-- Main Content -->
    <v-container class="py-8">
      <v-row>
        <!-- Categories Navigation -->
        <v-col cols="12" md="3">
          <v-card rounded="lg" elevation="2" class="faq-categories">
            <v-list nav dense>
              <v-list-subheader>Catégories</v-list-subheader>
              <v-list-item
                v-for="category in categories"
                :key="category.value"
                :value="category.value"
                :active="selectedCategory === category.value"
                @click="selectedCategory = category.value"
                rounded="lg"
                class="mb-1"
              >
                <template #prepend>
                  <v-icon>{{ category.icon }}</v-icon>
                </template>
                <v-list-item-title>{{ category.label }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <!-- Questions List -->
        <v-col cols="12" md="9">
          <v-card rounded="lg" elevation="2" class="faq-questions">
            <v-card-title class="text-h5 font-weight-bold pa-4">
              {{ currentCategoryLabel }}
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-4">
              <div v-if="filteredQuestions.length === 0" class="text-center py-8">
                <v-icon size="64" color="text-disabled" class="mb-4">mdi-help-circle-outline</v-icon>
                <h4 class="text-h6 text-medium-emphasis mb-2">Aucune question trouvée</h4>
                <p class="text-body-2 text-medium-emphasis">
                  Essayez une autre recherche ou sélectionnez une autre catégorie.
                </p>
              </div>
              
              <v-expansion-panels flat>
                <v-expansion-panel
                  v-for="question in filteredQuestions"
                  :key="question.id"
                  rounded="lg"
                  class="mb-3"
                >
                  <v-expansion-panel-title class="font-weight-medium">
                    {{ question.question }}
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p class="text-body-1 text-medium-emphasis mb-4">
                      {{ question.answer }}
                    </p>
                    <div v-if="question.details" class="text-caption text-medium-emphasis mb-2">
                      {{ question.details }}
                    </div>
                    <v-btn
                      v-if="question.link"
                      :to="question.link"
                      variant="text"
                      color="primary"
                      size="small"
                      append-icon="mdi-arrow-right"
                    >
                      En savoir plus
                    </v-btn>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>

          <!-- Contact Section -->
          <v-card rounded="lg" elevation="2" class="faq-contact mt-8">
            <v-card-title class="text-h5 font-weight-bold pa-4">
              Vous n'avez pas trouvé votre réponse ?
            </v-card-title>
            <v-card-text class="text-center py-6">
              <p class="text-body-1 text-medium-emphasis mb-4">
                Notre équipe est là pour vous aider. N'hésitez pas à nous contacter directement.
              </p>
              <v-btn
                color="primary"
                variant="elevated"
                rounded="lg"
                size="large"
                to="/contact"
              >
                <v-icon start>mdi-email</v-icon>
                Nous contacter
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Route and Router
const route = useRoute()
const router = useRouter()

// State
const searchQuery = ref('')
const selectedCategory = ref('general') // Default category

// Categories
const categories = [
  { label: 'Général', value: 'general', icon: 'mdi-information' },
  { label: 'Compte', value: 'account', icon: 'mdi-account' },
  { label: 'Réservation', value: 'booking', icon: 'mdi-calendar-check' },
  { label: 'Paiement', value: 'payment', icon: 'mdi-credit-card' },
  { label: 'Infirmiers', value: 'nurses', icon: 'mdi-account-tie' },
  { label: 'Technique', value: 'technical', icon: 'mdi-cog' }
]

// Mock Questions Data
const allQuestions = [
  {
    id: 1,
    category: 'general',
    question: 'Qu\'est-ce que Infirmy ?',
    answer: 'Infirmy est une plateforme qui met en relation des patients ayant besoin de soins infirmiers à domicile avec des infirmiers libéraux qualifiés et disponibles près de chez eux.',
    details: 'Nous simplifions la recherche, la prise de rendez-vous et le suivi des soins.',
    link: '/a-propos'
  },
  {
    id: 2,
    category: 'general',
    question: 'Comment fonctionne Infirmy ?',
    answer: 'Vous recherchez un infirmier par localisation et spécialité, vous consultez les profils, réservez un rendez-vous en ligne, et l\'infirmier se déplace à votre domicile.',
    details: 'Le paiement se fait en ligne ou directement auprès de l\'infirmier, selon les modalités convenues.',
    link: '/tarifs'
  },
  {
    id: 3,
    category: 'account',
    question: 'Comment créer un compte ?',
    answer: 'Cliquez sur "Créer un compte" en haut à droite de la page. Vous pourrez choisir de vous inscrire en tant que patient ou infirmier.',
    details: 'L\'inscription est rapide et gratuite.',
    link: '/register'
  },
  {
    id: 4,
    category: 'account',
    question: 'J\'ai oublié mon mot de passe, que faire ?',
    answer: 'Sur la page de connexion, cliquez sur "Mot de passe oublié ?". Saisissez votre adresse email et suivez les instructions pour réinitialiser votre mot de passe.',
    link: '/login'
  },
  {
    id: 5,
    category: 'booking',
    question: 'Comment prendre rendez-vous avec un infirmier ?',
    answer: 'Utilisez la barre de recherche sur la page d\'accueil ou la page "Rechercher" pour trouver un infirmier. Une fois que vous avez trouvé un profil qui vous convient, cliquez sur "Réserver" et suivez les étapes.',
    details: 'Vous devrez spécifier le service, la date, l\'heure et votre adresse.',
    link: '/rechercher'
  },
  {
    id: 6,
    category: 'booking',
    question: 'Puis-je annuler ou modifier un rendez-vous ?',
    answer: 'Oui, vous pouvez annuler ou modifier un rendez-vous depuis votre tableau de bord patient. Des conditions d\'annulation peuvent s\'appliquer, veuillez consulter nos CGU.',
    link: '/legal'
  },
  {
    id: 7,
    category: 'payment',
    question: 'Comment s\'effectue le paiement des soins ?',
    answer: 'Le paiement peut être effectué directement en ligne via la plateforme ou, dans certains cas, directement auprès de l\'infirmier. Les détails sont précisés lors de la réservation.',
    details: 'Nous acceptons les cartes bancaires (Visa, MasterCard) et d\'autres méthodes de paiement sécurisées.',
    link: '/tarifs'
  },
  {
    id: 8,
    category: 'payment',
    question: 'Les soins sont-ils remboursés par la sécurité sociale ?',
    answer: 'Oui, la plupart des soins infirmiers à domicile sont remboursables par l\'Assurance Maladie sur prescription médicale. Votre infirmier vous fournira une feuille de soins.',
    details: 'Nous vous recommandons de vérifier les conditions de remboursement auprès de votre mutuelle.',
    link: null
  },
  {
    id: 9,
    category: 'nurses',
    question: 'Comment devenir infirmier sur Infirmy ?',
    answer: 'Rendez-vous sur la page d\'inscription et choisissez le profil "Infirmier". Vous devrez fournir vos informations professionnelles, y compris votre numéro de licence.',
    details: 'Notre équipe vérifiera votre profil avant validation.',
    link: '/register'
  },
  {
    id: 10,
    category: 'nurses',
    question: 'Comment gérer mes disponibilités en tant qu\'infirmier ?',
    answer: 'Depuis votre tableau de bord infirmier, accédez à la section "Mon Planning" ou "Gérer disponibilités" pour définir vos horaires de travail et vos jours de congé.',
    details: 'Mettre à jour régulièrement vos disponibilités assure une meilleure visibilité et plus de demandes de rendez-vous.',
    link: '/infirmier'
  },
  {
    id: 11,
    category: 'technical',
    question: 'Le site ne s\'affiche pas correctement, que faire ?',
    answer: 'Essayez de vider le cache de votre navigateur et de rafraîchir la page. Assurez-vous également que votre navigateur est à jour.',
    details: 'Si le problème persiste, contactez notre support technique en précisant votre navigateur et le problème rencontré.',
    link: '/contact'
  },
  {
    id: 12,
    category: 'technical',
    question: 'Mon mode sombre ne fonctionne pas.',
    answer: 'Vérifiez que votre navigateur ou système d\'exploitation n\'a pas de préférence de thème qui annulerait le réglage de l\'application. Essayez de basculer le thème via le bouton dans la barre de navigation.',
    details: 'Si le problème persiste, cela pourrait être un bug. Veuillez nous contacter.',
    link: '/contact'
  }
]

// Computed
const currentCategoryLabel = computed(() => {
  const category = categories.find(cat => cat.value === selectedCategory.value)
  return category ? `Questions ${category.label}` : 'Toutes les questions'
})

const filteredQuestions = computed(() => {
  let questions = allQuestions.filter(q => 
    selectedCategory.value === 'general' || q.category === selectedCategory.value
  )

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    questions = questions.filter(q => 
      q.question.toLowerCase().includes(query) || 
      q.answer.toLowerCase().includes(query)
    )
  }
  return questions
})

// Methods
const filterQuestions = () => {
  // Filtering is handled by computed property
}

// Watch for route changes to update category
watch(
  () => route.query.category,
  (newCategory) => {
    if (newCategory && typeof newCategory === 'string' && categories.some(c => c.value === newCategory)) {
      selectedCategory.value = newCategory
    } else {
      selectedCategory.value = 'general'
    }
  },
  { immediate: true }
)

// Update route query when category changes
watch(selectedCategory, (newCategory) => {
  if (route.query.category !== newCategory) {
    router.push({ query: { category: newCategory } })
  }
})
</script>

<style scoped>
.faq-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.faq-header {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.faq-search-input {
  max-width: 600px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
}

.faq-categories .v-list-item {
  transition: all 0.2s ease;
}

.faq-categories .v-list-item:hover {
  transform: translateX(4px);
}

.faq-categories .v-list-item--active {
  background-color: var(--v-primary-lighten5);
  color: var(--v-primary-base);
}

.faq-questions .v-expansion-panel {
  border: 1px solid var(--v-border-color);
  box-shadow: none !important;
}

.faq-questions .v-expansion-panel-title {
  padding: 16px 24px;
}

.faq-questions .v-expansion-panel-text {
  padding: 0 24px 16px;
}

.faq-contact {
  background: linear-gradient(135deg, #e0f2fe 0%, #bfdbfe 100%);
  border: 2px solid #3b82f6;
}
</style> 