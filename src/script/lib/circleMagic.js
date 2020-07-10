;(function ($) {
  $.fn.circleMagic = function (options) {

    var width, height, canvas, ctx, animateHeader = true;
    var circles = [];

    var settings = $.extend({
      color: 'rgba(255,255,255,.5)',
      radius: 10,
      density: 0.3,
      clearOffset: 0.2
    }, options);

    //  Main

    var container = this['0'];
    initContainer();
    addListeners();

    function initContainer() {
      width = container.offsetWidth;
      height = container.offsetHeight;

      //  create canvas element

      initCanvas();
      canvas = document.getElementById('homeTopCanvas');
      canvas.width = width;
      canvas.height = height;
      canvas.style.position = 'absolute';
      canvas.style.left = '0';
      canvas.style.bottom = '0';
      ctx = canvas.getContext('2d');

      //  create circles
      for (var x = 0; x < width * settings.density; x++) {
        var c = new Circle();
        circles.push(c);
      }
      animate();
    }

    //Init canvas element
    function initCanvas() {
      var canvasElement = document.createElement('canvas');
      canvasElement.id = 'homeTopCanvas';
      container.appendChild(canvasElement);
      canvasElement.parentElement.style.overflow = 'hidden';

    }

    // Event handling
    function addListeners() {
      window.addEventListener('scroll', scrollCheck, false);
      window.addEventListener('resize', resize, false);
    }

    function scrollCheck() {
      if (document.body.scrollTop > height) {
        animateHeader = false;
      }
      else {
        animateHeader = true;
      }
    }

    function resize() {
      width = container.clientWidth;
      height = container.clientHeight;
      container.height = height + 'px';
      canvas.width = width;
      canvas.height = height;
    }

    function animate() {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        for (var i in circles) {
          circles[i].draw();
        }
      }
      requestAnimationFrame(animate);
    }

    function randomColor() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      var alpha = Math.random().toPrecision(2);
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }

    //  Canvas manipulation

    function Circle() {
      var that = this;

      // constructor
      (function () {
        that.pos = {};
        init();
      })();

      function init() {
        that.pos.x = Math.random() * width;
        that.pos.y = height + Math.random() * 100;
        that.alpha = 0.1 + Math.random() * settings.clearOffset;
        that.scale = 0.1 + Math.random() * 0.3;
        that.speed = Math.random();
        if (settings.color === 'random') {
          that.color = randomColor();
        }
        else {
          that.color = settings.color;
        }
      }

      this.draw = function () {
        if (that.alpha <= 0) {
          init();
        }
        that.pos.y -= that.speed;
        that.alpha -= 0.0005;
        ctx.beginPath();
        ctx.arc(that.pos.x, that.pos.y, that.scale * settings.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = that.color;
        ctx.fill();
        ctx.closePath();
      };
    }
  }
})(jQuery);