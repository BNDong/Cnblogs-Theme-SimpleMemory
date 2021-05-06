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
