// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Déclaration des types pour les commandes personnalisées
declare global {
  namespace Cypress {
    interface Chainable {
      interceptApi(method: string, path: string, response: any): Chainable<void>
      login(email: string, password: string): Chainable<void>
      logout(): Chainable<void>
      shouldBeLoggedIn(): Chainable<void>
      shouldBeLoggedOut(): Chainable<void>
      waitForLoading(): Chainable<void>
      shouldShowError(message: string): Chainable<void>
      shouldShowSuccess(message: string): Chainable<void>
    }
  }
}

// Commande pour intercepter les requêtes API
Cypress.Commands.add('interceptApi', (method: string, path: string, response: any) => {
  cy.intercept(method, `${Cypress.env('apiUrl')}${path}`, response)
})

// Commande pour la connexion
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login')
  cy.get('[data-cy=email-input]').type(email)
  cy.get('[data-cy=password-input]').type(password)
  cy.get('[data-cy=login-button]').click()
  cy.url().should('not.include', '/login')
})

// Commande pour la déconnexion
Cypress.Commands.add('logout', () => {
  cy.get('[data-cy=user-menu]').click()
  cy.get('[data-cy=logout-button]').click()
  cy.url().should('include', '/')
})

// Commande pour vérifier l'état de connexion
Cypress.Commands.add('shouldBeLoggedIn', () => {
  cy.get('[data-cy=user-menu]').should('be.visible')
})

// Commande pour vérifier l'état de déconnexion
Cypress.Commands.add('shouldBeLoggedOut', () => {
  cy.get('[data-cy=login-button]').should('be.visible')
})

// Commande pour attendre le chargement
Cypress.Commands.add('waitForLoading', () => {
  cy.get('[data-cy=loading]').should('not.exist')
})

// Commande pour vérifier les messages d'erreur
Cypress.Commands.add('shouldShowError', (message: string) => {
  cy.get('[data-cy=error-message]').should('contain', message)
})

// Commande pour vérifier les messages de succès
Cypress.Commands.add('shouldShowSuccess', (message: string) => {
  cy.get('[data-cy=success-message]').should('contain', message)
})

export {}
