/* eslint-env node */

module.exports = {
  name: 'ember-is-mobile',

  description: "Add ismobilejs to the project's dependencies",

  normalizeEntityName() {
    // this prevents an error when the entityName is not specified.
  },

  // Make sure to install ismobilejs on the parent app. This ensures it is
  // installed on the FastBoot App Server when it runs `npm install` in the
  // dist folder.
  afterInstall() {
    return this.addPackageToProject('ismobilejs', '^1.1.1');
  }
};
