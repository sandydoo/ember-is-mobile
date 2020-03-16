import Helper from "@ember/component/helper";
import { inject as service } from '@ember/service';
import { get } from "@ember/object"


export default class IsMobile extends Helper {
  @service isMobile;

  compute([param]) {
    if (param) {
      return get(this.isMobile.tests, param);
    }

    return this.isMobile.tests;
  }
}
