/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SyntheticFocusEvent
 * @typechecks static-only
 */

'use strict';

var SyntheticUIEvent = require('./SyntheticUIEvent');

/**
 * @interface FocusEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var FocusEventInterface = {
  relatedTarget: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);

module.exports = SyntheticFocusEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL1N5bnRoZXRpY0ZvY3VzRXZlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBWUE7O0FBRUEsSUFBSSxtQkFBbUIsUUFBUSxvQkFBUixDQUF2Qjs7Ozs7O0FBTUEsSUFBSSxzQkFBc0I7QUFDeEIsaUJBQWU7QUFEUyxDQUExQjs7Ozs7Ozs7QUFVQSxTQUFTLG1CQUFULENBQTZCLGNBQTdCLEVBQTZDLGNBQTdDLEVBQTZELFdBQTdELEVBQTBFLGlCQUExRSxFQUE2RjtBQUMzRixtQkFBaUIsSUFBakIsQ0FBc0IsSUFBdEIsRUFBNEIsY0FBNUIsRUFBNEMsY0FBNUMsRUFBNEQsV0FBNUQsRUFBeUUsaUJBQXpFO0FBQ0Q7O0FBRUQsaUJBQWlCLFlBQWpCLENBQThCLG1CQUE5QixFQUFtRCxtQkFBbkQ7O0FBRUEsT0FBTyxPQUFQLEdBQWlCLG1CQUFqQiIsImZpbGUiOiJTeW50aGV0aWNGb2N1c0V2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFN5bnRoZXRpY0ZvY3VzRXZlbnRcbiAqIEB0eXBlY2hlY2tzIHN0YXRpYy1vbmx5XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU3ludGhldGljVUlFdmVudCA9IHJlcXVpcmUoJy4vU3ludGhldGljVUlFdmVudCcpO1xuXG4vKipcbiAqIEBpbnRlcmZhY2UgRm9jdXNFdmVudFxuICogQHNlZSBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMvXG4gKi9cbnZhciBGb2N1c0V2ZW50SW50ZXJmYWNlID0ge1xuICByZWxhdGVkVGFyZ2V0OiBudWxsXG59O1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBkaXNwYXRjaENvbmZpZyBDb25maWd1cmF0aW9uIHVzZWQgdG8gZGlzcGF0Y2ggdGhpcyBldmVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXNwYXRjaE1hcmtlciBNYXJrZXIgaWRlbnRpZnlpbmcgdGhlIGV2ZW50IHRhcmdldC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBuYXRpdmVFdmVudCBOYXRpdmUgYnJvd3NlciBldmVudC5cbiAqIEBleHRlbmRzIHtTeW50aGV0aWNVSUV2ZW50fVxuICovXG5mdW5jdGlvbiBTeW50aGV0aWNGb2N1c0V2ZW50KGRpc3BhdGNoQ29uZmlnLCBkaXNwYXRjaE1hcmtlciwgbmF0aXZlRXZlbnQsIG5hdGl2ZUV2ZW50VGFyZ2V0KSB7XG4gIFN5bnRoZXRpY1VJRXZlbnQuY2FsbCh0aGlzLCBkaXNwYXRjaENvbmZpZywgZGlzcGF0Y2hNYXJrZXIsIG5hdGl2ZUV2ZW50LCBuYXRpdmVFdmVudFRhcmdldCk7XG59XG5cblN5bnRoZXRpY1VJRXZlbnQuYXVnbWVudENsYXNzKFN5bnRoZXRpY0ZvY3VzRXZlbnQsIEZvY3VzRXZlbnRJbnRlcmZhY2UpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bnRoZXRpY0ZvY3VzRXZlbnQ7Il19