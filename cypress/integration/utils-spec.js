// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

import { toTime } from '../../src/utils'

describe('toTime', () => {
  // hit all if - else branches in the "toTime" function

  it('handles single digit units', () => {
    const hhmm = toTime(0)
    expect(hhmm).to.equal('00:00')
  })

  it('handles double digit units', () => {
    expect(toTime(36001)).to.equal('10:00')
    expect(toTime(601)).to.equal('00:10')
    // there are no seconds in the returned string
    // but we can still cover the logical branches
    expect(toTime(20)).to.equal('00:00')
  })
})
