/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMInput
 */

'use strict';

var ReactDOMIDOperations = require('./ReactDOMIDOperations');
var LinkedValueUtils = require('./LinkedValueUtils');
var ReactMount = require('./ReactMount');
var ReactUpdates = require('./ReactUpdates');

var assign = require('./Object.assign');
var invariant = require('fbjs/lib/invariant');

var instancesByReactID = {};

function forceUpdateIfMounted() {
  if (this._rootNodeID) {
    // DOM component is still mounted; update
    ReactDOMInput.updateWrapper(this);
  }
}

/**
 * Implements an <input> native component that allows setting these optional
 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
 *
 * If `checked` or `value` are not supplied (or null/undefined), user actions
 * that affect the checked state or value will trigger updates to the element.
 *
 * If they are supplied (and not null/undefined), the rendered element will not
 * trigger updates to the element. Instead, the props must change in order for
 * the rendered element to be updated.
 *
 * The rendered element will be initialized as unchecked (or `defaultChecked`)
 * with an empty value (or `defaultValue`).
 *
 * @see http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
 */
var ReactDOMInput = {
  getNativeProps: function getNativeProps(inst, props, context) {
    var value = LinkedValueUtils.getValue(props);
    var checked = LinkedValueUtils.getChecked(props);

    var nativeProps = assign({}, props, {
      defaultChecked: undefined,
      defaultValue: undefined,
      value: value != null ? value : inst._wrapperState.initialValue,
      checked: checked != null ? checked : inst._wrapperState.initialChecked,
      onChange: inst._wrapperState.onChange
    });

    return nativeProps;
  },

  mountWrapper: function mountWrapper(inst, props) {
    if (process.env.NODE_ENV !== 'production') {
      LinkedValueUtils.checkPropTypes('input', props, inst._currentElement._owner);
    }

    var defaultValue = props.defaultValue;
    inst._wrapperState = {
      initialChecked: props.defaultChecked || false,
      initialValue: defaultValue != null ? defaultValue : null,
      onChange: _handleChange.bind(inst)
    };
  },

  mountReadyWrapper: function mountReadyWrapper(inst) {
    // Can't be in mountWrapper or else server rendering leaks.
    instancesByReactID[inst._rootNodeID] = inst;
  },

  unmountWrapper: function unmountWrapper(inst) {
    delete instancesByReactID[inst._rootNodeID];
  },

  updateWrapper: function updateWrapper(inst) {
    var props = inst._currentElement.props;

    // TODO: Shouldn't this be getChecked(props)?
    var checked = props.checked;
    if (checked != null) {
      ReactDOMIDOperations.updatePropertyByID(inst._rootNodeID, 'checked', checked || false);
    }

    var value = LinkedValueUtils.getValue(props);
    if (value != null) {
      // Cast `value` to a string to ensure the value is set correctly. While
      // browsers typically do this as necessary, jsdom doesn't.
      ReactDOMIDOperations.updatePropertyByID(inst._rootNodeID, 'value', '' + value);
    }
  }
};

function _handleChange(event) {
  var props = this._currentElement.props;

  var returnValue = LinkedValueUtils.executeOnChange(props, event);

  // Here we use asap to wait until all updates have propagated, which
  // is important when using controlled components within layers:
  // https://github.com/facebook/react/issues/1698
  ReactUpdates.asap(forceUpdateIfMounted, this);

  var name = props.name;
  if (props.type === 'radio' && name != null) {
    var rootNode = ReactMount.getNode(this._rootNodeID);
    var queryRoot = rootNode;

    while (queryRoot.parentNode) {
      queryRoot = queryRoot.parentNode;
    }

    // If `rootNode.form` was non-null, then we could try `form.elements`,
    // but that sometimes behaves strangely in IE8. We could also try using
    // `form.getElementsByName`, but that will only return direct children
    // and won't include inputs that use the HTML5 `form=` attribute. Since
    // the input might not even be in a form, let's just use the global
    // `querySelectorAll` to ensure we don't miss anything.
    var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');

    for (var i = 0; i < group.length; i++) {
      var otherNode = group[i];
      if (otherNode === rootNode || otherNode.form !== rootNode.form) {
        continue;
      }
      // This will throw if radio buttons rendered by different copies of React
      // and the same name are rendered into the same form (same as #1939).
      // That's probably okay; we don't support it just as we don't support
      // mixing React with non-React.
      var otherID = ReactMount.getID(otherNode);
      !otherID ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactDOMInput: Mixing React and non-React radio inputs with the ' + 'same `name` is not supported.') : invariant(false) : undefined;
      var otherInstance = instancesByReactID[otherID];
      !otherInstance ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactDOMInput: Unknown radio button ID %s.', otherID) : invariant(false) : undefined;
      // If this is a controlled radio button group, forcing the input that
      // was previously checked to update will cause it to be come re-checked
      // as appropriate.
      ReactUpdates.asap(forceUpdateIfMounted, otherInstance);
    }
  }

  return returnValue;
}

module.exports = ReactDOMInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL1JlYWN0RE9NSW5wdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFXQTs7QUFFQSxJQUFJLHVCQUF1QixRQUFRLHdCQUFSLENBQTNCO0FBQ0EsSUFBSSxtQkFBbUIsUUFBUSxvQkFBUixDQUF2QjtBQUNBLElBQUksYUFBYSxRQUFRLGNBQVIsQ0FBakI7QUFDQSxJQUFJLGVBQWUsUUFBUSxnQkFBUixDQUFuQjs7QUFFQSxJQUFJLFNBQVMsUUFBUSxpQkFBUixDQUFiO0FBQ0EsSUFBSSxZQUFZLFFBQVEsb0JBQVIsQ0FBaEI7O0FBRUEsSUFBSSxxQkFBcUIsRUFBekI7O0FBRUEsU0FBUyxvQkFBVCxHQUFnQztBQUM5QixNQUFJLEtBQUssV0FBVCxFQUFzQjs7QUFFcEIsa0JBQWMsYUFBZCxDQUE0QixJQUE1QjtBQUNEO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCRCxJQUFJLGdCQUFnQjtBQUNsQixrQkFBZ0Isd0JBQVUsSUFBVixFQUFnQixLQUFoQixFQUF1QixPQUF2QixFQUFnQztBQUM5QyxRQUFJLFFBQVEsaUJBQWlCLFFBQWpCLENBQTBCLEtBQTFCLENBQVo7QUFDQSxRQUFJLFVBQVUsaUJBQWlCLFVBQWpCLENBQTRCLEtBQTVCLENBQWQ7O0FBRUEsUUFBSSxjQUFjLE9BQU8sRUFBUCxFQUFXLEtBQVgsRUFBa0I7QUFDbEMsc0JBQWdCLFNBRGtCO0FBRWxDLG9CQUFjLFNBRm9CO0FBR2xDLGFBQU8sU0FBUyxJQUFULEdBQWdCLEtBQWhCLEdBQXdCLEtBQUssYUFBTCxDQUFtQixZQUhoQjtBQUlsQyxlQUFTLFdBQVcsSUFBWCxHQUFrQixPQUFsQixHQUE0QixLQUFLLGFBQUwsQ0FBbUIsY0FKdEI7QUFLbEMsZ0JBQVUsS0FBSyxhQUFMLENBQW1CO0FBTEssS0FBbEIsQ0FBbEI7O0FBUUEsV0FBTyxXQUFQO0FBQ0QsR0FkaUI7O0FBZ0JsQixnQkFBYyxzQkFB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QS9ELENBQXhDLEdBQWtILFVBQVUsS0FBVixDQUFuSSxHQUFzSixTQUF0Sjs7OztBQUlBLG1CQUFhLElBQWIsQ0FBa0Isb0JBQWxCLEVBQXdDLGFBQXhDO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPLFdBQVA7QUFDRDs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsYUFBakIiLCJmaWxlIjoiUmVhY3RET01JbnB1dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdERPTUlucHV0XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RET01JRE9wZXJhdGlvbnMgPSByZXF1aXJlKCcuL1JlYWN0RE9NSURPcGVyYXRpb25zJyk7XG52YXIgTGlua2VkVmFsdWVVdGlscyA9IHJlcXVpcmUoJy4vTGlua2VkVmFsdWVVdGlscycpO1xudmFyIFJlYWN0TW91bnQgPSByZXF1aXJlKCcuL1JlYWN0TW91bnQnKTtcbnZhciBSZWFjdFVwZGF0ZXMgPSByZXF1aXJlKCcuL1JlYWN0VXBkYXRlcycpO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi9PYmplY3QuYXNzaWduJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbnZhciBpbnN0YW5jZXNCeVJlYWN0SUQgPSB7fTtcblxuZnVuY3Rpb24gZm9yY2VVcGRhdGVJZk1vdW50ZWQoKSB7XG4gIGlmICh0aGlzLl9yb290Tm9kZUlEKSB7XG4gICAgLy8gRE9NIGNvbXBvbmVudCBpcyBzdGlsbCBtb3VudGVkOyB1cGRhdGVcbiAgICBSZWFjdERPTUlucHV0LnVwZGF0ZVdyYXBwZXIodGhpcyk7XG4gIH1cbn1cblxuLyoqXG4gKiBJbXBsZW1lbnRzIGFuIDxpbnB1dD4gbmF0aXZlIGNvbXBvbmVudCB0aGF0IGFsbG93cyBzZXR0aW5nIHRoZXNlIG9wdGlvbmFsXG4gKiBwcm9wczogYGNoZWNrZWRgLCBgdmFsdWVgLCBgZGVmYXVsdENoZWNrZWRgLCBhbmQgYGRlZmF1bHRWYWx1ZWAuXG4gKlxuICogSWYgYGNoZWNrZWRgIG9yIGB2YWx1ZWAgYXJlIG5vdCBzdXBwbGllZCAob3IgbnVsbC91bmRlZmluZWQpLCB1c2VyIGFjdGlvbnNcbiAqIHRoYXQgYWZmZWN0IHRoZSBjaGVja2VkIHN0YXRlIG9yIHZhbHVlIHdpbGwgdHJpZ2dlciB1cGRhdGVzIHRvIHRoZSBlbGVtZW50LlxuICpcbiAqIElmIHRoZXkgYXJlIHN1cHBsaWVkIChhbmQgbm90IG51bGwvdW5kZWZpbmVkKSwgdGhlIHJlbmRlcmVkIGVsZW1lbnQgd2lsbCBub3RcbiAqIHRyaWdnZXIgdXBkYXRlcyB0byB0aGUgZWxlbWVudC4gSW5zdGVhZCwgdGhlIHByb3BzIG11c3QgY2hhbmdlIGluIG9yZGVyIGZvclxuICogdGhlIHJlbmRlcmVkIGVsZW1lbnQgdG8gYmUgdXBkYXRlZC5cbiAqXG4gKiBUaGUgcmVuZGVyZWQgZWxlbWVudCB3aWxsIGJlIGluaXRpYWxpemVkIGFzIHVuY2hlY2tlZCAob3IgYGRlZmF1bHRDaGVja2VkYClcbiAqIHdpdGggYW4gZW1wdHkgdmFsdWUgKG9yIGBkZWZhdWx0VmFsdWVgKS5cbiAqXG4gKiBAc2VlIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTIvV0QtaHRtbDUtMjAxMjEwMjUvdGhlLWlucHV0LWVsZW1lbnQuaHRtbFxuICovXG52YXIgUmVhY3RET01JbnB1dCA9IHtcbiAgZ2V0TmF0aXZlUHJvcHM6IGZ1bmN0aW9uIChpbnN0LCBwcm9wcywgY29udGV4dCkge1xuICAgIHZhciB2YWx1ZSA9IExpbmtlZFZhbHVlVXRpbHMuZ2V0VmFsdWUocHJvcHMpO1xuICAgIHZhciBjaGVja2VkID0gTGlua2VkVmFsdWVVdGlscy5nZXRDaGVja2VkKHByb3BzKTtcblxuICAgIHZhciBuYXRpdmVQcm9wcyA9IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgIGRlZmF1bHRDaGVja2VkOiB1bmRlZmluZWQsXG4gICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgIHZhbHVlOiB2YWx1ZSAhPSBudWxsID8gdmFsdWUgOiBpbnN0Ll93cmFwcGVyU3RhdGUuaW5pdGlhbFZhbHVlLFxuICAgICAgY2hlY2tlZDogY2hlY2tlZCAhPSBudWxsID8gY2hlY2tlZCA6IGluc3QuX3dyYXBwZXJTdGF0ZS5pbml0aWFsQ2hlY2tlZCxcbiAgICAgIG9uQ2hhbmdlOiBpbnN0Ll93cmFwcGVyU3RhdGUub25DaGFuZ2VcbiAgICB9KTtcblxuICAgIHJldHVybiBuYXRpdmVQcm9wcztcbiAgfSxcblxuICBtb3VudFdyYXBwZXI6IGZ1bmN0aW9uIChpbnN0LCBwcm9wcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBMaW5rZWRWYWx1ZVV0aWxzLmNoZWNrUHJvcFR5cGVzKCdpbnB1dCcsIHByb3BzLCBpbnN0Ll9jdXJyZW50RWxlbWVudC5fb3duZXIpO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0VmFsdWUgPSBwcm9wcy5kZWZhdWx0VmFsdWU7XG4gICAgaW5zdC5fd3JhcHBlclN0YXRlID0ge1xuICAgICAgaW5pdGlhbENoZWNrZWQ6IHByb3BzLmRlZmF1bHRDaGVja2VkIHx8IGZhbHNlLFxuICAgICAgaW5pdGlhbFZhbHVlOiBkZWZhdWx0VmFsdWUgIT0gbnVsbCA/IGRlZmF1bHRWYWx1ZSA6IG51bGwsXG4gICAgICBvbkNoYW5nZTogX2hhbmRsZUNoYW5nZS5iaW5kKGluc3QpXG4gICAgfTtcbiAgfSxcblxuICBtb3VudFJlYWR5V3JhcHBlcjogZnVuY3Rpb24gKGluc3QpIHtcbiAgICAvLyBDYW4ndCBiZSBpbiBtb3VudFdyYXBwZXIgb3IgZWxzZSBzZXJ2ZXIgcmVuZGVyaW5nIGxlYWtzLlxuICAgIGluc3RhbmNlc0J5UmVhY3RJRFtpbnN0Ll9yb290Tm9kZUlEXSA9IGluc3Q7XG4gIH0sXG5cbiAgdW5tb3VudFdyYXBwZXI6IGZ1bmN0aW9uIChpbnN0KSB7XG4gICAgZGVsZXRlIGluc3RhbmNlc0J5UmVhY3RJRFtpbnN0Ll9yb290Tm9kZUlEXTtcbiAgfSxcblxuICB1cGRhdGVXcmFwcGVyOiBmdW5jdGlvbiAoaW5zdCkge1xuICAgIHZhciBwcm9wcyA9IGluc3QuX2N1cnJlbnRFbGVtZW50LnByb3BzO1xuXG4gICAgLy8gVE9ETzogU2hvdWxkbid0IHRoaXMgYmUgZ2V0Q2hlY2tlZChwcm9wcyk/XG4gICAgdmFyIGNoZWNrZWQgPSBwcm9wcy5jaGVja2VkO1xuICAgIGlmIChjaGVja2VkICE9IG51bGwpIHtcbiAgICAgIFJlYWN0RE9NSURPcGVyYXRpb25zLnVwZGF0ZVByb3BlcnR5QnlJRChpbnN0Ll9yb290Tm9kZUlELCAnY2hlY2tlZCcsIGNoZWNrZWQgfHwgZmFsc2UpO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZSA9IExpbmtlZFZhbHVlVXRpbHMuZ2V0VmFsdWUocHJvcHMpO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAvLyBDYXN0IGB2YWx1ZWAgdG8gYSBzdHJpbmcgdG8gZW5zdXJlIHRoZSB2YWx1ZSBpcyBzZXQgY29ycmVjdGx5LiBXaGlsZVxuICAgICAgLy8gYnJvd3NlcnMgdHlwaWNhbGx5IGRvIHRoaXMgYXMgbmVjZXNzYXJ5LCBqc2RvbSBkb2Vzbid0LlxuICAgICAgUmVhY3RET01JRE9wZXJhdGlvbnMudXBkYXRlUHJvcGVydHlCeUlEKGluc3QuX3Jvb3ROb2RlSUQsICd2YWx1ZScsICcnICsgdmFsdWUpO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gX2hhbmRsZUNoYW5nZShldmVudCkge1xuICB2YXIgcHJvcHMgPSB0aGlzLl9jdXJyZW50RWxlbWVudC5wcm9wcztcblxuICB2YXIgcmV0dXJuVmFsdWUgPSBMaW5rZWRWYWx1ZVV0aWxzLmV4ZWN1dGVPbkNoYW5nZShwcm9wcywgZXZlbnQpO1xuXG4gIC8vIEhlcmUgd2UgdXNlIGFzYXAgdG8gd2FpdCB1bnRpbCBhbGwgdXBkYXRlcyBoYXZlIHByb3BhZ2F0ZWQsIHdoaWNoXG4gIC8vIGlzIGltcG9ydGFudCB3aGVuIHVzaW5nIGNvbnRyb2xsZWQgY29tcG9uZW50cyB3aXRoaW4gbGF5ZXJzOlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzE2OThcbiAgUmVhY3RVcGRhdGVzLmFzYXAoZm9yY2VVcGRhdGVJZk1vdW50ZWQsIHRoaXMpO1xuXG4gIHZhciBuYW1lID0gcHJvcHMubmFtZTtcbiAgaWYgKHByb3BzLnR5cGUgPT09ICdyYWRpbycgJiYgbmFtZSAhPSBudWxsKSB7XG4gICAgdmFyIHJvb3ROb2RlID0gUmVhY3RNb3VudC5nZXROb2RlKHRoaXMuX3Jvb3ROb2RlSUQpO1xuICAgIHZhciBxdWVyeVJvb3QgPSByb290Tm9kZTtcblxuICAgIHdoaWxlIChxdWVyeVJvb3QucGFyZW50Tm9kZSkge1xuICAgICAgcXVlcnlSb290ID0gcXVlcnlSb290LnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgLy8gSWYgYHJvb3ROb2RlLmZvcm1gIHdhcyBub24tbnVsbCwgdGhlbiB3ZSBjb3VsZCB0cnkgYGZvcm0uZWxlbWVudHNgLFxuICAgIC8vIGJ1dCB0aGF0IHNvbWV0aW1lcyBiZWhhdmVzIHN0cmFuZ2VseSBpbiBJRTguIFdlIGNvdWxkIGFsc28gdHJ5IHVzaW5nXG4gICAgLy8gYGZvcm0uZ2V0RWxlbWVudHNCeU5hbWVgLCBidXQgdGhhdCB3aWxsIG9ubHkgcmV0dXJuIGRpcmVjdCBjaGlsZHJlblxuICAgIC8vIGFuZCB3b24ndCBpbmNsdWRlIGlucHV0cyB0aGF0IHVzZSB0aGUgSFRNTDUgYGZvcm09YCBhdHRyaWJ1dGUuIFNpbmNlXG4gICAgLy8gdGhlIGlucHV0IG1pZ2h0IG5vdCBldmVuIGJlIGluIGEgZm9ybSwgbGV0J3MganVzdCB1c2UgdGhlIGdsb2JhbFxuICAgIC8vIGBxdWVyeVNlbGVjdG9yQWxsYCB0byBlbnN1cmUgd2UgZG9uJ3QgbWlzcyBhbnl0aGluZy5cbiAgICB2YXIgZ3JvdXAgPSBxdWVyeVJvb3QucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT0nICsgSlNPTi5zdHJpbmdpZnkoJycgKyBuYW1lKSArICddW3R5cGU9XCJyYWRpb1wiXScpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncm91cC5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG90aGVyTm9kZSA9IGdyb3VwW2ldO1xuICAgICAgaWYgKG90aGVyTm9kZSA9PT0gcm9vdE5vZGUgfHwgb3RoZXJOb2RlLmZvcm0gIT09IHJvb3ROb2RlLmZvcm0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgaWYgcmFkaW8gYnV0dG9ucyByZW5kZXJlZCBieSBkaWZmZXJlbnQgY29waWVzIG9mIFJlYWN0XG4gICAgICAvLyBhbmQgdGhlIHNhbWUgbmFtZSBhcmUgcmVuZGVyZWQgaW50byB0aGUgc2FtZSBmb3JtIChzYW1lIGFzICMxOTM5KS5cbiAgICAgIC8vIFRoYXQncyBwcm9iYWJseSBva2F5OyB3ZSBkb24ndCBzdXBwb3J0IGl0IGp1c3QgYXMgd2UgZG9uJ3Qgc3VwcG9ydFxuICAgICAgLy8gbWl4aW5nIFJlYWN0IHdpdGggbm9uLVJlYWN0LlxuICAgICAgdmFyIG90aGVySUQgPSBSZWFjdE1vdW50LmdldElEKG90aGVyTm9kZSk7XG4gICAgICAhb3RoZXJJRCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdERPTUlucHV0OiBNaXhpbmcgUmVhY3QgYW5kIG5vbi1SZWFjdCByYWRpbyBpbnB1dHMgd2l0aCB0aGUgJyArICdzYW1lIGBuYW1lYCBpcyBub3Qgc3VwcG9ydGVkLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAgIHZhciBvdGhlckluc3RhbmNlID0gaW5zdGFuY2VzQnlSZWFjdElEW290aGVySURdO1xuICAgICAgIW90aGVySW5zdGFuY2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RET01JbnB1dDogVW5rbm93biByYWRpbyBidXR0b24gSUQgJXMuJywgb3RoZXJJRCkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgICAgLy8gSWYgdGhpcyBpcyBhIGNvbnRyb2xsZWQgcmFkaW8gYnV0dG9uIGdyb3VwLCBmb3JjaW5nIHRoZSBpbnB1dCB0aGF0XG4gICAgICAvLyB3YXMgcHJldmlvdXNseSBjaGVja2VkIHRvIHVwZGF0ZSB3aWxsIGNhdXNlIGl0IHRvIGJlIGNvbWUgcmUtY2hlY2tlZFxuICAgICAgLy8gYXMgYXBwcm9wcmlhdGUuXG4gICAgICBSZWFjdFVwZGF0ZXMuYXNhcChmb3JjZVVwZGF0ZUlmTW91bnRlZCwgb3RoZXJJbnN0YW5jZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJldHVyblZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RE9NSW5wdXQ7Il19