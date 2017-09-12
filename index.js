/* eslint-env node */
'use strict';

const mergeTrees = require('broccoli-merge-trees');
const funnel = require('broccoli-funnel');
const path = require('path');
const stew = require('broccoli-stew');

const map = stew.map;

module.exports = {
  name: 'ismobilejs',

  included() {
    this._super.included.apply(this, arguments);

    let app = this._findHost();
    this.fastbootTarget = 'fastboot-is-mobile.js';
    this.isMobilePath = path.dirname(require.resolve('ismobilejs'));

    let vendor = this.treePaths.vendor;

    app.import(
      {
        development: vendor + '/ismobilejs/isMobile.js',
        production: vendor + '/ismobilejs/isMobile.min.js'
      },
      { prepend: true }
    );
  },

  updateFastBootManifest(manifest) {
    manifest.vendorFiles.push('ismobilejs/' + this.fastbootTarget);

    return manifest;
  },

  treeForPublic() {
    let hasFastBoot = this.project.addons.some(addon => addon.name === 'ember-cli-fastboot');
    let publicTree = this._super.treeForPublic.apply(this, arguments);
    let trees = [];

    if (publicTree && hasFastBoot) {
      trees.push(publicTree);
    }

    return mergeTrees(trees);
  },

  treeForVendor(vendorTree) {
    let trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(
      funnel(this.isMobilePath, {
        destDir: 'ismobilejs',
        files: [
          'isMobile.js',
          'isMobile.min.js'
        ]
      })
    );

    return map(mergeTrees(trees), (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);
  }
};
