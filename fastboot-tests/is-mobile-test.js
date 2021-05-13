/* eslint-env node */

const { module: QUnitModule, test } = require('qunit');
const setup = require('./setup');

const IPHONE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B137 Safari/601.1';
const DESKTOP_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3276.0 Safari/537.36';

QUnitModule('FastBoot support', function (hooks) {
  setup(hooks);

  test('processes a mobile user agent', async function (assert) {
    let { document } = await this.visit('/', {
      headers: { 'user-agent': IPHONE_UA },
    });

    assert.ok(document.getElementById('mobile-device'));
    assert.ok(document.getElementById('mobile-device-helper'));
  });

  test('processes a desktop user agent', async function (assert) {
    let { document } = await this.visit('/', {
      headers: { 'user-agent': DESKTOP_UA },
    });

    assert.ok(document.getElementById('not-mobile-device'));
    assert.ok(document.getElementById('not-mobile-device-helper'));
  });

  test('handles a missing user agent header', async function (assert) {
    let { statusCode, document } = await this.visit('/');

    assert.equal(statusCode, 200, 'Request handled without error');
    assert.ok(document.getElementById('not-mobile-device'));
    assert.ok(document.getElementById('not-mobile-device-helper'));
  });
});
