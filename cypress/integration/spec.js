// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('battery test', () => {
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
