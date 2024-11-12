/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
Drupal.debounce=function(func,wait,immediate){let timeout;let result;return function(...args){const context=this;const later=function(){timeout=null;if(!immediate)result=func.apply(context,args);};const callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow)result=func.apply(context,args);return result;};};;
(function($,Drupal,debounce){$.fn.drupalGetSummary=function(){const callback=this.data('summaryCallback');if(!this[0]||!callback)return '';const result=callback(this[0]);return result?result.trim():'';};$.fn.drupalSetSummary=function(callback){const self=this;if(typeof callback!=='function'){const val=callback;callback=function(){return val;};}return (this.data('summaryCallback',callback).off('formUpdated.summary').on('formUpdated.summary',()=>{self.trigger('summaryUpdated');}).trigger('summaryUpdated'));};Drupal.behaviors.formSingleSubmit={attach(){function onFormSubmit(e){const $form=$(e.currentTarget);const formValues=new URLSearchParams(new FormData(e.target)).toString();const previousValues=$form.attr('data-drupal-form-submit-last');if(previousValues===formValues)e.preventDefault();else $form.attr('data-drupal-form-submit-last',formValues);}$(once('form-single-submit','body')).on('submit.singleSubmit','form:not([method~="GET"])',onFormSubmit);}};function triggerFormUpdated(element){$(element).trigger('formUpdated');}function fieldsList(form){return [].map.call(form.querySelectorAll('[name][id]'),(el)=>el.id);}Drupal.behaviors.formUpdated={attach(context){const $context=$(context);const contextIsForm=context.tagName==='FORM';const $forms=$(once('form-updated',contextIsForm?$context:$context.find('form')));let formFields;if($forms.length)$.makeArray($forms).forEach((form)=>{const events='change.formUpdated input.formUpdated ';const eventHandler=debounce((event)=>{triggerFormUpdated(event.target);},300);formFields=fieldsList(form).join(',');form.setAttribute('data-drupal-form-fields',formFields);$(form).on(events,eventHandler);});if(contextIsForm){formFields=fieldsList(context).join(',');const currentFields=$(context).attr('data-drupal-form-fields');if(formFields!==currentFields)triggerFormUpdated(context);}},detach(context,settings,trigger){const $context=$(context);const contextIsForm=context.tagName==='FORM';if(trigger==='unload')once.remove('form-updated',contextIsForm?$context:$context.find('form')).forEach((form)=>{form.removeAttribute('data-drupal-form-fields');$(form).off('.formUpdated');});}};Drupal.behaviors.fillUserInfoFromBrowser={attach(context,settings){const userInfo=['name','mail','homepage'];const $forms=$(once('user-info-from-browser','[data-user-info-from-browser]'));if($forms.length)userInfo.forEach((info)=>{const $element=$forms.find(`[name=${info}]`);const browserData=localStorage.getItem(`Drupal.visitor.${info}`);if(!$element.length)return;const emptyValue=$element[0].value==='';const defaultValue=$element.attr('data-drupal-default-value')===$element[0].value;if(browserData&&(emptyValue||defaultValue))$element.each(function(index,item){item.value=browserData;});});$forms.on('submit',()=>{userInfo.forEach((info)=>{const $element=$forms.find(`[name=${info}]`);if($element.length)localStorage.setItem(`Drupal.visitor.${info}`,$element[0].value);});});}};const handleFragmentLinkClickOrHashChange=(e)=>{let url;if(e.type==='click')url=e.currentTarget.location?e.currentTarget.location:e.currentTarget;else url=window.location;const hash=url.hash.substring(1);if(hash){const $target=$(`#${hash}`);$('body').trigger('formFragmentLinkClickOrHashChange',[$target]);setTimeout(()=>$target.trigger('focus'),300);}};const debouncedHandleFragmentLinkClickOrHashChange=debounce(handleFragmentLinkClickOrHashChange,300,true);$(window).on('hashchange.form-fragment',debouncedHandleFragmentLinkClickOrHashChange);$(document).on('click.form-fragment','a[href*="#"]',debouncedHandleFragmentLinkClickOrHashChange);})(jQuery,Drupal,Drupal.debounce);;
(function($){"use strict";Drupal.behaviors.CaptchaRefresh={attach:function(context){$('.reload-captcha',context).not('.processed').bind('click',function(){$(this).addClass('processed');const $form=$(this).parents('form');const date=new Date();const baseUrl=document.location.origin;const url=baseUrl.replace(/\/$/g,'')+'/'+$(this).attr('href').replace(/^\//g,'')+'?'+date.getTime();$('.captcha').addClass('captcha--loading');$.get(url,{},function(response){if(response.status===1){$('.captcha',$form).find('img').attr('src',response.data.url);$('input[name=captcha_sid]',$form).val(response.data.sid);$('input[name=captcha_token]',$form).val(response.data.token);$('.captcha').removeClass('captcha--loading');}else alert(response.message);},'json');return false;});}};})(jQuery);;
((Drupal,once,tabbable)=>{function isNavOpen(navWrapper){return navWrapper.classList.contains('is-active');}function toggleNav(props,state){const value=!!state;props.navButton.setAttribute('aria-expanded',value);props.body.classList.toggle('is-overlay-active',value);props.body.classList.toggle('is-fixed',value);props.navWrapper.classList.toggle('is-active',value);}function init(props){props.navButton.setAttribute('aria-controls',props.navWrapperId);props.navButton.setAttribute('aria-expanded','false');props.navButton.addEventListener('click',()=>{toggleNav(props,!isNavOpen(props.navWrapper));});document.addEventListener('keyup',(e)=>{if(e.key==='Escape')if(props.olivero.areAnySubNavsOpen())props.olivero.closeAllSubNav();else toggleNav(props,false);});props.overlay.addEventListener('click',()=>{toggleNav(props,false);});props.overlay.addEventListener('touchstart',()=>{toggleNav(props,false);});props.header.addEventListener('keydown',(e)=>{if(e.key==='Tab'&&isNavOpen(props.navWrapper)){const tabbableNavElements=tabbable.tabbable(props.navWrapper);tabbableNavElements.unshift(props.navButton);const firstTabbableEl=tabbableNavElements[0];const lastTabbableEl=tabbableNavElements[tabbableNavElements.length-1];if(e.shiftKey){if(document.activeElement===firstTabbableEl&&!props.olivero.isDesktopNav()){lastTabbableEl.focus();e.preventDefault();}}else{if(document.activeElement===lastTabbableEl&&!props.olivero.isDesktopNav()){firstTabbableEl.focus();e.preventDefault();}}}});window.addEventListener('resize',()=>{if(props.olivero.isDesktopNav()){toggleNav(props,false);props.body.classList.remove('is-overlay-active');props.body.classList.remove('is-fixed');}Drupal.olivero.closeAllSubNav();});props.navWrapper.addEventListener('click',(e)=>{if(e.target.matches(`[href*="${window.location.pathname}#"], [href*="${window.location.pathname}#"] *, [href^="#"], [href^="#"] *`))toggleNav(props,false);});}Drupal.behaviors.oliveroNavigation={attach(context){const headerId='header';const header=once('navigation',`#${headerId}`,context).shift();const navWrapperId='header-nav';if(header){const navWrapper=header.querySelector(`#${navWrapperId}`);const {olivero}=Drupal;const navButton=context.querySelector('[data-drupal-selector="mobile-nav-button"]');const body=document.body;const overlay=context.querySelector('[data-drupal-selector="header-nav-overlay"]');init({olivero,header,navWrapperId,navWrapper,navButton,body,overlay});}}};})(Drupal,once,tabbable);;
((Drupal)=>{const {isDesktopNav}=Drupal.olivero;const secondLevelNavMenus=document.querySelectorAll('[data-drupal-selector="primary-nav-menu-item-has-children"]');function toggleSubNav(topLevelMenuItem,toState){const buttonSelector='[data-drupal-selector="primary-nav-submenu-toggle-button"]';const button=topLevelMenuItem.querySelector(buttonSelector);const state=toState!==undefined?toState:button.getAttribute('aria-expanded')!=='true';if(state){if(isDesktopNav())secondLevelNavMenus.forEach((el)=>{el.querySelector(buttonSelector).setAttribute('aria-expanded','false');el.querySelector('[data-drupal-selector="primary-nav-menu--level-2"]').classList.remove('is-active-menu-parent');el.querySelector('[data-drupal-selector="primary-nav-menu-🥕"]').classList.remove('is-active-menu-parent');});}else topLevelMenuItem.classList.remove('is-touch-event');button.setAttribute('aria-expanded',state);topLevelMenuItem.querySelector('[data-drupal-selector="primary-nav-menu--level-2"]').classList.toggle('is-active-menu-parent',state);topLevelMenuItem.querySelector('[data-drupal-selector="primary-nav-menu-🥕"]').classList.toggle('is-active-menu-parent',state);}Drupal.olivero.toggleSubNav=toggleSubNav;function handleBlur(e){if(!Drupal.olivero.isDesktopNav())return;setTimeout(()=>{const menuParentItem=e.target.closest('[data-drupal-selector="primary-nav-menu-item-has-children"]');if(!menuParentItem.contains(document.activeElement))toggleSubNav(menuParentItem,false);},200);}secondLevelNavMenus.forEach((el)=>{const button=el.querySelector('[data-drupal-selector="primary-nav-submenu-toggle-button"]');button.removeAttribute('aria-hidden');button.removeAttribute('tabindex');el.addEventListener('touchstart',()=>{el.classList.add('is-touch-event');},{passive:true});el.addEventListener('mouseover',()=>{if(isDesktopNav()&&!el.classList.contains('is-touch-event')){el.classList.add('is-active-mouseover-event');toggleSubNav(el,true);setTimeout(()=>{el.classList.remove('is-active-mouseover-event');},500);}});button.addEventListener('click',()=>{if(!el.classList.contains('is-active-mouseover-event'))toggleSubNav(el);});el.addEventListener('mouseout',()=>{if(isDesktopNav()&&!document.activeElement.matches('[aria-expanded="true"], .is-active-menu-parent *'))toggleSubNav(el,false);});el.addEventListener('blur',handleBlur,true);});function closeAllSubNav(){secondLevelNavMenus.forEach((el)=>{if(el.contains(document.activeElement))el.querySelector('[data-drupal-selector="primary-nav-submenu-toggle-button"]').focus();toggleSubNav(el,false);});}Drupal.olivero.closeAllSubNav=closeAllSubNav;function areAnySubNavsOpen(){let subNavsAreOpen=false;secondLevelNavMenus.forEach((el)=>{const button=el.querySelector('[data-drupal-selector="primary-nav-submenu-toggle-button"]');const state=button.getAttribute('aria-expanded')==='true';if(state)subNavsAreOpen=true;});return subNavsAreOpen;}Drupal.olivero.areAnySubNavsOpen=areAnySubNavsOpen;document.addEventListener('keyup',(e)=>{if(e.key==='Escape')if(isDesktopNav())closeAllSubNav();});document.addEventListener('touchstart',(e)=>{if(areAnySubNavsOpen()&&!e.target.matches('[data-drupal-selector="header-nav"], [data-drupal-selector="header-nav"] *'))closeAllSubNav();},{passive:true});})(Drupal);;
((Drupal,once)=>{function transitionToDesktopNavigation(navWrapper,navItem){document.body.classList.remove('is-always-mobile-nav');if(navWrapper.clientHeight>navItem.clientHeight)document.body.classList.add('is-always-mobile-nav');}function checkIfDesktopNavigationWraps(entries){const navItem=document.querySelector('.primary-nav__menu-item');if(Drupal.olivero.isDesktopNav()&&entries[0].contentRect.height>navItem.clientHeight){const navMediaQuery=window.matchMedia(`(max-width: ${window.innerWidth+15}px)`);document.body.classList.add('is-always-mobile-nav');navMediaQuery.addEventListener('change',()=>{transitionToDesktopNavigation(entries[0].target,navItem);},{once:true});}}function init(primaryNav){const resizeObserver=new ResizeObserver(checkIfDesktopNavigationWraps);resizeObserver.observe(primaryNav);}Drupal.behaviors.automaticMobileNav={attach(context){once('olivero-automatic-mobile-nav','[data-drupal-selector="primary-nav-menu--level-1"]',context).forEach(init);}};})(Drupal,once);;
