/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactChildren
 */

'use strict';

var PooledClass = require('./PooledClass');
var ReactElement = require('./ReactElement');

var emptyFunction = require('fbjs/lib/emptyFunction');
var traverseAllChildren = require('./traverseAllChildren');

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/(?!\/)/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '//');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func;
  var context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result;
  var keyPrefix = bookKeeping.keyPrefix;
  var func = bookKeeping.func;
  var context = bookKeeping.context;

  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild !== child ? escapeUserProvidedKey(mappedChild.key || '') + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

module.exports = ReactChildren;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL1JlYWN0Q2hpbGRyZW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFXQTs7QUFFQSxJQUFJLGNBQWMsUUFBUSxlQUFSLENBQWxCO0FBQ0EsSUFBSSxlQUFlLFFBQVEsZ0JBQVIsQ0FBbkI7O0FBRUEsSUFBSSxnQkFBZ0IsUUFBUSx3QkFBUixDQUFwQjtBQUNBLElBQUksc0JBQXNCLFFBQVEsdUJBQVIsQ0FBMUI7O0FBRUEsSUFBSSxvQkFBb0IsWUFBWSxpQkFBcEM7QUFDQSxJQUFJLHFCQUFxQixZQUFZLGtCQUFyQzs7QUFFQSxJQUFJLDZCQUE2QixXQUFqQztBQUNBLFNBQVMscUJBQVQsQ0FBK0IsSUFBL0IsRUFBcUM7QUFDbkMsU0FBTyxDQUFDLEtBQUssSUFBTixFQUFZLE9BQVosQ0FBb0IsMEJBQXBCLEVBQWdELElBQWhELENBQVA7QUFDRDs7Ozs7Ozs7OztBQVVELFNBQVMsa0JBQVQsQ0FBNEIsZUFBNUIsRUFBNkMsY0FBN0MsRUFBNkQ7QUFDM0QsT0FBSyxJQUFMLEdBQVksZUFBWjtBQUNBLE9BQUssT0FBTCxHQUFlLGNBQWY7QUFDQSxPQUFLLEtBQUwsR0FBYSxDQUFiO0FBQ0Q7QUFDRCxtQkFBbUIsU0FBbkIsQ0FBNkIsVUFBN0IsR0FBMEMsWUFBWTtBQUNwRCxPQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsT0FBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLE9BQUssS0FBTCxHQUFhLENBQWI7QUFDRCxDQUpEO0FBS0EsWUFBWSxZQUFaLENBQXlCLGtCQUF6QixFQUE2QyxpQkFBN0M7O0FBRUEsU0FBUyxrQkFBVCxDQUE0QixXQUE1QixFQUF5QyxLQUF6QyxFQUFnRCxJQUFoRCxFQUFzRDtBQUNwRCxNQUFJLE9BQU8sWUFBWSxJQUF2QjtBQUNBLE1BQUksVUFBVSxZQUFZLE9BQTFCOztBQUVBLE9BQUssSUFBTCxDQUFVLE9BQVYsRUFBbUIsS0FBbkIsRUFBMEIs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QUF2QyxFQUErQyxJQUEvQyxFQUFxRCxJQUFyRCxFQUEyRCxPQUEzRDtBQUNBLFNBQU8sTUFBUDtBQUNEOztBQUVELFNBQVMsdUJBQVQsQ0FBaUMsZUFBakMsRUFBa0QsS0FBbEQsRUFBeUQsSUFBekQsRUFBK0Q7QUFDN0QsU0FBTyxJQUFQO0FBQ0Q7Ozs7Ozs7OztBQVNELFNBQVMsYUFBVCxDQUF1QixRQUF2QixFQUFpQyxPQUFqQyxFQUEwQztBQUN4QyxTQUFPLG9CQUFvQixRQUFwQixFQUE4Qix1QkFBOUIsRUFBdUQsSUFBdkQsQ0FBUDtBQUNEOzs7Ozs7QUFNRCxTQUFTLE9BQVQsQ0FBaUIsUUFBakIsRUFBMkI7QUFDekIsTUFBSSxTQUFTLEVBQWI7QUFDQSwrQkFBNkIsUUFBN0IsRUFBdUMsTUFBdkMsRUFBK0MsSUFBL0MsRUFBcUQsY0FBYyxtQkFBbkU7QUFDQSxTQUFPLE1BQVA7QUFDRDs7QUFFRCxJQUFJLGdCQUFnQjtBQUNsQixXQUFTLGVBRFM7QUFFbEIsT0FBSyxXQUZhO0FBR2xCLGdDQUE4Qiw0QkFIWjtBQUlsQixTQUFPLGFBSlc7QUFLbEIsV0FBUztBQUxTLENBQXBCOztBQVFBLE9BQU8sT0FBUCxHQUFpQixhQUFqQiIsImZpbGUiOiJSZWFjdENoaWxkcmVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q2hpbGRyZW5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBQb29sZWRDbGFzcyA9IHJlcXVpcmUoJy4vUG9vbGVkQ2xhc3MnKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciB0cmF2ZXJzZUFsbENoaWxkcmVuID0gcmVxdWlyZSgnLi90cmF2ZXJzZUFsbENoaWxkcmVuJyk7XG5cbnZhciB0d29Bcmd1bWVudFBvb2xlciA9IFBvb2xlZENsYXNzLnR3b0FyZ3VtZW50UG9vbGVyO1xudmFyIGZvdXJBcmd1bWVudFBvb2xlciA9IFBvb2xlZENsYXNzLmZvdXJBcmd1bWVudFBvb2xlcjtcblxudmFyIHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4ID0gL1xcLyg/IVxcLykvZztcbmZ1bmN0aW9uIGVzY2FwZVVzZXJQcm92aWRlZEtleSh0ZXh0KSB7XG4gIHJldHVybiAoJycgKyB0ZXh0KS5yZXBsYWNlKHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4LCAnLy8nKTtcbn1cblxuLyoqXG4gKiBQb29sZWRDbGFzcyByZXByZXNlbnRpbmcgdGhlIGJvb2trZWVwaW5nIGFzc29jaWF0ZWQgd2l0aCBwZXJmb3JtaW5nIGEgY2hpbGRcbiAqIHRyYXZlcnNhbC4gQWxsb3dzIGF2b2lkaW5nIGJpbmRpbmcgY2FsbGJhY2tzLlxuICpcbiAqIEBjb25zdHJ1Y3RvciBGb3JFYWNoQm9va0tlZXBpbmdcbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBmb3JFYWNoRnVuY3Rpb24gRnVuY3Rpb24gdG8gcGVyZm9ybSB0cmF2ZXJzYWwgd2l0aC5cbiAqIEBwYXJhbSB7Pyp9IGZvckVhY2hDb250ZXh0IENvbnRleHQgdG8gcGVyZm9ybSBjb250ZXh0IHdpdGguXG4gKi9cbmZ1bmN0aW9uIEZvckVhY2hCb29rS2VlcGluZyhmb3JFYWNoRnVuY3Rpb24sIGZvckVhY2hDb250ZXh0KSB7XG4gIHRoaXMuZnVuYyA9IGZvckVhY2hGdW5jdGlvbjtcbiAgdGhpcy5jb250ZXh0ID0gZm9yRWFjaENvbnRleHQ7XG4gIHRoaXMuY291bnQgPSAwO1xufVxuRm9yRWFjaEJvb2tLZWVwaW5nLnByb3RvdHlwZS5kZXN0cnVjdG9yID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmZ1bmMgPSBudWxsO1xuICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICB0aGlzLmNvdW50ID0gMDtcbn07XG5Qb29sZWRDbGFzcy5hZGRQb29saW5nVG8oRm9yRWFjaEJvb2tLZWVwaW5nLCB0d29Bcmd1bWVudFBvb2xlcik7XG5cbmZ1bmN0aW9uIGZvckVhY2hTaW5nbGVDaGlsZChib29rS2VlcGluZywgY2hpbGQsIG5hbWUpIHtcbiAgdmFyIGZ1bmMgPSBib29rS2VlcGluZy5mdW5jO1xuICB2YXIgY29udGV4dCA9IGJvb2tLZWVwaW5nLmNvbnRleHQ7XG5cbiAgZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlcyB0aHJvdWdoIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBUaGUgcHJvdmlkZWQgZm9yRWFjaEZ1bmMoY2hpbGQsIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZm9yRWFjaEZ1bmNcbiAqIEBwYXJhbSB7Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCBmb3IgZm9yRWFjaENvbnRleHQuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2hDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciB0cmF2ZXJzZUNvbnRleHQgPSBGb3JFYWNoQm9va0tlZXBpbmcuZ2V0UG9vbGVkKGZvckVhY2hGdW5jLCBmb3JFYWNoQ29udGV4dCk7XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hTaW5nbGVDaGlsZCwgdHJhdmVyc2VDb250ZXh0KTtcbiAgRm9yRWFjaEJvb2tLZWVwaW5nLnJlbGVhc2UodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuLyoqXG4gKiBQb29sZWRDbGFzcyByZXByZXNlbnRpbmcgdGhlIGJvb2trZWVwaW5nIGFzc29jaWF0ZWQgd2l0aCBwZXJmb3JtaW5nIGEgY2hpbGRcbiAqIG1hcHBpbmcuIEFsbG93cyBhdm9pZGluZyBiaW5kaW5nIGNhbGxiYWNrcy5cbiAqXG4gKiBAY29uc3RydWN0b3IgTWFwQm9va0tlZXBpbmdcbiAqIEBwYXJhbSB7ISp9IG1hcFJlc3VsdCBPYmplY3QgY29udGFpbmluZyB0aGUgb3JkZXJlZCBtYXAgb2YgcmVzdWx0cy5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBtYXBGdW5jdGlvbiBGdW5jdGlvbiB0byBwZXJmb3JtIG1hcHBpbmcgd2l0aC5cbiAqIEBwYXJhbSB7Pyp9IG1hcENvbnRleHQgQ29udGV4dCB0byBwZXJmb3JtIG1hcHBpbmcgd2l0aC5cbiAqL1xuZnVuY3Rpb24gTWFwQm9va0tlZXBpbmcobWFwUmVzdWx0LCBrZXlQcmVmaXgsIG1hcEZ1bmN0aW9uLCBtYXBDb250ZXh0KSB7XG4gIHRoaXMucmVzdWx0ID0gbWFwUmVzdWx0O1xuICB0aGlzLmtleVByZWZpeCA9IGtleVByZWZpeDtcbiAgdGhpcy5mdW5jID0gbWFwRnVuY3Rpb247XG4gIHRoaXMuY29udGV4dCA9IG1hcENvbnRleHQ7XG4gIHRoaXMuY291bnQgPSAwO1xufVxuTWFwQm9va0tlZXBpbmcucHJvdG90eXBlLmRlc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmVzdWx0ID0gbnVsbDtcbiAgdGhpcy5rZXlQcmVmaXggPSBudWxsO1xuICB0aGlzLmZ1bmMgPSBudWxsO1xuICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICB0aGlzLmNvdW50ID0gMDtcbn07XG5Qb29sZWRDbGFzcy5hZGRQb29saW5nVG8oTWFwQm9va0tlZXBpbmcsIGZvdXJBcmd1bWVudFBvb2xlcik7XG5cbmZ1bmN0aW9uIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQoYm9va0tlZXBpbmcsIGNoaWxkLCBjaGlsZEtleSkge1xuICB2YXIgcmVzdWx0ID0gYm9va0tlZXBpbmcucmVzdWx0O1xuICB2YXIga2V5UHJlZml4ID0gYm9va0tlZXBpbmcua2V5UHJlZml4O1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmM7XG4gIHZhciBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuICB2YXIgbWFwcGVkQ2hpbGQgPSBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xuICBpZiAoQXJyYXkuaXNBcnJheShtYXBwZWRDaGlsZCkpIHtcbiAgICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKG1hcHBlZENoaWxkLCByZXN1bHQsIGNoaWxkS2V5LCBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQpO1xuICB9IGVsc2UgaWYgKG1hcHBlZENoaWxkICE9IG51bGwpIHtcbiAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KG1hcHBlZENoaWxkKSkge1xuICAgICAgbWFwcGVkQ2hpbGQgPSBSZWFjdEVsZW1lbnQuY2xvbmVBbmRSZXBsYWNlS2V5KG1hcHBlZENoaWxkLFxuICAgICAgLy8gS2VlcCBib3RoIHRoZSAobWFwcGVkKSBhbmQgb2xkIGtleXMgaWYgdGhleSBkaWZmZXIsIGp1c3QgYXNcbiAgICAgIC8vIHRyYXZlcnNlQWxsQ2hpbGRyZW4gdXNlZCB0byBkbyBmb3Igb2JqZWN0cyBhcyBjaGlsZHJlblxuICAgICAga2V5UHJlZml4ICsgKG1hcHBlZENoaWxkICE9PSBjaGlsZCA/IGVzY2FwZVVzZXJQcm92aWRlZEtleShtYXBwZWRDaGlsZC5rZXkgfHwgJycpICsgJy8nIDogJycpICsgY2hpbGRLZXkpO1xuICAgIH1cbiAgICByZXN1bHQucHVzaChtYXBwZWRDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgYXJyYXksIHByZWZpeCwgZnVuYywgY29udGV4dCkge1xuICB2YXIgZXNjYXBlZFByZWZpeCA9ICcnO1xuICBpZiAocHJlZml4ICE9IG51bGwpIHtcbiAgICBlc2NhcGVkUHJlZml4ID0gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHByZWZpeCkgKyAnLyc7XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IE1hcEJvb2tLZWVwaW5nLmdldFBvb2xlZChhcnJheSwgZXNjYXBlZFByZWZpeCwgZnVuYywgY29udGV4dCk7XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIE1hcEJvb2tLZWVwaW5nLnJlbGVhc2UodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuLyoqXG4gKiBNYXBzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBUaGUgcHJvdmlkZWQgbWFwRnVuY3Rpb24oY2hpbGQsIGtleSwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gKiBsZWFmIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmdW5jIFRoZSBtYXAgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgQ29udGV4dCBmb3IgbWFwRnVuY3Rpb24uXG4gKiBAcmV0dXJuIHtvYmplY3R9IE9iamVjdCBjb250YWluaW5nIHRoZSBvcmRlcmVkIG1hcCBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBtYXBDaGlsZHJlbihjaGlsZHJlbiwgZnVuYywgY29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIHJlc3VsdCwgbnVsbCwgZnVuYywgY29udGV4dCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGZvckVhY2hTaW5nbGVDaGlsZER1bW15KHRyYXZlcnNlQ29udGV4dCwgY2hpbGQsIG5hbWUpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogQ291bnQgdGhlIG51bWJlciBvZiBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzXG4gKiBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuLlxuICovXG5mdW5jdGlvbiBjb3VudENoaWxkcmVuKGNoaWxkcmVuLCBjb250ZXh0KSB7XG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGREdW1teSwgbnVsbCk7XG59XG5cbi8qKlxuICogRmxhdHRlbiBhIGNoaWxkcmVuIG9iamVjdCAodHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gKSBhbmRcbiAqIHJldHVybiBhbiBhcnJheSB3aXRoIGFwcHJvcHJpYXRlbHkgcmUta2V5ZWQgY2hpbGRyZW4uXG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkoY2hpbGRyZW4pIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbnZhciBSZWFjdENoaWxkcmVuID0ge1xuICBmb3JFYWNoOiBmb3JFYWNoQ2hpbGRyZW4sXG4gIG1hcDogbWFwQ2hpbGRyZW4sXG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWw6IG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwsXG4gIGNvdW50OiBjb3VudENoaWxkcmVuLFxuICB0b0FycmF5OiB0b0FycmF5XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q2hpbGRyZW47Il19