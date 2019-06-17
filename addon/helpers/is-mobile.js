import Ember from 'ember';

const {
  Helper,
  isPresent,
  inject: {
    service
  },
  assert,
  get
} = Ember;

export default Helper.extend({
  isMobile: service(),
  
  compute(params) {
    assert('Missing parameter for the is-mobile helper', isPresent(params[0]));
    const isMobile = get(this, 'isMobile');
    return isMobile[params[0]];
  }
});