"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _htmlMinifierTerser = require("html-minifier-terser");

var _default = options => function process(html) {
  try {
    // eslint-disable-next-line no-param-reassign
    html = (0, _htmlMinifierTerser.minify)(html, options.minimize);
  } catch (error) {
    options.errors.push(error);
  }

  return html;
};

exports.default = _default;