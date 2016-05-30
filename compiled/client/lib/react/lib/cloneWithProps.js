/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks static-only
 * @providesModule cloneWithProps
 */

'use strict';

var ReactElement = require('./ReactElement');
var ReactPropTransferer = require('./ReactPropTransferer');

var keyOf = require('fbjs/lib/keyOf');
var warning = require('fbjs/lib/warning');

var CHILDREN_PROP = keyOf({ children: null });

var didDeprecatedWarn = false;

/**
 * Sometimes you want to change the props of a child passed to you. Usually
 * this is to add a CSS class.
 *
 * @param {ReactElement} child child element you'd like to clone
 * @param {object} props props you'd like to modify. className and style will be
 * merged automatically.
 * @return {ReactElement} a clone of child with props merged in.
 * @deprecated
 */
function cloneWithProps(child, props) {
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(didDeprecatedWarn, 'cloneWithProps(...) is deprecated. ' + 'Please use React.cloneElement instead.') : undefined;
    didDeprecatedWarn = true;
    process.env.NODE_ENV !== 'production' ? warning(!child.ref, 'You are calling cloneWithProps() on a child with a ref. This is ' + 'dangerous because you\'re creating a new child which will not be ' + 'added as a ref to its parent.') : undefined;
  }

  var newProps = ReactPropTransferer.mergeProps(props, child.props);

  // Use `child.props.children` if it is provided.
  if (!newProps.hasOwnProperty(CHILDREN_PROP) && child.props.hasOwnProperty(CHILDREN_PROP)) {
    newProps.children = child.props.children;
  }

  // The current API doesn't retain _owner, which is why this
  // doesn't use ReactElement.cloneAndReplaceProps.
  return ReactElement.createElement(child.type, newProps);
}

module.exports = cloneWithProps;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL2Nsb25lV2l0aFByb3BzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVlBOztBQUVBLElBQUksZUFBZSxRQUFRLGdCQUFSLENBQW5CO0FBQ0EsSUFBSSxzQkFBc0IsUUFBUSx1QkFBUixDQUExQjs7QUFFQSxJQUFJLFFBQVEsUUFBUSxnQkFBUixDQUFaO0FBQ0EsSUFBSSxVQUFVLFFBQVEsa0JBQVIsQ0FBZDs7QUFFQSxJQUFJLGdCQUFnQixNQUFNLEVBQUUsVUFBVSxJQUFaLEVBQU4sQ0FBcEI7O0FBRUEsSUFBSSxvQkFBb0IsS0FBeEI7Ozs7Ozs7Ozs7OztBQVlBLFNBQVMsY0FBVCxDQUF3QixLQUF4QixFQUErQixLQUEvQixFQUFzQztBQUNwQyxNQUFJLFFBQVEsR0FBUixDQUFZLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekMsWUFBUSxHQUFSLENBQVksUUFBWixLQUF5QixZQUF6QixHQUF3QyxRQUFRLGlCQUFSLEVBQTJCLHdDQUF3Qyx3Q0FBbkUsQ0FBeEMsR0FBdUosU0FBdko7QUFDQSx3QkFBb0IsSUFBcEI7QUFDQSxZQUFRLEdBQVIsQ0FBWSxRQUFaLEtBQXlCLFlBQXpCLEdBQXdDLFFBQVEsQ0FBQyxNQUFNLEdBQWYsRUFBb0IscUVBQXFFLG1FQUFyRSxHQUEySSwrQkFBL0osQ0FBeEMsR0FBME8sU0FBMU87QUFDRDs7QUFFRCxNQUFJLFdBQVcsb0JBQW9CLFVBQXBCLENBQStCLEtBQS9CLEVBQXNDLE1BQU0sS0FBNUMsQ0FBZjs7O0FBR0EsTUFBSSxDQUFDLFNBQVMsY0FBVCxDQUF3QixhQUF4QixDQUFELElBQTJDLE1BQU0sS0FBTixDQUFZLGNBQVosQ0FBMkIsYUFBM0IsQ0FBL0MsRUFBMEY7QUFDeEYsYUFBUyxRQUFULEdBQW9CLE1BQU0sS0FBTixDQUFZLFFBQWhDO0FBQ0Q7Ozs7QUFJRCxTQUFPLGFBQWEsYUFBYixDQUEyQixNQUFNLElBQWpDLEVBQXVDLFFBQXZDLENBQVA7QUFDRDs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsY0FBakIiLCJmaWxlIjoiY2xvbmVXaXRoUHJvcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAdHlwZWNoZWNrcyBzdGF0aWMtb25seVxuICogQHByb3ZpZGVzTW9kdWxlIGNsb25lV2l0aFByb3BzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdFByb3BUcmFuc2ZlcmVyID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUcmFuc2ZlcmVyJyk7XG5cbnZhciBrZXlPZiA9IHJlcXVpcmUoJ2ZianMvbGliL2tleU9mJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIENISUxEUkVOX1BST1AgPSBrZXlPZih7IGNoaWxkcmVuOiBudWxsIH0pO1xuXG52YXIgZGlkRGVwcmVjYXRlZFdhcm4gPSBmYWxzZTtcblxuLyoqXG4gKiBTb21ldGltZXMgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSBwcm9wcyBvZiBhIGNoaWxkIHBhc3NlZCB0byB5b3UuIFVzdWFsbHlcbiAqIHRoaXMgaXMgdG8gYWRkIGEgQ1NTIGNsYXNzLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBjaGlsZCBjaGlsZCBlbGVtZW50IHlvdSdkIGxpa2UgdG8gY2xvbmVcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wcyBwcm9wcyB5b3UnZCBsaWtlIHRvIG1vZGlmeS4gY2xhc3NOYW1lIGFuZCBzdHlsZSB3aWxsIGJlXG4gKiBtZXJnZWQgYXV0b21hdGljYWxseS5cbiAqIEByZXR1cm4ge1JlYWN0RWxlbWVudH0gYSBjbG9uZSBvZiBjaGlsZCB3aXRoIHByb3BzIG1lcmdlZCBpbi5cbiAqIEBkZXByZWNhdGVkXG4gKi9cbmZ1bmN0aW9uIGNsb25lV2l0aFByb3BzKGNoaWxkLCBwcm9wcykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGRpZERlcHJlY2F0ZWRXYXJuLCAnY2xvbmVXaXRoUHJvcHMoLi4uKSBpcyBkZXByZWNhdGVkLiAnICsgJ1BsZWFzZSB1c2UgUmVhY3QuY2xvbmVFbGVtZW50IGluc3RlYWQuJykgOiB1bmRlZmluZWQ7XG4gICAgZGlkRGVwcmVjYXRlZFdhcm4gPSB0cnVlO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFjaGlsZC5yZWYsICdZb3UgYXJlIGNhbGxpbmcgY2xvbmVXaXRoUHJvcHMoKSBvbiBhIGNoaWxkIHdpdGggYSByZWYuIFRoaXMgaXMgJyArICdkYW5nZXJvdXMgYmVjYXVzZSB5b3VcXCdyZSBjcmVhdGluZyBhIG5ldyBjaGlsZCB3aGljaCB3aWxsIG5vdCBiZSAnICsgJ2FkZGVkIGFzIGEgcmVmIHRvIGl0cyBwYXJlbnQuJykgOiB1bmRlZmluZWQ7XG4gIH1cblxuICB2YXIgbmV3UHJvcHMgPSBSZWFjdFByb3BUcmFuc2ZlcmVyLm1lcmdlUHJvcHMocHJvcHMsIGNoaWxkLnByb3BzKTtcblxuICAvLyBVc2UgYGNoaWxkLnByb3BzLmNoaWxkcmVuYCBpZiBpdCBpcyBwcm92aWRlZC5cbiAgaWYgKCFuZXdQcm9wcy5oYXNPd25Qcm9wZXJ0eShDSElMRFJFTl9QUk9QKSAmJiBjaGlsZC5wcm9wcy5oYXNPd25Qcm9wZXJ0eShDSElMRFJFTl9QUk9QKSkge1xuICAgIG5ld1Byb3BzLmNoaWxkcmVuID0gY2hpbGQucHJvcHMuY2hpbGRyZW47XG4gIH1cblxuICAvLyBUaGUgY3VycmVudCBBUEkgZG9lc24ndCByZXRhaW4gX293bmVyLCB3aGljaCBpcyB3aHkgdGhpc1xuICAvLyBkb2Vzbid0IHVzZSBSZWFjdEVsZW1lbnQuY2xvbmVBbmRSZXBsYWNlUHJvcHMuXG4gIHJldHVybiBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudChjaGlsZC50eXBlLCBuZXdQcm9wcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmVXaXRoUHJvcHM7Il19