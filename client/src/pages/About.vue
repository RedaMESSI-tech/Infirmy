<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section" :style="{'background-image':'linear-gradient(180deg, rgba(255,255,255,.80), rgba(255,255,255,.80)), url(/images/laser5.jpg)'}">
      <v-container class="text-center py-16">
        <h1 class="text-h2 text-md-h1 mb-4">À propos de Veloria Laser</h1>
        <p class="text-h6 text-medium-emphasis">Excellence et innovation en épilation définitive depuis 2018</p>
      </v-container>
    </section>

    <!-- Notre Histoire -->
    <v-container class="py-12">
      <v-row class="mb-12">
        <v-col cols="12" md="6" class="d-flex align-center">
          <div>
            <h2 class="text-h4 mb-6">Notre Histoire</h2>
            <p class="text-body-1 mb-4">
              Veloria Laser est né de la vision d'offrir une épilation définitive de qualité professionnelle 
              dans un environnement chaleureux et rassurant. Depuis notre création en 2018, nous avons 
              accompagné plus de 5 000 clients vers une liberté totale.
            </p>
            <p class="text-body-1 mb-4">
              Notre centre combine expertise médicale et technologie de pointe pour garantir des résultats 
              optimaux et une expérience client exceptionnelle. Chaque membre de notre équipe partage 
              la même passion : vous aider à retrouver confiance en vous.
            </p>
            <v-chip variant="flat" color="primary" class="me-2 mb-2">+5000 clients satisfaits</v-chip>
            <v-chip variant="flat" color="secondary" class="me-2 mb-2">5 ans d'expertise</v-chip>
            <v-chip variant="flat" color="success" class="me-2 mb-2">98% de satisfaction</v-chip>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-img src="/images/laser1.jpg" height="400" cover class="rounded-lg" alt="Notre centre Veloria Laser"/>
        </v-col>
      </v-row>

      <!-- Notre Équipe -->
      <v-row class="mb-12">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h4 mb-4">Notre Équipe de Professionnels</h2>
          <p class="text-body-1 text-medium-emphasis">Des experts qualifiés et expérimentés à votre service</p>
        </v-col>
        <v-col cols="12" md="4" class="text-center">
          <v-avatar size="120" class="mb-4">
            <img src="/avatars/a1.svg" alt="Dr. Marie Dubois"/>
          </v-avatar>
          <h3 class="text-h6 mb-2">Dr. Marie Dubois</h3>
          <p class="text-subtitle-2 text-primary mb-2">Directrice Médicale</p>
          <p class="text-body-2 text-medium-emphasis">
            Dermatologue avec 15 ans d'expérience en médecine esthétique. 
            Spécialisée en épilation laser et traitement des peaux sensibles.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-center">
          <v-avatar size="120" class="mb-4">
            <img src="/avatars/a2.svg" alt="Sophie Martin"/>
          </v-avatar>
          <h3 class="text-h6 mb-2">Sophie Martin</h3>
          <p class="text-subtitle-2 text-primary mb-2">Technicienne Laser Senior</p>
          <p class="text-body-2 text-medium-emphasis">
            Certifiée en épilation laser depuis 8 ans. 
            Expertise particulière en zones sensibles et protocoles personnalisés.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-center">
          <v-avatar size="120" class="mb-4">
            <img src="/avatars/a3.svg" alt="Claire Moreau"/>
          </v-avatar>
          <h3 class="text-h6 mb-2">Claire Moreau</h3>
          <p class="text-subtitle-2 text-primary mb-2">Conseillère Client</p>
          <p class="text-body-2 text-medium-emphasis">
            Accompagne chaque client dans son parcours personnalisé. 
            Garantit une expérience client exceptionnelle de A à Z.
          </p>
        </v-col>
      </v-row>

      <!-- Notre Technologie -->
      <v-row class="mb-12">
        <v-col cols="12" md="6">
          <v-img src="/images/laser2.jpg" height="400" cover class="rounded-lg" alt="Notre technologie laser"/>
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center">
          <div>
            <h2 class="text-h4 mb-6">Notre Technologie de Pointe</h2>
            <div class="mb-6">
              <h3 class="text-h6 mb-3">Laser Triple Longueur d'Onde</h3>
              <p class="text-body-1 mb-4">
                Notre appareil utilise trois longueurs d'onde (755nm, 810nm, 1064nm) 
                pour traiter efficacement tous les types de peau et de poils.
              </p>
              <v-list class="bg-transparent">
                <v-list-item prepend-icon="mdi-check-circle" class="px-0">
                  <v-list-item-title class="text-body-1">755nm - Poils fins et clairs</v-list-item-title>
                </v-list-item>
                <v-list-item prepend-icon="mdi-check-circle" class="px-0">
                  <v-list-item-title class="text-body-1">810nm - Poils moyens et foncés</v-list-item-title>
                </v-list-item>
                <v-list-item prepend-icon="mdi-check-circle" class="px-0">
                  <v-list-item-title class="text-body-1">1064nm - Peaux mates et foncées</v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
            <v-alert type="info" variant="tonal">
              <strong>Innovation :</strong> Système de refroidissement intégré pour un confort maximal
            </v-alert>
          </div>
        </v-col>
      </v-row>

      <!-- Nos Valeurs -->
      <v-row class="mb-12">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h4 mb-4">Nos Valeurs</h2>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <v-icon size="64" color="primary" class="mb-4">mdi-shield-check</v-icon>
          <h3 class="text-h6 mb-3">Sécurité</h3>
          <p class="text-body-2 text-medium-emphasis">
            Protocoles stricts et équipements certifiés pour votre sécurité absolue
          </p>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <v-icon size="64" color="primary" class="mb-4">mdi-heart</v-icon>
          <h3 class="text-h6 mb-3">Bienveillance</h3>
          <p class="text-body-2 text-medium-emphasis">
            Accueil chaleureux et accompagnement personnalisé à chaque étape
          </p>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <v-icon size="64" color="primary" class="mb-4">mdi-star</v-icon>
          <h3 class="text-h6 mb-3">Excellence</h3>
          <p class="text-body-2 text-medium-emphasis">
            Résultats optimaux grâce à notre expertise et notre technologie
          </p>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <v-icon size="64" color="primary" class="mb-4">mdi-account-group</v-icon>
          <h3 class="text-h6 mb-3">Confiance</h3>
          <p class="text-body-2 text-medium-emphasis">
            Relation durable basée sur la transparence et la satisfaction client
          </p>
        </v-col>
      </v-row>

      <!-- Notre Centre -->
      <v-row class="mb-12">
        <v-col cols="12" md="6" class="d-flex align-center">
          <div>
            <h2 class="text-h4 mb-6">Notre Centre</h2>
            <p class="text-body-1 mb-4">
              Situé au cœur de la ville, notre centre combine élégance et fonctionnalité. 
              Chaque espace a été conçu pour votre confort et votre bien-être.
            </p>
            <v-list class="bg-transparent">
              <v-list-item prepend-icon="mdi-check-circle" class="px-0">
                <v-list-item-title class="text-body-1">Cabinet de consultation privé</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" class="px-0">
                <v-list-item-title class="text-body-1">Salle de traitement équipée</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" class="px-0">
                <v-list-item-title class="text-body-1">Espace d'attente confortable</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" class="px-0">
                <v-list-item-title class="text-body-1">Parking gratuit</v-list-item-title>
              </v-list-item>
            </v-list>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-img src="/images/laser3.jpg" height="400" cover class="rounded-lg" alt="Notre centre de traitement"/>
        </v-col>
      </v-row>

      <!-- Certifications -->
      <v-row class="mb-12">
        <v-col cols="12" class="text-center">
          <h2 class="text-h4 mb-6">Nos Certifications et Agréments</h2>
          <v-row>
            <v-col cols="12" md="4" class="text-center">
              <v-icon size="64" color="success" class="mb-4">mdi-certificate</v-icon>
              <h3 class="text-h6 mb-2">Agrément ARS</h3>
              <p class="text-body-2 text-medium-emphasis">Centre agréé par l'Agence Régionale de Santé</p>
            </v-col>
            <v-col cols="12" md="4" class="text-center">
              <v-icon size="64" color="success" class="mb-4">mdi-shield-star</v-icon>
              <h3 class="text-h6 mb-2">ISO 9001</h3>
              <p class="text-body-2 text-medium-emphasis">Certification qualité internationale</p>
            </v-col>
            <v-col cols="12" md="4" class="text-center">
              <v-icon size="64" color="success" class="mb-4">mdi-medical-bag</v-icon>
              <h3 class="text-h6 mb-2">Ordre des Médecins</h3>
              <p class="text-body-2 text-medium-emphasis">Médecin inscrit à l'Ordre</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- CTA Section -->
      <v-row class="text-center">
        <v-col cols="12">
          <v-card class="pa-8" color="primary" theme="dark">
            <h3 class="text-h4 mb-4">Prêt(e) à commencer votre transformation ?</h3>
            <p class="text-h6 mb-6">Prenez rendez-vous pour une consultation gratuite et personnalisée</p>
            <v-btn size="large" color="white" variant="elevated" to="/booking" class="text-primary">
              Prendre rendez-vous
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
// Page À propos avec contenu enrichi
</script>

<style scoped>
.about-page {
  background-color: rgb(var(--v-theme-surface));
}

.hero-section {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 400px;
  display: flex;
  align-items: center;
}

.v-list-item {
  min-height: auto;
  padding: 8px 0;
}
</style>
