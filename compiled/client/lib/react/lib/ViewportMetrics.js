/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ViewportMetrics
 */

'use strict';

var ViewportMetrics = {

  currentScrollLeft: 0,

  currentScrollTop: 0,

  refreshScrollValues: function refreshScrollValues(scrollPosition) {
    ViewportMetrics.currentScrollLeft = scrollPosition.x;
    ViewportMetrics.currentScrollTop = scrollPosition.y;
  }

};

module.exports = ViewportMetrics;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL1ZpZXdwb3J0TWV0cmljcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVdBOztBQUVBLElBQUksa0JBQWtCOztBQUVwQixxQkFBbUIsQ0FGQzs7QUFJcEIsb0JBQWtCLENBSkU7O0FBTXBCLHVCQUFxQiw2QkFBVSxjQUFWLEVBQTBCO0FBQzdDLG9CQUFnQixpQkFBaEIsR0FBb0MsZUFBZSxDQUFuRDtBQUNBLG9CQUFnQixnQkFBaEIsR0FBbUMsZUFBZSxDQUFsRDtBQUNEOztBQVRtQixDQUF0Qjs7QUFhQSxPQUFPLE9BQVAsR0FBaUIsZUFBakIiLCJmaWxlIjoiVmlld3BvcnRNZXRyaWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFZpZXdwb3J0TWV0cmljc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFZpZXdwb3J0TWV0cmljcyA9IHtcblxuICBjdXJyZW50U2Nyb2xsTGVmdDogMCxcblxuICBjdXJyZW50U2Nyb2xsVG9wOiAwLFxuXG4gIHJlZnJlc2hTY3JvbGxWYWx1ZXM6IGZ1bmN0aW9uIChzY3JvbGxQb3NpdGlvbikge1xuICAgIFZpZXdwb3J0TWV0cmljcy5jdXJyZW50U2Nyb2xsTGVmdCA9IHNjcm9sbFBvc2l0aW9uLng7XG4gICAgVmlld3BvcnRNZXRyaWNzLmN1cnJlbnRTY3JvbGxUb3AgPSBzY3JvbGxQb3NpdGlvbi55O1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVmlld3BvcnRNZXRyaWNzOyJdfQ==