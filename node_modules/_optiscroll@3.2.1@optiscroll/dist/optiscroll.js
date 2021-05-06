/*!
* Optiscroll.js v3.2.1
* https://github.com/albertogasparin/Optiscroll/
* 
* @copyright 2018 Alberto Gasparin
* @license Released under MIT LICENSE
*/

;(function ( window, document, Math, undefined ) {
  'use strict';



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
  wrapContent: true,
  rtl: false,
};



Optiscroll.Instance = function (element, options) {
  // instance variables
  this.element = element;
  this.settings = _extend(_extend({}, Optiscroll.defaults), options || {});
  if (typeof options.rtl !== 'boolean') {
    this.settings.rtl = window.getComputedStyle(element).direction === 'rtl';
  }
  this.cache = {};

  this.init();
};



Optiscroll.Instance.prototype = {


  init: function () {
    var element = this.element,
        settings = this.settings,
        shouldCreateScrollbars = false;

    var scrollEl = this.scrollEl = settings.wrapContent
      ? Utils.createWrapper(element)
      : element.firstElementChild;

    toggleClass(scrollEl, settings.classPrefix + 'content', true);
    toggleClass(element, 'is-enabled' + (settings.rtl ? ' is-rtl' : ''), true);

    // initialize scrollbars
    this.scrollbars = {
      v: Scrollbar('v', this),
      h: Scrollbar('h', this),
    };

    // create DOM scrollbars only if they have size or if it's forced
    if(G.scrollbarSpec.width || settings.forceScrollbars) {
      shouldCreateScrollbars = Utils.hideNativeScrollbars(scrollEl, settings.rtl);
    }

    if(shouldCreateScrollbars) {
      _invoke(this.scrollbars, 'create');
    }

    if(G.isTouch && settings.preventParentScroll) {
      toggleClass(element, settings.classPrefix + 'prevent', true);
    }

    // calculate scrollbars
    this.update();

    // bind container events
    this.bind();

    // add instance to global array for timed check
    if(settings.autoUpdate) {
      G.instances.push(this);
    }

    // start the timed check if it is not already running
    if(settings.autoUpdate && !G.checkTimer) {
      Utils.checkLoop();
    }

  },



  bind: function () {
    var listeners = this.listeners = {},
        scrollEl = this.scrollEl;

    // scroll event binding
    listeners.scroll = _throttle(Events.scroll.bind(this), GS.scrollMinUpdateInterval);

    if(G.isTouch) {
      listeners.touchstart = Events.touchstart.bind(this);
      listeners.touchend = Events.touchend.bind(this);
    }

    // Safari does not support wheel event
    listeners.mousewheel = listeners.wheel = Events.wheel.bind(this);

    for (var ev in listeners) {
      scrollEl.addEventListener(ev, listeners[ev], G.passiveEvent);
    }

  },




  update: function () {
    var scrollEl = this.scrollEl,
        cache = this.cache,
        oldcH = cache.clientH,
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
        if(sH === 0 && cH === 0 && !document.body.contains(this.element)) {
          this.destroy();
          return false;
        }

        this.fireCustomEvent('sizechange');
      }

      // this will update the scrollbar
      // and check if bottom is reached
      _invoke(this.scrollbars, 'update');
    }
  },




  /**
   * Animate scrollTo
   */
  scrollTo: function (destX, destY, duration) {
    var cache = this.cache,
        startX, startY, endX, endY;

    G.pauseCheck = true;
    // force update
    this.update();

    startX = this.scrollEl.scrollLeft;
    startY = this.scrollEl.scrollTop;

    endX = +destX;
    if(destX === 'left') { endX = 0; }
    if(destX === 'right') { endX = cache.scrollW - cache.clientW; }
    if(destX === false) { endX = startX; }

    endY = +destY;
    if(destY === 'top') { endY = 0; }
    if(destY === 'bottom') { endY = cache.scrollH - cache.clientH; }
    if(destY === false) { endY = startY; }

    // animate
    this.animateScroll(startX, endX, startY, endY, +duration);

  },



  scrollIntoView: function (elem, duration, delta) {
    var scrollEl = this.scrollEl,
        eDim, sDim,
        leftEdge, topEdge, rightEdge, bottomEdge,
        offsetX, offsetY,
        startX, startY, endX, endY;

    G.pauseCheck = true;
    // force update
    this.update();

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
    rightEdge = offsetX + eDim.width - this.cache.clientW + (delta.right || 0);
    bottomEdge = offsetY + eDim.height - this.cache.clientH + (delta.bottom || 0);

    if(leftEdge < startX) { endX = leftEdge; }
    if(rightEdge > startX) { endX = rightEdge; }

    if(topEdge < startY) { endY = topEdge; }
    if(bottomEdge > startY) { endY = bottomEdge; }

    // animate
    this.animateScroll(startX, endX, startY, endY, +duration);
  },




  animateScroll: function (startX, endX, startY, endY, duration) {
    var self = this,
        scrollEl = this.scrollEl,
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

      self.scrollAnimation = time < 1 ? window.requestAnimationFrame(animate) : null;
    }());
  },




  destroy: function () {
    var self = this,
        element = this.element,
        scrollEl = this.scrollEl,
        listeners = this.listeners,
        child;

    if(!this.scrollEl) { return; }

    // unbind events
    for (var ev in listeners) {
      scrollEl.removeEventListener(ev, listeners[ev]);
    }

    // remove scrollbars elements
    _invoke(this.scrollbars, 'remove');

    // unwrap content
    if (this.settings.wrapContent) {
      while(child = scrollEl.childNodes[0]) {
        element.insertBefore(child, scrollEl);
      }
      element.removeChild(scrollEl);
      this.scrollEl = null;
    }

    // remove classes
    toggleClass(element, this.settings.classPrefix + 'prevent', false);
    toggleClass(element, 'is-enabled', false);

    // defer instance removal from global array
    // to not affect checkLoop _invoke
    window.requestAnimationFrame(function () {
      var index = G.instances.indexOf(self);
      if (index > -1) {
        G.instances.splice(index, 1);
      }
    });
  },




  fireCustomEvent: function (eventName) {
    var cache = this.cache,
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

    var event;
    if (typeof CustomEvent === 'function') {
      event = new CustomEvent(eventName, { detail: eventData });
    } else { // IE does not support CustomEvent
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(eventName, false, false, eventData);
    }
    this.element.dispatchEvent(event);
  },

};




var Events = {

  scroll: function (ev) {

    if (!G.pauseCheck) {
      this.fireCustomEvent('scrollstart');
    }
    G.pauseCheck = true;

    this.scrollbars.v.update();
    this.scrollbars.h.update();

    this.fireCustomEvent('scroll');

    clearTimeout(this.cache.timerStop);
    this.cache.timerStop = setTimeout(Events.scrollStop.bind(this), this.settings.scrollStopDelay);
  },


  touchstart: function (ev) {
    G.pauseCheck = false;
    this.scrollbars.v.update();
    this.scrollbars.h.update();

    Events.wheel.call(this, ev);
  },


  touchend: function (ev) {
    // prevents touchmove generate scroll event to call
    // scrollstop  while the page is still momentum scrolling
    clearTimeout(this.cache.timerStop);
  },


  scrollStop: function () {
    this.fireCustomEvent('scrollstop');
    G.pauseCheck = false;
  },


  wheel: function (ev) {
    var cache = this.cache,
        cacheV = cache.v,
        cacheH = cache.h,
        preventScroll = this.settings.preventParentScroll && G.isTouch;

    window.cancelAnimationFrame(this.scrollAnimation);

    if(preventScroll && cacheV.enabled && cacheV.percent % 100 === 0) {
      this.scrollEl.scrollTop = cacheV.percent ? (cache.scrollH - cache.clientH - 1) : 1;
    }
    if(preventScroll && cacheH.enabled && cacheH.percent % 100 === 0) {
      this.scrollEl.scrollLeft = cacheH.percent ? (cache.scrollW - cache.clientW - 1) : 1;
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
      evSuffixes = isVertical ? ['top','bottom'] : ['left','right'],
      evTypesMatcher = /^(mouse|touch|pointer)/,

      rtlMode = G.scrollbarSpec.rtl,
      enabled = false,
      scrollbarEl = null,
      trackEl = null;

  var events = {
    dragData: null,

    dragStart: function (ev) {
      ev.preventDefault();
      var evData = ev.touches ? ev.touches[0] : ev;
      events.dragData = { x: evData.pageX, y: evData.pageY, scroll: scrollEl[scrollProp] };
      events.bind(true, ev.type.match(evTypesMatcher)[1]);
    },

    dragMove: function (ev) {
      var evData = ev.touches ? ev.touches[0] : ev,
          dragMode = settings.rtl && rtlMode === 1 && !isVertical ? -1 : 1,
          delta, deltaRatio;

      ev.preventDefault();
      delta = isVertical ? evData.pageY - events.dragData.y : evData.pageX - events.dragData.x;
      deltaRatio = delta / cache[clientSize];

      scrollEl[scrollProp] = events.dragData.scroll + deltaRatio * cache[scrollSize] * dragMode;
    },

    dragEnd: function (ev) {
      events.dragData = null;
      events.bind(false, ev.type.match(evTypesMatcher)[1]);
    },

    bind: function (on, type) {
      var method = (on ? 'add' : 'remove') + 'EventListener',
          moveEv = type + 'move',
          upEv = type + (type === 'touch' ? 'end' : 'up');

      document[method](moveEv, events.dragMove);
      document[method](upEv, events.dragEnd);
      document[method](type + 'cancel', events.dragEnd);
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
      scrollbarEl = document.createElement('div');
      trackEl = document.createElement('b');

      scrollbarEl.className = settings.classPrefix + which;
      trackEl.className = settings.classPrefix + which + 'track';
      scrollbarEl.appendChild(trackEl);
      parentEl.appendChild(scrollbarEl);

      if(settings.draggableTracks) {
        var evTypes = window.PointerEvent ? ['pointerdown'] : ['touchstart', 'mousedown'];
        evTypes.forEach(function (evType) {
          trackEl.addEventListener(evType, events.dragStart);
        });
      }
    },


    update: function () {
      var newSize, oldSize,
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
        this.toggle(false);
      }

      if(newSize < 1 && !enabled) {
        this.toggle(true);
      }

      if(trackEl && enabled) {
        this.style(newRelPos, deltaPos, newSize, oldSize);
      }

      // update cache values
      scrollbarCache = _extend(scrollbarCache, newDim);

      if(enabled) {
        this.fireEdgeEv();
      }

    },


    style: function (newRelPos, deltaPos, newSize, oldSize) {
      if(newSize !== oldSize) {
        trackEl.style[ isVertical ? 'height' : 'width' ] = newSize * 100 + '%';
        if (settings.rtl && !isVertical) {
          trackEl.style.marginRight = (1 - newSize) * 100 + '%';
        }
      }
      trackEl.style[G.cssTransform] = 'translate(' +
        (isVertical ? '0%,' + newRelPos + '%' : newRelPos + '%' + ',0%')
        + ')';
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
      if (!isVertical && settings.rtl && rtlMode) {
        position = sizeDiff - position * rtlMode;
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
        instance.fireCustomEvent('scrollreach' + evSuffixes[percent / 100]);
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

  hideNativeScrollbars: function (scrollEl, isRtl) {
    var size = G.scrollbarSpec.width,
        scrollElStyle = scrollEl.style;
    if(size === 0) {
      // hide Webkit/touch scrollbars
      var time = Date.now();
      scrollEl.setAttribute('data-scroll', time);
      return Utils.addCssRule('[data-scroll="' + time + '"]::-webkit-scrollbar', 'display:none;width:0;height:0;');
    } else {
      scrollElStyle[isRtl ? 'left' : 'right'] = -size + 'px';
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
    return element.appendChild(wrapper);
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
  cssTransform: cssTest('transform'),
  scrollbarSpec: getScrollbarSpec(),
  passiveEvent: getPassiveSupport(),

  instances: [],
  checkTimer: null,
  pauseCheck: false,
};


// Get scrollbars width, thanks Google Closure Library
function getScrollbarSpec () {
  var htmlEl = document.documentElement,
      outerEl, innerEl, width = 0, rtl = 1; // IE is reverse

  outerEl = document.createElement('div');
  outerEl.style.cssText = 'overflow:scroll;width:50px;height:50px;position:absolute;left:-100px;direction:rtl';

  innerEl = document.createElement('div');
  innerEl.style.cssText = 'width:100px;height:100px';

  outerEl.appendChild(innerEl);
  htmlEl.appendChild(outerEl);
  width = outerEl.offsetWidth - outerEl.clientWidth;
  if (outerEl.scrollLeft > 0) {
    rtl = 0; // webkit is default
  } else {
    outerEl.scrollLeft = 1;
    if (outerEl.scrollLeft === 0) {
      rtl = -1; // firefox is negative
    }
  }
  htmlEl.removeChild(outerEl);

  return { width: width, rtl: rtl };
}


function getPassiveSupport () {
  var passive = false;
  var options = Object.defineProperty({}, 'passive', {
    get: function () { passive = true; },
  });
  window.addEventListener('test', null, options);
  return passive ? { capture: false, passive: true } : false;
}


// Detect css3 support, thanks Modernizr
function cssTest (prop) {
  var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
      el = document.createElement('test'),
      props = [prop, 'Webkit' + ucProp];

  for (var i in props) {
    if(el.style[props[i]] !== undefined) { return props[i]; }
  }
  return '';
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
