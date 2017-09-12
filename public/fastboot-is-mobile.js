/* globals define, FastBoot */
(function() {
  if (typeof FastBoot !== 'undefined' && FastBoot.require) {
    define('ismobilejs/lib', ['exports'], function(self) {
      'use strict';

      // Change the context so that when isMobile internally sets the results of
      // the user agent tests to the current scope, it doesn't use the FastBoot
      // global scope, which is full of unnecessary stuff.
      var isMobileClass = FastBoot.require('ismobilejs');
      self['default'] = isMobileClass.bind(self);
    });
  }
})();