/* eslint-env node */

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is not specified.
  },

  // Make sure to install ismobilejs on the parent app. This ensures it is
  // installed on the FastBoot App Server when it runs `npm install` in the
  // dist folder.
  afterInstall: function() {
    return this.addPackagesToProject('ismobilejs', '^1.0.3');
  }
};
