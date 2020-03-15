🐹 ember-is-mobile 📱
==============================================================================

[![Build Status](https://travis-ci.org/sandydoo/ember-is-mobile.svg?branch=master)](https://travis-ci.org/sandydoo/ember-is-mobile)

> Detect requests from mobile devices in your Ember apps!

Works seamlessly in both the browser and in **FastBoot**!

This addon leverages [isMobile.js](https://github.com/kaimallea/isMobile) for parsing user agent strings. It also exports isMobile.js as an ES6 accessible module.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-is-mobile
```

Usage
------------------------------------------------------------------------------

#### isMobile service

The isMobile service provides access to the results of the user agent tests provided by isMobile.js. **This service works in both the browser and in FastBoot**. The FastBoot support is particularly useful if you want to conditionally render large blocks of content to target desktop or mobile devices.

**N.B.** Don't use this addon as a replacement for good responsive design!

You can query the user agent tests in your controllers, components and routes:

```js
import Component from '@ember/component';

export default class extends Component {
  @service isMobile;

  constructor() {
    super(...arguments);
    console.log(this.isMobile.any); // => true|false
  }
}
```

```handlebars
{{#if this.isMobile.any}}
  I'm on a mobile device!
{{/if}}
```

#### is-mobile helper

The is-mobile helper can be used as an alternative to `isMobile` service.
It expects one argument – a string specifying the user agent test.

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


#### Importing

This addon also shims isMobile.js, so you can import it yourself if you need to. In most cases you should use the service instead.

```js
import isMobile from 'ember-is-mobile';
```

In the browser, you can call the `isMobile` function with no arguments.

```js
isMobile(); // => { apple: {}, windows: {}, ... }
```

In FastBoot, however, you need to fetch the FastBoot headers yourself and run the method manually. Note that this syntax will only work in FastBoot.

```js
if (this.get('fastboot.isFastBoot')) {
    let headers = this.get('fastboot.request.headers');
    let userAgent = headers.get('user-agent');
    isMobile(userAgent); // => { apple: {}, windows: {}, ... }
}
```

Upgrading
------------------------------------------------------------------------------

This addon uses a blueprint to add `ismobilejs` to your app's dependencies using a blueprint. This step is necessary if you're using FastBoot. To get the latest version from the blueprint, run `ember g ember-is-mobile`.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md) © Sander Melnikov.
