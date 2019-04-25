# Cypress tests for Battery Status API [![CircleCI](https://circleci.com/gh/bahmutov/demo-battery-api.svg?style=svg)](https://circleci.com/gh/bahmutov/demo-battery-api) [![renovate-app badge][renovate-badge]][renovate-app]

> Forked from [https://github.com/pazguille/demo-battery-api](https://github.com/pazguille/demo-battery-api) with its demo at [http://pazguille.github.io/demo-battery-api/](http://pazguille.github.io/demo-battery-api/)

## Use

```
git clone git@github.com:bahmutov/demo-battery-api.git
cd demo-battery-api
npm ci
npm run dev
```

Select any spec file from [cypress/integration](cypress/integration) folder

![Battery tests](images/battery.png)

## Specs

All specs are in the [cypress/integration](cypress/integration) folder.

spec | description
--- | ---
[simple.js](cypress/integration/simple.js) | no mocking, actual battery status
[battery.js](cypress/integration/battery.js) | mocks `navigator.battery` method

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
