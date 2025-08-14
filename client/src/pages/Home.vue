<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
const svcs=ref([])
onMounted(async ()=>{ try{ const { data }=await axios.get('/api/services'); svcs.value=data }catch{} })
</script>
<template>
  <section class="full-hero" :style="{'background-image':'linear-gradient(180deg, rgba(255,255,255,.70), rgba(255,255,255,.70)), url(/images/laser1.jpg)'}">
    <v-container class="text-center">
      <v-chip variant="flat" color="secondary" class="mx-auto my-4">-20% première séance</v-chip>
      <h1 class="text-h2 text-md-h1 mb-4">L'épilation définitive, en douceur</h1>
      <p class="text-h5 text-medium-emphasis mb-6">Veloria Laser - Centre d'excellence en épilation laser depuis 2018</p>
      <RouterLink class="btn-cta" to="/booking">Prendre rendez-vous</RouterLink>
    </v-container>
  </section>

  <!-- Section Avantages -->
  <section class="advantages-section py-12">
    <v-container>
      <v-row class="text-center mb-8">
        <v-col cols="12">
          <h2 class="text-h3 text-md-h2 mb-4">Pourquoi choisir Veloria Laser ?</h2>
          <p class="text-h6 text-medium-emphasis">Excellence, sécurité et résultats garantis</p>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12" md="3" class="text-center mb-6">
          <v-icon size="64" color="primary" class="mb-4">mdi-shield-check</v-icon>
          <h3 class="text-h5 mb-3">Sécurité Garantie</h3>
          <p class="text-body-1 text-medium-emphasis">
            Équipements médicaux certifiés CE et protocoles de sécurité stricts
          </p>
        </v-col>
        <v-col cols="12" md="3" class="text-center mb-6">
          <v-icon size="64" color="primary" class="mb-4">mdi-account-group</v-icon>
          <h3 class="text-h5 mb-3">Équipe Expérimentée</h3>
          <p class="text-body-1 text-medium-emphasis">
            Praticiens certifiés avec plus de 10 ans d'expérience
          </p>
        </v-col>
        <v-col cols="12" md="3" class="text-center mb-6">
          <v-icon size="64" color="primary" class="mb-4">mdi-star</v-icon>
          <h3 class="text-h5 mb-3">Résultats Définitifs</h3>
          <p class="text-body-1 text-medium-emphasis">
            Épilation permanente après 6-8 séances personnalisées
          </p>
        </v-col>
        <v-col cols="12" md="3" class="text-center mb-6">
          <v-icon size="64" color="primary" class="mb-4">mdi-heart</v-icon>
          <h3 class="text-h5 mb-3">Confort Optimal</h3>
          <p class="text-body-1 text-medium-emphasis">
            Système de refroidissement intégré pour un confort maximal
          </p>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <!-- Section Technologie -->
  <section class="technology-section py-12" :style="{'background-image':'linear-gradient(180deg, rgba(255,255,255,.90), rgba(255,255,255,.90)), url(/images/laser6.jpg)'}">
    <v-container>
      <v-row class="align-center">
        <v-col cols="12" md="6">
          <h2 class="text-h3 text-md-h2 mb-6">Technologie de Pointe</h2>
          <p class="text-h6 text-medium-emphasis mb-6">
            Notre laser triple longueur d'onde révolutionnaire traite efficacement 
            tous les types de peau et de poils
          </p>
          <v-list class="bg-transparent">
            <v-list-item prepend-icon="mdi-check-circle" class="px-0">
              <v-list-item-title class="text-h6">Laser 755nm - Poils fins et clairs</v-list-item-title>
            </v-list-item>
            <v-list-item prepend-icon="mdi-check-circle" class="px-0">
              <v-list-item-title class="text-h6">Laser 810nm - Poils moyens et foncés</v-list-item-title>
            </v-list-item>
            <v-list-item prepend-icon="mdi-check-circle" class="px-0">
              <v-list-item-title class="text-h6">Laser 1064nm - Peaux mates et foncées</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-btn color="primary" size="large" variant="elevated" to="/about" class="mt-6">
            Découvrir notre technologie
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-img src="/images/laser6.jpg" height="500" cover class="rounded-lg" alt="Notre technologie laser triple longueur d'onde"/>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <v-container class="py-12">
    <v-row class="mb-8">
      <v-col cols="12" md="6">
        <h2 class="text-h4 mb-6">Qu'est-ce que l'épilation laser ?</h2>
        <p class="text-body-1 mb-4">
          L'épilation laser est une technique médicale qui utilise la lumière concentrée 
          pour cibler et détruire les follicules pileux. Contrairement aux méthodes 
          traditionnelles, elle offre des résultats permanents et durables.
        </p>
        <p class="text-body-1 mb-4">
          Notre laser triple longueur d'onde (755nm, 810nm, 1064nm) s'adapte à tous 
          les phototypes et types de poils, garantissant une efficacité optimale 
          pour chaque client.
        </p>
        <v-alert type="info" variant="tonal" class="mt-4">
          <strong>Évaluation gratuite :</strong> Consultation personnalisée et test de spot inclus
        </v-alert>
      </v-col>
      <v-col cols="12" md="6">
        <v-img src="/images/laser2.jpg" height="400" cover class="rounded-lg" alt="Épilation laser"/>
      </v-col>
    </v-row>

    <!-- Section Services -->
    <div class="mb-12">
      <div class="text-center mb-8">
        <div class="text-overline text-primary mb-2">Nos services</div>
        <h2 class="text-h3 text-md-h2 mb-4">Zones et forfaits</h2>
        <p class="text-h6 text-medium-emphasis">
          Épilation laser définitive pour toutes les zones du corps
        </p>
      </div>
      
      <v-row class="mb-8">
        <v-col cols="12" md="4" class="text-center mb-6">
          <v-img src="/images/laser3.jpg" height="300" cover class="rounded-lg mb-4" alt="Épilation visage"/>
          <h3 class="text-h5 mb-2">Visage</h3>
          <p class="text-body-2 text-medium-emphasis mb-3">
            Lèvre, menton, joues, sourcils
          </p>
          <v-chip variant="flat" color="primary" size="small">À partir de 25€</v-chip>
        </v-col>
        <v-col cols="12" md="4" class="text-center mb-6">
          <v-img src="/images/laser6.jpg" height="300" cover class="rounded-lg mb-4" alt="Épilation haut du corps"/>
          <h3 class="text-h5 mb-2">Haut du Corps</h3>
          <p class="text-body-2 text-medium-emphasis mb-3">
            Aisselles, bras, dos, poitrine
          </p>
          <v-chip variant="flat" color="primary" size="small">À partir de 65€</v-chip>
        </v-col>
        <v-col cols="12" md="4" class="text-center mb-6">
          <v-img src="/images/laser4.jpg" height="300" cover class="rounded-lg mb-4" alt="Épilation jambes et maillot"/>
          <h3 class="text-h5 mb-2">Jambes & Maillot</h3>
          <p class="text-body-2 text-medium-emphasis mb-3">
            Jambes complètes, zones intimes
          </p>
          <v-chip variant="flat" color="primary" size="small">À partir de 75€</v-chip>
        </v-col>
      </v-row>

      <!-- Tarifs détaillés -->
      <v-card class="pa-6" elevation="2">
        <h3 class="text-h5 mb-4">Tarifs détaillés par zone</h3>
        <div class="d-flex flex-wrap ga-6">
          <div v-for="g in svcs" :key="g.group" class="flex-grow-1" style="min-width:240px">
            <h4 class="text-h6 mb-3 text-primary">{{ g.group }}</h4>
            <div class="text-caption text-medium-emphasis mb-2">{{ g.desc }}</div>
            <div v-for="it in g.items.slice(0,4)" :key="it.label" class="d-flex justify-space-between text-body-2 py-1">
              <span>{{ it.label }}</span>
              <span><strong>{{ it.price }}</strong> €</span>
            </div>
          </div>
        </div>
        <div class="text-center mt-6">
          <v-btn color="primary" variant="elevated" to="/services" size="large">
            Voir tous nos tarifs
          </v-btn>
        </div>
      </v-card>
    </div>

    <!-- Section Témoignages -->
    <div class="mb-12">
      <div class="text-center mb-8">
        <h2 class="text-h3 text-md-h2 mb-4">Ce que disent nos clients</h2>
        <p class="text-h6 text-medium-emphasis">Plus de 5000 clients satisfaits depuis 2018</p>
      </div>
      
      <v-row>
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="pa-6 h-100" elevation="2">
            <div class="d-flex align-center mb-4">
              <v-avatar size="60" class="me-4">
                <img src="/avatars/a1.svg" alt="Marie L."/>
              </v-avatar>
              <div>
                <h3 class="text-h6 mb-1">Marie L.</h3>
                <div class="d-flex align-center">
                  <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                  <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                  <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                  <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                  <v-icon color="amber" size="20">mdi-star</v-icon>
                </div>
              </div>
            </div>
            <p class="text-body-1">
              "Après 6 séances, je suis enfin libérée de l'épilation quotidienne ! 
              L'équipe est professionnelle et attentionnée."
            </p>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="pa-6 h-100" elevation="2">
            <div class="d-flex align-center mb-4">
              <v-avatar size="60" class="me-4">
                <img src="/avatars/a2.svg" alt="Sophie M."/>
              </v-avatar>
              <div>
                <h3 class="text-h6 mb-1">Sophie M.</h3>
                <div class="d-flex align-center">
                  <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                  <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                  <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                  <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                  <v-icon color="amber" size="20">mdi-star</v-icon>
                </div>
              </div>
            </div>
            <p class="text-body-1">
              "Investissement qui en vaut vraiment la peine ! Après 8 séances, 
              mes jambes sont parfaitement lisses."
            </p>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="pa-6 h-100" elevation="2">
            <div class="d-flex align-center mb-4">
              <v-avatar size="60" class="me-4">
                <img src="/avatars/a3.svg" alt="Claire D."/>
              </v-avatar>
              <div>
                <h3 class="text-h6 mb-1">Claire D.</h3>
                <div class="d-flex align-center">
                  <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                  <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                  <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                  <v-icon color="amber" size="20" class="me-1">mdi-star</v-icon>
                  <v-icon color="amber" size="20">mdi-star</v-icon>
                </div>
              </div>
            </div>
            <p class="text-body-1">
              "Zone sensible traitée avec beaucoup de professionnalisme. 
              Les résultats sont exceptionnels !"
            </p>
          </v-card>
        </v-col>
      </v-row>
      
      <div class="text-center mt-6">
        <v-btn color="secondary" variant="elevated" to="/reviews" size="large">
          Lire tous les avis
        </v-btn>
      </div>
    </div>

    <!-- Section CTA finale -->
    <div class="text-center">
      <v-card class="pa-8" color="primary" theme="dark">
        <h2 class="text-h3 text-md-h2 mb-4">Prêt(e) à commencer votre transformation ?</h2>
        <p class="text-h6 mb-6">
          Prenez rendez-vous pour une consultation gratuite et personnalisée. 
          Notre équipe vous accompagne à chaque étape.
        </p>
        <v-btn size="x-large" color="white" variant="elevated" to="/booking" class="text-primary me-4">
          Prendre rendez-vous
        </v-btn>
        <v-btn size="x-large" color="white" variant="outlined" to="/contact" class="text-primary">
          Nous contacter
        </v-btn>
      </v-card>
    </div>
  </v-container>
</template>

<style scoped>
.full-hero {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 600px;
  display: flex;
  align-items: center;
  position: relative;
}

.btn-cta {
  display: inline-block;
  background: linear-gradient(45deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
  color: white;
  padding: 16px 32px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.btn-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(0,0,0,0.2);
}

.advantages-section {
  background-color: rgb(var(--v-theme-surface));
}

.technology-section {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
}

.v-list-item {
  min-height: auto;
  padding: 8px 0;
}

.h-100 {
  height: 100%;
}
</style>
