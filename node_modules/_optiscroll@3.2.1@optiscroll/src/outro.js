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
