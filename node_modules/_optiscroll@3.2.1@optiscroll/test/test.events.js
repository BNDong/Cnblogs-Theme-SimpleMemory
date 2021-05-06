/* eslint-env qunit */
/* globals os:true */

module('Custom events', {
  setup: function() {
    os = new window.Optiscroll(document.querySelector('#os'), { autoUpdate: false });
  }, teardown: function() {
    os.destroy();
    os = null;
  },
});


asyncTest('It should fire scrollstart', function () {
  expect(4);

  os.scrollEl.scrollTop = 0;

  os.element.addEventListener('scrollstart', function (ev) {
    equal(ev.type, 'scrollstart');
    equal(ev.detail.scrollTop, 0);
    equal(ev.detail.scrollBottom, 100);
    equal(ev.detail.scrollbarV.percent, 0);

    start();
  });

  setTimeout(function () {
    os.scrollEl.scrollTop = 20;
  }, 50);

});


asyncTest('It should fire scrollstop', function () {
  expect(4);

  os.element.addEventListener('scrollstop', function (ev) {
    equal(ev.type, 'scrollstop');
    equal(ev.detail.scrollTop, 50);
    equal(ev.detail.scrollBottom, 50);
    equal(ev.detail.scrollbarV.percent, 50);
    start();
  });

  os.scrollEl.scrollTop = 50;
});


asyncTest('It should fire scrollreachtop', function () {
  expect(4);

  os.scrollEl.scrollTop = 50;
  os.update();

  os.element.addEventListener('scrollreachtop', function (ev) {
    equal(ev.type, 'scrollreachtop');
    equal(ev.detail.scrollTop, 0);
    equal(ev.detail.scrollBottom, 100);
    equal(ev.detail.scrollbarV.percent, 0);
    start();
  });

  setTimeout(function() {
    os.scrollEl.scrollTop = 0;
  }, 50);

});


asyncTest('It should fire scrollreachbottom', function () {
  expect(4);

  os.scrollEl.scrollTop = 50;
  os.update();

  os.element.addEventListener('scrollreachbottom', function (ev) {
    equal(ev.type, 'scrollreachbottom');
    equal(ev.detail.scrollTop, 100);
    equal(ev.detail.scrollBottom, 0);
    equal(ev.detail.scrollbarV.percent, 100);
    start();
  });

  setTimeout(function() {
    os.scrollEl.scrollTop = 100;
  }, 50);

});


asyncTest('It should fire scrollreachleft', function () {
  expect(4);

  os.scrollEl.scrollLeft = 50;
  os.update();

  os.element.addEventListener('scrollreachleft', function (ev) {
    equal(ev.type, 'scrollreachleft');
    equal(ev.detail.scrollLeft, 0);
    equal(ev.detail.scrollRight, 100);
    equal(ev.detail.scrollbarH.percent, 0);
    start();
  });

  setTimeout(function() {
    os.scrollEl.scrollLeft = 0;
  }, 50);

});


asyncTest('It should fire scrollreachright', function () {
  expect(4);

  os.scrollEl.scrollLeft = 50;
  os.update();

  os.element.addEventListener('scrollreachright', function (ev) {
    equal(ev.type, 'scrollreachright');
    equal(ev.detail.scrollLeft, 100);
    equal(ev.detail.scrollRight, 0);
    equal(ev.detail.scrollbarH.percent, 100);
    start();
  });

  setTimeout(function() {
    os.scrollEl.scrollLeft = 100;
  }, 50);

});


asyncTest('It should fire scrollreachedge', function () {
  expect(7);

  os.scrollEl.scrollLeft = 20;

  var listener = function (ev) {
    equal(ev.type, 'scrollreachedge');
    equal(ev.detail.scrollTop, 100);
    equal(ev.detail.scrollBottom, 0);
    equal(ev.detail.scrollLeft, 20);
    equal(ev.detail.scrollRight, 80);
    equal(ev.detail.scrollbarV.percent, 100);
    equal(ev.detail.scrollbarH.percent, 20);
    os.element.removeEventListener('scrollreachedge', listener);
    start();
  };

  os.element.addEventListener('scrollreachedge', listener);

  setTimeout(function() {
    os.scrollEl.scrollTop = 100;
  }, 50);
});


asyncTest('It should fire sizechange', function () {
  expect(2);

  os.element.addEventListener('sizechange', function (ev) {
    equal(ev.type, 'sizechange');
    equal(ev.detail.clientHeight, 150);
    start();
  });

  os.element.style.height = '150px';
  os.update();
});
