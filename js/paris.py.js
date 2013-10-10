/*!  v2013-10-10 04:26
 * Copyright (c) 2013 Axel Haustant
 */
window.shower=window.shower||function(a,b){function c(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b])}var d,e={},f=a.location,g=b.body,h=[],i=[],j=!(!a.history||!a.history.pushState);return c.prototype={getSlideNumber:function(){return this.number},isLast:function(){return e.slideList.length===this.number+1},isFinished:function(){return this.innerComplete>=this.innerLength},process:function(a){return this.timing?(this.initTimer(a),this):(this.next(a),this)},initTimer:function(a){var b=this;return b.timing?(b.stopTimer(),d=b.isFinished()?setInterval(function(){b.stopTimer(),a.next()},b.timing*(b.innerLength||1)):setInterval(function(){b.isFinished()?(b.stopTimer(),a.next()):b.next(a)},b.timing),this):!1},stopTimer:function(){return d&&(clearInterval(d),d=!1),this},prev:function(a){var c,d=this;return!d.hasInnerNavigation||d.isFinished()||0===d.innerComplete?(a.prev(),!1):(c=b.getElementById(d.id).querySelectorAll(".next.active"),!c||c.length<1?!1:(d.innerComplete>0?(d.innerComplete--,c[c.length-1].classList.remove("active")):a.prev(),this))},next:function(a){var c,d=this;return!d.hasInnerNavigation||d.isFinished()?(a.next(),!1):(d.isFinished()||(c=b.getElementById(d.id).querySelectorAll(".next:not(.active)"),c[0].classList.add("active"),d.innerComplete++),this)}},e._getData=function(a,b){return a.dataset?a.dataset[b]:a.getAttribute("data-"+b)},e.slideList=[],e.init=function(a,d){var f;a=a||".slide",d=d||"div.progress div",h=b.querySelectorAll(a),i=b.querySelector(d);for(var g=0;g<h.length;g++)h[g].id||(h[g].id=g+1),f=e._getData(h[g],"timing"),f&&/^(\d{1,2}:)?\d{1,3}$/.test(f)?(-1!==f.indexOf(":")?(f=f.split(":"),f=1e3*(60*parseInt(f[0],10)+parseInt(f[1],10))):f=1e3*parseInt(f,10),0===f&&(f=!1)):f=!1,e.slideList.push(new c({id:h[g].id,number:g,hasInnerNavigation:null!==h[g].querySelector(".next"),timing:f,innerLength:h[g].querySelectorAll(".next").length,innerComplete:0}));return e},e._getTransform=function(){var b=Math.max(g.clientWidth/a.innerWidth,g.clientHeight/a.innerHeight);return"scale("+1/b+")"},e._applyTransform=function(a){return["WebkitTransform","MozTransform","msTransform","OTransform","transform"].forEach(function(b){g.style[b]=a}),!0},e._isNumber=function(a){return!isNaN(parseFloat(a))&&isFinite(a)},e._normalizeSlideNumber=function(a){if(!e._isNumber(a))throw new Error("Gimme slide number as Number, baby!");return 0>a&&(a=0),a>=e.slideList.length&&(a=e.slideList.length-1),a},e._getSlideIdByEl=function(a){for(;"BODY"!==a.nodeName&&"HTML"!==a.nodeName;){if(a.classList.contains("slide"))return a.id;a=a.parentNode}return""},e._checkInteractiveElement=function(a){return"A"===a.target.nodeName},e.getSlideNumber=function(a){var b,c=e.slideList.length-1;for(""===a&&(b=0);c>=0;--c)if(a===e.slideList[c].id){b=c;break}return b},e.go=function(a,b){var c;if(!e._isNumber(a))throw new Error("Gimme slide number as Number, baby!");return e.slideList[a]?(f.hash=e.getSlideHash(a),e.updateProgress(a),e.updateActiveAndVisitedSlides(a),e.isSlideMode()&&(e.showPresenterNotes(a),c=e.slideList[a],c.timing&&c.initTimer(e)),"function"==typeof b&&b(),a):!1},e.next=function(a){var b=e.getCurrentSlideNumber(),c=e.slideList[b+1];return c?(e.go(b+1),"function"==typeof a&&a(),this):!1},e._turnNextSlide=function(a){var b=e.getCurrentSlideNumber(),c=e.slideList[b];e.isSlideMode()?(c.stopTimer(),c.next(e)):e.go(b+1),"function"==typeof a&&a()},e.prev=e.previous=function(a){var b=e.getCurrentSlideNumber();return 1>b?!1:(e.go(b-1),"function"==typeof a&&a(),!0)},e._turnPreviousSlide=function(a){var b=e.getCurrentSlideNumber(),c=e.slideList[b];return c.stopTimer(),e.isSlideMode()?c.prev(e):e.go(b-1),"function"==typeof a&&a(),!0},e.first=function(a){var b=e.slideList[e.getCurrentSlideNumber()];b.timing&&b.stopTimer(),e.go(0),"function"==typeof a&&a()},e.last=function(a){var b=e.slideList[e.getCurrentSlideNumber()];b.timing&&b.stopTimer(),e.go(e.slideList.length-1),"function"==typeof a&&a()},e.enterSlideMode=function(a){var b=e.getCurrentSlideNumber();return g.classList.remove("list"),g.classList.add("full"),e.isListMode()&&j&&history.pushState(null,null,f.pathname+"?full"+e.getSlideHash(b)),e._applyTransform(e._getTransform()),"function"==typeof a&&a(),!0},e.enterListMode=function(a){var b;return g.classList.remove("full"),g.classList.add("list"),e.clearPresenterNotes(),e.isListMode()?!1:(b=e.getCurrentSlideNumber(),e.slideList[b].stopTimer(),e.isSlideMode()&&j&&history.pushState(null,null,f.pathname+e.getSlideHash(b)),e.scrollToSlide(b),e._applyTransform("none"),"function"==typeof a&&a(),!0)},e.toggleMode=function(a){return e.isListMode()?e.enterSlideMode():e.enterListMode(),"function"==typeof a&&a(),!0},e.getCurrentSlideNumber=function(){for(var a=e.slideList.length-1,b=f.hash.substr(1);a>=0;--a)if(b===e.slideList[a].id)return a;return-1},e.scrollToSlide=function(c){var d,f=!1;if(!e._isNumber(c))throw new Error("Gimme slide number as Number, baby!");if(e.isSlideMode())throw new Error("You can't scroll to because you in slide mode. Please, switch to list mode.");if(-1===c)return f;if(!e.slideList[c])throw new Error("There is no slide with number "+c);return d=b.getElementById(e.slideList[c].id),a.scrollTo(0,d.offsetTop),f=!0,f},e.isListMode=function(){return j?!/^full.*/.test(f.search.substr(1)):g.classList.contains("list")},e.isSlideMode=function(){return j?/^full.*/.test(f.search.substr(1)):g.classList.contains("full")},e.updateProgress=function(a){if(null===i)return!1;if(!e._isNumber(a))throw new Error("Gimme slide number as Number, baby!");return i.style.width=(100/(e.slideList.length-1)*e._normalizeSlideNumber(a)).toFixed(2)+"%",!0},e.updateActiveAndVisitedSlides=function(a){var c,d,f=e.slideList.length;if(a=e._normalizeSlideNumber(a),!e._isNumber(a))throw new Error("Gimme slide number as Number, baby!");for(c=0;f>c;++c)d=b.getElementById(e.slideList[c].id),a>c?(d.classList.remove("active"),d.classList.add("visited")):c>a?(d.classList.remove("visited"),d.classList.remove("active")):(d.classList.remove("visited"),d.classList.add("active"));return!0},e.clearPresenterNotes=function(){a.console&&a.console.clear&&console.clear()},e.showPresenterNotes=function(c){if(e.clearPresenterNotes(),a.console){c=e._normalizeSlideNumber(c);var d=e.slideList[c].id,f=e.slideList[c+1]?e.slideList[c+1].id:null,g=b.getElementById(d).querySelector("footer");if(g&&g.innerHTML&&console.info(g.innerHTML.replace(/\n\s+/g,"\n")),f){var h=b.getElementById(f).querySelector("h2");h&&(h=h.innerHTML.replace(/^\s+|<[^>]+>/g,""),console.info("NEXT: "+h))}}},e.getSlideHash=function(a){if(!e._isNumber(a))throw new Error("Gimme slide number as Number, baby!");return a=e._normalizeSlideNumber(a),"#"+e.slideList[a].id},a.addEventListener("DOMContentLoaded",function(){(g.classList.contains("full")||e.isSlideMode())&&(e.go(e.getCurrentSlideNumber()),e.enterSlideMode())},!1),a.addEventListener("popstate",function(){e.isListMode()?e.enterListMode():e.enterSlideMode()},!1),a.addEventListener("resize",function(){e.isSlideMode()&&e._applyTransform(e._getTransform())},!1),b.addEventListener("keydown",function(a){var b,c=e.getCurrentSlideNumber(),d=e.slideList[-1!==c?c:0];switch(a.which){case 80:e.isListMode()&&a.altKey&&a.metaKey&&(a.preventDefault(),b=d.number,e.go(b),e.enterSlideMode(),e.showPresenterNotes(b),d.timing&&d.initTimer(e));break;case 116:a.preventDefault(),e.isListMode()?(b=a.shiftKey?d.number:0,e.go(b),e.enterSlideMode(),e.showPresenterNotes(b),d.timing&&d.initTimer(e)):e.enterListMode();break;case 13:e.isListMode()&&-1!==c&&(a.preventDefault(),e.enterSlideMode(),e.showPresenterNotes(c),d.timing&&d.initTimer(e));break;case 27:e.isSlideMode()&&(a.preventDefault(),e.enterListMode());break;case 33:case 38:case 37:case 72:case 75:if(a.altKey||a.ctrlKey||a.metaKey)return;a.preventDefault(),e._turnPreviousSlide();break;case 34:case 40:case 39:case 76:case 74:if(a.altKey||a.ctrlKey||a.metaKey)return;a.preventDefault(),e._turnNextSlide();break;case 36:a.preventDefault(),e.first();break;case 35:a.preventDefault(),e.last();break;case 9:case 32:a.preventDefault(),e[a.shiftKey?"_turnPreviousSlide":"_turnNextSlide"]()}},!1),e.init(),b.addEventListener("click",function(a){var b,c=e.getSlideNumber(e._getSlideIdByEl(a.target));e.isListMode()&&e._getSlideIdByEl(a.target)&&(e.go(c),e.enterSlideMode(),e.showPresenterNotes(c),b=e.slideList[c],b.timing&&b.initTimer(e))},!1),b.addEventListener("touchstart",function(b){var c,d,f=e.getSlideNumber(e._getSlideIdByEl(b.target));e._getSlideIdByEl(b.target)&&(e.isSlideMode()&&!e._checkInteractiveElement(b)&&(d=b.touches[0].pageX,d>a.innerWidth/2?e._turnNextSlide():e._turnPreviousSlide()),e.isListMode()&&(e.go(e.getSlideNumber(e._getSlideIdByEl(b.target))),e.enterSlideMode(),e.showPresenterNotes(f),c=e.slideList[f],c.timing&&c.initTimer(e)))},!1),b.addEventListener("touchmove",function(a){e.isSlideMode()&&a.preventDefault()},!1),e}(this,this.document);