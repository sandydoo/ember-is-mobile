import Helper from "@ember/component/helper";
import { isPresent } from "@ember/utils";
import { inject as service } from "@ember/service";
import { assert } from "@ember/debug";
import { get } from "@ember/object"

export default Helper.extend({
  isMobile: service(),
  
  compute(params) {
    assert('Missing parameter for the is-mobile helper', isPresent(params[0]));
    const isMobile = get(this, 'isMobile');
    return isMobile[params[0]];
  }
});