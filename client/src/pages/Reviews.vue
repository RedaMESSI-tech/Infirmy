<template>
  <div class="reviews-page">
    <!-- Hero Section -->
    <section class="hero-section" :style="{'background-image':'linear-gradient(180deg, rgba(255,255,255,.80), rgba(255,255,255,.80)), url(/images/laser5.jpg)'}">
      <v-container class="text-center py-16">
        <h1 class="text-h2 text-md-h1 mb-4">Avis de nos Clients</h1>
        <p class="text-h6 text-medium-emphasis">Découvrez les témoignages de ceux qui ont transformé leur vie</p>
      </v-container>
    </section>

    <v-container class="py-12">
      <!-- Statistiques -->
      <v-row class="mb-12">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h4 mb-4">Notre Réputation en Chiffres</h2>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <div class="stat-card pa-6">
            <v-icon size="64" color="primary" class="mb-4">mdi-star</v-icon>
            <h3 class="text-h3 font-weight-bold text-primary mb-2">4.9/5</h3>
            <p class="text-body-1">Note moyenne</p>
            <p class="text-caption text-medium-emphasis">Basée sur 500+ avis</p>
          </div>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <div class="stat-card pa-6">
            <v-icon size="64" color="primary" class="mb-4">mdi-account-group</v-icon>
            <h3 class="text-h3 font-weight-bold text-primary mb-2">5000+</h3>
            <p class="text-body-1">Clients satisfaits</p>
            <p class="text-caption text-medium-emphasis">Depuis 2018</p>
          </div>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <div class="stat-card pa-6">
            <v-icon size="64" color="primary" class="mb-4">mdi-heart</v-icon>
            <h3 class="text-h3 font-weight-bold text-primary mb-2">98%</h3>
            <p class="text-body-1">Taux de satisfaction</p>
            <p class="text-caption text-medium-emphasis">Recommanderait</p>
          </div>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <div class="stat-card pa-6">
            <v-icon size="64" color="primary" class="mb-4">mdi-award</v-icon>
            <h3 class="text-h3 font-weight-bold text-primary mb-2">5</h3>
            <p class="text-body-1">Années d'excellence</p>
            <p class="text-caption text-medium-emphasis">Certification qualité</p>
          </div>
        </v-col>
      </v-row>

      <!-- Avis Principaux -->
      <v-row class="mb-12">
        <v-col cols="12" class="mb-8">
          <h2 class="text-h4 mb-4">Témoignages de nos Clients</h2>
          <p class="text-body-1 text-medium-emphasis">Découvrez les expériences réelles de nos clients satisfaits</p>
        </v-col>

        <!-- Avis 1 -->
        <v-col cols="12" md="6" class="mb-6">
          <v-card class="review-card h-100" elevation="3">
            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-4">
                <v-avatar size="60" class="me-4">
                  <img src="/avatars/a1.svg" alt="Marie L."/>
                </v-avatar>
                <div>
                  <h3 class="text-h6 mb-1">Marie L.</h3>
                  <p class="text-subtitle-2 text-primary mb-1">Visage et aisselles</p>
                  <div class="d-flex align-center">
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20">mdi-star</v-icon>
                  </div>
                </div>
              </div>
              <p class="text-body-1 mb-4">
                "Après 6 séances, je suis enfin libérée de l'épilation quotidienne ! L'équipe est professionnelle 
                et attentionnée. Les séances sont rapides et peu douloureuses grâce au système de refroidissement. 
                Je recommande vivement Veloria Laser !"
              </p>
              <div class="d-flex align-center">
                <v-icon color="success" size="20" class="me-2">mdi-check-circle</v-icon>
                <span class="text-caption text-success">Avis vérifié</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Avis 2 -->
        <v-col cols="12" md="6" class="mb-6">
          <v-card class="review-card h-100" elevation="3">
            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-4">
                <v-avatar size="60" class="me-4">
                  <img src="/avatars/a2.svg" alt="Sophie M."/>
                </v-avatar>
                <div>
                  <h3 class="text-h6 mb-1">Sophie M.</h3>
                  <p class="text-subtitle-2 text-primary mb-1">Jambes complètes</p>
                  <div class="d-flex align-center">
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20">mdi-star</v-icon>
                  </div>
                </div>
              </div>
              <p class="text-body-1 mb-4">
                "Investissement qui en vaut vraiment la peine ! Après 8 séances, mes jambes sont parfaitement 
                lisses. L'été dernier, j'ai pu porter des jupes courtes sans stress. L'équipe est compétente 
                et les résultats dépassent mes attentes."
              </p>
              <div class="d-flex align-center">
                <v-icon color="success" size="20" class="me-2">mdi-check-circle</v-icon>
                <span class="text-caption text-success">Avis vérifié</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Avis 3 -->
        <v-col cols="12" md="6" class="mb-6">
          <v-card class="review-card h-100" elevation="3">
            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-4">
                <v-avatar size="60" class="me-4">
                  <img src="/avatars/a3.svg" alt="Claire D."/>
                </v-avatar>
                <div>
                  <h3 class="text-h6 mb-1">Claire D.</h3>
                  <p class="text-subtitle-2 text-primary mb-1">Maillot et zone intime</p>
                  <div class="d-flex align-center">
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20">mdi-star</v-icon>
                  </div>
                </div>
              </div>
              <p class="text-body-1 mb-4">
                "Zone sensible traitée avec beaucoup de professionnalisme. L'équipe m'a mise en confiance 
                dès le début. Les résultats sont exceptionnels et j'ai retrouvé confiance en moi. 
                Merci pour cette transformation !"
              </p>
              <div class="d-flex align-center">
                <v-icon color="success" size="20" class="me-2">mdi-check-circle</v-icon>
                <span class="text-caption text-success">Avis vérifié</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Avis 4 -->
        <v-col cols="12" md="6" class="mb-6">
          <v-card class="review-card h-100" elevation="3">
            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-4">
                <v-avatar size="60" class="me-4">
                  <img src="/avatars/a4.svg" alt="Thomas R."/>
                </v-avatar>
                <div>
                  <h3 class="text-h6 mb-1">Thomas R.</h3>
                  <p class="text-subtitle-2 text-primary mb-1">Dos et poitrine</p>
                  <div class="d-flex align-center">
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20">mdi-star</v-icon>
                  </div>
                </div>
              </div>
              <p class="text-body-1 mb-4">
                "En tant qu'homme, j'étais un peu réticent au début, mais l'équipe m'a parfaitement 
                accueilli. Le traitement du dos et de la poitrine a été efficace. Plus besoin de se raser 
                tous les jours, c'est un vrai gain de temps !"
              </p>
              <div class="d-flex align-center">
                <v-icon color="success" size="20" class="me-2">mdi-check-circle</v-icon>
                <span class="text-caption text-success">Avis vérifié</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Avis 5 -->
        <v-col cols="12" md="6" class="mb-6">
          <v-card class="review-card h-100" elevation="3">
            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-4">
                <v-avatar size="60" class="me-4">
                  <img src="/avatars/a5.svg" alt="Julie P."/>
                </v-avatar>
                <div>
                  <h3 class="text-h6 mb-1">Julie P.</h3>
                  <p class="text-subtitle-2 text-primary mb-1">Visage complet</p>
                  <div class="d-flex align-center">
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20">mdi-star</v-icon>
                  </div>
                </div>
              </div>
              <p class="text-body-1 mb-4">
                "Problème de poils sur le visage résolu définitivement ! L'équipe a su adapter le traitement 
                à ma peau sensible. Les résultats sont incroyables et j'ai enfin une peau parfaitement lisse. 
                Service client impeccable."
              </p>
              <div class="d-flex align-center">
                <v-icon color="success" size="20" class="me-2">mdi-check-circle</v-icon>
                <span class="text-caption text-success">Avis vérifié</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Avis 6 -->
        <v-col cols="12" md="6" class="mb-6">
          <v-card class="review-card h-100" elevation="3">
            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-4">
                <v-avatar size="60" class="me-4">
                  <img src="/avatars/a6.svg" alt="Nathalie B."/>
                </v-avatar>
                <div>
                  <h3 class="text-h6 mb-1">Nathalie B.</h3>
                  <p class="text-subtitle-2 text-primary mb-1">Forfait complet</p>
                  <div class="d-flex align-center">
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                    <v-icon color="amber" size="20">mdi-star</v-icon>
                  </div>
                </div>
              </div>
              <p class="text-body-1 mb-4">
                "J'ai opté pour le forfait complet et je ne le regrette pas ! L'équipe est professionnelle, 
                les tarifs transparents et les résultats exceptionnels. Je me sens enfin libre et confiante. 
                Un investissement qui change la vie !"
              </p>
              <div class="d-flex align-center">
                <v-icon color="success" size="20" class="me-2">mdi-check-circle</v-icon>
                <span class="text-caption text-success">Avis vérifié</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Avant/Après -->
      <v-row class="mb-12">
        <v-col cols="12" class="mb-8">
          <h2 class="text-h4 mb-4">Transformations Réelles</h2>
          <p class="text-body-1 text-medium-emphasis">Découvrez les résultats visuels de nos traitements</p>
        </v-col>
        <v-col cols="12" md="4" class="text-center mb-6">
          <v-card class="transformation-card" elevation="2">
            <v-img src="/images/laser1.jpg" height="200" cover class="mb-4"/>
            <v-card-text>
              <h3 class="text-h6 mb-2">Zone du Visage</h3>
              <p class="text-body-2 text-medium-emphasis">Avant et après 6 séances</p>
              <v-chip variant="flat" color="success" size="small">Résultat définitif</v-chip>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" class="text-center mb-6">
          <v-card class="transformation-card" elevation="2">
            <v-img src="/images/laser6.jpg" height="200" cover class="mb-4"/>
            <v-card-text>
              <h3 class="text-h6 mb-2">Haut du Corps</h3>
              <p class="text-body-2 text-medium-emphasis">Avant et après 8 séances</p>
              <v-chip variant="flat" color="success" size="small">Résultat définitif</v-chip>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" class="text-center mb-6">
          <v-card class="transformation-card" elevation="2">
            <v-img src="/images/laser4.jpg" height="200" cover class="mb-4"/>
            <v-card-text>
              <h3 class="text-h6 mb-2">Jambes</h3>
              <p class="text-body-2 text-medium-emphasis">Avant et après 8 séances</p>
              <v-chip variant="flat" color="success" size="small">Résultat définitif</v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Pourquoi nous choisir -->
      <v-row class="mb-12">
        <v-col cols="12" class="mb-8">
          <h2 class="text-h4 mb-4">Pourquoi nos Clients nous Choisissent</h2>
        </v-col>
        <v-col cols="12" md="3" class="text-center mb-6">
          <v-icon size="48" color="primary" class="mb-4">mdi-shield-check</v-icon>
          <h3 class="text-h6 mb-3">Sécurité Garantie</h3>
          <p class="text-body-2 text-medium-emphasis">
            Équipements médicaux certifiés et protocoles de sécurité stricts
          </p>
        </v-col>
        <v-col cols="12" md="3" class="text-center mb-6">
          <v-icon size="48" color="primary" class="mb-4">mdi-account-group</v-icon>
          <h3 class="text-h6 mb-3">Équipe Expérimentée</h3>
          <p class="text-body-2 text-medium-emphasis">
            Praticiens certifiés avec des années d'expérience
          </p>
        </v-col>
        <v-col cols="12" md="3" class="text-center mb-6">
          <v-icon size="48" color="primary" class="mb-4">mdi-heart</v-icon>
          <h3 class="text-h6 mb-3">Accueil Personnalisé</h3>
          <p class="text-body-2 text-medium-emphasis">
            Suivi personnalisé et accompagnement à chaque étape
          </p>
        </v-col>
        <v-col cols="12" md="3" class="text-center mb-6">
          <v-icon size="48" color="primary" class="mb-4">mdi-star</v-icon>
          <h3 class="text-h6 mb-3">Résultats Garantis</h3>
          <p class="text-body-2 text-medium-emphasis">
            Résultats visibles et durables pour tous les clients
          </p>
        </v-col>
      </v-row>

      <!-- CTA Section -->
      <v-row class="text-center">
        <v-col cols="12">
          <v-card class="pa-8" color="primary" theme="dark">
            <h3 class="text-h4 mb-4">Rejoignez nos Clients Satisfaits !</h3>
            <p class="text-h6 mb-6">Prenez rendez-vous pour commencer votre transformation dès aujourd'hui</p>
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
// Page Avis clients avec témoignages enrichis
</script>

<style scoped>
.reviews-page {
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

.stat-card {
  background: rgb(var(--v-theme-surface));
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.review-card {
  transition: transform 0.3s ease;
}

.review-card:hover {
  transform: translateY(-5px);
}

.transformation-card {
  transition: transform 0.3s ease;
}

.transformation-card:hover {
  transform: scale(1.05);
}

.h-100 {
  height: 100%;
}
</style>
