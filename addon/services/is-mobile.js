import Service from '@ember/service';
import { computed, get, set } from '@ember/object';
import { getOwner } from '@ember/application';
import { isBlank } from '@ember/utils';
import isMobile from 'ismobilejs';

/**
 * The attributes returned by isMobile are accessible. However, they should be
 * accessed using the `get` helper, since they may be undefined if the user
 * agent header is blank.
 */
export default Service.extend({
  fastboot: computed(function() {
    return getOwner(this).lookup('service:fastboot');
  }),

  init() {
    this._super(...arguments);

    let queries;
    if (get(this, 'fastboot.isFastBoot')) {
      const headers = get(this, 'fastboot.request.headers');
      let userAgent = get(headers, 'headers.user-agent');

      // isMobile tries to fetch `navigator` if we give it a blank user agent.
      if (isBlank(userAgent)) { return; }

      userAgent = userAgent[0];

      // Call with the current context to avoid leaking the node global space!
      queries = isMobile.call(this, userAgent);
    } else {
      queries = isMobile;
    }

    for (let media in queries) {
      set(this, media, queries[media]);
    }
  }
});