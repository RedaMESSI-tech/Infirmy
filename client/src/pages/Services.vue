<template>
  <div class="services-page">
    <!-- Hero Section -->
    <section class="hero-section" :style="{'background-image':'linear-gradient(180deg, rgba(255,255,255,.80), rgba(255,255,255,.80)), url(/images/laser4.jpg)'}">
      <v-container class="text-center py-16">
        <h1 class="text-h2 text-md-h1 mb-4">Nos Services & Tarifs</h1>
        <p class="text-h6 text-medium-emphasis">Épilation laser définitive pour toutes les zones du corps</p>
      </v-container>
    </section>

    <v-container class="py-12">
      <!-- Introduction -->
      <v-row class="mb-12">
        <v-col cols="12" class="text-center">
          <h2 class="text-h4 mb-4">Pourquoi choisir l'épilation laser ?</h2>
          <p class="text-body-1 text-medium-emphasis mb-6">
            L'épilation laser est la solution la plus efficace pour une épilation définitive. 
            Nos tarifs sont transparents et sans surprise.
          </p>
          <v-row>
            <v-col cols="12" md="3" class="text-center">
              <v-icon size="48" color="primary" class="mb-3">mdi-check-circle</v-icon>
              <h3 class="text-h6 mb-2">Définitif</h3>
              <p class="text-body-2">Résultats permanents après 6-8 séances</p>
            </v-col>
            <v-col cols="12" md="3" class="text-center">
              <v-icon size="48" color="primary" class="mb-3">mdi-shield-check</v-icon>
              <h3 class="text-h6 mb-2">Sécurisé</h3>
              <p class="text-body-2">Technologie médicale certifiée</p>
            </v-col>
            <v-col cols="12" md="3" class="text-center">
              <v-icon size="48" color="primary" class="mb-3">mdi-heart</v-icon>
              <h3 class="text-h6 mb-2">Confortable</h3>
              <p class="text-body-2">Système de refroidissement intégré</p>
            </v-col>
            <v-col cols="12" md="3" class="text-center">
              <v-icon size="48" color="primary" class="mb-3">mdi-account-group</v-icon>
              <h3 class="text-h6 mb-2">Universel</h3>
              <p class="text-body-2">Tous phototypes et zones</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Zones du Visage -->
      <v-row class="mb-12">
        <v-col cols="12" class="mb-6">
          <h2 class="text-h4 mb-4">Zones du Visage</h2>
          <p class="text-body-1 text-medium-emphasis">Traitement précis et efficace pour un visage parfaitement épilé</p>
        </v-col>
        <v-col cols="12" md="6">
          <v-img src="/images/laser3.jpg" height="300" cover class="rounded-lg mb-4" alt="Épilation visage"/>
        </v-col>
        <v-col cols="12" md="6">
          <v-list class="bg-transparent">
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Lèvre supérieure</span>
                <span class="text-h6 font-weight-bold text-primary">45 €</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Menton</span>
                <span class="text-h6 font-weight-bold text-primary">35 €</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Joues</span>
                <span class="text-h6 font-weight-bold text-primary">55 €</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Visage complet</span>
                <span class="text-h6 font-weight-bold text-primary">120 €</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Sourcils (forme)</span>
                <span class="text-h6 font-weight-bold text-primary">25 €</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <!-- Zones du Corps -->
      <v-row class="mb-12">
        <v-col cols="12" class="mb-6">
          <h2 class="text-h4 mb-4">Zones du Corps</h2>
          <p class="text-body-1 text-medium-emphasis">Traitement efficace pour toutes les zones du corps</p>
        </v-col>
        <v-col cols="12" md="6">
          <v-list class="bg-transparent">
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Aisselles</span>
                <span class="text-h6 font-weight-bold text-primary">65 €</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Bras (avant-bras)</span>
                <span class="text-h6 font-weight-bold text-primary">85 €</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Bras (complet)</span>
                <span class="text-h6 font-weight-bold text-primary">120 €</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Dos</span>
                <span class="text-h6 font-weight-bold text-primary">150 €</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Poitrine</span>
                <span class="text-h6 font-weight-bold text-primary">100 €</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Abdomen</span>
                <span class="text-h6 font-weight-bold text-primary">90 €</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="6">
          <v-img src="/images/laser6.jpg" height="300" cover class="rounded-lg mb-4" alt="Épilation corps"/>
        </v-col>
      </v-row>

      <!-- Zones des Jambes -->
      <v-row class="mb-12">
        <v-col cols="12" md="6">
          <v-img src="/images/laser4.jpg" height="300" cover class="rounded-lg mb-4" alt="Épilation jambes"/>
        </v-col>
        <v-col cols="12" md="6">
          <v-list class="bg-transparent">
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Jambes (1/2 jambe)</span>
                <span class="text-h6 font-weight-bold text-primary">95 €</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Jambes (complet)</span>
                <span class="text-h6 font-weight-bold text-primary">180 €</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Pieds</span>
                <span class="text-h6 font-weight-bold text-primary">45 €</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Cuisses</span>
                <span class="text-h6 font-weight-bold text-primary">110 €</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <!-- Zones Intimes -->
      <v-row class="mb-12">
        <v-col cols="12" class="mb-6">
          <h2 class="text-h4 mb-4">Zones Intimes</h2>
          <p class="text-body-1 text-medium-emphasis">Traitement délicat et professionnel pour votre intimité</p>
        </v-col>
        <v-col cols="12" md="6">
          <v-list class="bg-transparent">
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Maillot (classique)</span>
                <span class="text-h6 font-weight-bold text-primary">75 €</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Maillot (brésilien)</span>
                <span class="text-h6 font-weight-bold text-primary">95 €</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Maillot (complet)</span>
                <span class="text-h6 font-weight-bold text-primary">120 €</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-2">
              <v-list-item-title class="d-flex justify-space-between align-center">
                <span class="text-body-1">Zone périanale</span>
                <span class="text-h6 font-weight-bold text-primary">65 €</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="pa-6" color="primary" theme="dark">
            <h3 class="text-h6 mb-3">⚠️ Important</h3>
            <p class="text-body-2">
              Pour les zones intimes, nous recommandons une consultation préalable 
              pour évaluer votre peau et adapter le protocole.
            </p>
          </v-card>
        </v-col>
      </v-row>

      <!-- Forfaits et Promotions -->
      <v-row class="mb-12">
        <v-col cols="12" class="mb-6">
          <h2 class="text-h4 mb-4">Forfaits et Promotions</h2>
          <p class="text-body-1 text-medium-emphasis">Économisez avec nos forfaits personnalisés</p>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="pa-6 text-center" elevation="2">
            <v-icon size="48" color="primary" class="mb-4">mdi-star</v-icon>
            <h3 class="text-h6 mb-3">Forfait Découverte</h3>
            <p class="text-h4 font-weight-bold text-primary mb-2">-20%</p>
            <p class="text-body-2 mb-4">Sur votre première séance</p>
            <v-btn color="primary" variant="outlined" to="/booking">Réserver</v-btn>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="pa-6 text-center" elevation="2">
            <v-icon size="48" color="primary" class="mb-4">mdi-heart</v-icon>
            <h3 class="text-h6 mb-3">Forfait Couple</h3>
            <p class="text-h4 font-weight-bold text-primary mb-2">-15%</p>
            <p class="text-body-2 mb-4">Pour 2 personnes</p>
            <v-btn color="primary" variant="outlined" to="/booking">Réserver</v-btn>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="pa-6 text-center" elevation="2">
            <v-icon size="48" color="primary" class="mb-4">mdi-account-multiple</v-icon>
            <h3 class="text-h6 mb-3">Forfait Famille</h3>
            <p class="text-h4 font-weight-bold text-primary mb-2">-25%</p>
            <p class="text-body-2 mb-4">À partir de 3 personnes</p>
            <v-btn color="primary" variant="outlined" to="/booking">Réserver</v-btn>
          </v-card>
        </v-col>
      </v-row>

      <!-- Informations Importantes -->
      <v-row class="mb-12">
        <v-col cols="12">
          <v-alert type="info" variant="tonal" class="mb-6">
            <template #title>
              <strong>Informations importantes</strong>
            </template>
            <p class="mb-2">• Consultation gratuite obligatoire avant la première séance</p>
            <p class="mb-2">• Test de spot gratuit pour évaluer la réaction de votre peau</p>
            <p class="mb-2">• Protocole personnalisé selon votre phototype et zone</p>
            <p>• Paiement accepté : espèces, carte, chèque, virement</p>
          </v-alert>
        </v-col>
      </v-row>

      <!-- CTA Section -->
      <v-row class="text-center">
        <v-col cols="12">
          <v-card class="pa-8" color="secondary" theme="dark">
            <h3 class="text-h4 mb-4">Prêt(e) à commencer ?</h3>
            <p class="text-h6 mb-6">Prenez rendez-vous pour une consultation gratuite et personnalisée</p>
            <v-btn size="large" color="white" variant="elevated" to="/booking" class="text-secondary">
              Prendre rendez-vous
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
// Page Services avec tarifs détaillés
</script>

<style scoped>
.services-page {
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
