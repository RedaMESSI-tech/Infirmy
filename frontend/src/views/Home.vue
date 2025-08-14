<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container class="hero-container">
        <v-row align="center" class="hero-content">
          <v-col cols="12" lg="6" class="hero-text">
            <h1 class="hero-title">
              Trouvez une infirmière à domicile, rapidement.
            </h1>
            <p class="hero-subtitle">
              Recherche d'IDEL proches, messagerie, ordonnances et rappels. Gratuit pour les patients.
            </p>
            
            <!-- Hero Search Form -->
            <HeroSearch />
            
            <div class="hero-actions">
              <v-btn
                size="x-large"
                color="secondary"
                variant="outlined"
                class="hero-btn secondary-btn"
                @click="$router.push('/register?role=nurse')"
              >
                <v-icon start>mdi-account-tie</v-icon>
                Espace infirmier
              </v-btn>
            </div>
          </v-col>
          
          <v-col cols="12" lg="6" class="hero-illustration">
            <div class="medical-illustration">
              <img
                src="/images/hero-nurse-patient.jpeg"
                alt="Infirmière soignant un patient à domicile"
                class="hero-image"
                srcset="/images/hero-nurse-patient.jpeg 1x, /images/hero-nurse-patient@2x.jpg 2x"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
      
      <!-- Stats Bar -->
      <div class="stats-bar">
        <v-container>
          <v-row justify="center" align="center">
            <v-col cols="12" md="4" class="stat-item">
              <div class="stat-content">
                <v-icon size="48" color="success" class="stat-icon">
                  mdi-clock-outline
                </v-icon>
                <div class="stat-text">
                  <h3 class="stat-number">24/7</h3>
                  <p class="stat-label">Réservation en ligne</p>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="4" class="stat-item">
              <div class="stat-content">
                <v-icon size="48" color="primary" class="stat-icon">
                  mdi-heart-multiple
                </v-icon>
                <div class="stat-text">
                  <h3 class="stat-number">+5k</h3>
                  <p class="stat-label">Soins réalisés</p>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="4" class="stat-item">
              <div class="stat-content">
                <v-icon size="48" color="warning" class="stat-icon">
                  mdi-star
                </v-icon>
                <div class="stat-text">
                  <h3 class="stat-number">4,8/5</h3>
                  <p class="stat-label">Satisfaction</p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </section>

    <!-- Pourquoi Infirmy Section -->
    <section class="features-section">
      <v-container>
        <div class="section-header text-center mb-12">
          <h2 class="section-title">Pourquoi choisir Infirmy ?</h2>
          <p class="section-subtitle">Une plateforme simple et efficace pour vos soins à domicile</p>
        </div>
        
        <v-row>
          <v-col cols="12" md="4" v-for="feature in features" :key="feature.id">
            <v-card class="feature-card" elevation="4" rounded="xl">
              <div class="feature-icon-wrapper">
                <v-icon size="64" :color="feature.color" class="feature-icon">
                  {{ feature.icon }}
                </v-icon>
              </div>
              <v-card-title class="feature-title text-center">
                {{ feature.title }}
              </v-card-title>
              <v-card-text class="feature-description text-center">
                {{ feature.description }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Comment ça marche Section -->
    <section class="how-it-works-section">
      <v-container>
        <div class="section-header text-center mb-12">
          <h2 class="section-title">Comment ça marche ?</h2>
          <p class="section-subtitle">En 3 étapes simples, trouvez l'infirmier qu'il vous faut</p>
        </div>
        
        <v-row>
          <v-col cols="12" md="4" v-for="(step, index) in steps" :key="step.id">
            <div class="step-card text-center">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-illustration">
                <v-icon size="120" :color="step.color" class="step-icon">
                  {{ step.icon }}
                </v-icon>
              </div>
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-description">{{ step.description }}</p>
            </div>
          </v-col>
        </v-row>
        
        <div class="text-center mt-8">
          <v-btn
            size="large"
            color="primary"
            variant="elevated"
            rounded="lg"
            @click="$router.push('/rechercher')"
          >
            <v-icon start>mdi-rocket-launch</v-icon>
            Commencer maintenant
          </v-btn>
        </div>
      </v-container>
    </section>

    <!-- Témoignages Section -->
    <section class="testimonials-section">
      <v-container>
        <div class="section-header text-center mb-12">
          <h2 class="section-title">Ce que disent nos utilisateurs</h2>
          <p class="section-subtitle">Découvrez les témoignages de patients et d'infirmiers</p>
        </div>
        
        <v-carousel
          v-model="currentTestimonial"
          :show-arrows="true"
          :show-arrows-hover="true"
          hide-delimiter-background
          delimiter-icon="mdi-circle"
          class="testimonials-carousel"
        >
          <v-carousel-item
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="testimonial-slide"
          >
            <v-card class="testimonial-card" elevation="8" rounded="xl">
              <v-card-text class="testimonial-content text-center pa-8">
                <v-icon size="48" color="warning" class="mb-4">
                  mdi-format-quote-open
                </v-icon>
                <p class="testimonial-text text-h6">
                  "{{ testimonial.text }}"
                </p>
                <div class="testimonial-author mt-6">
                  <v-avatar size="64" class="mb-3">
                    <v-img :src="testimonial.avatar" :alt="testimonial.name" />
                  </v-avatar>
                  <h4 class="testimonial-name">{{ testimonial.name }}</h4>
                  <div class="testimonial-rating">
                    <v-rating
                      v-model="testimonial.note"
                      readonly
                      density="compact"
                      color="warning"
                    />
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-container>
    </section>

    <!-- Top Villes Section -->
    <section class="cities-section">
      <v-container>
        <div class="section-header text-center mb-12">
          <h2 class="section-title">Top des villes</h2>
          <p class="section-subtitle">Infirmiers disponibles dans les principales villes</p>
        </div>
        
        <v-row>
          <v-col
            cols="6"
            sm="4"
            md="3"
            lg="2"
            v-for="city in topCities"
            :key="city.id"
          >
            <v-card
              class="city-card text-center"
              elevation="2"
              rounded="lg"
              @click="searchInCity(city.name)"
              hover
            >
              <v-card-text class="pa-4">
                <v-icon size="32" color="primary" class="mb-2">
                  mdi-map-marker
                </v-icon>
                <h4 class="city-name">{{ city.name }}</h4>
                <p class="city-count">{{ city.nurseCount }} infirmiers</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- CTA Infirmier Section -->
    <section class="nurse-cta-section">
      <v-container>
        <v-card class="nurse-cta-card" elevation="8" rounded="xl">
          <v-row align="center">
            <v-col cols="12" lg="8">
              <div class="nurse-cta-content">
                <h2 class="nurse-cta-title">Vous êtes infirmier ?</h2>
                <p class="nurse-cta-subtitle">Rejoignez Infirmy et développez votre activité</p>
                
                <div class="nurse-benefits">
                  <div
                    v-for="benefit in nurseBenefits"
                    :key="benefit"
                    class="benefit-item"
                  >
                    <v-icon color="success" class="benefit-icon">
                      mdi-check-circle
                    </v-icon>
                    <span class="benefit-text">{{ benefit }}</span>
                  </div>
                </div>
                
                <v-btn
                  size="x-large"
                  color="secondary"
                  variant="elevated"
                  class="nurse-cta-btn"
                  @click="$router.push('/register?role=nurse')"
                >
                  <v-icon start>mdi-account-plus</v-icon>
                  Créer un compte Pro
                </v-btn>
              </div>
            </v-col>
            
            <v-col cols="12" lg="4" class="text-center">
              <div class="nurse-cta-image">
                <img
                  src="/images/nurse-portrait.jpg"
                  alt="Infirmier professionnel"
                  class="nurse-portrait"
                />
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <v-container>
        <div class="section-header text-center mb-12">
          <h2 class="section-title">Questions fréquentes</h2>
          <p class="section-subtitle">Trouvez rapidement les réponses à vos questions</p>
        </div>
        
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-expansion-panels variant="accordion" class="faq-panels">
              <v-expansion-panel
                v-for="(faq, index) in faqs"
                :key="index"
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
            
            <div class="text-center mt-6">
              <v-btn
                variant="outlined"
                color="primary"
                size="large"
                rounded="lg"
                @click="$router.push('/faq')"
              >
                Voir la FAQ complète
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUIStore } from '@/stores/ui'
import HeroSearch from '@/components/home/HeroSearch.vue'

// Router
const router = useRouter()

// Store
const uiStore = useUIStore()

// State
const currentTestimonial = ref(0)

// Features data
const features = [
  {
    id: 'rapid',
    title: 'Réservation rapide',
    description: 'Disponibilités en temps réel, réservation en quelques clics. Plus besoin d\'appeler, tout se fait en ligne !',
    icon: 'mdi-lightning-bolt',
    color: 'success'
  },
  {
    id: 'proximity',
    title: 'Proche de chez vous',
    description: 'IDEL vérifiés et certifiés dans votre zone. Nous sélectionnons les meilleurs professionnels près de chez vous.',
    icon: 'mdi-map-marker-radius',
    color: 'primary'
  },
  {
    id: 'quality',
    title: 'Soins de qualité',
    description: 'Avis authentiques et vérifiés. Chaque infirmier est évalué par ses patients pour garantir la qualité des soins.',
    icon: 'mdi-shield-check',
    color: 'warning'
  }
]

// Steps data
const steps = [
  {
    id: 'step1',
    title: 'Recherchez',
    description: 'Entrez votre adresse et vos besoins. Notre système vous propose les infirmiers disponibles dans votre secteur.',
    icon: 'mdi-magnify',
    color: 'primary'
  },
  {
    id: 'step2',
    title: 'Choisissez',
    description: 'Sélectionnez l\'infirmier qui vous convient selon ses spécialités, ses disponibilités et les avis patients.',
    icon: 'mdi-account-tie',
    color: 'secondary'
  },
  {
    id: 'step3',
    title: 'Confirmez',
    description: 'Réservez votre créneau en toute simplicité. Recevez une confirmation par email et SMS de rappel.',
    icon: 'mdi-calendar-check',
    color: 'success'
  }
]

// Testimonials data
const testimonials = [
  {
    id: 1,
    text: 'Réservation ultra rapide, infirmière très pro ! J\'ai trouvé quelqu\'un en moins de 2h pour ma prise de sang.',
    name: 'Sophie D.',
    note: 5,
    avatar: '/images/avatars/patient-1.jpg'
  },
  {
    id: 2,
    text: 'On a trouvé quelqu\'un le jour même pour les soins de ma mère. L\'infirmière était ponctuelle et très compétente.',
    name: 'Yanis P.',
    note: 5,
    avatar: '/images/avatars/patient-2.jpg'
  },
  {
    id: 3,
    text: 'Interface claire et simple. J\'utilise Infirmy régulièrement pour mes soins de diabète. Très satisfait !',
    name: 'Nadia K.',
    note: 4,
    avatar: '/images/avatars/patient-3.jpg'
  },
  {
    id: 4,
    text: 'SMS de rappel utile, expérience nickel. L\'infirmier était exactement à l\'heure et très professionnel.',
    name: 'Théo R.',
    note: 5,
    avatar: '/images/avatars/patient-4.jpg'
  }
]

// Top cities data
const topCities = [
  { id: 1, name: 'Paris', nurseCount: 156 },
  { id: 2, name: 'Lyon', nurseCount: 89 },
  { id: 3, name: 'Marseille', nurseCount: 67 },
  { id: 4, name: 'Toulouse', nurseCount: 54 },
  { id: 5, name: 'Lille', nurseCount: 43 },
  { id: 6, name: 'Bordeaux', nurseCount: 38 },
  { id: 7, name: 'Nantes', nurseCount: 35 },
  { id: 8, name: 'Nice', nurseCount: 32 },
  { id: 9, name: 'Rennes', nurseCount: 29 },
  { id: 10, name: 'Montpellier', nurseCount: 26 },
  { id: 11, name: 'Strasbourg', nurseCount: 24 },
  { id: 12, name: 'Grenoble', nurseCount: 22 },
  { id: 13, name: 'Dijon', nurseCount: 20 },
  { id: 14, name: 'Reims', nurseCount: 18 },
  { id: 15, name: 'Angers', nurseCount: 17 },
  { id: 16, name: 'Clermont-Ferrand', nurseCount: 16 },
  { id: 17, name: 'Saint-Étienne', nurseCount: 15 },
  { id: 18, name: 'Toulon', nurseCount: 14 },
  { id: 19, name: 'Tours', nurseCount: 13 },
  { id: 20, name: 'Nîmes', nurseCount: 12 },
  { id: 21, name: 'Metz', nurseCount: 11 },
  { id: 22, name: 'Orléans', nurseCount: 10 },
  { id: 23, name: 'Caen', nurseCount: 9 },
  { id: 24, name: 'Rouen', nurseCount: 8 }
]

// Nurse benefits
const nurseBenefits = [
  'Patients à proximité',
  'Calendrier & tournées',
  'Messagerie',
  'Facturation (Pro)'
]

// FAQ data
const faqs = [
  {
    question: 'Comment fonctionne la réservation ?',
    answer: 'Entrez votre adresse, choisissez un créneau disponible et confirmez votre rendez-vous. L\'infirmier recevra une notification et confirmera l\'intervention.'
  },
  {
    question: 'Les soins sont-ils remboursés ?',
    answer: 'Oui, les soins à domicile sont remboursés par la Sécurité sociale et votre mutuelle, selon les conditions habituelles.'
  },
  {
    question: 'Comment sont vérifiés les infirmiers ?',
    answer: 'Tous nos infirmiers sont diplômés d\'État, vérifiés et certifiés. Nous vérifions leurs diplômes et leur autorisation d\'exercice.'
  },
  {
    question: 'Puis-je annuler un rendez-vous ?',
    answer: 'Oui, vous pouvez annuler jusqu\'à 24h avant le rendez-vous. Passé ce délai, des frais peuvent s\'appliquer.'
  },
  {
    question: 'Comment contacter l\'infirmier ?',
    answer: 'Via la messagerie intégrée de l\'application, vous pouvez échanger directement avec l\'infirmier avant et après l\'intervention.'
  }
]

// Methods
const searchInCity = (cityName: string) => {
  router.push({
    path: '/rechercher',
    query: { q: cityName }
  })
}

// Lifecycle
onMounted(() => {
  uiStore.setPageInfo('Accueil - Infirmy', 'home')
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  padding: 6rem 0 2rem;
  position: relative;
  overflow: hidden;
}

.hero-container {
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.hero-btn {
  min-width: 200px;
}

.hero-illustration {
  display: flex;
  justify-content: center;
  align-items: center;
}

.medical-illustration {
  text-align: center;
}

.hero-image {
  max-width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Stats Bar */
.stats-bar {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem 0;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.stat-icon {
  flex-shrink: 0;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: white;
}

.stat-label {
  margin: 0;
  opacity: 0.8;
  font-size: 0.9rem;
}

/* Sections */
.features-section,
.how-it-works-section,
.testimonials-section,
.cities-section,
.nurse-cta-section,
.faq-section {
  padding: 5rem 0;
}

.features-section {
  background: #f8fafc;
}

.how-it-works-section {
  background: white;
}

.testimonials-section {
  background: #f8fafc;
}

.cities-section {
  background: white;
}

.nurse-cta-section {
  background: #f8fafc;
}

.faq-section {
  background: white;
}

.section-header {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
}

/* Feature Cards */
.feature-card {
  height: 100%;
  text-align: center;
  padding: 2rem;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
}

.feature-icon-wrapper {
  margin-bottom: 1.5rem;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.feature-description {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

/* Step Cards */
.step-card {
  padding: 2rem;
}

.step-number {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1.5rem;
}

.step-illustration {
  margin-bottom: 1.5rem;
}

.step-icon {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #e2e8f0;
}

.step-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.step-description {
  color: #64748b;
  line-height: 1.6;
}

/* Testimonials */
.testimonials-carousel {
  max-width: 800px;
  margin: 0 auto;
}

.testimonial-card {
  height: 400px;
  display: flex;
  align-items: center;
}

.testimonial-text {
  font-style: italic;
  color: #374151;
  line-height: 1.6;
}

.testimonial-author {
  margin-top: 2rem;
}

.testimonial-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0.5rem 0;
}

/* City Cards */
.city-card {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.city-card:hover {
  transform: scale(1.05);
}

.city-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0.5rem 0;
}

.city-count {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
}

/* Nurse CTA */
.nurse-cta-card {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: white;
  padding: 3rem;
}

.nurse-cta-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.nurse-cta-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.nurse-benefits {
  margin-bottom: 2rem;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.benefit-icon {
  flex-shrink: 0;
}

.benefit-text {
  font-size: 1rem;
}

.nurse-cta-btn {
  min-width: 250px;
}

.nurse-cta-image {
  text-align: center;
}

.nurse-portrait {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.2);
}

/* FAQ */
.faq-panels {
  max-width: 800px;
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

/* Responsive */
@media (max-width: 960px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .hero-btn {
    min-width: auto;
  }
  
  .stat-content {
    flex-direction: column;
    text-align: center;
  }
  
  .nurse-cta-card {
    padding: 2rem;
  }
  
  .nurse-cta-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 600px) {
  .hero-section {
    padding: 4rem 0 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .features-section,
  .how-it-works-section,
  .testimonials-section,
  .cities-section,
  .nurse-cta-section,
  .faq-section {
    padding: 3rem 0;
  }
}
</style>
