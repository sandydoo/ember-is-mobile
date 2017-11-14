import Service from 'ember-service';
import get, { getProperties } from 'ember-metal/get';
import set from 'ember-metal/set';
import computed from 'ember-computed';
import getOwner from 'ember-owner/get';
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
      const userAgent = headers.get('user-agent');
      if (userAgent) {
        queries = getProperties(
          isMobile(userAgent),
          ['any', 'phone', 'tablet', 'apple', 'android', 'amazon', 'windows', 'seven_inch', 'other']
        );
      }
    } else {
      queries = isMobile;
    }

    for (let media in queries) {
      set(this, media, queries[media]);
    }
  }
});