// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

it('shows battery status', function () {
  cy.visit('/')
  // shows the actual battery percentage
  // we can only assert that the percentage is visible,
  // but not its value
  cy.get('.battery-percentage').should('be.visible')
})
