import Service from '@ember/service';
import { computed, get, set } from '@ember/object';
import { getOwner } from '@ember/application';
import { isBlank } from '@ember/utils';
import isMobile from 'ember-is-mobile';


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
      let headers = get(this, 'fastboot.request.headers');
      let userAgent = get(headers, 'headers.user-agent');

      // isMobile tries to fetch `navigator` if we give it a blank user agent.
      if (isBlank(userAgent)) { return; }

      queries = isMobile(userAgent[0]);
    } else {
      queries = isMobile();
    }

    for (let media in queries) {
      set(this, media, queries[media]);
    }
  }
});