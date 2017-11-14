module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    // override rules' settings here

    // Ember
    // General
    'ember/local-modules': 'off',
    'ember/no-observers': 'off',
    'ember/no-side-effects': 'error',
    'ember/named-functions-in-promises': 'off',
    'ember/use-ember-get-and-set': 'error',
    'ember/use-brace-expansion': 'error',
    'ember/new-module-imports': 'error',
    'ember/no-old-shims': 'error',

    // Organization
    'ember/order-in-components': 'error',
    'ember/order-in-controllers': 'error',
    'ember/order-in-models': 'error',
    'ember/order-in-routes': 'error',

    // Controllers
    'ember/alias-model-in-controller': 'off',

    // Components
    'ember/avoid-leaking-state-in-components': 'error',
    'ember/closure-actions': 'error',
    'ember/no-on-calls-in-components': 'error',

    // Routing
    'ember/routes-segments-snake-case': 'error',
    'ember/no-capital-letters-in-routes': 'off'
  }
};

