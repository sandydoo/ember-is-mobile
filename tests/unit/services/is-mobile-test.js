import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | is mobile', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let service = this.owner.lookup('service:is-mobile');
    assert.ok(typeof service.any === 'boolean');
  });
});
