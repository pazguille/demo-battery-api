module.exports = (on, config) => {
  on('task', require('cypress-istanbul/task'))
}
