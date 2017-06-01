import { test, module } from 'qunit';
import isMobile from 'is-mobile'

module('Unit | isMobile exports');

test('isMobile exports', (assert) => {
  assert.ok(isMobile, 'isMobile exports an object');
});
test('isMobile runs in browser', (assert) => {
  assert.ok(isMobile.apple, 'isMobile runs in browser');
});
