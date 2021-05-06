/* eslint-env qunit */
/* globals os:true */

module('Public APIs', {
  setup: function() {
    os = new window.Optiscroll(document.querySelector('#os'), { autoUpdate: false });
  }, teardown: function() {
    os.destroy();
    os = null;
  },
});


asyncTest('It should scrollTo(value, value, 0)', function () {
  expect(2);

  os.scrollEl.scrollLeft = 0;
  os.scrollEl.scrollTop = 0;
  os.scrollTo(50, 100, 0);

  setTimeout(function() {
    equal(os.scrollEl.scrollLeft, 50);
    equal(os.scrollEl.scrollTop, 100);
    start();
  }, 50);
});


asyncTest('It should scrollTo(edgeName, false)', function() {
  expect(2);

  os.scrollEl.scrollLeft = 0;
  os.scrollEl.scrollTop = 100;
  os.scrollTo('right', false);

  setTimeout(function() {
    equal(os.scrollEl.scrollLeft, 100);
    equal(os.scrollEl.scrollTop, 100);
    start();
  }, 300);
});


asyncTest('It should scrollTo(false, value, time)', function() {
  expect(2);

  os.scrollEl.scrollLeft = 50;
  os.scrollEl.scrollTop = 50;
  os.scrollTo(false, 0, 500);

  setTimeout(function() {
    equal(os.scrollEl.scrollLeft, 50);
    equal(os.scrollEl.scrollTop, 0);
    start();
  }, 550);
});


asyncTest('It should scrollIntoView(selector) from top/left', function () {
  expect(2);

  os.scrollEl.scrollLeft = 0;
  os.scrollEl.scrollTop = 0;
  os.scrollIntoView('.test-child');

  setTimeout(function() {
    equal(os.scrollEl.scrollLeft, 10);
    equal(os.scrollEl.scrollTop, 10);
    start();
  }, 100);
});


asyncTest('It should scrollIntoView(node, time) from bottom/right', function () {
  expect(2);

  os.scrollEl.scrollLeft = 100;
  os.scrollEl.scrollTop = 100;
  os.scrollIntoView(os.element.querySelector('.test-child'), 100);

  setTimeout(function() {
    equal(os.scrollEl.scrollLeft, 90);
    equal(os.scrollEl.scrollTop, 90);
    start();
  }, 150);
});


asyncTest('It should scrollIntoView(selector, time, delta)', function () {
  expect(2);

  os.scrollEl.scrollLeft = 0;
  os.scrollEl.scrollTop = 0;
  os.scrollIntoView('.test-child', 100, 10);

  setTimeout(function() {
    equal(os.scrollEl.scrollLeft, 20);
    equal(os.scrollEl.scrollTop, 20);
    start();
  }, 150);
});
