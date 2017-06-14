/* eslint-env node */
'use strict';

const mergeTrees = require('broccoli-merge-trees');
const funnel = require('broccoli-funnel');
const path = require('path');
const stew = require('broccoli-stew');

const rename = stew.rename;
const map = stew.map;

function isLegacyFastboot() {
  return process.env.EMBER_CLI_FASTBOOT === 'true';
}

module.exports = {
  name: 'ember-is-mobile',

  included() {
    this._super.included.apply(this, arguments);

    let app = this._findHost();
    this.fastbootTarget = 'fastboot-is-mobile.js';
    this.isMobilePath = path.dirname(require.resolve('ismobilejs'));

    if (isLegacyFastboot()) {
      this.importLegacyFastBootDependencies(app);
    } else {
      this.importBrowserDependencies(app);
    }
  },

  updateFastBootManifest(manifest) {
    manifest.vendorFiles.push('ember-is-mobile/' + this.fastbootTarget);

    return manifest;
  },

  importLegacyFastBootDependencies(app) {
    app.import(this.treePaths.vendor + '/fastboot-is-mobile.js');
  },

  importBrowserDependencies(app) {
    let vendor = this.treePaths.vendor;

    app.import(
      {
        development: vendor + '/ismobilejs/isMobile.js',
        production: vendor + '/ismobilejs/isMobile.min.js'
      },
      { prepend: true }
    );
    app.import(vendor + '/shims/ismobilejs.js');
  },

  treeForVendor(vendorTree) {
    if (isLegacyFastboot()) {
      return this.legacyTreeForFastBootVendor(vendorTree);
    }

    return this.treeForBrowserVendor(vendorTree);
  },

  legacyTreeForFastBootVendor(vendorTree) {
    let trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    let tree = funnel(path.join(__dirname, './public'), {
      files: [this.fastbootTarget]
    });

    tree = rename(tree, () => 'fastboot-is-mobile.js');
    trees.push(tree);

    return mergeTrees(trees);
  },

  treeForBrowserVendor(vendorTree) {
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
