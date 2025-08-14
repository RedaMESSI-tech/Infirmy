<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="hero-section" :style="{'background-image':'linear-gradient(180deg, rgba(255,255,255,.80), rgba(255,255,255,.80)), url(/images/laser1.jpg)'}">
      <v-container class="text-center py-16">
        <h1 class="text-h2 text-md-h1 mb-4">Contactez-nous</h1>
        <p class="text-h6 text-medium-emphasis">Notre équipe est là pour répondre à toutes vos questions</p>
      </v-container>
    </section>

    <v-container class="py-12">
      <v-row>
        <!-- Informations de contact -->
        <v-col cols="12" md="4" class="mb-8">
          <v-card class="pa-6 h-100" elevation="2">
            <h2 class="text-h4 mb-6">Nos Coordonnées</h2>
            
            <div class="contact-info">
              <!-- Adresse -->
              <div class="d-flex align-center mb-6">
                <v-icon size="32" color="primary" class="me-4">mdi-map-marker</v-icon>
                <div>
                  <h3 class="text-h6 mb-2">Adresse</h3>
                  <p class="text-body-1">
                    123 Avenue des Champs<br>
                    75008 Paris, France
                  </p>
                </div>
              </div>

              <!-- Téléphone -->
              <div class="d-flex align-center mb-6">
                <v-icon size="32" color="primary" class="me-4">mdi-phone</v-icon>
                <div>
                  <h3 class="text-h6 mb-2">Téléphone</h3>
                  <p class="text-body-1">
                    <a href="tel:+33123456789" class="text-decoration-none">01 23 45 67 89</a>
                  </p>
                </div>
              </div>

              <!-- Email -->
              <div class="d-flex align-center mb-6">
                <v-icon size="32" color="primary" class="me-4">mdi-email</v-icon>
                <div>
                  <h3 class="text-h6 mb-2">Email</h3>
                  <p class="text-body-1">
                    <a href="mailto:contact@velorialaser.fr" class="text-decoration-none">contact@velorialaser.fr</a>
                  </p>
                </div>
              </div>

              <!-- Horaires -->
              <div class="d-flex align-center mb-6">
                <v-icon size="32" color="primary" class="me-4">mdi-clock</v-icon>
                <div>
                  <h3 class="text-h6 mb-2">Horaires d'ouverture</h3>
                  <p class="text-body-1">
                    <strong>Lundi - Vendredi :</strong><br>
                    9h00 - 19h00<br>
                    <strong>Samedi :</strong><br>
                    9h00 - 17h00<br>
                    <strong>Dimanche :</strong><br>
                    Fermé
                  </p>
                </div>
              </div>

              <!-- Urgences -->
              <div class="d-flex align-center">
                <v-icon size="32" color="error" class="me-4">mdi-alert</v-icon>
                <div>
                  <h3 class="text-h6 mb-2">Urgences</h3>
                  <p class="text-body-1">
                    En cas d'urgence, contactez votre médecin traitant ou le 15
                  </p>
                </div>
              </div>
            </div>

            <!-- Réseaux sociaux -->
            <div class="mt-8">
              <h3 class="text-h6 mb-4">Suivez-nous</h3>
              <div class="d-flex gap-3">
                <v-btn icon color="primary" variant="outlined" size="large">
                  <v-icon>mdi-facebook</v-icon>
                </v-btn>
                <v-btn icon color="primary" variant="outlined" size="large">
                  <v-icon>mdi-instagram</v-icon>
                </v-btn>
                <v-btn icon color="primary" variant="outlined" size="large">
                  <v-icon>mdi-linkedin</v-icon>
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>

        <!-- Formulaire de contact -->
        <v-col cols="12" md="8" class="mb-8">
          <v-card class="pa-6" elevation="2">
            <h2 class="text-h4 mb-6">Envoyez-nous un message</h2>
            
            <v-form ref="contactForm" v-model="valid">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="contact.firstName"
                    label="Prénom *"
                    variant="outlined"
                    required
                    class="mb-4"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="contact.lastName"
                    label="Nom *"
                    variant="outlined"
                    required
                    class="mb-4"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="contact.email"
                    label="Email *"
                    type="email"
                    variant="outlined"
                    required
                    class="mb-4"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="contact.phone"
                    label="Téléphone"
                    variant="outlined"
                    class="mb-4"
                  />
                </v-col>
              </v-row>

              <v-select
                v-model="contact.subject"
                :items="contactSubjects"
                label="Sujet *"
                variant="outlined"
                required
                class="mb-4"
              />

              <v-textarea
                v-model="contact.message"
                label="Message *"
                variant="outlined"
                rows="6"
                required
                class="mb-4"
                placeholder="Décrivez votre demande, posez vos questions..."
              />

              <!-- Checkbox consentement -->
              <v-checkbox
                v-model="contact.consent"
                label="J'accepte que mes données soient traitées pour répondre à ma demande *"
                required
                class="mb-6"
              />

              <v-btn
                color="primary"
                size="large"
                variant="elevated"
                @click="submitContact"
                :loading="loading"
                :disabled="!valid || !contact.consent"
                class="mb-4"
              >
                Envoyer le message
              </v-btn>

              <v-alert
                v-if="contactMessage"
                :type="contactMessage.type"
                variant="tonal"
                class="mb-4"
              >
                {{ contactMessage.text }}
              </v-alert>
            </v-form>
          </v-card>
        </v-col>
      </v-row>

      <!-- Carte interactive -->
      <v-row class="mb-12">
        <v-col cols="12">
          <v-card class="pa-6" elevation="2">
            <h2 class="text-h4 mb-6">Notre localisation</h2>
            
            <div class="map-container">
              <!-- Carte Google Maps intégrée -->
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.2945!3d48.8584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzMwLjIiTiAywrAxNyc0MC4yIkU!5e0!3m2!1sfr!2sfr!4v1234567890"
                width="100%"
                height="450"
                style="border:0; border-radius: 8px;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Veloria Laser - Centre d'épilation laser à Paris"
              ></iframe>
            </div>

            <!-- Informations de transport -->
            <v-row class="mt-6">
              <v-col cols="12" md="4">
                <div class="d-flex align-center mb-3">
                  <v-icon size="24" color="primary" class="me-3">mdi-train</v-icon>
                  <div>
                    <h3 class="text-h6 mb-2">Métro</h3>
                    <p class="text-body-2">Ligne 1 - Station Champs-Élysées</p>
                    <p class="text-body-2">Ligne 9 - Station Franklin D. Roosevelt</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="d-flex align-center mb-3">
                  <v-icon size="24" color="primary" class="me-3">mdi-bus</v-icon>
                  <div>
                    <h3 class="text-h6 mb-2">Bus</h3>
                    <p class="text-body-2">Lignes 28, 32, 42, 73, 80</p>
                    <p class="text-body-2">Arrêt Champs-Élysées</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="d-flex align-center mb-3">
                  <v-icon size="24" color="primary" class="me-3">mdi-car</v-icon>
                  <div>
                    <h3 class="text-h6 mb-2">Parking</h3>
                    <p class="text-body-2">Parking Champs-Élysées</p>
                    <p class="text-body-2">Gratuit pour nos clients</p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- FAQ rapide -->
      <v-row class="mb-12">
        <v-col cols="12">
          <v-card class="pa-6" color="primary" theme="dark">
            <h2 class="text-h4 mb-6">Questions fréquentes</h2>
            <v-row>
              <v-col cols="12" md="6">
                <v-expansion-panels variant="accordion">
                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      <span class="text-h6">Comment prendre rendez-vous ?</span>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <p class="text-body-2">
                        Vous pouvez prendre rendez-vous directement sur notre site, 
                        par téléphone ou en nous envoyant un message via ce formulaire.
                      </p>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                  
                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      <span class="text-h6">Quels sont vos horaires ?</span>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <p class="text-body-2">
                        Nous sommes ouverts du lundi au vendredi de 9h à 19h, 
                        le samedi de 9h à 17h. Fermé le dimanche.
                      </p>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-expansion-panels variant="accordion">
                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      <span class="text-h6">Faut-il une ordonnance ?</span>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <p class="text-body-2">
                        Non, l'épilation laser est une procédure esthétique qui 
                        ne nécessite pas d'ordonnance médicale.
                      </p>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                  
                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      <span class="text-h6">Combien coûte une consultation ?</span>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <p class="text-body-2">
                        La première consultation est gratuite pour tous nos nouveaux clients. 
                        Elle inclut un test de spot gratuit.
                      </p>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- CTA Section -->
      <v-row class="text-center">
        <v-col cols="12">
          <v-card class="pa-8" color="secondary" theme="dark">
            <h3 class="text-h4 mb-4">Prêt(e) à commencer votre transformation ?</h3>
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
import { ref } from 'vue'

// État du formulaire
const contactForm = ref(null)
const valid = ref(false)
const loading = ref(false)

// Données de contact
const contact = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false
})

// Messages
const contactMessage = ref(null)

// Sujets de contact
const contactSubjects = [
  'Demande d\'information',
  'Prise de rendez-vous',
  'Question sur les tarifs',
  'Question technique',
  'Réclamation',
  'Autre'
]

// Méthodes
async function submitContact() {
  if (!contactForm.value.validate()) return
  
  loading.value = true
  
  try {
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    contactMessage.value = {
      type: 'success',
      text: 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
    }
    
    // Reset form
    contact.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      consent: false
    }
    
  } catch (error) {
    contactMessage.value = {
      type: 'error',
      text: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter par téléphone.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.contact-page {
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

.contact-info {
  margin-bottom: 2rem;
}

.map-container {
  position: relative;
  width: 100%;
  height: 450px;
  border-radius: 8px;
  overflow: hidden;
}

.h-100 {
  height: 100%;
}

.v-expansion-panel-title {
  font-weight: 600;
}

.v-expansion-panel-text {
  padding: 16px 0;
}
</style>
