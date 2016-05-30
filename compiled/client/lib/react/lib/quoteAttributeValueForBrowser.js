/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule quoteAttributeValueForBrowser
 */

'use strict';

var escapeTextContentForBrowser = require('./escapeTextContentForBrowser');

/**
 * Escapes attribute value to prevent scripting attacks.
 *
 * @param {*} value Value to escape.
 * @return {string} An escaped string.
 */
function quoteAttributeValueForBrowser(value) {
  return '"' + escapeTextContentForBrowser(value) + '"';
}

module.exports = quoteAttributeValueForBrowser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL3F1b3RlQXR0cmlidXRlVmFsdWVGb3JCcm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBV0E7O0FBRUEsSUFBSSw4QkFBOEIsUUFBUSwrQkFBUixDQUFsQzs7Ozs7Ozs7QUFRQSxTQUFTLDZCQUFULENBQXVDLEtBQXZDLEVBQThDO0FBQzVDLFNBQU8sTUFBTSw0QkFBNEIsS0FBNUIsQ0FBTixHQUEyQyxHQUFsRDtBQUNEOztBQUVELE9BQU8sT0FBUCxHQUFpQiw2QkFBakIiLCJmaWxlIjoicXVvdGVBdHRyaWJ1dGVWYWx1ZUZvckJyb3dzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgcXVvdGVBdHRyaWJ1dGVWYWx1ZUZvckJyb3dzZXJcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlc2NhcGVUZXh0Q29udGVudEZvckJyb3dzZXIgPSByZXF1aXJlKCcuL2VzY2FwZVRleHRDb250ZW50Rm9yQnJvd3NlcicpO1xuXG4vKipcbiAqIEVzY2FwZXMgYXR0cmlidXRlIHZhbHVlIHRvIHByZXZlbnQgc2NyaXB0aW5nIGF0dGFja3MuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byBlc2NhcGUuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEFuIGVzY2FwZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBxdW90ZUF0dHJpYnV0ZVZhbHVlRm9yQnJvd3Nlcih2YWx1ZSkge1xuICByZXR1cm4gJ1wiJyArIGVzY2FwZVRleHRDb250ZW50Rm9yQnJvd3Nlcih2YWx1ZSkgKyAnXCInO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHF1b3RlQXR0cmlidXRlVmFsdWVGb3JCcm93c2VyOyJdfQ==