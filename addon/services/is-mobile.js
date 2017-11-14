import Service from '@ember/service';
import { computed, get, getProperties, set } from '@ember/object';
import { getOwner } from '@ember/application';
import { isBlank } from '@ember/utils';
import isMobile from 'ismobilejs';

export default Service.extend({

  fastboot: computed(function() {
    return getOwner(this).lookup('service:fastboot');
  }),

  init() {
    this._super(...arguments);

    let queries = [];
    if (get(this, 'fastboot.isFastBoot')) {
      const headers = get(this, 'fastboot.request.headers');
      let userAgent = get(headers, 'headers.user-agent')[0];

      if (isBlank(userAgent)) { return; }

      queries = getProperties(
        isMobile(userAgent),
        ['any', 'phone', 'tablet', 'apple', 'android', 'amazon', 'windows', 'seven_inch', 'other']
      );
    } else {
      queries = isMobile;
    }

    for (let media in queries) {
      set(this, media, queries[media]);
    }
  }
});