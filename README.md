🐹 ember-is-mobile 📱
==============================================================================

[![Build Status](https://travis-ci.org/sandydoo/ember-is-mobile.svg?branch=master)](https://travis-ci.org/sandydoo/ember-is-mobile)
[![Ember Observer Score](http://emberobserver.com/badges/ember-is-mobile.svg)](http://emberobserver.com/addons/ember-is-mobile)

> Detect requests from mobile devices in your Ember apps!

Works seamlessly in both the browser and in **FastBoot**!

This addon leverages [isMobile.js](https://github.com/kaimallea/isMobile) for parsing user agent strings. It also exports isMobile.js as an ES6 accessible module.

Installation
------------------------------------------------------------------------------

```
ember install ember-is-mobile
```

#### FastBoot requirements

This addon no longer supports pre-1.0 FastBoot versions. You need to use at least `ember-cli-fastboot: 1.0.0+` if you want to use this addon in FastBoot.

Usage
------------------------------------------------------------------------------

#### isMobile service

The isMobile service is auto-injected into your app and provides access to the results of the user agent tests provided by isMobile.js. **This service works in both the browser and in FastBoot**. The FastBoot support is particularly useful if you want to conditionally render large blocks of content to target desktop or mobile devices.

**N.B.** Don't use this addon as a replacement for good responsive design!

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

#### is-mobile Helper

The is-mobile helper can be used as an alternative to `isMobile` Service.
It expects one argument to be passed as a param.

```handlebars
{{#if (is-mobile "any")}}
  I'm on a mobile device
{{/if}}
```

```handlebars
<div class="{{if (is-mobile "android.phone") "is-android"}} {{if (is-mobile "apple.phone") "is-apple"}}">
  I'm on a mobile device
</div>
```

The full list of user agent tests provided by isMobile:

* `any`
* `phone`
* `tablet`
* `apple`
* `android`
* `amazon`
* `windows`
* `seven_inch`
* `other`

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

Upgrading
------------------------------------------------------------------------------

This addon uses a blueprint to add `ismobilejs` to your app's dependencies using a blueprint. This step is necessary if you're using FastBoot. To get the latest version from the blueprint, run `ember g ember-is-mobile`.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md) © Sander Melnikov.
