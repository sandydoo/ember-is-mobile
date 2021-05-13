import { test, module } from 'qunit';
import isMobile from 'ismobilejs';

module('Unit | isMobile exports', function () {
  test('isMobile exports', (assert) => {
    assert.ok(typeof isMobile === 'function', 'isMobile exports a function');
  });
});
