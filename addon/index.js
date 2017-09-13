/* globals FastBoot */

function isMobile() {
  if (typeof FastBoot !== 'undefined') {
    // Load up the node package in FastBoot. It should return the class without
    // instantiating.
    return FastBoot.require('ismobilejs');
  } else {
    // In the browser, get the instantiated global.
    return self.isMobile;
  }
}

export default isMobile();