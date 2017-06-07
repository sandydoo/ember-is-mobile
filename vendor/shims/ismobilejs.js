/* globals define */
(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['isMobile'] };
  }

  define('ismobilejs', [], vendorModule);
})();
