/* globals define, FastBoot */
(function() {
  function vendorModule() {
    'use strict';

    let isMobileClass = FastBoot.require('ismobilejs');
    // Wrap in a function so that when isMobile internally returns `this`, it
    // doesn't also include the current FastBoot context.
    return { default: function(userAgent) { return isMobileClass(userAgent); } };
  }

  define('is-mobile', [], vendorModule);
})();