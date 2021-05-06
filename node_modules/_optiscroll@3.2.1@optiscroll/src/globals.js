
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

