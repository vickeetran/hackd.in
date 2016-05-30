/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule findDOMNode
 * @typechecks static-only
 */

'use strict';

var ReactCurrentOwner = require('./ReactCurrentOwner');
var ReactInstanceMap = require('./ReactInstanceMap');
var ReactMount = require('./ReactMount');

var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

/**
 * Returns the DOM node rendered by this element.
 *
 * @param {ReactComponent|DOMElement} componentOrElement
 * @return {?DOMElement} The root node of this element.
 */
function findDOMNode(componentOrElement) {
  if (process.env.NODE_ENV !== 'production') {
    var owner = ReactCurrentOwner.current;
    if (owner !== null) {
      process.env.NODE_ENV !== 'production' ? warning(owner._warnedAboutRefsInRender, '%s is accessing getDOMNode or findDOMNode inside its render(). ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', owner.getName() || 'A component') : undefined;
      owner._warnedAboutRefsInRender = true;
    }
  }
  if (componentOrElement == null) {
    return null;
  }
  if (componentOrElement.nodeType === 1) {
    return componentOrElement;
  }
  if (ReactInstanceMap.has(componentOrElement)) {
    return ReactMount.getNodeFromInstance(componentOrElement);
  }
  !(componentOrElement.render == null || typeof componentOrElement.render !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'findDOMNode was called on an unmounted component.') : invariant(false) : undefined;
  !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Element appears to be neither ReactComponent nor DOMNode (keys: %s)', Object.keys(componentOrElement)) : invariant(false) : undefined;
}

module.exports = findDOMNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL2ZpbmRET01Ob2RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVlBOztBQUVBLElBQUksb0JBQW9CLFFBQVEscUJBQVIsQ0FBeEI7QUFDQSxJQUFJLG1CQUFtQixRQUFRLG9CQUFSLENBQXZCO0FBQ0EsSUFBSSxhQUFhLFFBQVEsY0FBUixDQUFqQjs7QUFFQSxJQUFJLFlBQVksUUFBUSxvQkFBUixDQUFoQjtBQUNBLElBQUksVUFBVSxRQUFRLGtCQUFSLENBQWQ7Ozs7Ozs7O0FBUUEsU0FBUyxXQUFULENBQXFCLGtCQUFyQixFQUF5QztBQUN2QyxNQUFJLFFBQVEsR0FBUixDQUFZLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekMsUUFBSSxRQUFRLGtCQUFrQixPQUE5QjtBQUNBLFFBQUksVUFBVSxJQUFkLEVBQW9CO0FBQ2xCLGNBQVEsR0FBUixDQUFZLFFBQVosS0FBeUIsWUFBekIsR0FBd0MsUUFBUSxNQUFNLHdCQUFkLEVBQXdDLG9FQUFvRSxtRUFBcEUsR0FBMEksb0VBQTFJLEdBQWlOLGlFQUFqTixHQUFxUiw2QkFBN1QsRUFBNFYsTUFBTSxPQUFOLE1BQW1CLGFBQS9XLENBQXhDLEdBQXdhLFNBQXhhO0FBQ0EsWUFBTSx3QkFBTixHQUFpQyxJQUFqQztBQUNEO0FBQ0Y7QUFDRCxNQUFJLHNCQUFzQixJQUExQixFQUFnQztBQUM5QixXQUFPLElBQVA7QUFDRDtBQUNELE1BQUksbUJBQW1CLFFBQW5CLEtBQWdDLENBQXBDLEVBQXVDO0FBQ3JDLFdBQU8sa0JBQVA7QUFDRDtBQUNELE1BQUksaUJBQWlCLEdBQWpCLENBQXFCLGtCQUFyQixDQUFKLEVBQThDO0FBQzVDLFdBQU8sV0FBVyxtQkFBWCxDQUErQixrQkFBL0IsQ0FBUDtBQUNEO0FBQ0QsSUFBRSxtQkFBbUIsTUFBbkIsSUFBNkIsSUFBN0IsSUFBcUMsT0FBTyxtQkFBbUIsTUFBMUIsS0FBcUMsVUFBNUUsSUFBMEYsUUFBUSxHQUFSLENBQVksUUFBWixLQUF5QixZQUF6QixHQUF3QyxVQUFVLEtBQVYsRUFBaUIsbURBQWpCLENBQXhDLEdBQWdILFVBQVUsS0FBVixDQUExTSxHQUE2TixTQUE3TjtBQUNBLEdBQUMsS0FBRCxHQUFTLFFBQVEsR0FBUixDQUFZLFFBQVosS0FBeUIsWUFBekIsR0FBd0MsVUFBVSxLQUFWLEVBQWlCLHFFQUFqQixFQUF3RixPQUFPLElBQVAsQ0FBWSxrQkFBWixDQUF4RixDQUF4QyxHQUFtSyxVQUFVLEtBQVYsQ0FBNUssR0FBK0wsU0FBL0w7QUFDRDs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsV0FBakIiLCJmaWxlIjoiZmluZERPTU5vZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgZmluZERPTU5vZGVcbiAqIEB0eXBlY2hlY2tzIHN0YXRpYy1vbmx5XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUmVhY3RJbnN0YW5jZU1hcCA9IHJlcXVpcmUoJy4vUmVhY3RJbnN0YW5jZU1hcCcpO1xudmFyIFJlYWN0TW91bnQgPSByZXF1aXJlKCcuL1JlYWN0TW91bnQnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgRE9NIG5vZGUgcmVuZGVyZWQgYnkgdGhpcyBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR8RE9NRWxlbWVudH0gY29tcG9uZW50T3JFbGVtZW50XG4gKiBAcmV0dXJuIHs/RE9NRWxlbWVudH0gVGhlIHJvb3Qgbm9kZSBvZiB0aGlzIGVsZW1lbnQuXG4gKi9cbmZ1bmN0aW9uIGZpbmRET01Ob2RlKGNvbXBvbmVudE9yRWxlbWVudCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHZhciBvd25lciA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQ7XG4gICAgaWYgKG93bmVyICE9PSBudWxsKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhvd25lci5fd2FybmVkQWJvdXRSZWZzSW5SZW5kZXIsICclcyBpcyBhY2Nlc3NpbmcgZ2V0RE9NTm9kZSBvciBmaW5kRE9NTm9kZSBpbnNpZGUgaXRzIHJlbmRlcigpLiAnICsgJ3JlbmRlcigpIHNob3VsZCBiZSBhIHB1cmUgZnVuY3Rpb24gb2YgcHJvcHMgYW5kIHN0YXRlLiBJdCBzaG91bGQgJyArICduZXZlciBhY2Nlc3Mgc29tZXRoaW5nIHRoYXQgcmVxdWlyZXMgc3RhbGUgZGF0YSBmcm9tIHRoZSBwcmV2aW91cyAnICsgJ3JlbmRlciwgc3VjaCBhcyByZWZzLiBNb3ZlIHRoaXMgbG9naWMgdG8gY29tcG9uZW50RGlkTW91bnQgYW5kICcgKyAnY29tcG9uZW50RGlkVXBkYXRlIGluc3RlYWQuJywgb3duZXIuZ2V0TmFtZSgpIHx8ICdBIGNvbXBvbmVudCcpIDogdW5kZWZpbmVkO1xuICAgICAgb3duZXIuX3dhcm5lZEFib3V0UmVmc0luUmVuZGVyID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgaWYgKGNvbXBvbmVudE9yRWxlbWVudCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKGNvbXBvbmVudE9yRWxlbWVudC5ub2RlVHlwZSA9PT0gMSkge1xuICAgIHJldHVybiBjb21wb25lbnRPckVsZW1lbnQ7XG4gIH1cbiAgaWYgKFJlYWN0SW5zdGFuY2VNYXAuaGFzKGNvbXBvbmVudE9yRWxlbWVudCkpIHtcbiAgICByZXR1cm4gUmVhY3RNb3VudC5nZXROb2RlRnJvbUluc3RhbmNlKGNvbXBvbmVudE9yRWxlbWVudCk7XG4gIH1cbiAgIShjb21wb25lbnRPckVsZW1lbnQucmVuZGVyID09IG51bGwgfHwgdHlwZW9mIGNvbXBvbmVudE9yRWxlbWVudC5yZW5kZXIgIT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ2ZpbmRET01Ob2RlIHdhcyBjYWxsZWQgb24gYW4gdW5tb3VudGVkIGNvbXBvbmVudC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICFmYWxzZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFbGVtZW50IGFwcGVhcnMgdG8gYmUgbmVpdGhlciBSZWFjdENvbXBvbmVudCBub3IgRE9NTm9kZSAoa2V5czogJXMpJywgT2JqZWN0LmtleXMoY29tcG9uZW50T3JFbGVtZW50KSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbmRET01Ob2RlOyJdfQ==