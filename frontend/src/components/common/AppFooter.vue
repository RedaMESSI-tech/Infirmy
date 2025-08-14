<template>
  <v-footer
    class="bg-surface-variant"
    :elevation="4"
  >
    <v-container>
      <v-row>
        <!-- Logo et description -->
        <v-col cols="12" md="4" class="mb-6 mb-md-0">
          <div class="d-flex align-center mb-4">
            <v-icon
              icon="mdi-heart-pulse"
              color="primary"
              size="32"
              class="me-3"
            />
            <span class="text-h5 font-weight-bold text-primary">Infirmy</span>
          </div>
          <p class="text-body-2 text-medium-emphasis mb-4">
            {{ $t('footer.description') }}
          </p>
          <div class="d-flex">
            <v-btn
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              :icon="social.icon"
              variant="text"
              size="small"
              class="me-2"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </v-col>

        <!-- Liens rapides -->
        <v-col cols="12" sm="6" md="2" class="mb-6 mb-md-0">
          <h3 class="text-h6 font-weight-bold mb-4">{{ $t('footer.quickLinks') }}</h3>
          <v-list class="bg-transparent pa-0">
            <v-list-item
              v-for="link in quickLinks"
              :key="link.path"
              :to="link.path"
              :title="link.title"
              variant="text"
              density="compact"
              class="pa-0 mb-2"
            />
          </v-list>
        </v-col>

        <!-- Services -->
        <v-col cols="12" sm="6" md="2" class="mb-6 mb-md-0">
          <h3 class="text-h6 font-weight-bold mb-4">{{ $t('footer.services') }}</h3>
          <v-list class="bg-transparent pa-0">
            <v-list-item
              v-for="service in services"
              :key="service.path"
              :to="service.path"
              :title="service.title"
              variant="text"
              density="compact"
              class="pa-0 mb-2"
            />
          </v-list>
        </v-col>

        <!-- Support -->
        <v-col cols="12" sm="6" md="2" class="mb-6 mb-md-0">
          <h3 class="text-h6 font-weight-bold mb-4">{{ $t('footer.support') }}</h3>
          <v-list class="bg-transparent pa-0">
            <v-list-item
              v-for="support in supportLinks"
              :key="support.path"
              :to="support.path"
              :title="support.title"
              variant="text"
              density="compact"
              class="pa-0 mb-2"
            />
          </v-list>
        </v-col>

        <!-- Contact -->
        <v-col cols="12" sm="6" md="2" class="mb-6 mb-md-0">
          <h3 class="text-h6 font-weight-bold mb-4">{{ $t('footer.contact') }}</h3>
          <div class="text-body-2 text-medium-emphasis">
            <div class="d-flex align-center mb-2">
              <v-icon icon="mdi-email" size="16" class="me-2" />
              <a href="mailto:contact@infirmy.com" class="text-decoration-none">
                contact@infirmy.com
              </a>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon icon="mdi-phone" size="16" class="me-2" />
              <a href="tel:+33123456789" class="text-decoration-none">
                +33 1 23 45 67 89
              </a>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon icon="mdi-clock" size="16" class="me-2" />
              {{ $t('footer.businessHours') }}
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Séparateur -->
      <v-divider class="my-6" />

      <!-- Pied de page -->
      <v-row align="center" justify="space-between">
        <v-col cols="12" sm="6" class="text-center text-sm-left">
          <p class="text-body-2 text-medium-emphasis mb-0">
            © {{ new Date().getFullYear() }} Infirmy. {{ $t('footer.allRightsReserved') }}
          </p>
        </v-col>
        <v-col cols="12" sm="6" class="text-center text-sm-right">
          <div class="d-flex justify-center justify-sm-end">
            <v-btn
              v-for="legal in legalLinks"
              :key="legal.path"
              :to="legal.path"
              variant="text"
              size="small"
              class="text-caption"
            >
              {{ legal.title }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">import { useI18n } from 'vue-i18n'
const { t } = useI18n()


// Liens et données
const socialLinks = [
  { name: 'Facebook', url: 'https://facebook.com/infirmy', icon: 'mdi-facebook' },
  { name: 'Twitter', url: 'https://twitter.com/infirmy', icon: 'mdi-twitter' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/infirmy', icon: 'mdi-linkedin' },
  { name: 'Instagram', url: 'https://instagram.com/infirmy', icon: 'mdi-instagram' }
]

const quickLinks = [
  { path: '/', title: t('navigation.home') },
  { path: '/search', title: t('navigation.search') },
  { path: '/about', title: t('navigation.about') },
  { path: '/contact', title: t('navigation.contact') }
]

const services = [
  { path: '/search', title: t('footer.findNurse') },
  { path: '/nurse/join', title: t('footer.joinAsNurse') },
  { path: '/pricing', title: t('footer.pricing') },
  { path: '/faq', title: t('footer.faq') }
]

const supportLinks = [
  { path: '/help', title: t('footer.helpCenter') },
  { path: '/contact', title: t('footer.contactUs') },
  { path: '/status', title: t('footer.systemStatus') },
  { path: '/feedback', title: t('footer.feedback') }
]

const legalLinks = [
  { path: '/legal', title: t('navigation.legal') },
  { path: '/privacy', title: t('navigation.privacy') },
  { path: '/terms', title: t('footer.termsOfService') },
  { path: '/cookies', title: t('footer.cookiePolicy') }
]
</script>

<style scoped>
.v-footer {
  border-top: 1px solid rgb(var(--v-border-color));
}

.v-list-item {
  min-height: 32px;
}

.v-list-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.1);
  border-radius: 4px;
}
</style>
