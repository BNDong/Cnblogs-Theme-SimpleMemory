/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Source = require("./Source");

const mapToBufferedMap = map => {
	if (typeof map !== "object" || !map) return map;
	const bufferedMap = Object.assign({}, map);
	if (map.mappings) {
		bufferedMap.mappings = Buffer.from(map.mappings, "utf-8");
	}
	if (map.sourcesContent) {
		bufferedMap.sourcesContent = map.sourcesContent.map(
			str => str && Buffer.from(str, "utf-8")
		);
	}
	return bufferedMap;
};

const bufferedMapToMap = bufferedMap => {
	if (typeof bufferedMap !== "object" || !bufferedMap) return bufferedMap;
	const map = Object.assign({}, bufferedMap);
	if (bufferedMap.mappings) {
		map.mappings = bufferedMap.mappings.toString("utf-8");
	}
	if (bufferedMap.sourcesContent) {
		map.sourcesContent = bufferedMap.sourcesContent.map(
			buffer => buffer && buffer.toString("utf-8")
		);
	}
	return map;
};

class CachedSource extends Source {
	constructor(source, cachedData) {
		super();
		this._source = source;
		this._cachedSourceType = cachedData ? cachedData.source : undefined;
		this._cachedSource = undefined;
		this._cachedBuffer = cachedData ? cachedData.buffer : undefined;
		this._cachedSize = cachedData ? cachedData.size : undefined;
		this._cachedMaps = cachedData ? cachedData.maps : new Map();
		this._cachedHashUpdate = cachedData ? cachedData.hash : undefined;
	}

	getCachedData() {
		// We don't want to cache strings
		// So if we have a caches sources
		// create a buffer from it and only store
		// if it was a Buffer or string
		if (this._cachedSource) {
			this.buffer();
		}
		const bufferedMaps = new Map();
		for (const pair of this._cachedMaps) {
			if (pair[1].bufferedMap === undefined) {
				pair[1].bufferedMap = mapToBufferedMap(pair[1].map);
			}
			bufferedMaps.set(pair[0], {
				map: undefined,
				bufferedMap: pair[1].bufferedMap
			});
		}
		return {
			buffer: this._cachedBuffer,
			source:
				this._cachedSourceType !== undefined
					? this._cachedSourceType
					: typeof this._cachedSource === "string"
					? true
					: Buffer.isBuffer(this._cachedSource)
					? false
					: undefined,
			size: this._cachedSize,
			maps: bufferedMaps,
			hash: this._cachedHashUpdate
		};
	}

	originalLazy() {
		return this._source;
	}

	original() {
		if (typeof this._source === "function") this._source = this._source();
		return this._source;
	}

	source() {
		if (this._cachedSource !== undefined) return this._cachedSource;
		if (this._cachedBuffer && this._cachedSourceType !== undefined) {
			return (this._cachedSource = this._cachedSourceType
				? this._cachedBuffer.toString("utf-8")
				: this._cachedBuffer);
		} else {
			return (this._cachedSource = this.original().source());
		}
	}

	buffer() {
		if (typeof this._cachedBuffer !== "undefined") return this._cachedBuffer;
		if (typeof this._cachedSource !== "undefined") {
			if (Buffer.isBuffer(this._cachedSource)) {
				return (this._cachedBuffer = this._cachedSource);
			}
			return (this._cachedBuffer = Buffer.from(this._cachedSource, "utf-8"));
		}
		if (typeof this.original().buffer === "function") {
			return (this._cachedBuffer = this.original().buffer());
		}
		const bufferOrString = this.source();
		if (Buffer.isBuffer(bufferOrString)) {
			return (this._cachedBuffer = bufferOrString);
		}
		return (this._cachedBuffer = Buffer.from(bufferOrString, "utf-8"));
	}

	size() {
		if (typeof this._cachedSize !== "undefined") return this._cachedSize;
		if (typeof this._cachedSource !== "undefined") {
			return (this._cachedSize = Buffer.byteLength(this._cachedSource));
		}
		if (typeof this._cachedBuffer !== "undefined") {
			return (this._cachedSize = this._cachedBuffer.length);
		}
		return (this._cachedSize = this.original().size());
	}

	sourceAndMap(options) {
		const key = options ? JSON.stringify(options) : "{}";
		let cacheEntry = this._cachedMaps.get(key);
		if (cacheEntry && cacheEntry.map === undefined) {
			cacheEntry.map = bufferedMapToMap(cacheEntry.bufferedMap);
		}
		if (typeof this._cachedSource !== "undefined") {
			if (cacheEntry === undefined) {
				const map = this.original().map(options);
				this._cachedMaps.set(key, { map, bufferedMap: undefined });
				return {
					source: this._cachedSource,
					map
				};
			} else {
				return {
					source: this._cachedSource,
					map: cacheEntry.map
				};
			}
		} else if (cacheEntry !== undefined) {
			return {
				source: (this._cachedSource = this.original().source()),
				map: cacheEntry.map
			};
		} else {
			const result = this.original().sourceAndMap(options);
			this._cachedSource = result.source;
			this._cachedMaps.set(key, { map: result.map, bufferedMap: undefined });
			return result;
		}
	}

	map(options) {
		const key = options ? JSON.stringify(options) : "{}";
		let cacheEntry = this._cachedMaps.get(key);
		if (cacheEntry !== undefined) {
			if (cacheEntry.map === undefined) {
				cacheEntry.map = bufferedMapToMap(cacheEntry.bufferedMap);
			}
			return cacheEntry.map;
		}
		const map = this.original().map(options);
		this._cachedMaps.set(key, { map, bufferedMap: undefined });
		return map;
	}

	updateHash(hash) {
		if (this._cachedHashUpdate !== undefined) {
			for (const item of this._cachedHashUpdate) hash.update(item);
			return;
		}
		const update = [];
		let currentString = undefined;
		const tracker = {
			update: item => {
				if (typeof item === "string" && item.length < 10240) {
					if (currentString === undefined) {
						currentString = item;
					} else {
						currentString += item;
						if (currentString > 102400) {
							update.push(Buffer.from(currentString));
							currentString = undefined;
						}
					}
				} else {
					if (currentString !== undefined) {
						update.push(Buffer.from(currentString));
						currentString = undefined;
					}
					update.push(item);
				}
			}
		};
		this.original().updateHash(tracker);
		if (currentString !== undefined) {
			update.push(Buffer.from(currentString));
		}
		for (const item of update) hash.update(item);
		this._cachedHashUpdate = update;
	}
}

module.exports = CachedSource;
