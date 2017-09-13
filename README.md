# ember-is-mobile
[![npm Version][npm-badge]][npm]
[![Ember Observer Score](http://emberobserver.com/badges/ember-is-mobile.svg)](http://emberobserver.com/addons/ember-is-mobile)
[![Ember badge][ember-badge]][embadge]

A service for accessing [isMobile.js](https://github.com/kaimallea/isMobile) in your Ember applications with full support for detecting mobile devices in **FastBoot**!

Also provides isMobile.js as an ES6 accessible module.

## Usage

* `ember install ember-is-mobile`

#### isMobile service

The isMobile service is auto-injected into your app and provides access to the results of the user agent tests provided by isMobile.js. **This service works in both the browser and in FastBoot**. The FastBoot support is particularly useful if you want to conditionally render large blocks of content to target desktop or mobile devices.

You can query the user agent tests in your controllers, components and routes:

```js
this.get('isMobile.any'); // => true|false
```

The properties are also available in templates:

```handlebars
{{#if isMobile.any}}
  I'm on a mobile device!
{{/if}}
```

#### Importing

This addon also shims isMobile.js, so you can import it yourself if you need to. Note that it is imported from `ismobilejs`.
In most cases you should use the service instead. If you need to use this addon as a shim only, open an issue and I'll consider a way of making the service injection opt-out.

```js
import isMobile from 'ismobilejs';
```

In the browser, the isMobile object returns the computed user agent tests.

```js
isMobile(navigator.userAgent); // => { apple: {}, windows: {}, ... }
```

In FastBoot however, the import returns just the isMobile function, since `navigator` is obviously not available. You can fetch the FastBoot headers yourself and run the method manually. Note that this syntax will only work in FastBoot.

```js
if (this.get('fastboot.isFastBoot')) {
    const headers = this.get('fastboot.request.headers');
    const userAgent = headers.get('user-agent');
    isMobile(userAgent); // => { apple: {}, windows: {}, ... }
}
```

Naturally, you can still access isMobile in the browser using `window.isMobile`.

## Upgrading

This addon uses a blueprint to add `ismobilejs` to your app's dependencies using a blueprint. This step is necessary if you're using FastBoot. To get the latest version from the blueprint, run `ember g ember-is-mobile`.

## License

ember-is-mobile is [MIT Licensed](https://github.com/sandydoo/ember-is-mobile/blob/master/LICENSE.md).

## Attribution

Technical implementation for FastBoot inspired by [ember-cli-moment-shim](https://github.com/jasonmit/ember-cli-moment-shim).

[embadge]: http://embadge.io/
[ember-badge]: http://embadge.io/v1/badge.svg?start=1.0.0
[npm]: https://www.npmjs.org/package/ember-is-mobile
[npm-badge]: https://img.shields.io/npm/v/ember-is-mobile.svg?style=flat-square
