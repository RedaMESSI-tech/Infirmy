// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Configuration globale pour Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
  // Empêcher Cypress de s'arrêter sur les erreurs non gérées
  return false
})

// Intercepter les requêtes API pour les mocks
Cypress.Commands.add('interceptApi', (method: string, path: string, response: any) => {
  cy.intercept(method, `${Cypress.env('apiUrl')}${path}`, response)
})

// Commande personnalisée pour la connexion
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login')
  cy.get('[data-cy=email-input]').type(email)
  cy.get('[data-cy=password-input]').type(password)
  cy.get('[data-cy=login-button]').click()
  cy.url().should('not.include', '/login')
})

// Commande personnalisée pour la déconnexion
Cypress.Commands.add('logout', () => {
  cy.get('[data-cy=user-menu]').click()
  cy.get('[data-cy=logout-button]').click()
  cy.url().should('include', '/')
})

// Commande personnalisée pour vérifier l'état de connexion
Cypress.Commands.add('shouldBeLoggedIn', () => {
  cy.get('[data-cy=user-menu]').should('be.visible')
})

// Commande personnalisée pour vérifier l'état de déconnexion
Cypress.Commands.add('shouldBeLoggedOut', () => {
  cy.get('[data-cy=login-button]').should('be.visible')
})

// Commande personnalisée pour attendre le chargement
Cypress.Commands.add('waitForLoading', () => {
  cy.get('[data-cy=loading]').should('not.exist')
})

// Commande personnalisée pour vérifier les messages d'erreur
Cypress.Commands.add('shouldShowError', (message: string) => {
  cy.get('[data-cy=error-message]').should('contain', message)
})

// Commande personnalisée pour vérifier les messages de succès
Cypress.Commands.add('shouldShowSuccess', (message: string) => {
  cy.get('[data-cy=success-message]').should('contain', message)
})
