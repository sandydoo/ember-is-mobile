import { test, module } from 'qunit';
import isMobile from 'ismobilejs'

module('Unit | isMobile exports');

test('isMobile exports', (assert) => {
  assert.ok(isMobile, 'isMobile exports an object');
});
