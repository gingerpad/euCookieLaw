jQuery EU Cookie Law banner
=============
A customisable plugin to create an EU Cookie banner with added functionality.

Adds ability to customise up to four types of cookies (e.g. necessary, functionality, performance and advertising).

Dependencies
------------
 * [jQuery](https://github.com/jquery/jquery) - 1.9.0 minified version included for instances where you have no previous jQuery version available.
 * [jQuery.cookie](https://github.com/carhartl/jquery-cookie) - v1.3 non-minified version included.
 * [jQuery UI](https://github.com/jquery/jquery-ui) - 1.9.2 minified version included.
 * [jqModal](http://dev.iceburg.net/jquery/jqModal/) - r14 non-minified version included.

This plugin will run on anything from jQuery 1.1.3.1 upwards, however, jQuery UI is not supported less than jQuery 1.6 so jqModal has been included as a pre-1.6 option. Please see **[Options](#options)** on how to change the modal framework type.

Usage
-----------

If you have no previous version of jQuery to work within, you can use the 1.9.0 release included within this package. Simply reference it as follows.

```html
<script type="text/javascript" src="/js/jquery-1.9.0.min.js"></script> 
```

Add the following JavaScript references to the head of your HTML document (exclude any that aren't required) and change any reference paths as required.

```html
<script type="text/javascript" src="/js/jqModal.js"></script>
<script type="text/javascript" src="/js/jquery.cookie.js"></script>
<script type="text/javascript" src="/js/jquery.euCookieLaw.js"></script>
```
 
 Add the following CSS references to the head of your HTML document and change any reference paths.
 
```html
<link rel="stylesheet" href="/css/smoothness/jquery-ui-1.9.2.custom.css">
<link rel="stylesheet" href="/css/jqModal.css">
<link rel="stylesheet" type="text/css" href="/css/dialog-overrides.css" />
<link rel="stylesheet" type="text/css" href="/css/euCookieLaw.css" />
```

Please see the **[CSS](#css)** section for further details of the above.

To implement the EU Cookie Law plugin, call it on your ready function.

```javascript
$(function() {
	$(window).euCookieLaw();
});
```

The plugin will set various cookies dependant on the settings you use. The basic plugin is set to allow multi-cookies and are named based on the settings you use.
By default, the options are:

**Multi-cookies names**
 * eu_necessary_cookie
 * eu_functionality_cookie
 * eu_performance_cookie
 * eu_advertising_cookie
 
These cookies can be configured as inactive if required, you don't have to have four different types if you don't want to. These can be configured by setting the `cookieOneActive`, `cookieTwoActive`, `cookieThreeActive` and `cookieFourActive` options in the ready function as example below.

```javascript
$(function() {
	$(window).euCookieLaw({
		cookieThreeActive: false
		, cookieFourActive: false
	});
});
```

The multi cookies will be set with the following names and will have a value equal to the name. These can be configured by setting the `cookieOneName`, `cookieTwoName`, `cookieThreeName` and `cookieFourName` options in the ready function as per the example below.

```javascript
$(function() {
	$(window).euCookieLaw({
		cookieOneName: 'cookieOne'
		, cookieTwoName: 'cookieTwo'
		, cookieThreeName: 'cookieThree'
		, cookieFourName: 'cookieFour'
	});
});
```

You can check in your code page for the existence of the cookie to perform (or not) the functionality based on the names configured, alternatively you can check with javascript using **jQuery.Cookie**.

**Multi-cookie example**
```javascript
if(jQuery.cookie('eu_functionality_cookie') == 'eu_functionality_cookie') {
	//run your code
}
```
**Single cookie name**
 * eu_cookie

**Single cookie example**
```javascript
if(jQuery.cookie('eu_cookie') == 'eu_cookie') {
	//run your code
}
```

**One-off modal invocation**

If you wish to invoke the modal window to change your cookie settings after the initial process and the banner is not visible, you can add a class of `eu-cookie-action` to any item.

Options
-----------
The following settings are configurable from the ready function by calling them as below.

```javascript
$(function() {
	$(window).euCookieLaw({
		option: setting
		, option: setting...
	});
});
```

**euCookieActive**

Determines if the EU Cookie banner is active.

*Options* 
 * `true` - The Cookie banner is active. (default)
 * `false` - The Cookie banner is disabled.
 
**autoOptIn**

Determines if by default the cookie options are opt in or opt out.

*Options* 
 * `true` - Assumes the user will have default cookies dropped. (default)
 * `false` - Cookies will not be dropped straight away and the user will have to interact with the banner to opt in to use cookies.

**width**

Width of main message area in  pixels.

```javascript
$(function() {
	$(window).euCookieLaw({
		width: '1000px'
	});
});
```

**height**

Height of message area in pixels.

```javascript
$(function() {
	$(window).euCookieLaw({
		height: '100px'
	});
});
```

**startBodyTopMargin** 

Overridden on init function so do not need to change.

**messagePrepend**

Determines if the initial Cookie banner is appended or prepended to the HTML body.

*Options*
 * `true` - Banner will be prepended to the HTML body.
 * `false` - Banner will be appended to the HTML body.

**multiCookieType** 

Allows functionality to use different types of cookies, set to false to use single cookie. If `multiCookieType` set as false then the UI of the dialog will be updated to hide further information that shows the cookie name values and content for options 1 - 4.

*Options*
 * `true` - Plugin uses multiple cookie types. (default)
 * `false` - Plugin uses single cookie.

**cookieExpiration:** 

Amount of days before the cookie expires.
		
**discreetMessage**

Not currently an active option. Will become available in future releases and will determine if a discreet message is shown instead of full width static banner.

*Options*
 * `true` - n/a
 * `false` - n/a (default)
		
**cookieHeader**

The header text that appears on the banner.

```javascript
$(function() {
	$(window).euCookieLaw({
		cookieHeader: 'Cookies on this website'
	});
});
```

**cookieMessage**

The main message body that appears on the banner. Use the **{{changeSettingsLink}}** to invoke extra functionality as determined by following settings.

```javascript
$(function() {
	$(window).euCookieLaw({
		cookieMessage: 'We use cookies to ensure that you have the best experience on our website. The cookie settings on this website are currently set to allow all cookies. If you continue without changing your settings, you are consenting to receive all cookies. However, you may {{changeSettingsLink}} at any time.'
	});
});
```

**cookieChangeSettingsLink**

The value of the **{{changeSettingsLink}}** piece of text.

```javascript
$(function() {
	$(window).euCookieLaw({
		cookieChangeSettingsLink: 'change your cookie settings'
	});
});
```

**cookieChangeSettingsLinkActive**

Determine if the **{{changeSettingsLink}}** invokes showing of the modal window.

*Options*
 * `true` - The **{{changeSettingsLink}}** will invoke showing of the modal window and add the relevant link. (default)
 * `false` - The **{{changeSettingsLink}}** will be plain text and not invoke showing of the modal window.
 
**continueBtnText**

The text to show for the continue button on the main banner. This will invoke the setting of all cookies and the banner will not show.

```javascript
$(function() {
	$(window).euCookieLaw({
		continueBtnText: 'Continue'
	});
});
```

**learnBtnText**

The text to show for the learn more button on the main banner. This will invoke showing of the modal window.

```javascript
$(function() {
	$(window).euCookieLaw({
		learnBtnText: 'Learn about cookies'
	});
});
```

**modalType**

Determines which type of modal framework will be used. Dependant on the settings you will not need to include some JavaScript and CSS files.

*Options*
 * `ui` - Uses the jQuery UI framework for sites that use **jQuery 1.6+**. You will not need to include references to `jqModal.js` and `jqModal.css`. (default)
 * `jqm` - Uses the jqModal framework for sites that have less than **jQuery 1.6+**, **jQuery 1.1.3.1+** supported with this framework. You will not need to include references to `jquery-ui-1.9.2.custom.min.js` and any UI CSS files (by default the contents of the smoothness folder in the CSS folder).

**offsetOverlay:**

For instances where you need to offset the modal overlay to not hide the original cookie banner. Will use the value of *height* variable.

*Options*
 * `true` - Modal overlay will offset by the *height* amount. (default)
 * `false` - Modal overlay will not offset.
 
**dialogIntroContent**

Introductory content for the modal window in HTML format.

```javascript
$(function() {
	$(window).euCookieLaw({
		dialogIntroContent: '<h2>Learn about our cookies</h2><p>Cookies are small text files that are stored in your computer and then saved by your browser. Used to collect data, cookies help make our website more user friendly, more effective and safer for you.</p><p>Cookies do lots of different jobs such as letting you navigate between pages efficiently, remembering your preferences, and ensuring that adverts you see online are more relevant to your interests. Without cookies many areas of functionality, such as user logins, shopping baskets and other customisation features, will not work.</p><p>Cookies cannot be attributed to a particular person and do not contain any personal information. Most cookies are deleted once you conclude your browser session. Additionally, there are some long-life cookies that enable us to recognise you as a returning visitor.</p><p>Cookies do not cause any harm to your computer and do not contain any viruses. You can change your cookie settings should you prefer not to accept the use of cookies on our websites.</p><p>You can find more information about cookies at <a href="http://www.allaboutcookies.org" target="_blank">www.allaboutcookies.org</a> and <a href="http://www.youronlinechoices.eu" target="_blank" >www.youronlinechoices.eu</a>. For a video about cookies, visit <a href="http://www.google.co.uk/goodtoknow/data-on-the-web/cookies" target="_blank" >www.google.co.uk/goodtoknow/data-on-the-web/cookies</a>.</p>'
	});
});
```

**dialogCookieContent**

Information about changing cookies content for the modal window in HTML format.

```javascript
$(function() {
	$(window).euCookieLaw({
		dialogCookieContent: '<h2>Change your cookie settings</h2><p>There are 4 types of cookies used on this website. You can choose to enable or disable three of them.</p>'
	});
});
```

**cookieOneActive**, **cookieTwoActive**, **cookieThreeActive**, **cookieFourActive**

Determines if any of the multi cookies are active.

*Options*
 * `true` - Multi cookie option is active and will show content on the modal window as well as setting cookie dependant on user interaction. (default)
 * `false` - Multi cookie option is inactive and content will NOT show on the modal window.
 
**cookieOneName**, **cookieTwoName**, **cookieThreeName**, **cookieFourName**

The name of the multi cookies and the value set upon setting as enabled by user interaction.

```javascript
$(function() {
	$(window).euCookieLaw({
		cookieOneName: 'eu_necessary_cookie'
		, cookieTwoName: 'eu_functionality_cookie'
		...
	});
});
```

**cookieOneForceEnabled**, **cookieTwoForceEnabled**, **cookieThreeForceEnabled**, **cookieFourForceEnabled**

These settings enable you to force a multi cookie type to only show as enabled on the modal window. The user does not have the option of disabling them.

*Options*
 * `true` - Multi cookie option will only show the enabled radio button on the modal window. (default)
 * `false` - Multi cookie option will show enabled and disabled radio buttons on the modal window.

**cookieOneDialogTitle**, **cookieTwoDialogTitle**, **cookieThreeDialogTitle**, **cookieFourDialogTitle**

The heading text for each multi cookie type.

```javascript
$(function() {
	$(window).euCookieLaw({
		cookieOneDialogTitle: '1. Strictly necessary cookies (always enabled)'
		, cookieTwoDialogTitle: '2. Functionality cookies'
		...
	});
});
```

**cookieOneDialogText**, **cookieTwoDialogText**, **cookieThreeDialogText**, **cookieFourDialogText**

The body copy for each multi cookie type

```javascript
$(function() {
	$(window).euCookieLaw({
		cookieOneDialogText: 'These cookies are essential and required. They allow you to move about the site or enable services you have specifically asked for.'
		...
	});
});
```

**cookieOneDialogMoreText**, **cookieTwoDialogMoreText**, **cookieThreeDialogMoreText** **cookieFourDialogMoreText**

Any extra text for each multi cookie type that you don't want displayed by default can be added in to these settings. Adding content will cause a *+ More* link to be shown which will have functionality to show/hide the extra text entered.

```javascript
$(function() {
	$(window).euCookieLaw({
		cookieOneDialogMoreText: 'Strictly necessary cookies are always enabled. They allow you to move around the website and use features and services you have requested. Without these cookies, secure areas of the website, such as shopping baskets or e-billing, cannot be provided.'
		, cookieTwoDialogMoreText: ''
		...
	});
});
```

**dialogConfirmBtnText**

Text to display on the submit button on the modal window.

```javascript
$(function() {
	$(window).euCookieLaw({
		dialogConfirmBtnText: 'SUBMIT'
	});
});
```

**dialogCancelBtnText**

Text to display on the cancel button on the modal window.

```javascript
$(function() {
	$(window).euCookieLaw({
		dialogConfirmBtnText: 'CANCEL'
	});
});
```

CSS
-----------

Please remember to update any image paths in the CSS files dependant on where you place the images.

**euCookieLaw.css**

This file controls the main banner and its elements.

**dialog-overrides.css**

Styling overrides for the jQuery UI dialog and jqModal elements.

**smoothness/*.***

This is the default jQuery UI theme included with the plugin. The majority of the elements styled within the modal are overriden in the `dialog-overrides.css` file. You will not need these files if you are using the **jqm** `modalType`.

**jqModal.css**

The default jqModal elements. You will not need this file if you are using the **ui** `modalType`.

Supported Browsers
----------

The following browsers have been tested for functionality. Other browsers may be supported but have not been tested.

 * Windows (ui & jqm)
	* FireFox *version 18*
	* Chrome *version 24*
	* Opera *version 12*
	* Safari *version 5*
	* Internet Explorer 9
	* Internet Explorer 8
	* Internet Explorer 7
	* Internet Explorer 6
 * Mac OSX (ui & jqm)
	* FireFox *version 18*
	* Chrome *version 24*
	* Safari *version 5*
	
Copyright
-----------

Copyright &copy; 2013 Paddy Ward. North 51 Digital (www.north51digital.com)