/* globals FastBoot */

import originalIsMobile from 'ismobilejs';

function isMobile() {
  if (typeof FastBoot !== 'undefined') {
    // Load up the node package in FastBoot. It should return the function
    // without instantiating.
    return FastBoot.require('ismobilejs');
  } else {
    // In the browser, get the instantiated global.
    return originalIsMobile;
  }
}

export default isMobile();