// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

context('navigator.getBattery updates', () => {
  it('updates battery display', function () {
    let appListener
    const updateBattery = cy
      .stub()
      .callsFake((e, fn) => (appListener = fn))
      .as('update')
    const mockBatteryInfo = {
      level: 0.3,
      charging: true,
      chargingTime: 1800, // seconds
      dischargingTime: Infinity,
      addEventListener: updateBattery
    }

    cy.visit('/', {
      onBeforeLoad (win) {
        delete win.navigator.battery
        win.navigator.getBattery = () => Promise.resolve(mockBatteryInfo)
      }
    })
    // initial display
    cy.contains('.battery-percentage', '30%').should('be.visible')
    cy.contains('.battery-status', 'Adapter').should('be.visible')

    // application started listening for battery updates
    // by attaching to two events
    cy.get('@update')
      .should('have.been.calledTwice')
      .and('have.been.calledWith', 'chargingchange')
      .and('have.been.calledWith', 'levelchange')
      // send a changed battery status event
      .then(() => {
        // verify the listener was set
        expect(appListener).to.be.a('function')
        mockBatteryInfo.level = 0.275
        // log message for clarity
        cy.log('Set battery at **27.5%**')
        appListener()
      })

    // because all Cypress commands are automatically chained
    // this "cy.contains" only runs AFTER
    // previous ".then" completes
    cy.contains('.battery-percentage', '27.5%')
      .should('be.visible')
      .then(() => {
        // let's change a different propety
        mockBatteryInfo.charging = false
        appListener()
        // log message for clarity
        cy.log('Pulling the 🔌')
        cy.contains('.battery-status', 'Battery').should('be.visible')
      })
  })

  it('listens to chargingchange event', function () {
    let appListener
    // only listen to "chargingchange" event when the application calls
    // battery.addEventListener("chargingchange", function () { ...})
    const updateBattery = cy
      .stub()
      .callsFake((e, fn) => {
        if (e === 'chargingchange') {
          appListener = fn
        }
      })
      .as('update')
    const mockBatteryInfo = {
      level: 0.3,
      charging: true,
      chargingTime: 1800, // seconds
      dischargingTime: Infinity,
      addEventListener: updateBattery
    }

    cy.visit('/', {
      onBeforeLoad (win) {
        delete win.navigator.battery
        win.navigator.getBattery = () => Promise.resolve(mockBatteryInfo)
      }
    })
    // initial display
    cy.contains('.battery-percentage', '30%').should('be.visible')
    cy.contains('.battery-status', 'Adapter').should('be.visible')

    // application started listening for battery updates
    // by attaching to two events
    cy.get('@update')
      .should('have.been.calledTwice')
      // send a changed battery status event
      .then(() => {
        // verify the listener was set
        expect(appListener).to.be.a('function')
        mockBatteryInfo.level = 0.4
        // log message for clarity
        cy.log('Set battery at **40.0%**')
        appListener()
      })
  })
})
