import { batteryStats } from './utils'
import { renderStats } from './dom-utils'

var battery

function readBattery (b) {
  battery = b || battery

  const { percentage, fully, remaining, charging } = batteryStats(battery)

  renderStats({ percentage, fully, remaining, charging })
}

if (navigator.battery) {
  readBattery(navigator.battery)
} else if (navigator.getBattery) {
  navigator.getBattery().then(readBattery)
} else {
  document.querySelector('.not-support').removeAttribute('hidden')
}

window.onload = function () {
  if (!battery) {
    return
  }

  battery.addEventListener('chargingchange', function () {
    readBattery()
  })

  battery.addEventListener('levelchange', function () {
    readBattery()
  })
}
