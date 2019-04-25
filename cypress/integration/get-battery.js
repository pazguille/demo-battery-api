// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

context('navigator.getBattery', () => {
  // for these tests, return the same mock battery status
  const mockBatteryInfo = {
    level: 0.75,
    charging: true,
    chargingTime: 1800, // seconds
    dischargingTime: Infinity,
    addEventListener: () => {}
  }

  it('shows battery status of 75%', function () {
    cy.visit('/', {
      onBeforeLoad (win) {
        // application tries navigator.battery first
        // so we delete this method
        delete win.navigator.battery
        // then the app tries navigator.getBattery
        win.navigator.getBattery = () => Promise.resolve(mockBatteryInfo)
      }
    })
    // check the display
    cy.contains('.battery-percentage', '75%').should('be.visible')
    cy.contains('.battery-status', 'Adapter').should('be.visible')
    cy.contains('.battery-fully', '0:30').should('be.visible')
  })

  it('calls navigator.getBattery', function () {
    cy.visit('/', {
      onBeforeLoad (win) {
        delete win.navigator.battery
        // we can create Cypress stub and check
        // that is is really being called by the application code
        win.navigator.getBattery = cy
          .stub()
          .resolves(mockBatteryInfo)
          .as('getBattery')
      }
    })
    cy.contains('.battery-percentage', '75%').should('be.visible')
    // ensure our stub has been called by the application
    cy.get('@getBattery').should('have.been.calledOnce')
  })
})
