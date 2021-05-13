import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default class IsMobile extends Helper {
  @service isMobile;

  compute([param]) {
    if (param) {
      let test = get(this.isMobile.tests, param);
      return typeof test === 'undefined' ? false : test;
    }

    return this.isMobile.tests;
  }
}
