const browserify = require('@cypress/browserify-preprocessor')

module.exports = (on, config) => {
  on('task', require('cypress-istanbul/task'))

  // tell Cypress to use .babelrc when bundling spec code
  const options = browserify.defaultOptions
  options.browserifyOptions.transform[1][1].babelrc = true
  on('file:preprocessor', browserify(options))
}
