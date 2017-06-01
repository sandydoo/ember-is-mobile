# ember-cli-is-mobile-shim
[![npm Version][npm-badge]][npm]
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-is-mobile-shim.svg)](http://emberobserver.com/addons/ember-cli-is-mobile-shim)
[![Ember badge][ember-badge]][embadge]

An ES6 accessible module for isMobile.js within your Ember applications. Includes FastBoot support!

## Usage

* `ember install ember-cli-is-mobile-shim`

```js
import isMobile from 'is-mobile';
```

In the browser, the isMobile object returns the computed user agent tests.

In FastBoot, the import returns the isMobile method since navigator is not available. You can fetch the FastBoot headers and run the method manually.

```js
const headers = this.get('fastboot.request.headers');
const userAgent = headers.get('user-agent');
isMobile(userAgent);
```

## License

ember-cli-is-mobile-shim is [MIT Licensed](https://github.com/sandydoo/ember-cli-is-mobile-shim/blob/master/LICENSE.md).

[embadge]: http://embadge.io/
[ember-badge]: http://embadge.io/v1/badge.svg?start=1.0.0
[npm]: https://www.npmjs.org/package/ember-cli-is-mobile-shim
[npm-badge]: https://img.shields.io/npm/v/ember-cli-is-mobile-shim.svg?style=flat-square
