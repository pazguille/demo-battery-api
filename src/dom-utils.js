export function renderStats ({ percentage, fully, remaining, charging }) {
  document.styleSheets[0].insertRule(
    '.battery:before{width:' + percentage + '}',
    0
  )
  document.querySelector('.battery-percentage').innerHTML = percentage
  document.querySelector('.battery-status').innerHTML = charging
    ? 'Adapter'
    : 'Battery'
  document.querySelector('.battery-level').innerHTML = percentage
  document.querySelector('.battery-fully').innerHTML = fully
  document.querySelector('.battery-remaining').innerHTML = remaining
}
