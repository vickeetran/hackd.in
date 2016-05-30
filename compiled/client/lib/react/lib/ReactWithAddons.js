/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactWithAddons
 */

/**
 * This module exists purely in the open source project, and is meant as a way
 * to create a separate standalone build of React. This build has "addons", or
 * functionality we've built and think might be useful but doesn't have a good
 * place to live inside React core.
 */

'use strict';

var LinkedStateMixin = require('./LinkedStateMixin');
var React = require('./React');
var ReactComponentWithPureRenderMixin = require('./ReactComponentWithPureRenderMixin');
var ReactCSSTransitionGroup = require('./ReactCSSTransitionGroup');
var ReactFragment = require('./ReactFragment');
var ReactTransitionGroup = require('./ReactTransitionGroup');
var ReactUpdates = require('./ReactUpdates');

var cloneWithProps = require('./cloneWithProps');
var shallowCompare = require('./shallowCompare');
var update = require('./update');
var warning = require('fbjs/lib/warning');

var warnedAboutBatchedUpdates = false;

React.addons = {
  CSSTransitionGroup: ReactCSSTransitionGroup,
  LinkedStateMixin: LinkedStateMixin,
  PureRenderMixin: ReactComponentWithPureRenderMixin,
  TransitionGroup: ReactTransitionGroup,

  batchedUpdates: function batchedUpdates() {
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(warnedAboutBatchedUpdates, 'React.addons.batchedUpdates is deprecated. Use ' + 'ReactDOM.unstable_batchedUpdates instead.') : undefined;
      warnedAboutBatchedUpdates = true;
    }
    return ReactUpdates.batchedUpdates.apply(this, arguments);
  },
  cloneWithProps: cloneWithProps,
  createFragment: ReactFragment.create,
  shallowCompare: shallowCompare,
  update: update
};

if (process.env.NODE_ENV !== 'production') {
  React.addons.Perf = require('./ReactDefaultPerf');
  React.addons.TestUtils = require('./ReactTestUtils');
}

module.exports = React;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL1JlYWN0V2l0aEFkZG9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkE7O0FBRUEsSUFBSSxtQkFBbUIsUUFBUSxvQkFBUixDQUF2QjtBQUNBLElBQUksUUFBUSxRQUFRLFNBQVIsQ0FBWjtBQUNBLElBQUksb0NBQW9DLFFBQVEscUNBQVIsQ0FBeEM7QUFDQSxJQUFJLDBCQUEwQixRQUFRLDJCQUFSLENBQTlCO0FBQ0EsSUFBSSxnQkFBZ0IsUUFBUSxpQkFBUixDQUFwQjtBQUNBLElBQUksdUJBQXVCLFFBQVEsd0JBQVIsQ0FBM0I7QUFDQSxJQUFJLGVBQWUsUUFBUSxnQkFBUixDQUFuQjs7QUFFQSxJQUFJLGlCQUFpQixRQUFRLGtCQUFSLENBQXJCO0FBQ0EsSUFBSSxpQkFBaUIsUUFBUSxrQkFBUixDQUFyQjtBQUNBLElBQUksU0FBUyxRQUFRLFVBQVIsQ0FBYjtBQUNBLElBQUksVUFBVSxRQUFRLGtCQUFSLENBQWQ7O0FBRUEsSUFBSSw0QkFBNEIsS0FBaEM7O0FBRUEsTUFBTSxNQUFOLEdBQWU7QUFDYixzQkFBb0IsdUJBRFA7QUFFYixvQkFBa0IsZ0JBRkw7QUFHYixtQkFBaUIsaUNBSEo7QUFJYixtQkFBaUIsb0JBSko7O0FBTWIsa0JBQWdCLDBCQUFZO0FBQzFCLFFBQUksUUFBUSxHQUFSLENBQVksUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6QyxjQUFRLEdBQVIsQ0FBWSxRQUFaLEtBQXlCLFlBQXpCLEdBQXdDLFFBQVEseUJBQVIsRUFBbUMsb0RBQW9ELDJDQUF2RixDQUF4QyxHQUE4SyxTQUE5SztBQUNBLGtDQUE0QixJQUE1QjtBQUNEO0FBQ0QsV0FBTyxhQUFhLGNBQWIsQ0FBNEIsS0FBNUIsQ0FBa0MsSUFBbEMsRUFBd0MsU0FBeEMsQ0FBUDtBQUNELEdBWlk7QUFhYixrQkFBZ0IsY0FiSDtBQWNiLGtCQUFnQixjQUFjLE1BZGpCO0FBZWIsa0JBQWdCLGNBZkg7QUFnQmIsVUFBUTtBQWhCSyxDQUFmOztBQW1CQSxJQUFJLFFBQVEsR0FBUixDQUFZLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekMsUUFBTSxNQUFOLENBQWEsSUFBYixHQUFvQixRQUFRLG9CQUFSLENBQXBCO0FBQ0EsUUFBTSxNQUFOLENBQWEsU0FBYixHQUF5QixRQUFRLGtCQUFSLENBQXpCO0FBQ0Q7O0FBRUQsT0FBTyxPQUFQLEdBQWlCLEtBQWpCIiwiZmlsZSI6IlJlYWN0V2l0aEFkZG9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFdpdGhBZGRvbnNcbiAqL1xuXG4vKipcbiAqIFRoaXMgbW9kdWxlIGV4aXN0cyBwdXJlbHkgaW4gdGhlIG9wZW4gc291cmNlIHByb2plY3QsIGFuZCBpcyBtZWFudCBhcyBhIHdheVxuICogdG8gY3JlYXRlIGEgc2VwYXJhdGUgc3RhbmRhbG9uZSBidWlsZCBvZiBSZWFjdC4gVGhpcyBidWlsZCBoYXMgXCJhZGRvbnNcIiwgb3JcbiAqIGZ1bmN0aW9uYWxpdHkgd2UndmUgYnVpbHQgYW5kIHRoaW5rIG1pZ2h0IGJlIHVzZWZ1bCBidXQgZG9lc24ndCBoYXZlIGEgZ29vZFxuICogcGxhY2UgdG8gbGl2ZSBpbnNpZGUgUmVhY3QgY29yZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaW5rZWRTdGF0ZU1peGluID0gcmVxdWlyZSgnLi9MaW5rZWRTdGF0ZU1peGluJyk7XG52YXIgUmVhY3QgPSByZXF1aXJlKCcuL1JlYWN0Jyk7XG52YXIgUmVhY3RDb21wb25lbnRXaXRoUHVyZVJlbmRlck1peGluID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW4nKTtcbnZhciBSZWFjdENTU1RyYW5zaXRpb25Hcm91cCA9IHJlcXVpcmUoJy4vUmVhY3RDU1NUcmFuc2l0aW9uR3JvdXAnKTtcbnZhciBSZWFjdEZyYWdtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEZyYWdtZW50Jyk7XG52YXIgUmVhY3RUcmFuc2l0aW9uR3JvdXAgPSByZXF1aXJlKCcuL1JlYWN0VHJhbnNpdGlvbkdyb3VwJyk7XG52YXIgUmVhY3RVcGRhdGVzID0gcmVxdWlyZSgnLi9SZWFjdFVwZGF0ZXMnKTtcblxudmFyIGNsb25lV2l0aFByb3BzID0gcmVxdWlyZSgnLi9jbG9uZVdpdGhQcm9wcycpO1xudmFyIHNoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgnLi9zaGFsbG93Q29tcGFyZScpO1xudmFyIHVwZGF0ZSA9IHJlcXVpcmUoJy4vdXBkYXRlJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIHdhcm5lZEFib3V0QmF0Y2hlZFVwZGF0ZXMgPSBmYWxzZTtcblxuUmVhY3QuYWRkb25zID0ge1xuICBDU1NUcmFuc2l0aW9uR3JvdXA6IFJlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwLFxuICBMaW5rZWRTdGF0ZU1peGluOiBMaW5rZWRTdGF0ZU1peGluLFxuICBQdXJlUmVuZGVyTWl4aW46IFJlYWN0Q29tcG9uZW50V2l0aFB1cmVSZW5kZXJNaXhpbixcbiAgVHJhbnNpdGlvbkdyb3VwOiBSZWFjdFRyYW5zaXRpb25Hcm91cCxcblxuICBiYXRjaGVkVXBkYXRlczogZnVuY3Rpb24gKCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh3YXJuZWRBYm91dEJhdGNoZWRVcGRhdGVzLCAnUmVhY3QuYWRkb25zLmJhdGNoZWRVcGRhdGVzIGlzIGRlcHJlY2F0ZWQuIFVzZSAnICsgJ1JlYWN0RE9NLnVuc3RhYmxlX2JhdGNoZWRVcGRhdGVzIGluc3RlYWQuJykgOiB1bmRlZmluZWQ7XG4gICAgICB3YXJuZWRBYm91dEJhdGNoZWRVcGRhdGVzID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIFJlYWN0VXBkYXRlcy5iYXRjaGVkVXBkYXRlcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9LFxuICBjbG9uZVdpdGhQcm9wczogY2xvbmVXaXRoUHJvcHMsXG4gIGNyZWF0ZUZyYWdtZW50OiBSZWFjdEZyYWdtZW50LmNyZWF0ZSxcbiAgc2hhbGxvd0NvbXBhcmU6IHNoYWxsb3dDb21wYXJlLFxuICB1cGRhdGU6IHVwZGF0ZVxufTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgUmVhY3QuYWRkb25zLlBlcmYgPSByZXF1aXJlKCcuL1JlYWN0RGVmYXVsdFBlcmYnKTtcbiAgUmVhY3QuYWRkb25zLlRlc3RVdGlscyA9IHJlcXVpcmUoJy4vUmVhY3RUZXN0VXRpbHMnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdDsiXX0=