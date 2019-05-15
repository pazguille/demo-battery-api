// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

// skipping because the app crashes when there is no battery set
context('no battery', () => {
  // this test fails on purpose
  it.skip('just deleting properties does not work', () => {
    cy.visit('/', {
      onBeforeLoad (win) {
        delete win.navigator.battery

        // how to delete navigator.getBattery method?
        // deleting does not work
        delete win.navigator.getBattery
      }
    })

    // navigator.battery was deleted successfully
    cy.window()
      .its('navigator.battery')
      .should('be.undefined')

    // but navigator.getBattery happily remains there
    cy.window()
      .its('navigator.getBattery')
      .should('be.undefined')
  })

  it('overriding getBattery works', () => {
    cy.visit('/', {
      onBeforeLoad (win) {
        delete win.navigator.battery

        // how to delete navigator.getBattery method?
        // deleting does not work
        // but we can just overwrite it with undefined!
        Object.defineProperty(win.navigator, 'getBattery', {
          value: undefined
        })
      }
    })

    // navigator.battery was deleted successfully
    cy.window()
      .its('navigator.battery')
      .should('be.undefined')

    // navigator.getBattery is "deleted"
    cy.window()
      .its('navigator.getBattery')
      .should('be.undefined')
  })

  it('should not crash', () => {
    // but the application does crash
    // if both navigator.battery and navigator.getBattery
    // methods are missing

    // Uncaught TypeError: Cannot read property 'addEventListener' of undefined
    //
    // window.onload = function () {
    //   battery.addEventListener('chargingchange', function () {
    //     readBattery()
    //   })
    //   ...

    cy.visit('/', {
      onBeforeLoad (win) {
        delete win.navigator.battery

        // how to delete navigator.getBattery method?
        // deleting does not work
        // delete win.navigator.getBattery

        // but we can just overwrite it with undefined!
        Object.defineProperty(win.navigator, 'getBattery', {
          value: undefined
        })
      }
    })
  })
})
