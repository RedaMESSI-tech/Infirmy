<template>
  <div class="faq-page">
    <!-- Hero Section -->
    <section class="hero-section" :style="{'background-image':'linear-gradient(180deg, rgba(255,255,255,.80), rgba(255,255,255,.80)), url(/images/laser2.jpg)'}">
      <v-container class="text-center py-16">
        <h1 class="text-h2 text-md-h1 mb-4">Questions Fréquentes</h1>
        <p class="text-h6 text-medium-emphasis">Tout ce que vous devez savoir sur l'épilation laser</p>
      </v-container>
    </section>

    <v-container class="py-12">
      <!-- Introduction -->
      <v-row class="mb-8">
        <v-col cols="12" class="text-center">
          <p class="text-body-1 text-medium-emphasis">
            Vous avez des questions sur l'épilation laser ? Nous avons les réponses ! 
            Consultez notre FAQ ou contactez-nous pour plus d'informations.
          </p>
        </v-col>
      </v-row>

      <!-- FAQ Sections -->
      <v-row>
        <v-col cols="12" md="8">
          <!-- Sécurité et Risques -->
          <v-expansion-panels variant="accordion" class="mb-8">
            <h2 class="text-h4 mb-4">Sécurité et Risques</h2>
            
            <v-expansion-panel>
              <v-expansion-panel-title>
                <span class="text-h6">L'épilation laser est-elle sûre ?</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1 mb-3">
                  Oui, l'épilation laser est une procédure sûre lorsqu'elle est effectuée par des professionnels qualifiés. 
                  Notre équipe est formée et certifiée, et nous utilisons des équipements médicaux de dernière génération.
                </p>
                <p class="text-body-1">
                  <strong>Points de sécurité :</strong>
                </p>
                <ul class="text-body-2">
                  <li>Consultation préalable obligatoire</li>
                  <li>Test de spot pour évaluer la réaction de votre peau</li>
                  <li>Protocoles adaptés à votre phototype</li>
                  <li>Équipements certifiés CE médical</li>
                </ul>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title>
                <span class="text-h6">Quels sont les risques potentiels ?</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1 mb-3">
                  Les risques sont minimes mais peuvent inclure :
                </p>
                <ul class="text-body-2">
                  <li>Rougeur temporaire (disparaît en quelques heures)</li>
                  <li>Gonflement léger (normal et temporaire)</li>
                  <li>Changement de pigmentation temporaire (rare)</li>
                  <li>Brûlure superficielle (extrêmement rare avec nos protocoles)</li>
                </ul>
                <p class="text-body-1 mt-3">
                  <strong>Important :</strong> Nous respectons strictement les contre-indications 
                  et adaptons les paramètres à votre peau pour minimiser tout risque.
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title>
                <span class="text-h6">Y a-t-il des contre-indications ?</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1 mb-3">
                  Oui, certaines conditions peuvent contre-indiquer l'épilation laser :
                </p>
                <ul class="text-body-2">
                  <li>Grossesse et allaitement</li>
                  <li>Maladies auto-immunes actives</li>
                  <li>Prise de certains médicaments photosensibilisants</li>
                  <li>Peau bronzée récemment</li>
                  <li>Certaines maladies de peau</li>
                  <li>Antécédents de cancer de la peau</li>
                </ul>
                <p class="text-body-1 mt-3">
                  <strong>Solution :</strong> Notre consultation préalable permet d'identifier 
                  ces contre-indications et de proposer des alternatives si nécessaire.
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- Douleur et Confort -->
          <v-expansion-panels variant="accordion" class="mb-8">
            <h2 class="text-h4 mb-4">Douleur et Confort</h2>
            
            <v-expansion-panel>
              <v-expansion-panel-title>
                <span class="text-h6">L'épilation laser fait-elle mal ?</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1 mb-3">
                  La sensation varie selon les personnes et les zones traitées. 
                  La plupart de nos clients décrivent une sensation de picotement ou de chaleur légère.
                </p>
                <p class="text-body-1">
                  <strong>Pour votre confort :</strong>
                </p>
                <ul class="text-body-2">
                  <li>Système de refroidissement intégré</li>
                  <li>Paramètres adaptés à votre sensibilité</li>
                  <li>Crème anesthésiante disponible si nécessaire</li>
                  <li>Technique de traitement optimisée</li>
                </ul>
                <p class="text-body-1 mt-3">
                  <strong>Comparaison :</strong> Moins douloureux que l'épilation à la cire, 
                  et la séance dure seulement quelques minutes.
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title>
                <span class="text-h6">Comment réduire l'inconfort ?</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1 mb-3">
                  Plusieurs techniques permettent de minimiser l'inconfort :
                </p>
                <ul class="text-body-2">
                  <li>Arrêter l'épilation à la cire 4-6 semaines avant</li>
                  <li>Éviter l'exposition au soleil avant la séance</li>
                  <li>Hydrater régulièrement la peau</li>
                  <li>Prendre un antalgique léger si nécessaire</li>
                  <li>Respecter les conseils pré-séance</li>
                </ul>
                <p class="text-body-1 mt-3">
                  <strong>Pendant la séance :</strong> Notre équipe vous guide et s'adapte 
                  à votre niveau de confort en temps réel.
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- Nombre de Séances -->
          <v-expansion-panels variant="accordion" class="mb-8">
            <h2 class="text-h4 mb-4">Nombre de Séances et Résultats</h2>
            
            <v-expansion-panel>
              <v-expansion-panel-title>
                <span class="text-h6">Combien de séances sont nécessaires ?</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1 mb-3">
                  Le nombre de séances varie selon plusieurs facteurs :
                </p>
                <ul class="text-body-2">
                  <li><strong>Zone traitée :</strong> Visage (6-8 séances), Corps (6-10 séances)</li>
                  <li><strong>Type de poils :</strong> Poils fins (plus de séances), Poils épais (moins de séances)</li>
                  <li><strong>Phototype :</strong> Peaux claires (moins de séances), Peaux mates (plus de séances)</li>
                  <li><strong>Hormones :</strong> Facteurs hormonaux peuvent influencer</li>
                </ul>
                <p class="text-body-1 mt-3">
                  <strong>Moyenne générale :</strong> 6-8 séances espacées de 4-8 semaines 
                  selon la zone et la croissance de vos poils.
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title>
                <span class="text-h6">Pourquoi plusieurs séances sont-elles nécessaires ?</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1 mb-3">
                  Les poils poussent par cycles et le laser ne peut traiter que les poils en phase active (anagène) :
                </p>
                <ul class="text-body-2">
                  <li><strong>Phase anagène :</strong> Poil actif, visible à la surface</li>
                  <li><strong>Phase catagène :</strong> Poil en transition</li>
                  <li><strong>Phase télogène :</strong> Poil mort, prêt à tomber</li>
                </ul>
                <p class="text-body-1 mt-3">
                  <strong>Explication :</strong> À chaque séance, nous traitons les poils actifs. 
                  Les séances suivantes ciblent les nouveaux poils qui entrent en phase active, 
                  garantissant une épilation progressive et définitive.
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title>
                <span class="text-h6">Quand verrai-je les premiers résultats ?</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1 mb-3">
                  Les résultats apparaissent progressivement :
                </p>
                <ul class="text-body-2">
                  <li><strong>Après la 1ère séance :</strong> Réduction de 20-30% des poils</li>
                  <li><strong>Après la 3ème séance :</strong> Réduction de 50-60% des poils</li>
                  <li><strong>Après la 6ème séance :</strong> Réduction de 80-90% des poils</li>
                  <li><strong>Après la 8ème séance :</strong> Résultats définitifs</li>
                </ul>
                <p class="text-body-1 mt-3">
                  <strong>Important :</strong> Les résultats varient selon les individus. 
                  Certains voient des améliorations dès la première séance, d'autres après la troisième.
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- Préparation et Soins -->
          <v-expansion-panels variant="accordion" class="mb-8">
            <h2 class="text-h4 mb-4">Préparation et Soins</h2>
            
            <v-expansion-panel>
              <v-expansion-panel-title>
                <span class="text-h6">Comment me préparer avant une séance ?</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1 mb-3">
                  Voici nos recommandations pour une séance optimale :
                </p>
                <ul class="text-body-2">
                  <li><strong>4-6 semaines avant :</strong> Arrêter l'épilation à la cire</li>
                  <li><strong>2 semaines avant :</strong> Éviter l'exposition au soleil</li>
                  <li><strong>1 semaine avant :</strong> Arrêter les crèmes dépilatoires</li>
                  <li><strong>24h avant :</strong> Éviter l'alcool et les anticoagulants</li>
                  <li><strong>Le jour même :</strong> Arriver sans maquillage sur la zone</li>
                </ul>
                <p class="text-body-1 mt-3">
                  <strong>Rappel :</strong> Nous vous remettons un guide complet de préparation 
                  lors de votre consultation.
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title>
                <span class="text-h6">Quels soins après la séance ?</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1 mb-3">
                  Les soins post-séance sont essentiels pour optimiser les résultats :
                </p>
                <ul class="text-body-2">
                  <li><strong>Immédiatement :</strong> Appliquer de la glace si nécessaire</li>
                  <li><strong>24-48h :</strong> Éviter l'eau chaude et le sport</li>
                  <li><strong>1 semaine :</strong> Éviter l'exposition au soleil</li>
                  <li><strong>Hydratation :</strong> Crème hydratante recommandée</li>
                  <li><strong>Protection :</strong> Écran solaire SPF 50+ obligatoire</li>
                </ul>
                <p class="text-body-1 mt-3">
                  <strong>Suivi :</strong> Nous vous contactons 48h après la séance 
                  pour vérifier que tout se passe bien.
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- Coût et Paiement -->
          <v-expansion-panels variant="accordion" class="mb-8">
            <h2 class="text-h4 mb-4">Coût et Paiement</h2>
            
            <v-expansion-panel>
              <v-expansion-panel-title>
                <span class="text-h6">Combien coûte l'épilation laser ?</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1 mb-3">
                  Nos tarifs varient selon la zone traitée :
                </p>
                <ul class="text-body-2">
                  <li><strong>Zones petites :</strong> 25€ - 75€ (lèvre, menton, aisselles)</li>
                  <li><strong>Zones moyennes :</strong> 85€ - 150€ (bras, jambes, maillot)</li>
                  <li><strong>Zones grandes :</strong> 180€ - 250€ (jambes complètes, dos)</li>
                </ul>
                <p class="text-body-1 mt-3">
                  <strong>Économies :</strong> Nos forfaits permettent d'économiser jusqu'à 25% 
                  sur le coût total. Consultez notre page Services pour tous les tarifs.
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title>
                <span class="text-h6">Quels moyens de paiement acceptez-vous ?</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1 mb-3">
                  Nous acceptons tous les moyens de paiement courants :
                </p>
                <ul class="text-body-2">
                  <li>Espèces</li>
                  <li>Cartes bancaires (Visa, Mastercard, American Express)</li>
                  <li>Chèques</li>
                  <li>Virements bancaires</li>
                  <li>Paiement en plusieurs fois possible</li>
                </ul>
                <p class="text-body-1 mt-3">
                  <strong>Facilités :</strong> Possibilité de payer à chaque séance 
                  ou de souscrire à un forfait avec paiement échelonné.
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>

        <!-- Sidebar -->
        <v-col cols="12" md="4">
          <v-card class="pa-6 mb-6" color="primary" theme="dark">
            <h3 class="text-h6 mb-4">Besoin d'aide ?</h3>
            <p class="text-body-2 mb-4">
              Vous ne trouvez pas la réponse à votre question ? 
              Notre équipe est là pour vous aider.
            </p>
            <v-btn color="white" variant="elevated" to="/contact" class="text-primary">
              Nous contacter
            </v-btn>
          </v-card>

          <v-card class="pa-6 mb-6">
            <h3 class="text-h6 mb-4">Informations utiles</h3>
            <v-list class="bg-transparent">
              <v-list-item prepend-icon="mdi-clock" class="px-0">
                <v-list-item-title class="text-body-2">Consultation gratuite</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-shield-check" class="px-0">
                <v-list-item-title class="text-body-2">Test de spot gratuit</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-account-group" class="px-0">
                <v-list-item-title class="text-body-2">Équipe certifiée</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-medical-bag" class="px-0">
                <v-list-item-title class="text-body-2">Équipements médicaux</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>

          <v-card class="pa-6">
            <h3 class="text-h6 mb-4">Téléchargements</h3>
            <v-list class="bg-transparent">
              <v-list-item prepend-icon="mdi-file-pdf" class="px-0">
                <v-list-item-title class="text-body-2">Guide de préparation</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-file-pdf" class="px-0">
                <v-list-item-title class="text-body-2">Conseils post-séance</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-file-pdf" class="px-0">
                <v-list-item-title class="text-body-2">Tarifs complets</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <!-- CTA Section -->
      <v-row class="text-center mt-12">
        <v-col cols="12">
          <v-card class="pa-8" color="secondary" theme="dark">
            <h3 class="text-h4 mb-4">Prêt(e) à commencer votre transformation ?</h3>
            <p class="text-h6 mb-6">Prenez rendez-vous pour une consultation gratuite et toutes vos questions seront répondues</p>
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
// Page FAQ avec questions fréquentes enrichies
</script>

<style scoped>
.faq-page {
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

.v-expansion-panel-title {
  font-weight: 600;
}

.v-expansion-panel-text {
  padding: 16px 0;
}
</style>
