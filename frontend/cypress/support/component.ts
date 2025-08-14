// Import commands.js using ES2015 syntax:
import './commands'

// Configuration pour les tests de composants
import { mount } from 'cypress/vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import vuetify from '@/plugins/vuetify'
import i18n from '@/plugins/i18n'

// Configuration globale pour les tests de composants
Cypress.Commands.add('mount', (component, options = {}) => {
  const pinia = createPinia()
  
  // Router mock pour les tests de composants
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' } },
      { path: '/login', component: { template: '<div>Login</div>' } },
      { path: '/register', component: { template: '<div>Register</div>' } }
    ]
  })

  return mount(component, {
    global: {
      plugins: [pinia, router, vuetify, i18n],
      stubs: {
        'router-link': true,
        'router-view': true
      }
    },
    ...options
  })
})

// Commande pour tester les composants avec des données mock
Cypress.Commands.add('mountWithData', (component, data = {}, options = {}) => {
  return cy.mount(component, {
    props: data,
    ...options
  })
})

// Commande pour tester les composants avec des stores mock
Cypress.Commands.add('mountWithStore', (component, storeData = {}, options = {}) => {
  const pinia = createPinia()
  
  // Mock des stores si nécessaire
  if (storeData.auth) {
    // Mock du store d'authentification
  }
  
  return cy.mount(component, {
    global: {
      plugins: [pinia, vuetify, i18n]
    },
    ...options
  })
})

export {}
