ember-is-mobile
==============================================================================

[![Build Status](https://travis-ci.org/sandydoo/ember-is-mobile.svg?branch=master)](https://travis-ci.org/sandydoo/ember-is-mobile)

Detect requests from mobile devices in your [Ember][ember] apps.

This addon uses [isMobile.js][ismobilejs] for parsing user agent strings. Works seamlessly in both the browser and in [FastBoot][fastboot].


- [Install](#install)
- [Compatability](#compatability)
- [Usage](#usage)
  - [As a service](#as-a-service)
  - [As a helper](#as-a-helper)
  - [Directly](#directly)


Install
------------------------------------------------------------------------------

```
ember install ember-is-mobile
```


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Usage
------------------------------------------------------------------------------

### As a service

The `isMobile` service provides access to the results of the user agent tests provided by `isMobile.js`. This service works in both the browser and in FastBoot. The FastBoot support is particularly useful if you want to conditionally render large blocks of content to target desktop or mobile devices.

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


### As a helper

The `is-mobile` helper can be used as an alternative to `isMobile` service.
It takes an *optional* argument — a string specifying the user agent test.

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


### Directly

This addon also re-exports `isMobile.js`, so you can import it yourself if you need to. In most cases you should use the service instead.

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


Contributing
--------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).


License
--------------------------------------------------------------------------------

[MIT][license-url] © [Sander Melnikov][maintainer-url].


[ember]: https://emberjs.com/
[fastboot]: https://ember-fastboot.com/
[ismobilejs]: https://github.com/kaimallea/isMobile/

[license-url]: LICENSE.md
[maintainer-url]: https://github.com/sandydoo
