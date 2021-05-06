"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Cache {
  // eslint-disable-next-line no-unused-vars
  constructor(compilation) {
    this.cache = compilation.getCache('CssMinimizerWebpackPlugin');
  }

  async get(cacheData) {
    // eslint-disable-next-line no-param-reassign
    cacheData.eTag = cacheData.eTag || this.cache.getLazyHashedEtag(cacheData.inputSource);
    return this.cache.getPromise(cacheData.name, cacheData.eTag);
  }

  async store(cacheData) {
    const {
      source,
      warnings
    } = cacheData;
    const data = {
      source,
      warnings
    };
    return this.cache.storePromise(cacheData.name, cacheData.eTag, data);
  }

}

exports.default = Cache;