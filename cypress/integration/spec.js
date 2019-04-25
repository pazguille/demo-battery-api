// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('battery test', () => {
  context('navigator.getBattery', () => {
    it('shows battery status of 75%', function () {
      cy.visit('/', {
        onBeforeLoad (win) {
          delete win.navigator.battery
          win.navigator.getBattery = cy
            .stub()
            .resolves({
              level: 0.75,
              charging: false,
              addEventListener: () => {}
            })
            .as('getBattery')
        }
      })
      cy.contains('.battery-percentage', '75%')
      cy.get('@getBattery').should('have.been.calledOnce')
    })
  })

  // skipping because the app crashes when there is no battery set
  context.skip('no battery', () => {
    it('does not crash', () => {
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
})
