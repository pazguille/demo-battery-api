// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

// skipping because the app crashes when there is no battery set
context.skip('no battery', () => {
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
