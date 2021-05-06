const { isReadableStream } = require('./utils');
const TextDecoder = require('./text-decoder');

const STACK_OBJECT = 1;
const STACK_ARRAY = 2;
const decoder = new TextDecoder();

function isObject(value) {
    return value !== null && typeof value === 'object';
}

function adjustPosition(error, parser) {
    if (error.name === 'SyntaxError' && parser.jsonParseOffset) {
        error.message = error.message.replace(/at position (\d+)/, (_, pos) =>
            'at position ' + (Number(pos) + parser.jsonParseOffset)
        );
    }

    return error;
}

function append(array, elements) {
    // Note: Avoid to use array.push(...elements) since it may lead to
    // "RangeError: Maximum call stack size exceeded" for a long arrays
    const initialLength = array.length;
    array.length += elements.length;

    for (let i = 0; i < elements.length; i++) {
        array[initialLength + i] = elements[i];
    }
}

module.exports = function(chunkEmitter) {
    let parser = new ChunkParser();

    if (isObject(chunkEmitter) && isReadableStream(chunkEmitter)) {
        return new Promise((resolve, reject) => {
            chunkEmitter
                .on('data', chunk => {
                    try {
                        parser.push(chunk);
                    } catch (e) {
                        reject(adjustPosition(e, parser));
                        parser = null;
                    }
                })
                .on('error', (e) => {
                    parser = null;
                    reject(e);
                })
                .on('end', () => {
                    try {
                        resolve(parser.finish());
                    } catch (e) {
                        reject(adjustPosition(e, parser));
                    } finally {
                        parser = null;
                    }
                });
        });
    }

    if (typeof chunkEmitter === 'function') {
        const iterator = chunkEmitter();

        if (isObject(iterator) && (Symbol.iterator in iterator || Symbol.asyncIterator in iterator)) {
            return new Promise(async (resolve, reject) => {
                try {
                    for await (const chunk of iterator) {
                        parser.push(chunk);
                    }

                    resolve(parser.finish());
                } catch (e) {
                    reject(adjustPosition(e, parser));
                } finally {
                    parser = null;
                }
            });
        }
    }

    throw new Error(
        'Chunk emitter should be readable stream, generator, ' +
        'async generator or function returning an iterable object'
    );
};

class ChunkParser {
    constructor() {
        this.value = undefined;
        this.valueStack = null;

        this.stack = new Array(100);
        this.lastFlushDepth = 0;
        this.flushDepth = 0;
        this.stateString = false;
        this.stateStringEscape = false;
        this.pendingByteSeq = null;
        this.pendingChunk = null;
        this.pos = 0;
        this.jsonParseOffset = 0;
    }

    flush(chunk, start, end) {
        let fragment = chunk.slice(start, end);
        this.jsonParseOffset = this.pos; // using for position correction in JSON.parse() error if any

        // Prepend pending chunk if any
        if (this.pendingChunk !== null) {
            fragment = this.pendingChunk + fragment;
            this.pendingChunk = null;
        }

        // Skip a comma at the beginning if any
        if (fragment[0] === ',') {
            fragment = fragment.slice(1);
            this.jsonParseOffset++;
        }

        if (this.flushDepth === this.lastFlushDepth) {
            // Depth didn't changed, so it's a root value or entry/element set
            if (this.flushDepth > 0) {
                this.jsonParseOffset--;

                // Append new entries or elements
                if (this.stack[this.flushDepth - 1] === STACK_OBJECT) {
                    Object.assign(this.valueStack.value, JSON.parse('{' + fragment + '}'));
                } else {
                    append(this.valueStack.value, JSON.parse('[' + fragment + ']'));
                }
            } else {
                // That's an entire value on a top level
                this.value = JSON.parse(fragment);
                this.valueStack = {
                    value: this.value,
                    prev: null
                };
            }
        } else if (this.flushDepth > this.lastFlushDepth) {
            // Add missed closing brackets/parentheses
            for (let i = this.flushDepth - 1; i >= this.lastFlushDepth; i--) {
                fragment += this.stack[i] === STACK_OBJECT ? '}' : ']';
            }

            if (this.lastFlushDepth === 0) {
                // That's a root value
                this.value = JSON.parse(fragment);
                this.valueStack = {
                    value: this.value,
                    prev: null
                };
            } else {
                this.jsonParseOffset--;

                // Parse fragment and append to current value
                if (this.stack[this.lastFlushDepth - 1] === STACK_OBJECT) {
                    Object.assign(this.valueStack.value, JSON.parse('{' + fragment + '}'));
                } else {
                    append(this.valueStack.value, JSON.parse('[' + fragment + ']'));
                }
            }

            // Move down to the depths to the last object/array, which is current now
            for (let i = this.lastFlushDepth || 1; i < this.flushDepth; i++) {
                let value = this.valueStack.value;

                if (this.stack[i - 1] === STACK_OBJECT) {
                    // find last entry
                    let key;
                    // eslint-disable-next-line curly
                    for (key in value);
                    value = value[key];
                } else {
                    // last element
                    value = value[value.length - 1];
                }

                this.valueStack = {
                    value,
                    prev: this.valueStack
                };
            }
        } else { // this.flushDepth < this.lastFlushDepth
            // Add missed opening brackets/parentheses
            for (let i = this.lastFlushDepth - 1; i >= this.flushDepth; i--) {
                this.jsonParseOffset--;
                fragment = (this.stack[i] === STACK_OBJECT ? '{' : '[') + fragment;
            }

            if (this.stack[this.lastFlushDepth - 1] === STACK_OBJECT) {
                Object.assign(this.valueStack.value, JSON.parse(fragment));
            } else {
                append(this.valueStack.value, JSON.parse(fragment));
            }

            for (let i = this.lastFlushDepth - 1; i >= this.flushDepth; i--) {
                this.valueStack = this.valueStack.prev;
            }
        }

        this.pos += end - start;
        this.lastFlushDepth = this.flushDepth;
    }

    push(chunk) {
        if (typeof chunk !== 'string') {
            // Suppose chunk is Buffer or Uint8Array

            // Prepend uncompleted byte sequence if any
            if (this.pendingByteSeq !== null) {
                const origRawChunk = chunk;
                chunk = new Uint8Array(this.pendingByteSeq.length + origRawChunk.length);
                chunk.set(this.pendingByteSeq);
                chunk.set(origRawChunk, this.pendingByteSeq.length);
                this.pendingByteSeq = null;
            }

            // In case Buffer/Uint8Array, an input is encoded in UTF8
            // Seek for parts of uncompleted UTF8 symbol on the ending
            // This makes sense only if we expect more chunks and last char is not multi-bytes
            if (chunk[chunk.length - 1] > 127) {
                for (let seqLength = 0; seqLength < chunk.length; seqLength++) {
                    const byte = chunk[chunk.length - 1 - seqLength];

                    // 10xxxxxx - 2nd, 3rd or 4th byte
                    // 110xxxxx – first byte of 2-byte sequence
                    // 1110xxxx - first byte of 3-byte sequence
                    // 11110xxx - first byte of 4-byte sequence
                    if (byte >> 6 === 3) {
                        seqLength++;

                        // If the sequence is really incomplete, then preserve it
                        // for the future chunk and cut off it from the current chunk
                        if ((seqLength !== 4 && byte >> 3 === 0b11110) ||
                            (seqLength !== 3 && byte >> 4 === 0b1110) ||
                            (seqLength !== 2 && byte >> 5 === 0b110)) {
                            this.pendingByteSeq = chunk.slice(chunk.length - seqLength);
                            chunk = chunk.slice(0, -seqLength);
                        }

                        break;
                    }
                }
            }

            // Convert chunk to a string, since single decode per chunk
            // is much effective than decode multiple small substrings
            chunk = decoder.decode(chunk);
        }

        const chunkLength = chunk.length;
        let lastFlushPoint = 0;
        let flushPoint = 0;

        // Main scan loop
        scan: for (let i = 0; i < chunkLength; i++) {
            if (this.stateString) {
                for (; i < chunkLength; i++) {
                    if (this.stateStringEscape) {
                        this.stateStringEscape = false;
                    } else {
                        switch (chunk.charCodeAt(i)) {
                            case 0x22: /* " */
                                this.stateString = false;
                                continue scan;

                            case 0x5C: /* \ */
                                this.stateStringEscape = true;
                        }
                    }
                }

                break;
            }

            switch (chunk.charCodeAt(i)) {
                case 0x22: /* " */
                    this.stateString = true;
                    this.stateStringEscape = false;
                    break;

                case 0x2C: /* , */
                    flushPoint = i;
                    break;

                case 0x7B: /* { */
                    // begin object
                    flushPoint = i + 1;
                    this.stack[this.flushDepth++] = STACK_OBJECT;
                    break;

                case 0x5B: /* [ */
                    // begin array
                    flushPoint = i + 1;
                    this.stack[this.flushDepth++] = STACK_ARRAY;
                    break;

                case 0x5D: /* ] */
                case 0x7D: /* } */
                    // end object or array
                    flushPoint = i + 1;
                    this.flushDepth--;

                    if (this.flushDepth < this.lastFlushDepth) {
                        this.flush(chunk, lastFlushPoint, flushPoint);
                        lastFlushPoint = flushPoint;
                    }

                    break;
            }
        }

        if (flushPoint > lastFlushPoint) {
            this.flush(chunk, lastFlushPoint, flushPoint);
        }

        // Produce pendingChunk if any
        if (flushPoint < chunkLength) {
            const newPending = chunk.slice(flushPoint, chunkLength);

            this.pendingChunk = this.pendingChunk !== null
                ? this.pendingChunk + newPending
                : newPending;
        }
    }

    finish() {
        if (this.pendingChunk !== null) {
            if (/[^ \t\r\n]/.test(this.pendingChunk)) {
                this.flush('', 0, 0);
            }

            this.pendingChunk = null;
        }

        return this.value;
    }
};
