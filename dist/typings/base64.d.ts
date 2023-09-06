/**
 *  base64.ts
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 *
 * @author Dan Kogai (https://github.com/dankogai)
 */
export const version: "3.7.5";
/**
 * @deprecated use lowercase `version`.
 */
export const VERSION: "3.7.5";
/**
 * polyfill version of `atob`
 */
declare function _atob(asc: any): string;
/**
 * polyfill version of `atob`
 */
export function atobPolyfill(asc: any): string;
/**
 * polyfill version of `btoa`
 */
declare function _btoa(bin: any): string;
/**
 * polyfill version of `btoa`
 */
export function btoaPolyfill(bin: any): string;
/**
 * converts a Base64 string to a UTF-8 string.
 * @param {String} src Base64 string.  Both normal and URL-safe are supported
 * @returns {string} UTF-8 string
 */
export function decode(src: string): string;
/**
 * converts a UTF-8-encoded string to a Base64 string.
 * @param {boolean} [urlsafe] if `true` make the result URL-safe
 * @returns {string} Base64 string
 */
export function encode(src: any, urlsafe?: boolean | undefined): string;
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-8 string
 * @returns {string} UTF-16 string
 */
export function utob(u: any): string;
/**
 * converts a UTF-8-encoded string to URL-safe Base64 RFC4648 §5.
 * @returns {string} Base64 string
 */
export function encodeURI(src: any): string;
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-16 string
 * @returns {string} UTF-8 string
 */
export function btou(b: any): string;
/**
 * check if a value is a valid Base64 string
 * @param {String} src a value to check
 */
export function isValid(src: string): boolean;
/**
 * converts a Uint8Array to a Base64 string.
 * @param {boolean} [urlsafe] URL-and-filename-safe a la RFC4648 §5
 * @returns {string} Base64 string
 */
export function fromUint8Array(u8a: any, urlsafe?: boolean | undefined): string;
/**
 * converts a Base64 string to a Uint8Array.
 */
export function toUint8Array(a: any): Uint8Array;
/**
 * extend String.prototype with relevant methods
 */
export function extendString(): void;
/**
 * extend Uint8Array.prototype with relevant methods
 */
export function extendUint8Array(): void;
/**
 * extend Builtin prototypes with relevant methods
 */
export function extendBuiltins(): void;
declare namespace gBase64 {
    export { version };
    export { VERSION };
    export { _atob as atob };
    export { atobPolyfill };
    export { _btoa as btoa };
    export { btoaPolyfill };
    export { decode as fromBase64 };
    export { encode as toBase64 };
    export { encode };
    export { encodeURI };
    export { encodeURI as encodeURL };
    export { utob };
    export { btou };
    export { decode };
    export { isValid };
    export { fromUint8Array };
    export { toUint8Array };
    export { extendString };
    export { extendUint8Array };
    export { extendBuiltins };
}
export { _atob as atob, _btoa as btoa, decode as fromBase64, encode as toBase64, encodeURI as encodeURL, gBase64 as Base64 };
