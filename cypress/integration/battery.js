// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

context('navigator.battery', () => {
  it('shows battery status of 50%', function () {
    cy.visit('/', {
      onBeforeLoad (win) {
        // mock "navigator.battery" property
        // returning mock charge object
        win.navigator.battery = {
          level: 0.5,
          charging: false,
          chargingTime: Infinity,
          dischargingTime: 3600, // seconds
          addEventListener: () => {}
        }
      }
    })

    // now we can assert actual text - we are charged at 50%
    cy.get('.battery-percentage')
      .should('be.visible')
      .and('have.text', '50%')

    // not charging means running on battery
    cy.contains('.battery-status', 'Battery').should('be.visible')
    // and has enough juice for 1 hour
    cy.contains('.battery-remaining', '1:00').should('be.visible')
  })
})
