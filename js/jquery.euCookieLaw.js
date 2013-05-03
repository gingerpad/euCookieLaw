/*

EU Cookie Law jQuery plugin v1.0

 * Copyright (C) 2013 Paddy Ward (North 51 Digital) (paddy.ward@north-51.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
 * HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
 * FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
 * OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
 * COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
 * BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
 * DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://gnu.org/licenses/>.
 
 */

(function($) {
	
	$.euCookieLaw = function (options) {
		this.init (options);
	}
	
	$.euCookieLaw.Defaults = {
		euCookieActive: true
		, autoOptIn: true // true assumes the user will have cookies dropped, false forces the user to interact before the banner disappears
		, width: '1000px' // width of main message area in  pixels
		, height: '100px' // height of message area in pixels
		, startBodyTopMargin: '0px' //Overriden on init function so do not need to change
		, messagePrepend: true // options : true = prepend / false = append
		, multiCookieType: true //Allows functionality to use different types of cookies, set to false to use single cookie
		, cookieExpiration: 365 //Amount of days before the cookie expires
		, discreetMessage: false // true/false decides if discreet message is shown instead of full width static banner. Not currently available
		, cookieHeader: 'Cookies on this website'
		, cookieMessage: 'We use cookies to ensure that you have the best experience on our website. The cookie settings on this website are currently set to allow all cookies. If you continue without changing your settings, you are consenting to receive all cookies. However, you may {{changeSettingsLink}} at any time.'
		, cookieChangeSettingsLink: 'change your cookie settings'
		, cookieChangeSettingsLinkActive: true
		, continueBtnText: 'Continue'
		, learnBtnText: 'Learn about our cookies'
		, modalType: 'ui' // options : ui = jQuery UI framework used (for jQuery 1.6+), jqm = jqModal framework used (for jQuery 1.1.3.1+)
		, offsetOverlay: true //Instances where you need to offset the modal overlay to not hide the original cookie banner. Will use the value of "height" variable.
		, dialogIntroContent: '<h2>Learn about our cookies</h2><p>Cookies are small text files that are stored in your computer and then saved by your browser. Used to collect data, cookies help make our website more user friendly, more effective and safer for you.</p><p>Cookies do lots of different jobs such as letting you navigate between pages efficiently, remembering your preferences, and ensuring that adverts you see online are more relevant to your interests. Without cookies many areas of functionality, such as user logins, shopping baskets and other customisation features, will not work.</p><p>Cookies cannot be attributed to a particular person and do not contain any personal information. Most cookies are deleted once you conclude your browser session. Additionally, there are some long-life cookies that enable us to recognise you as a returning visitor.</p><p>Cookies do not cause any harm to your computer and do not contain any viruses. You can change your cookie settings should you prefer not to accept the use of cookies on our websites.</p><p>You can find more information about cookies at <a href="http://www.allaboutcookies.org" target="_blank">www.allaboutcookies.org</a> and <a href="http://www.youronlinechoices.eu" target="_blank" >www.youronlinechoices.eu</a>. For a video about cookies, visit <a href="http://www.google.co.uk/goodtoknow/data-on-the-web/cookies" target="_blank" >www.google.co.uk/goodtoknow/data-on-the-web/cookies</a>.</p>' //Enter in HTML format
		, dialogCookieContent: '<h2>Change your cookie settings</h2><p>There are 4 types of cookies used on this website. You can choose to enable or disable three of them.</p>' //Enter in HTML format
		// Multi cookie allows up to four different types of cookie
		, cookieOneActive: true
		, cookieOneName: 'eu_necessary_cookie'
		, cookieOneForceEnabled: true
		, cookieOneDialogTitle: '1. Strictly necessary cookies (always enabled)'
		, cookieOneDialogText: 'These cookies are essential and required. They allow you to move about the site or enable services you have specifically asked for.'
		, cookieOneDialogMoreText: 'Strictly necessary cookies are always enabled. They allow you to move around the website and use features and services you have requested. Without these cookies, secure areas of the website, such as shopping baskets or e-billing, cannot be provided.' //leave blank to hide 'more' link functionality
		, cookieTwoActive: true
		, cookieTwoName: 'eu_functionality_cookie'
		, cookieTwoForceEnabled: false
		, cookieTwoDialogTitle: '2. Functionality cookies '
		, cookieTwoDialogText: 'These cookies enhance the functionality of the website by storing your preferences.'
		, cookieTwoDialogMoreText: 'Functionality cookies allow the website to remember choices you make such as your user name, language or the region you are in. These cookies can remember changes you have made to text size, fonts and other customisable parts of web pages. They may also be used to provide services you have asked for such as watching a video. The information these cookies collect is anonymous. They cannot track your browsing activity on other websites.' //leave blank to hide 'more' link functionality
		, cookieThreeActive: true
		, cookieThreeName: 'eu_performance_cookie'
		, cookieThreeForceEnabled: false
		, cookieThreeDialogTitle: '3. Performance cookies '
		, cookieThreeDialogText: 'These cookies help to improve the performance of the website, providing a better user experience.'
		, cookieThreeDialogMoreText: 'Performance cookies collect information about how visitors use a website such as which pages visitors go to most often, and if they get error messages from web pages. These cookies don\'t collect information that identifies a visitor. All information these cookies collect is aggregated and anonymous. It is only used to improve how a website works.' //leave blank to hide 'more' link functionality
		, cookieFourActive: true
		, cookieFourName: 'eu_advertising_cookie'
		, cookieFourForceEnabled: false
		, cookieFourDialogTitle: '4. Advertising cookies '
		, cookieFourDialogText: 'These cookies are used to tailor the advertising to each user.'
		, cookieFourDialogMoreText: 'Advertising cookies are used to deliver adverts more relevant to you and your interests. They are also used to limit the number of times you see an advert as well as help measure the effectiveness of the advertising campaign. They are usually placed by advertising networks with the website operator\'s permission. They remember that you have visited a website and share this information with other organisations such as advertisers. Quite often advertising cookies will be linked to site functionality provided by the other organisation.' //leave blank to hide 'more' link functionality
		, dialogConfirmBtnText: 'SUBMIT'
		, dialogCancelBtnText: 'CANCEL'
	}
	
	$.euCookieLaw.prototype = {
		init : function(options) {
			var me = this;
			
			this.options = $.extend(true, {}, $.euCookieLaw.Defaults, options);
			
			if(this.options.euCookieActive) {
				this.options.startBodyTopMargin = $('body').css('margin-top');
				
				me.checkCookieType();
				
				$('.eu-cookie-action').click(function(e) {
					e.preventDefault();
					
					if(me.options.modalType == 'ui') {
						me.openUiDialog();
					} else {
						me.openJqmDialog();
					}
				});
			}
			
			if(this.options.autoOptIn) {
				$(window).unload(function() {
					me.setAllCookies();
				});
			}
		}
		
		, checkCookieType: function() {
			var me = this;
			
			if(this.options.multiCookieType) {
				if(!this.multiCookiesAccepted()) {
					if(this.options.autoOptIn)
						me.setAllCookies();
				
					this.buildNotificationArea();
				}
					this.addDialog();
			} else {
				if(!this.cookieAccepted())
					this.buildNotificationArea();
					this.addDialog();
			}
		}
		
		, cookieOneAccepted: function() {
			var bool;
			
			if(this.options.cookieOneActive) {
				if($.cookie(this.options.cookieOneName) == this.options.cookieOneName) {
					bool = true;
				} else {
					bool = false;
				}
			} else {
				bool = false;
			}
			
			return bool;
		}
		
		, cookieTwoAccepted: function() {
			var bool;
			
			if(this.options.cookieTwoActive) {
				if($.cookie(this.options.cookieTwoName) == this.options.cookieTwoName) {
					bool = true;
				} else {
					bool = false;
				}
			} else {
				bool = false;
			}
			
			return bool;
		}
		
		, cookieThreeAccepted: function() {
			var bool;
			
			if(this.options.cookieThreeActive) {
				if($.cookie(this.options.cookieThreeName) == this.options.cookieThreeName) {
					bool = true;
				} else {
					bool = false;
				}
			} else {
				bool = false;
			}
			
			return bool;
		}
		
		, cookieFourAccepted: function() {
			var bool;
			
			if(this.options.cookieFourActive) {
				if($.cookie(this.options.cookieFourName) == this.options.cookieFourName) {
					bool = true;
				} else {
					bool = false;
				}
			} else {
				bool = false;
			}
			
			return bool;
		}
		
		, multiCookiesAccepted: function() {
			var me = this;
			
			var bool = false;
			
			if(me.cookieOneAccepted() || me.cookieTwoAccepted() || me.cookieThreeAccepted() || me.cookieFourAccepted())
				bool = true
				
			return bool;
		}
		
		, cookieAccepted : function() {
			var me = this;
			
			var bool = false;
			
			if($.cookie('eu_cookie') == 'eu_cookie')
				bool = true
				
			return bool;
		
		}
		
		, cookiesAccepted: function() {
			var me = this;
			
			var bool = false;
			
			if(this.multiCookiesAccepted() || this.cookieAccepted())
				bool = true;
				
			return bool;
		}
		
		, buildNotificationArea: function() {
			var container = $('<div class="euCookie-outer" style="height:' + this.options.height + '"></div');
			var innerContainer = $('<div class="euCookie-inner" style="width:' + this.options.width + '"></div>');
			var innerLeft = $('<div class="euCookie-left"></div>');
			var innerLeftInner = $('<div class="euCookie-left-inner"></div>');
			var innerRight = $('<div class="euCookie-right"></div>');
			
			if(this.options.cookieChangeSettingsLinkActive) {
				var message = this.options.cookieMessage.replace('{{changeSettingsLink}}','<a href="" class="eu-cookie-action">' + this.options.cookieChangeSettingsLink + '</a>');
			} else {
				var message = this.options.cookieMessage.replace('{{changeSettingsLink}}',this.options.cookieChangeSettingsLink);
			}
			
			var messageContent = $('<h3>' + this.options.cookieHeader + '</h3><span class="euCookie-message">' + message + '</span>');
			
			this.addContinueBtn(innerRight);
			this.addLearnBtn(innerRight);
			
			innerLeftInner.append(messageContent);
			innerLeft.append(innerLeftInner);
			innerContainer.append(innerLeft);
			innerContainer.append(innerRight);
			container.append(innerContainer);
			
			var marginAmount = parseInt(this.options.height) + parseInt(this.options.startBodyTopMargin);
			
			if(this.options.messagePrepend) {
				//Drop the main content down by (height+start body margin) to make way for the banner
				$('body').css({'margin-top': marginAmount + 'px', 'position': 'static'})
				
				//Add the cookie notification area
				container.css({'top':'0px'});
				$('body').prepend(container);
			} else {
				//Move the main content down up (height+start body margin) to make way for the banner
				$('body').css({'margin-bottom': marginAmount + 'px'})
				
				//Add the cookie notification area
				container.css({'bottom':'0px'});
				$('body').append(container);
			}
		}
		
		, addContinueBtn: function(parent) {
			var me = this;
			
			var continueBtn = $('<a href="" class="eu-cookie-continue-btn">' + me.options.continueBtnText + '</a>').click(function(e) {
				e.preventDefault();
				if(me.options.multiCookieType) {
					me.setAllCookies();
				} else {
					me.setCookie('eu_cookie');
				}
				me.closeNotification();
			});
			
			parent.append(continueBtn);
		}
		
		, addLearnBtn: function(parent) {
			var me = this;
			
			var learnBtn = $('<a href="" class="eu-cookie-learn-btn">' + me.options.learnBtnText + '</a>').click(function(e) {
				e.preventDefault();
				
				if(me.options.modalType == 'ui') {
					me.openUiDialog();
				} else {
					me.openJqmDialog();
				}
			});
			
			parent.append(learnBtn);
		}
		
		, addDialog: function() {
			var me = this;
			
			if(me.options.modalType == 'ui') {
				this.addUiDialog();
			} else {
				this.addJqmDialog();
			}
		}
		
		, addUiDialog: function() {
			var me = this;
			
			//IE 6-8 do not support the leadingWhitespace element of jQuery.support, safest way to check as $.browser deprecated and jQuery.support is recommended way forward.
			var isNotIe6or7or8 = jQuery.support.leadingWhitespace;
			
			me.buildDialogContent();
			
			$('#dialog').dialog({
				modal: true
				, autoOpen: false
				, width: 675
				, height: 650
				, open: function() {
					if(me.options.offsetOverlay)
						if(!me.cookiesAccepted()) {
							if(isNotIe6or7or8) {
								$('.ui-widget-overlay').css({'top': me.options.height, 'height': '100%', 'width': '100%', 'position': 'fixed'});
							} else {
								$('.ui-widget-overlay').css({'top': me.options.height});
							}
						}
				}
				, dialogClass: 'eu-cookie-modal'
				, resizable: false
				, buttons: [
					{
						text: me.options.dialogConfirmBtnText,
						click: function() {
							$(this).find('div.frm').each(function() {
								me.processForm($(this));
							});
							$( this ).dialog('close');
							location.reload();
						}
					},
					{
						text: me.options.dialogCancelBtnText,
						click: function() {
							$( this ).dialog('close');
						}
					}
				]
			});
		}
		
		, addJqmDialog: function() {
			var me = this;
			
			me.buildDialogContent();
			
			$('#dialog').jqm({
				modal: true
				, overlay: 70
				, onShow: function(hash) {
					if(me.options.offsetOverlay) {
						if(!me.cookiesAccepted()) {
							$('.jqmOverlay').css({'margin-top': me.options.height});
						}
					}
					
					hash.w.show();
				}
			});
		}
		
		, buildDialogContent: function() {
			var me = this;
			
			var dialogWindow = $('<div id="dialog"></div>');
			if(this.options.modalType == 'jqm') {
				dialogWindow.addClass('jqmWindow').addClass('eu-cookie-modal');
				var jqmInnerContainer = $('<div class="dialog-inner"></div>');
			}
				
			var dialogContent = $('<div class="dialog-container"></div>');
			dialogContent.append(this.options.dialogIntroContent);
			
			if(this.options.multiCookieType) {
				dialogContent.append(this.options.dialogCookieContent);
				
				if(this.options.cookieOneActive)
					me.buildCookieChecks('One', dialogContent);
					
				if(this.options.cookieTwoActive)
					me.buildCookieChecks('Two', dialogContent);
					
				if(this.options.cookieThreeActive)
					me.buildCookieChecks('Three', dialogContent);
					
				if(this.options.cookieFourActive)
					me.buildCookieChecks('Four', dialogContent);
			}
			
			if(this.options.modalType == 'jqm') {
				jqmInnerContainer.append(dialogContent);
				dialogWindow.append(jqmInnerContainer);
			} else {
				dialogWindow.append(dialogContent);
			}
			
			if(this.options.modalType == 'jqm') {
				var jqmButtonPane = $('<div class="dialog-button-pane"></div>');
				var submitBtn = $('<button><span>' + me.options.dialogConfirmBtnText + '</span></button>').click(function(e) {
					e.preventDefault();
					dialogWindow.find('div.frm').each(function() {
						me.processForm($(this));
					});
					$('.jqmWindow').jqmHide();
					location.reload();
				});
				var cancelBtn = $('<button><span>' + me.options.dialogCancelBtnText + '</span></button>').click(function(e) {
					$('.jqmWindow').jqmHide();
				});
				
				jqmButtonPane.append(submitBtn);
				jqmButtonPane.append(cancelBtn);
				
				dialogWindow.append(jqmButtonPane);
			}
			
			$('body').append(dialogWindow);
		}
		
		, processForm: function(parent) {
			var me = this;
			
			var name = parent.find('input.eu-enabled').attr('name');
								
			var checkedVal = parent.find('input[type=radio]:checked').val();
			
			switch(name)
			{
				case 'cookieOne':
					if(checkedVal == 1) {
						me.setCookieOne();
					} else {
						me.removeCookieOne();
					}
					break;
				case 'cookieTwo':
					if(checkedVal == 1) {
						me.setCookieTwo();
					} else {
						me.removeCookieTwo();
					}
					break;
				case 'cookieThree':
					if(checkedVal == 1) {
						me.setCookieThree();
					} else {
						me.removeCookieThree();
					}
					break;
				case 'cookieFour':
					if(checkedVal == 1) {
						me.setCookieFour();
					} else {
						me.removeCookieFour();
					}
					break;
			}
		}
		
		, buildCookieChecks: function(cookieName, parent) {
			var me = this;
			
			switch(cookieName)
			{
				case 'One':
					var title = $('<h3>' + me.options.cookieOneDialogTitle + '</h3>');
					var radioName = 'cookieOne';
					var forceEnabled = me.options.cookieOneForceEnabled;
					var moreText = (me.options.cookieOneDialogMoreText != '');
					if(me.options.cookieOneDialogMoreText != '') {
						var content = $('<p>' + me.options.cookieOneDialogText + '</p>');
						var contentMore = $('<p style="display:none;" class="eu-more-text">' + me.options.cookieOneDialogMoreText + '</p>');
					} else {
						var content = $('<p>' + me.options.cookieOneDialogText + '</p>');
					}
					break;
				case 'Two':
					var title = $('<h3>' + me.options.cookieTwoDialogTitle + '</h3>');
					var radioName = 'cookieTwo';
					var forceEnabled = me.options.cookieTwoForceEnabled;
					var moreText = (me.options.cookieTwoDialogMoreText != '');
					if(me.options.cookieTwoDialogMoreText != '') {
						var content = $('<p>' + me.options.cookieTwoDialogText + '</p>');
						var contentMore = $('<p style="display:none;" class="eu-more-text">' + me.options.cookieTwoDialogMoreText + '</p>');
					} else {
						var content = $('<p>' + me.options.cookieTwoDialogText + '</p>');
					}
					break;
				case 'Three':
					var title = $('<h3>' + me.options.cookieThreeDialogTitle + '</h3>');
					var radioName = 'cookieThree';
					var forceEnabled = me.options.cookieThreeForceEnabled;
					var moreText = (me.options.cookieThreeDialogMoreText != '');
					if(me.options.cookieThreeDialogMoreText != '') {
						var content = $('<p>' + me.options.cookieThreeDialogText + '</p>');
						var contentMore = $('<p style="display:none;" class="eu-more-text">' + me.options.cookieThreeDialogMoreText + '</p>');
					} else {
						var content = $('<p>' + me.options.cookieThreeDialogText + '</p>');
					}
					break;
				case 'Four':
					var title = $('<h3>' + me.options.cookieFourDialogTitle + '</h3>');
					var radioName = 'cookieFour';
					var forceEnabled = me.options.cookieFourForceEnabled;
					var moreText = (me.options.cookieFourDialogMoreText != '');
					if(me.options.cookieFourDialogMoreText != '') {
						var content = $('<p>' + me.options.cookieFourDialogText + '</p>');
						var contentMore = $('<p style="display:none;" class="eu-more-text">' + me.options.cookieFourDialogMoreText + '</p>');
					} else {
						var content = $('<p>' + me.options.cookieFourDialogText + '</p>');
					}
					break;
				default:
					var title = $('');
					var content = $('');
			}
			
			parent.append(title);
			me.buildRadios(parent, forceEnabled, radioName);
			parent.append(content);
			
			if(moreText)
				me.createMoreLink(parent);
				
			parent.append(contentMore);
							
		}
		
		, buildRadios: function(parent, forceEnabled, name) {
			var me = this;
			
			if(forceEnabled) {
				var radioOne = $('<input type="radio" class="eu-enabled" name="' + name + '" value="1" checked="checked" />');
				var labelOne = $('<label>Enabled</label>');
			} else {
				switch(name)
				{
					
					case 'cookieOne':
						if($.cookie(me.options.cookieOneName) == me.options.cookieOneName) {
							var radioOne = $('<input type="radio" class="eu-enabled" name="' + name + '" value="1" checked="checked" />');
							var radioTwo = $('<input type="radio" class="eu-disabled" name="' + name + '" value="0" />');
						} else {
							var radioOne = $('<input type="radio" class="eu-enabled" name="' + name + '" value="1" />');
							var radioTwo = $('<input type="radio" class="eu-disabled" name="' + name + '" value="0" checked="checked" />');
						}
						break;
					case 'cookieTwo':
						if($.cookie(me.options.cookieTwoName) == me.options.cookieTwoName) {
							var radioOne = $('<input type="radio" class="eu-enabled" name="' + name + '" value="1" checked="checked" />');
							var radioTwo = $('<input type="radio" class="eu-disabled" name="' + name + '" value="0" />');
						} else {
							var radioOne = $('<input type="radio" class="eu-enabled" name="' + name + '" value="1" />');
							var radioTwo = $('<input type="radio" class="eu-disabled" name="' + name + '" value="0" checked="checked" />');
						}
						break;
					case 'cookieThree':
						if($.cookie(me.options.cookieThreeName) == me.options.cookieThreeName) {
							var radioOne = $('<input type="radio" class="eu-enabled" name="' + name + '" value="1" checked="checked" />');
							var radioTwo = $('<input type="radio" class="eu-disabled" name="' + name + '" value="0" />');
						} else {
							var radioOne = $('<input type="radio" class="eu-enabled" name="' + name + '" value="1" />');
							var radioTwo = $('<input type="radio" class="eu-disabled" name="' + name + '" value="0" checked="checked" />');
						}
						break;
					case 'cookieFour':
						if($.cookie(me.options.cookieFourName) == me.options.cookieFourName) {
							var radioOne = $('<input type="radio" class="eu-enabled" name="' + name + '" value="1" checked="checked" />');
							var radioTwo = $('<input type="radio" class="eu-disabled" name="' + name + '" value="0" />');
						} else {
							var radioOne = $('<input type="radio" class="eu-enabled" name="' + name + '" value="1" />');
							var radioTwo = $('<input type="radio" class="eu-disabled" name="' + name + '" value="0" checked="checked" />');
						}
						break;
				}
				
				var labelOne = $('<label>Enabled</label>');
				var labelTwo = $('<label>Disabled</label>');
			}
			
			var formContainer = $('<div class="frm"></div>');
			formContainer.append(radioOne);
			formContainer.append(labelOne);
			formContainer.append(radioTwo);
			formContainer.append(labelTwo);
			
			parent.append(formContainer);
		}
		
		, createMoreLink: function(parent) {
			var me = this;
			
			var moreLinkPara = $('<p></p>');
			
			var moreLink = $('<a href="">+ More</a>').click(function(e) {
				e.preventDefault();
				if($(this).text() == '+ More') {
					$(this).text('- Less');
					$(this).parent().next('p.eu-more-text').show();
				} else {
					$(this).text('+ More');
					$(this).parent().next('p.eu-more-text').hide();
				}
			});
			
			moreLinkPara.append(moreLink);
			parent.append(moreLinkPara);
		}
		
		, openUiDialog: function() {
			$('#dialog').dialog('open');
		}
		
		, openJqmDialog: function() {
			$('#dialog').jqmShow();
		}
		
		, setCookie: function(cookieType) {
			var me = this;
		
			$.cookie(cookieType, cookieType, {
				expires: me.options.cookieExpiration
				, path: '/'
			});
		}
		
		, removeCookie: function(cookieType) {
			var me = this;
			
			$.removeCookie(cookieType, {
				path: '/'
			});
		}
		
		, setAllCookies: function() {
			var me = this;
			
			me.setCookieOne();
			me.setCookieTwo();
			me.setCookieThree();
			me.setCookieFour();
		}
		
		, setCookieOne: function() {
			var me = this;
			
			me.setCookie(me.options.cookieOneName);
		}
		
		, setCookieTwo: function() {
			var me = this;
			
			me.setCookie(me.options.cookieTwoName);
		}
		
		, setCookieThree: function() {
			var me = this;
			
			me.setCookie(me.options.cookieThreeName);
		}
		
		, setCookieFour: function() {
			var me = this;
			
			me.setCookie(me.options.cookieFourName);
		}
		
		, removeCookieOne: function() {
			var me = this;
			
			me.removeCookie(me.options.cookieOneName);
		}
		
		, removeCookieTwo: function() {
			var me = this;
			
			me.removeCookie(me.options.cookieTwoName);
		}
		
		, removeCookieThree: function() {
			var me = this;
			
			me.removeCookie(me.options.cookieThreeName);
		}
		
		, removeCookieFour: function() {
			var me = this;
			
			me.removeCookie(me.options.cookieFourName);
		}
		
		, closeNotification: function() {
			$('div.euCookie-outer').slideUp(400);
			
			$('body').animate({
				'margin-top': this.options.startBodyTopMargin
			}, 400, function() {
				location.reload();
			});
		}
	}

	
	$.fn.euCookieLaw = function(options) {
		
		var instance = $.data( this, 'euCookieLaw' );
		
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				if ( !instance ) {

					logError( "cannot call methods on euCookieLaw prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {

					logError( "no such method '" + options + "' for euCookieLaw instance" );
					return;
				
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
				
				if ( instance ) {

					instance.init();
				
				}
				else {

					instance = $.data( this, 'euCookieLaw', new $.euCookieLaw( options, this ) );
				
				}

			});
		
		}
		
		return instance;
				
	};
	
})(jQuery);