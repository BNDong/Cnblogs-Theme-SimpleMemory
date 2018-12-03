/*!
* Optiscroll.js v2.0.1
* https://github.com/wilsonfletcher/Optiscroll/
* by Alberto Gasparin
*
* @copyright 2016 Wilson Fletcher
* @license Released under MIT LICENSE
*/

;(function ( window, document, Math, undefined ) {
  'use strict';

/*
 * CustomEvent polyfill for IE9
 * By MDN
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
 * MIT LICENSE
 */

typeof window.CustomEvent === 'function' || (function (window) {

  function CustomEvent (event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;

})(window);


// Adaped from https://github.com/darius/requestAnimationFrame
// requestAnimationFrame polyfill by Erik Möller.
// MIT license

window.requestAnimationFrame || (function(window) {
  var lastTime = 0;

  window.requestAnimationFrame = function(callback) {
    var now = Date.now();
    var nextTime = Math.max(lastTime + 16, now);

    return setTimeout(function() {
      callback(lastTime = nextTime);
    }, nextTime - now);
  };

  window.cancelAnimationFrame = clearTimeout;

}(window));



/**
 * Optiscroll, use this to create instances
 * ```
 * var scrolltime = new Optiscroll(element);
 * ```
 */
var Optiscroll = function Optiscroll(element, options) {
  return new Optiscroll.Instance(element, options || {});
};



var GS = Optiscroll.globalSettings = {
  scrollMinUpdateInterval: 1000 / 40, // 40 FPS
  checkFrequency: 1000,
  pauseCheck: false,
};

Optiscroll.defaults = {
  preventParentScroll: false,
  forceScrollbars: false,
  scrollStopDelay: 300,
  maxTrackSize: 95,
  minTrackSize: 5,
  draggableTracks: true,
  autoUpdate: true,
  classPrefix: 'optiscroll-',
};



Optiscroll.Instance = function (element, options) {
  var me = this;

  // instance variables
  me.element = element;
  me.settings = _extend(_extend({}, Optiscroll.defaults), options || {});
  me.cache = {};

  me.init();
};



Optiscroll.Instance.prototype = {


  init: function () {
    var me = this,
        settings = me.settings,
        shouldCreateScrollbars = false;

    me.scrollEl = Utils.createWrapper(me.element, settings.classPrefix + 'content');
    toggleClass(me.element, 'is-enabled', true);

    // initialize scrollbars
    me.scrollbars = {
      v: Scrollbar('v', me),
      h: Scrollbar('h', me),
    };

    // create DOM scrollbars only if they have size or if it's forced
    if(G.nativeScrollbarSize || settings.forceScrollbars) {
      shouldCreateScrollbars = Utils.hideNativeScrollbars(me.scrollEl);
    }

    if(shouldCreateScrollbars) {
      _invoke(me.scrollbars, 'create');
    }

    if(G.isTouch && settings.preventParentScroll) {
      toggleClass(me.element, settings.classPrefix + 'prevent', true);
    }

    // calculate scrollbars
    me.update();

    // bind container events
    me.bind();

    // add instance to global array for timed check
    if(settings.autoUpdate) {
      G.instances.push(me);
    }

    // start the timed check if it is not already running
    if(settings.autoUpdate && !G.checkTimer) {
      Utils.checkLoop();
    }

  },



  bind: function () {
    var me = this,
        listeners = me.listeners = {},
        scrollEl = me.scrollEl;

    // scroll event binding
    listeners.scroll = _throttle(function (ev) {
      Events.scroll(ev, me);
    }, GS.scrollMinUpdateInterval);

    if(G.isTouch) {
      listeners.touchstart = function (ev) { Events.touchstart(ev, me); };
      listeners.touchend = function (ev) { Events.touchend(ev, me); };
    }

    // Safari does not support wheel event
    listeners.mousewheel = listeners.wheel = function (ev) { Events.wheel(ev, me); };

    for (var ev in listeners) {
      scrollEl.addEventListener(ev, listeners[ev]);
    }

  },




  update: function () {
    var me = this,
        oldcH = me.cache.clientH,
        scrollEl = me.scrollEl,
        cache = me.cache,
        sH = scrollEl.scrollHeight,
        cH = scrollEl.clientHeight,
        sW = scrollEl.scrollWidth,
        cW = scrollEl.clientWidth;

    if(sH !== cache.scrollH || cH !== cache.clientH ||
      sW !== cache.scrollW || cW !== cache.clientW) {

      cache.scrollH = sH;
      cache.clientH = cH;
      cache.scrollW = sW;
      cache.clientW = cW;

      // only fire if cache was defined
      if(oldcH !== undefined) {

        // if the element is no more in the DOM
        if(sH === 0 && cH === 0 && !Utils.containsNode(document.body, me.element)) {
          me.destroy();
          return false;
        }

        me.fireCustomEvent('sizechange');
      }

      // this will update the scrollbar
      // and check if bottom is reached
      _invoke(me.scrollbars, 'update');
    }
  },




  /**
   * Animate scrollTo
   */
  scrollTo: function (destX, destY, duration) {
    var me = this,
        cache = me.cache,
        startX, startY, endX, endY;

    G.pauseCheck = true;
    // force update
    me.update();

    startX = me.scrollEl.scrollLeft;
    startY = me.scrollEl.scrollTop;

    endX = +destX;
    if(destX === 'left') { endX = 0; }
    if(destX === 'right') { endX = cache.scrollW - cache.clientW; }
    if(destX === false) { endX = startX; }

    endY = +destY;
    if(destY === 'top') { endY = 0; }
    if(destY === 'bottom') { endY = cache.scrollH - cache.clientH; }
    if(destY === false) { endY = startY; }

    // animate
    me.animateScroll(startX, endX, startY, endY, +duration);

  },



  scrollIntoView: function (elem, duration, delta) {
    var me = this,
        scrollEl = me.scrollEl,
        eDim, sDim,
        leftEdge, topEdge, rightEdge, bottomEdge,
        offsetX, offsetY,
        startX, startY, endX, endY;

    G.pauseCheck = true;
    // force update
    me.update();

    if(typeof elem === 'string') { // selector
      elem = scrollEl.querySelector(elem);
    } else if(elem.length && elem.jquery) { // jquery element
      elem = elem[0];
    }

    if(typeof delta === 'number') { // same delta for all
      delta = { top: delta, right: delta, bottom: delta, left: delta };
    }

    delta = delta || {};
    eDim = elem.getBoundingClientRect();
    sDim = scrollEl.getBoundingClientRect();

    startX = endX = scrollEl.scrollLeft;
    startY = endY = scrollEl.scrollTop;
    offsetX = startX + eDim.left - sDim.left;
    offsetY = startY + eDim.top - sDim.top;

    leftEdge = offsetX - (delta.left || 0);
    topEdge = offsetY - (delta.top || 0);
    rightEdge = offsetX + eDim.width - me.cache.clientW + (delta.right || 0);
    bottomEdge = offsetY + eDim.height - me.cache.clientH + (delta.bottom || 0);

    if(leftEdge < startX) { endX = leftEdge; }
    if(rightEdge > startX) { endX = rightEdge; }

    if(topEdge < startY) { endY = topEdge; }
    if(bottomEdge > startY) { endY = bottomEdge; }

    // animate
    me.animateScroll(startX, endX, startY, endY, +duration);
  },




  animateScroll: function (startX, endX, startY, endY, duration) {
    var me = this,
        scrollEl = me.scrollEl,
        startTime = Date.now();

    if(endX === startX && endY === startY) {
      return;
    }

    if(duration === 0) {
      scrollEl.scrollLeft = endX;
      scrollEl.scrollTop = endY;
      return;
    }

    if(isNaN(duration)) { // undefined or auto
      // 500px in 430ms, 1000px in 625ms, 2000px in 910ms
      duration = Math.pow(Math.max(Math.abs(endX - startX), Math.abs(endY - startY)), 0.54) * 15;
    }

    (function animate () {
      var time = Math.min(1, ((Date.now() - startTime) / duration)),
          easedTime = Utils.easingFunction(time);

      if(endY !== startY) {
        scrollEl.scrollTop = ~~(easedTime * (endY - startY)) + startY;
      }
      if(endX !== startX) {
        scrollEl.scrollLeft = ~~(easedTime * (endX - startX)) + startX;
      }

      me.scrollAnimation = time < 1 ? window.requestAnimationFrame(animate) : null;
    }());
  },




  destroy: function () {
    var me = this,
        element = me.element,
        scrollEl = me.scrollEl,
        listeners = me.listeners,
        index = G.instances.indexOf(me),
        child;

    if(!me.scrollEl) { return; }

    // unbind events
    for (var ev in listeners) {
      scrollEl.removeEventListener(ev, listeners[ev]);
    }

    // remove scrollbars elements
    _invoke(me.scrollbars, 'remove');

    // unwrap content
    while(child = scrollEl.childNodes[0]) {
      element.insertBefore(child, scrollEl);
    }
    element.removeChild(scrollEl);
    me.scrollEl = null;

    // remove classes
    toggleClass(element, me.settings.classPrefix + 'prevent', false);
    toggleClass(element, 'is-enabled', false);

    // defer instance removal from global array
    // to not affect checkLoop _invoke
    if (index > -1) {
      window.requestAnimationFrame(function () {
        G.instances.splice(index, 1);
      });
    }
  },




  fireCustomEvent: function (eventName) {
    var me = this,
        cache = me.cache,
        sH = cache.scrollH, sW = cache.scrollW,
        eventData;

    eventData = {
      // scrollbars data
      scrollbarV: _extend({}, cache.v),
      scrollbarH: _extend({}, cache.h),

      // scroll position
      scrollTop: cache.v.position * sH,
      scrollLeft: cache.h.position * sW,
      scrollBottom: (1 - cache.v.position - cache.v.size) * sH,
      scrollRight: (1 - cache.h.position - cache.h.size) * sW,

      // element size
      scrollWidth: sW,
      scrollHeight: sH,
      clientWidth: cache.clientW,
      clientHeight: cache.clientH,
    };

    me.element.dispatchEvent(new CustomEvent(eventName, { detail: eventData }));
  },

};




var Events = {

  scroll: function (ev, me) {

    if (!G.pauseCheck) {
      me.fireCustomEvent('scrollstart');
    }
    G.pauseCheck = true;

    me.scrollbars.v.update();
    me.scrollbars.h.update();

    me.fireCustomEvent('scroll');

    clearTimeout(me.cache.timerStop);
    me.cache.timerStop = setTimeout(function () {
      Events.scrollStop(me);
    }, me.settings.scrollStopDelay);
  },


  touchstart: function (ev, me) {
    G.pauseCheck = false;
    me.scrollbars.v.update();
    me.scrollbars.h.update();

    Events.wheel(ev, me);
  },


  touchend: function (ev, me) {
    // prevents touchmove generate scroll event to call
    // scrollstop  while the page is still momentum scrolling
    clearTimeout(me.cache.timerStop);
  },


  scrollStop: function (me) {
    me.fireCustomEvent('scrollstop');
    G.pauseCheck = false;
  },


  wheel: function (ev, me) {
    var cache = me.cache,
        cacheV = cache.v,
        cacheH = cache.h,
        preventScroll = me.settings.preventParentScroll;

    window.cancelAnimationFrame(me.scrollAnimation);

    if(preventScroll && cacheV.enabled && cacheV.percent % 100 === 0) {
      me.scrollEl.scrollTop = cacheV.percent ? (cache.scrollH - cache.clientH - 1) : 1;
    }
    if(preventScroll && cacheH.enabled && cacheH.percent % 100 === 0) {
      me.scrollEl.scrollLeft = cacheH.percent ? (cache.scrollW - cache.clientW - 1) : 1;
    }
  },


};


var Scrollbar = function (which, instance) {

  var isVertical = (which === 'v'),
      parentEl = instance.element,
      scrollEl = instance.scrollEl,
      settings = instance.settings,
      cache = instance.cache,
      scrollbarCache = cache[which] = {},

      sizeProp = isVertical ? 'H' : 'W',
      clientSize = 'client' + sizeProp,
      scrollSize = 'scroll' + sizeProp,
      scrollProp = isVertical ? 'scrollTop' : 'scrollLeft',
      evNames = isVertical ? ['top','bottom'] : ['left','right'],

      enabled = false,
      scrollbarEl = null,
      trackEl = null;

  var events = {
    dragData: null,

    dragStart: function (ev) {
      var evData = ev.touches ? ev.touches[0] : ev;
      events.dragData = { x: evData.pageX, y: evData.pageY, scroll: scrollEl[scrollProp] };
      events.bind(true);
    },

    dragMove: function (ev) {
      var evData = ev.touches ? ev.touches[0] : ev,
          delta, deltaRatio;

      ev.preventDefault();
      delta = isVertical ? evData.pageY - events.dragData.y : evData.pageX - events.dragData.x;
      deltaRatio = delta / cache[clientSize];

      scrollEl[scrollProp] = events.dragData.scroll + deltaRatio * cache[scrollSize];
    },

    dragEnd: function () {
      events.dragData = null;
      events.bind(false);
    },

    bind: function (on) {
      var method = (on ? 'add' : 'remove') + 'EventListener',
          type = G.isTouch ? ['touchmove', 'touchend'] : ['mousemove', 'mouseup'];

      document[method](type[0], events.dragMove);
      document[method](type[1], events.dragEnd);
    },

  };

  return {


    toggle: function (bool) {
      enabled = bool;

      if(trackEl) {
        toggleClass(parentEl, 'has-' + which + 'track', enabled);
      }

      // expose enabled
      scrollbarCache.enabled = enabled;
    },


    create: function () {
      var evType = G.isTouch ? 'touchstart' : 'mousedown';
      scrollbarEl = document.createElement('div');
      trackEl = document.createElement('b');

      scrollbarEl.className = settings.classPrefix + which;
      trackEl.className = settings.classPrefix + which + 'track';
      scrollbarEl.appendChild(trackEl);
      parentEl.appendChild(scrollbarEl);

      if(settings.draggableTracks) {
        trackEl.addEventListener(evType, events.dragStart);
      }
    },


    update: function () {
      var me = this,
          newSize, oldSize,
          newDim, newRelPos, deltaPos;

      // if scrollbar is disabled and no scroll
      if(!enabled && cache[clientSize] === cache[scrollSize]) {
        return;
      }

      newDim = this.calc();
      newSize = newDim.size;
      oldSize = scrollbarCache.size;
      newRelPos = (1 / newSize) * newDim.position * 100;
      deltaPos = Math.abs(newDim.position - (scrollbarCache.position || 0)) * cache[clientSize];

      if(newSize === 1 && enabled) {
        me.toggle(false);
      }

      if(newSize < 1 && !enabled) {
        me.toggle(true);
      }

      if(trackEl && enabled) {
        me.style(newRelPos, deltaPos, newSize, oldSize);
      }

      // update cache values
      scrollbarCache = _extend(scrollbarCache, newDim);

      if(enabled) {
        me.fireEdgeEv();
      }

    },


    style: function (newRelPos, deltaPos, newSize, oldSize) {
      if(newSize !== oldSize) {
        trackEl.style[ isVertical ? 'height' : 'width' ] = newSize * 100 + '%';
      }
      trackEl.style[G.cssTransform] = 'translate(' + (isVertical ? '0%,' + newRelPos + '%' : newRelPos + '%' + ',0%') + ')';
    },


    calc: function () {
      var position = scrollEl[scrollProp],
          viewS = cache[clientSize],
          scrollS = cache[scrollSize],
          sizeRatio = viewS / scrollS,
          sizeDiff = scrollS - viewS,
          positionRatio, percent;

      if(sizeRatio >= 1 || !scrollS) { // no scrollbars needed
        return { position: 0, size: 1, percent: 0 };
      }

      percent = 100 * position / sizeDiff;

      // prevent overscroll effetcs (negative percent)
      // and keep 1px tolerance near the edges
      if(position <= 1) { percent = 0; }
      if(position >= sizeDiff - 1) { percent = 100; }

      // Capped size based on min/max track percentage
      sizeRatio = Math.max(sizeRatio, settings.minTrackSize / 100);
      sizeRatio = Math.min(sizeRatio, settings.maxTrackSize / 100);

      positionRatio = (1 - sizeRatio) * (percent / 100);

      return { position: positionRatio, size: sizeRatio, percent: percent };
    },


    fireEdgeEv: function () {
      var percent = scrollbarCache.percent;

      if(scrollbarCache.was !== percent && percent % 100 === 0) {
        instance.fireCustomEvent('scrollreachedge');
        instance.fireCustomEvent('scrollreach' + evNames[percent / 100]);
      }

      scrollbarCache.was = percent;
    },


    remove: function () {
      // remove parent custom classes
      this.toggle(false);
      // remove elements
      if(scrollbarEl) {
        scrollbarEl.parentNode.removeChild(scrollbarEl);
        scrollbarEl = null;
      }
    },

  };

};


var Utils = {

  hideNativeScrollbars: function (scrollEl) {
    var size = G.nativeScrollbarSize,
        scrollElStyle = scrollEl.style;
    if(size === 0) {
      // hide Webkit/touch scrollbars
      var time = Date.now();
      scrollEl.setAttribute('data-scroll', time);
      return Utils.addCssRule('[data-scroll="' + time + '"]::-webkit-scrollbar', 'display:none;width:0;height:0;');
    } else {
      scrollElStyle.right = -size + 'px';
      scrollElStyle.bottom = -size + 'px';
      return true;
    }
  },


  addCssRule: function (selector, rules) {
    var styleSheet = document.getElementById('scroll-sheet');
    if(!styleSheet) {
      styleSheet = document.createElement('style');
      styleSheet.id = 'scroll-sheet';
      styleSheet.appendChild(document.createTextNode('')); // WebKit hack
      document.head.appendChild(styleSheet);
    }
    try {
      styleSheet.sheet.insertRule(selector + ' {' + rules + '}', 0);
      return true;
    } catch (e) { return; }
  },


  createWrapper: function (element, className) {
    var wrapper = document.createElement('div'),
        child;
    while(child = element.childNodes[0]) {
      wrapper.appendChild(child);
    }
    wrapper.className = className;
    return element.appendChild(wrapper);
  },


  containsNode: function (parent, node) {
    return parent.contains ?
      parent != node && parent.contains(node) :
      !!(parent.compareDocumentPosition(node) & 16);
  },


  // Global height checker
  // looped to listen element changes
  checkLoop: function () {

    if(!G.instances.length) {
      G.checkTimer = null;
      return;
    }

    if(!G.pauseCheck) { // check size only if not scrolling
      _invoke(G.instances, 'update');
    }

    if(GS.checkFrequency) {
      G.checkTimer = setTimeout(function () {
        Utils.checkLoop();
      }, GS.checkFrequency);
    }
  },


  // easeOutCubic function
  easingFunction: function (t) {
    return (--t) * t * t + 1;
  },


};



// Global variables
var G = Optiscroll.G = {
  isTouch: 'ontouchstart' in window,
  cssTransition: cssTest('transition'),
  cssTransform: cssTest('transform') || '',
  nativeScrollbarSize: getScrollbarWidth(),

  instances: [],
  checkTimer: null,
  pauseCheck: false,
};


// Get scrollbars width, thanks Google Closure Library
function getScrollbarWidth () {
  var htmlEl = document.documentElement,
      outerEl, innerEl, width = 0;

  outerEl = document.createElement('div');
  outerEl.style.cssText = 'overflow:scroll;width:50px;height:50px;position:absolute;left:-100px';

  innerEl = document.createElement('div');
  innerEl.style.cssText = 'width:100px;height:100px';

  outerEl.appendChild(innerEl);
  htmlEl.appendChild(outerEl);
  width = outerEl.offsetWidth - outerEl.clientWidth;
  htmlEl.removeChild(outerEl);

  return width;
}


// Detect css3 support, thanks Modernizr
function cssTest (prop) {
  var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
      el = document.createElement('test'),
      props = (prop + ' ' + ['Webkit','Moz','O','ms'].join(ucProp + ' ') + ucProp).split(' ');

  for (var i in props) {
    if(el.style[props[i]] !== undefined) { return props[i]; }
  }
  return false;
}



function toggleClass (el, value, bool) {
  var classes = el.className.split(/\s+/),
      index = classes.indexOf(value);

  if(bool) {
    ~index || classes.push(value);
  } else {
    ~index && classes.splice(index, 1);
  }

  el.className = classes.join(' ');
}




function _extend (dest, src, merge) {
  for(var key in src) {
    if(!src.hasOwnProperty(key) || dest[key] !== undefined && merge) {
      continue;
    }
    dest[key] = src[key];
  }
  return dest;
}


function _invoke (collection, fn, args) {
  var i, j;
  if(collection.length) {
    for(i = 0, j = collection.length; i < j; i++) {
      collection[i][fn].apply(collection[i], args);
    }
  } else {
    for (i in collection) {
      collection[i][fn].apply(collection[i], args);
    }
  }
}

function _throttle(fn, threshhold) {
  var last, deferTimer;
  return function () {
    var context = this,
        now = Date.now(),
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}



  // AMD export
  if(typeof define == 'function' && define.amd) {
    define(function(){
      return Optiscroll;
    });
  }

  // commonjs export
  if(typeof module !== 'undefined' && module.exports) {
    module.exports = Optiscroll;
  }

  window.Optiscroll = Optiscroll;

})(window, document, Math);

/**
 * jQuery plugin
 * create instance of Optiscroll
 * and when called again you can call functions
 * or change instance settings
 *
 * ```
 * $(el).optiscroll({ options })
 * $(el).optiscroll('method', arg)
 * ```
 */

(function ($) {

  var pluginName = 'optiscroll';

  $.fn[pluginName] = function(options) {
    var method, args;

    if(typeof options === 'string') {
      args = Array.prototype.slice.call(arguments);
      method = args.shift();
    }

    return this.each(function() {
      var $el = $(this);
      var inst = $el.data(pluginName);

      // start new optiscroll instance
      if(!inst) {
        inst = new window.Optiscroll(this, options || {});
        $el.data(pluginName, inst);
      }
      // allow exec method on instance
      else if(inst && typeof method === 'string') {
        inst[method].apply(inst, args);
        if(method === 'destroy') {
          $el.removeData(pluginName);
        }
      }
    });
  };

}(jQuery || Zepto));
