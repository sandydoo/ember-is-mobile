import Service from '@ember/service';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { isBlank } from '@ember/utils';
import isMobile from 'ember-is-mobile';


/**
 * The attributes returned by isMobile are accessible. However, they should be
 * accessed using the `get` helper, since they may be undefined if the user
 * agent header is blank.
 */
export default class IsMobileService extends Service {
  @computed
  get fastboot() {
    return getOwner(this).lookup('service:fastboot');
  }

  tests = {};

  constructor() {
    super(...arguments);

    let tests;

    if (this.fastboot.isFastBoot) {
      let headers = this.fastboot.request.headers;
      let userAgent = headers.headers['user-agent'];

      // isMobile tries to fetch `navigator` if we give it a blank user agent.
      if (isBlank(userAgent)) { return; }

      tests = isMobile(userAgent[0]);
    } else {
      tests = isMobile();
    }

    for (let media in tests) {
      this[media] = tests[media];
    }

    this.tests = tests;
  }
}