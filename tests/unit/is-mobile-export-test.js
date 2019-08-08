import { test, module } from 'qunit';
import isMobile from 'ismobilejs'

module('Unit | isMobile exports', function() {
  test('isMobile exports', (assert) => {
    assert.ok(isMobile, 'isMobile exports an object');
  });
});
