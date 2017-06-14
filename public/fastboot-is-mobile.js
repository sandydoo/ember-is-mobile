/* globals define, FastBoot */
(function() {
  define('ismobilejs', ['exports'], function(exports) {
    'use strict';

    var isMobileClass = FastBoot.require('ismobilejs');
    // Change the context so that when isMobile internally sets the results of
    // the user agent tests to the current scope, it doesn't use the FastBoot
    // global scope, which is full of unnecessary stuff.
    return { default: isMobileClass.bind(exports) };
  });
})();