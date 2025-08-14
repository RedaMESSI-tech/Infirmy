<template>
  <div class="about-page">
    <!-- Header -->
    <div class="about-header">
      <v-container>
        <div class="text-center mb-8">
          <h1 class="about-title">À propos d'Infirmy</h1>
          <p class="about-subtitle">
            Découvrez notre mission, notre équipe et notre vision pour révolutionner les soins à domicile
          </p>
        </div>
      </v-container>
    </div>

    <!-- Mission Section -->
    <div class="mission-section">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6">
            <div class="mission-content">
              <h2 class="section-title">Notre mission</h2>
              <p class="mission-text">
                Chez Infirmy, nous croyons que les soins de qualité doivent être accessibles à tous, 
                partout et à tout moment. Notre plateforme connecte patients et infirmières libérales 
                pour offrir des soins à domicile de qualité, en toute simplicité.
              </p>
              <p class="mission-text">
                Nous simplifions la recherche d'infirmières, facilitons la prise de rendez-vous 
                et assurons un suivi optimal des soins, tout en garantissant la sécurité et 
                la confidentialité des données médicales.
              </p>
              <div class="mission-stats">
                <div class="stat-item">
                  <div class="stat-number">+5000</div>
                  <div class="stat-label">Soins réalisés</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">+200</div>
                  <div class="stat-label">Infirmières partenaires</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">98%</div>
                  <div class="stat-label">Satisfaction client</div>
                </div>
              </div>
            </div>
          </v-col>
          
          <v-col cols="12" md="6">
            <div class="mission-image">
              <v-img
                src="/images/mission-image.jpg"
                alt="Mission Infirmy"
                class="rounded-lg"
                cover
                height="400"
              >
                <template #placeholder>
                  <div class="image-placeholder">
                    <v-icon size="64" color="primary">mdi-heart-pulse</v-icon>
                    <h3>Notre mission</h3>
                    <p>Révolutionner les soins à domicile</p>
                  </div>
                </template>
              </v-img>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Values Section -->
    <div class="values-section">
      <v-container>
        <div class="text-center mb-8">
          <h2 class="section-title">Nos valeurs</h2>
          <p class="section-subtitle">
            Les principes qui guident chacune de nos actions
          </p>
        </div>
        
        <v-row>
          <v-col cols="12" md="4" v-for="value in values" :key="value.id">
            <v-card class="value-card" elevation="4" rounded="lg">
              <v-card-text class="text-center pa-6">
                <div class="value-icon-wrapper mb-4">
                  <v-icon size="64" :color="value.color">{{ value.icon }}</v-icon>
                </div>
                <h3 class="value-title">{{ value.title }}</h3>
                <p class="value-description">{{ value.description }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Story Section -->
    <div class="story-section">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6" order="2" order-md="1">
            <div class="story-image">
              <v-img
                src="/images/story-image.jpg"
                alt="Histoire Infirmy"
                class="rounded-lg"
                cover
                height="400"
              >
                <template #placeholder>
                  <div class="image-placeholder">
                    <v-icon size="64" color="primary">mdi-lightbulb</v-icon>
                    <h3>Notre histoire</h3>
                    <p>De l'idée à la réalité</p>
                  </div>
                </template>
              </v-img>
            </div>
          </v-col>
          
          <v-col cols="12" md="6" order="1" order-md="2">
            <div class="story-content">
              <h2 class="section-title">Notre histoire</h2>
              <p class="story-text">
                Infirmy est né en 2023 d'un constat simple : il est souvent difficile de trouver 
                une infirmière disponible rapidement pour des soins à domicile, surtout en dehors 
                des heures de bureau.
              </p>
              <p class="story-text">
                Fondée par une équipe de professionnels de santé et d'experts en technologie, 
                notre plateforme a été conçue pour répondre aux besoins réels des patients et 
                des infirmières libérales.
              </p>
              <p class="story-text">
                Aujourd'hui, Infirmy est devenu un acteur de référence dans le domaine des 
                soins à domicile, reconnu pour sa qualité de service et son innovation.
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Team Section -->
    <div class="team-section">
      <v-container>
        <div class="text-center mb-8">
          <h2 class="section-title">Notre équipe</h2>
          <p class="section-subtitle">
            Des experts passionnés par la santé et la technologie
          </p>
        </div>
        
        <v-row>
          <v-col cols="12" md="4" v-for="member in team" :key="member.id">
            <v-card class="team-card" elevation="4" rounded="lg">
              <v-card-text class="text-center pa-6">
                <div class="member-avatar mb-4">
                  <v-avatar size="120">
                    <v-img
                      v-if="member.avatar"
                      :src="member.avatar"
                      :alt="member.name"
                    />
                    <v-icon v-else size="120">{{ member.icon }}</v-icon>
                  </v-avatar>
                </div>
                <h3 class="member-name">{{ member.name }}</h3>
                <p class="member-role">{{ member.role }}</p>
                <p class="member-description">{{ member.description }}</p>
                <div class="member-social mt-4">
                  <v-btn
                    v-if="member.linkedin"
                    icon
                    variant="text"
                    color="primary"
                    size="small"
                    @click="openLinkedIn(member.linkedin)"
                  >
                    <v-icon>mdi-linkedin</v-icon>
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Certifications Section -->
    <div class="certifications-section">
      <v-container>
        <v-card class="certifications-card" elevation="4" rounded="lg">
          <v-card-text class="pa-6">
            <div class="text-center mb-6">
              <h2 class="section-title">Certifications et accréditations</h2>
              <p class="section-subtitle">
                Notre engagement pour la qualité et la sécurité
              </p>
            </div>
            
            <v-row justify="center" align="center">
              <v-col cols="12" md="3" v-for="cert in certifications" :key="cert.id">
                <div class="certification-item text-center">
                  <v-icon size="48" color="success" class="mb-3">{{ cert.icon }}</v-icon>
                  <h4 class="cert-title">{{ cert.title }}</h4>
                  <p class="cert-description">{{ cert.description }}</p>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </div>

    <!-- CTA Section -->
    <div class="about-cta">
      <v-container>
        <v-card class="cta-card" elevation="8" rounded="xl">
          <v-card-text class="text-center pa-8">
            <h2 class="cta-title mb-4">Prêt à rejoindre l'aventure ?</h2>
            <p class="cta-subtitle mb-6">
              Découvrez comment Infirmy peut transformer vos soins à domicile
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
                <v-icon start>mdi-email</v-icon>
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

// Router
const router = useRouter()

// Values data
const values = ref([
  {
    id: 1,
    title: 'Excellence',
    description: 'Nous nous engageons à offrir des soins de la plus haute qualité, en respectant les standards médicaux les plus exigeants.',
    icon: 'mdi-star',
    color: 'warning'
  },
  {
    id: 2,
    title: 'Innovation',
    description: 'Nous utilisons les technologies les plus avancées pour simplifier et améliorer l\'expérience des soins à domicile.',
    icon: 'mdi-lightbulb',
    color: 'info'
  },
  {
    id: 3,
    title: 'Humanité',
    description: 'Chaque patient est unique. Nous mettons l\'humain au cœur de nos préoccupations et de nos solutions.',
    icon: 'mdi-heart',
    color: 'error'
  }
])

// Team data
const team = ref([
  {
    id: 1,
    name: 'Dr. Marie Dubois',
    role: 'Directrice médicale',
    description: 'Médecin généraliste avec 15 ans d\'expérience, spécialisée dans la médecine de famille et les soins à domicile.',
    avatar: null,
    icon: 'mdi-account-tie',
    linkedin: 'https://linkedin.com/in/marie-dubois'
  },
  {
    id: 2,
    name: 'Thomas Martin',
    role: 'Directeur technique',
    description: 'Expert en développement logiciel et en cybersécurité, passionné par l\'innovation dans le domaine de la santé.',
    avatar: null,
    icon: 'mdi-laptop',
    linkedin: 'https://linkedin.com/in/thomas-martin'
  },
  {
    id: 3,
    name: 'Sophie Bernard',
    role: 'Directrice des opérations',
    description: 'Spécialiste en gestion des services de santé et en optimisation des processus de soins.',
    avatar: null,
    icon: 'mdi-cog',
    linkedin: 'https://linkedin.com/in/sophie-bernard'
  }
])

// Certifications data
const certifications = ref([
  {
    id: 1,
    title: 'ISO 27001',
    description: 'Certification sécurité de l\'information',
    icon: 'mdi-shield-check'
  },
  {
    id: 2,
    title: 'HDS',
    description: 'Hébergeur de données de santé',
    icon: 'mdi-hospital-building'
  },
  {
    id: 3,
    title: 'RGPD',
    description: 'Conformité protection des données',
    icon: 'mdi-gdpr'
  },
  {
    id: 4,
    title: 'Qualiopi',
    description: 'Qualité de la formation',
    icon: 'mdi-certificate'
  }
])

// Methods
const openLinkedIn = (url: string) => {
  window.open(url, '_blank')
}

const goToSearch = () => {
  router.push('/rechercher')
}

const goToContact = () => {
  router.push('/contact')
}
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background: #f8fafc;
}

.about-header {
  background: white;
  padding: 4rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.about-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1rem 0;
}

.about-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.mission-section {
  padding: 4rem 0;
  background: white;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1.5rem 0;
}

.mission-text {
  font-size: 1.1rem;
  color: #374151;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.mission-stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

.mission-image,
.story-image {
  text-align: center;
}

.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #f1f5f9;
  color: #64748b;
}

.image-placeholder h3 {
  color: #1e293b;
  margin: 1rem 0 0.5rem 0;
}

.values-section {
  padding: 4rem 0;
}

.section-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.value-card {
  background: white;
  border: 1px solid #e2e8f0;
  height: 100%;
  transition: all 0.3s ease;
}

.value-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.value-icon-wrapper {
  margin-bottom: 1.5rem;
}

.value-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1rem 0;
}

.value-description {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

.story-section {
  padding: 4rem 0;
  background: white;
}

.story-text {
  font-size: 1.1rem;
  color: #374151;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.team-section {
  padding: 4rem 0;
}

.team-card {
  background: white;
  border: 1px solid #e2e8f0;
  height: 100%;
  transition: all 0.3s ease;
}

.team-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.member-avatar {
  margin-bottom: 1.5rem;
}

.member-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.member-role {
  font-size: 1.1rem;
  color: #667eea;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.member-description {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

.member-social {
  display: flex;
  justify-content: center;
}

.certifications-section {
  padding: 4rem 0;
  background: white;
}

.certifications-card {
  background: white;
  border: 1px solid #e2e8f0;
}

.certification-item {
  padding: 1rem;
}

.cert-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.cert-description {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
}

.about-cta {
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
  .about-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .mission-stats {
    flex-direction: column;
    gap: 1rem;
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
  .about-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .cta-title {
    font-size: 2rem;
  }
}
</style>
