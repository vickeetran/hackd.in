/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMTextComponent
 * @typechecks static-only
 */

'use strict';

var DOMChildrenOperations = require('./DOMChildrenOperations');
var DOMPropertyOperations = require('./DOMPropertyOperations');
var ReactComponentBrowserEnvironment = require('./ReactComponentBrowserEnvironment');
var ReactMount = require('./ReactMount');

var assign = require('./Object.assign');
var escapeTextContentForBrowser = require('./escapeTextContentForBrowser');
var setTextContent = require('./setTextContent');
var validateDOMNesting = require('./validateDOMNesting');

/**
 * Text nodes violate a couple assumptions that React makes about components:
 *
 *  - When mounting text into the DOM, adjacent text nodes are merged.
 *  - Text nodes cannot be assigned a React root ID.
 *
 * This component is used to wrap strings in elements so that they can undergo
 * the same reconciliation that is applied to elements.
 *
 * TODO: Investigate representing React components in the DOM with text nodes.
 *
 * @class ReactDOMTextComponent
 * @extends ReactComponent
 * @internal
 */
var ReactDOMTextComponent = function ReactDOMTextComponent(props) {
  // This constructor and its argument is currently used by mocks.
};

assign(ReactDOMTextComponent.prototype, {

  /**
   * @param {ReactText} text
   * @internal
   */
  construct: function construct(text) {
    // TODO: This is really a ReactText (ReactNode), not a ReactElement
    this._currentElement = text;
    this._stringText = '' + text;

    // Properties
    this._rootNodeID = null;
    this._mountIndex = 0;
  },

  /**
   * Creates the markup for this text node. This node is not intended to have
   * any features besides containing text content.
   *
   * @param {string} rootID DOM ID of the root node.
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @return {string} Markup for this text node.
   * @internal
   */
  mountComponent: function mountComponent(rootID, transaction, context) {
    if (process.env.NODE_ENV !== 'production') {
      if (context[validateDOMNesting.ancestorInfoContextKey]) {
        validateDOMNesting('span', null, context[validateDOMNesting.ancestorInfoContextKey]);
      }
    }

    this._rootNodeID = rootID;
    if (transaction.useCreateElement) {
      var ownerDocument = context[ReactMount.ownerDocumentContextKey];
      var el = ownerDocument.createElement('span');
      DOMPropertyOperations.setAttributeForID(el, rootID);
      // Populate node cache
      ReactMount.getID(el);
      setTextContent(el, this._stringText);
      return el;
    } else {
      var escapedText = escapeTextContentForBrowser(this._stringText);

      if (transaction.renderToStaticMarkup) {
        // Normally we'd wrap this in a `span` for the reasons stated above, but
        // since this is a situation where React won't take over (static pages),
        // we can simply return the text as it is.
        return escapedText;
      }

      return '<span ' + DOMPropertyOperations.createMarkupForID(rootID) + '>' + escapedText + '</span>';
    }
  },

  /**
   * Updates this component by updating the text content.
   *
   * @param {ReactText} nextText The next text content
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  receiveComponent: function receiveComponent(nextText, transaction) {
    if (nextText !== this._currentElement) {
      this._currentElement = nextText;
      var nextStringText = '' + nextText;
      if (nextStringText !== this._stringText) {
        // TODO: Save this as pending props and use performUpdateIfNecessary
        // and/or updateComponent to do the actual update for consistency with
        // other component types?
        this._stringText = nextStringText;
        var node = ReactMount.getNode(this._rootNodeID);
        DOMChildrenOperations.updateTextContent(node, nextStringText);
      }
    }
  },

  unmountComponent: function unmountComponent() {
    ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
  }

});

module.exports = ReactDOMTextComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL1JlYWN0RE9NVGV4dENvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFZQTs7QUFFQSxJQUFJLHdCQUF3QixRQUFRLHlCQUFSLENBQTVCO0FBQ0EsSUFBSSx3QkFBd0IsUUFBUSx5QkFBUixDQUE1QjtBQUNBLElBQUksbUNBQW1DLFFBQVEsb0NBQVIsQ0FBdkM7QUFDQSxJQUFJLGFBQWEsUUFBUSxjQUFSLENBQWpCOztBQUVBLElBQUksU0FBUyxRQUFRLGlCQUFSLENBQWI7QUFDQSxJQUFJLDhCQUE4QixRQUFRLCtCQUFSLENBQWxDO0FBQ0EsSUFBSSxpQkFBaUIsUUFBUSxrQkFBUixDQUFyQjtBQUNBLElBQUkscUJBQXFCLFFBQVEsc0JBQVIsQ0FBekI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLElBQUksd0JBQXdCLFNBQXhCLHFCQUF3QixDQUFVLEtBQVYsRUFBaUI7O0FBRTVDLENBRkQ7O0FBSUEsT0FBTyxzQkFBc0IsU0FBN0IsRUFBd0M7Ozs7OztBQU10QyxhQUFXLG1CQUFVLElBQVYsRUFBZ0I7O0FBRXpCLFNBQUssZUFBTCxHQUF1QixJQUF2QjtBQUNBLFNBQUssV0FBTCxHQUFtQixLQUFLLElBQXhCOzs7QUFHQSxTQUFLLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxTQUFLLFdBQUwsR0FBbUIsQ0FBbkI7QUFDRCxHQWRxQzs7Ozs7Ozs7Ozs7QUF5QnRDLGtCQUFnQix3QkFBVSxNQUFWLEVBQWtCLFdBQWxCLEVBQStCLE9BQS9CLEVBQXdDO0FBQ3RELFFBQUksUUFBUSxHQUFSLENBQVksUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6QyxVQUFJLFFBQVEsbUJBQW1CLHNCQUEzQixDQUFKLEVBQXdEO0FBQ3RELDJCQUFtQixNQUFuQixFQUEyQixJQUEzQixFQUFpQyxRQUFRLG1CQUFtQixzQkFBM0IsQ0FBakM7QUFDRDtBQUNGOztBQUVELFNBQUssV0FBTCxHQUFtQixNQUFuQjtBQUNBLFFBQUksWUFBWSxnQkFBaEIsRUFBa0M7QUFDaEMsVUFBSSxnQkFBZ0IsUUFBUSxXQUFXLHVCQUFuQixDQUFwQjtBQUNBLFVBQUksS0FBSyxjQUFjLGFBQWQsQ0FBNEIsTUFBNUIsQ0FBVDtBQUNBLDRCQUFzQixpQkFBdEIsQ0FBd0MsRUFBeEMsRUFBNEMsTUFBNUM7O0FBRUEsaUJBQVcsS0FBWCxDQUFpQixFQUFqQjtBQUNBLHFCQUFlLEVBQWYsRUFBbUIsS0FBSyxXQUF4QjtBQUNBLGFBQU8sRUFBUDtBQUNELEtBUkQsTUFRTztBQUNMLFVBQUksY0FBYyw0QkFBNEIsS0FBSyxXQUFqQyxDQUFsQjs7QUFFQSxVQUFJLFlBQVksb0JBQWhCLEVBQXNDOzs7O0FBSXBDLGVBQU8sV0FBUDtBQUNEOztBQUVELGFBQU8sV0FBVyxzQkFBc0IsaUJBQXRCLENBQXdDLE1BQXhDLENBQVgsR0FBNkQsR0FBN0QsR0FBbUUsV0FBbkUsR0FBaUYsU0FBeEY7QUFDRDtBQUNGLEdBckRxQzs7Ozs7Ozs7O0FBOER0QyxvQkFBa0IsMEJBQVUsUUFBVixFQUFvQixXQUFwQixFQUFpQztBQUNqRCxRQUFJLGFBQWEsS0FBSyxlQUF0QixFQUF1QztBQUNyQyxXQUFLLGVBQUwsR0FBdUIsUUFBdkI7QUFDQSxVQUFJLGlCQUFpQixLQUFLLFFBQTFCO0FBQ0EsVUFBSSxtQkFBbUIsS0FBSyxXQUE1QixFQUF5Qzs7OztBQUl2QyxhQUFLLFdBQUwsR0FBbUIsY0FBbkI7QUFDQSxZQUFJLE9BQU8sV0FBVyxPQUFYLENBQW1CLEtBQUssV0FBeEIsQ0FBWDtBQUNBLDhCQUFzQixpQkFBdEIsQ0FBd0MsSUFBeEMsRUFBOEMsY0FBOUM7QUFDRDtBQUNGO0FBQ0YsR0EzRXFDOztBQTZFdEMsb0JBQWtCLDRCQUFZO0FBQzVCLHFDQUFpQyx3QkFBakMsQ0FBMEQsS0FBSyxXQUEvRDtBQUNEOztBQS9FcUMsQ0FBeEM7O0FBbUZBLE9BQU8sT0FBUCxHQUFpQixxQkFBakIiLCJmaWxlIjoiUmVhY3RET01UZXh0Q29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RE9NVGV4dENvbXBvbmVudFxuICogQHR5cGVjaGVja3Mgc3RhdGljLW9ubHlcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBET01DaGlsZHJlbk9wZXJhdGlvbnMgPSByZXF1aXJlKCcuL0RPTUNoaWxkcmVuT3BlcmF0aW9ucycpO1xudmFyIERPTVByb3BlcnR5T3BlcmF0aW9ucyA9IHJlcXVpcmUoJy4vRE9NUHJvcGVydHlPcGVyYXRpb25zJyk7XG52YXIgUmVhY3RDb21wb25lbnRCcm93c2VyRW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50QnJvd3NlckVudmlyb25tZW50Jyk7XG52YXIgUmVhY3RNb3VudCA9IHJlcXVpcmUoJy4vUmVhY3RNb3VudCcpO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi9PYmplY3QuYXNzaWduJyk7XG52YXIgZXNjYXBlVGV4dENvbnRlbnRGb3JCcm93c2VyID0gcmVxdWlyZSgnLi9lc2NhcGVUZXh0Q29udGVudEZvckJyb3dzZXInKTtcbnZhciBzZXRUZXh0Q29udGVudCA9IHJlcXVpcmUoJy4vc2V0VGV4dENvbnRlbnQnKTtcbnZhciB2YWxpZGF0ZURPTU5lc3RpbmcgPSByZXF1aXJlKCcuL3ZhbGlkYXRlRE9NTmVzdGluZycpO1xuXG4vKipcbiAqIFRleHQgbm9kZXMgdmlvbGF0ZSBhIGNvdXBsZSBhc3N1bXB0aW9ucyB0aGF0IFJlYWN0IG1ha2VzIGFib3V0IGNvbXBvbmVudHM6XG4gKlxuICogIC0gV2hlbiBtb3VudGluZyB0ZXh0IGludG8gdGhlIERPTSwgYWRqYWNlbnQgdGV4dCBub2RlcyBhcmUgbWVyZ2VkLlxuICogIC0gVGV4dCBub2RlcyBjYW5ub3QgYmUgYXNzaWduZWQgYSBSZWFjdCByb290IElELlxuICpcbiAqIFRoaXMgY29tcG9uZW50IGlzIHVzZWQgdG8gd3JhcCBzdHJpbmdzIGluIGVsZW1lbnRzIHNvIHRoYXQgdGhleSBjYW4gdW5kZXJnb1xuICogdGhlIHNhbWUgcmVjb25jaWxpYXRpb24gdGhhdCBpcyBhcHBsaWVkIHRvIGVsZW1lbnRzLlxuICpcbiAqIFRPRE86IEludmVzdGlnYXRlIHJlcHJlc2VudGluZyBSZWFjdCBjb21wb25lbnRzIGluIHRoZSBET00gd2l0aCB0ZXh0IG5vZGVzLlxuICpcbiAqIEBjbGFzcyBSZWFjdERPTVRleHRDb21wb25lbnRcbiAqIEBleHRlbmRzIFJlYWN0Q29tcG9uZW50XG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0RE9NVGV4dENvbXBvbmVudCA9IGZ1bmN0aW9uIChwcm9wcykge1xuICAvLyBUaGlzIGNvbnN0cnVjdG9yIGFuZCBpdHMgYXJndW1lbnQgaXMgY3VycmVudGx5IHVzZWQgYnkgbW9ja3MuXG59O1xuXG5hc3NpZ24oUmVhY3RET01UZXh0Q29tcG9uZW50LnByb3RvdHlwZSwge1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1JlYWN0VGV4dH0gdGV4dFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gKHRleHQpIHtcbiAgICAvLyBUT0RPOiBUaGlzIGlzIHJlYWxseSBhIFJlYWN0VGV4dCAoUmVhY3ROb2RlKSwgbm90IGEgUmVhY3RFbGVtZW50XG4gICAgdGhpcy5fY3VycmVudEVsZW1lbnQgPSB0ZXh0O1xuICAgIHRoaXMuX3N0cmluZ1RleHQgPSAnJyArIHRleHQ7XG5cbiAgICAvLyBQcm9wZXJ0aWVzXG4gICAgdGhpcy5fcm9vdE5vZGVJRCA9IG51bGw7XG4gICAgdGhpcy5fbW91bnRJbmRleCA9IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIG1hcmt1cCBmb3IgdGhpcyB0ZXh0IG5vZGUuIFRoaXMgbm9kZSBpcyBub3QgaW50ZW5kZWQgdG8gaGF2ZVxuICAgKiBhbnkgZmVhdHVyZXMgYmVzaWRlcyBjb250YWluaW5nIHRleHQgY29udGVudC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJvb3RJRCBET00gSUQgb2YgdGhlIHJvb3Qgbm9kZS5cbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufFJlYWN0U2VydmVyUmVuZGVyaW5nVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEByZXR1cm4ge3N0cmluZ30gTWFya3VwIGZvciB0aGlzIHRleHQgbm9kZS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBtb3VudENvbXBvbmVudDogZnVuY3Rpb24gKHJvb3RJRCwgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKGNvbnRleHRbdmFsaWRhdGVET01OZXN0aW5nLmFuY2VzdG9ySW5mb0NvbnRleHRLZXldKSB7XG4gICAgICAgIHZhbGlkYXRlRE9NTmVzdGluZygnc3BhbicsIG51bGwsIGNvbnRleHRbdmFsaWRhdGVET01OZXN0aW5nLmFuY2VzdG9ySW5mb0NvbnRleHRLZXldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9yb290Tm9kZUlEID0gcm9vdElEO1xuICAgIGlmICh0cmFuc2FjdGlvbi51c2VDcmVhdGVFbGVtZW50KSB7XG4gICAgICB2YXIgb3duZXJEb2N1bWVudCA9IGNvbnRleHRbUmVhY3RNb3VudC5vd25lckRvY3VtZW50Q29udGV4dEtleV07XG4gICAgICB2YXIgZWwgPSBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIERPTVByb3BlcnR5T3BlcmF0aW9ucy5zZXRBdHRyaWJ1dGVGb3JJRChlbCwgcm9vdElEKTtcbiAgICAgIC8vIFBvcHVsYXRlIG5vZGUgY2FjaGVcbiAgICAgIFJlYWN0TW91bnQuZ2V0SUQoZWwpO1xuICAgICAgc2V0VGV4dENvbnRlbnQoZWwsIHRoaXMuX3N0cmluZ1RleHQpO1xuICAgICAgcmV0dXJuIGVsO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZXNjYXBlZFRleHQgPSBlc2NhcGVUZXh0Q29udGVudEZvckJyb3dzZXIodGhpcy5fc3RyaW5nVGV4dCk7XG5cbiAgICAgIGlmICh0cmFuc2FjdGlvbi5yZW5kZXJUb1N0YXRpY01hcmt1cCkge1xuICAgICAgICAvLyBOb3JtYWxseSB3ZSdkIHdyYXAgdGhpcyBpbiBhIGBzcGFuYCBmb3IgdGhlIHJlYXNvbnMgc3RhdGVkIGFib3ZlLCBidXRcbiAgICAgICAgLy8gc2luY2UgdGhpcyBpcyBhIHNpdHVhdGlvbiB3aGVyZSBSZWFjdCB3b24ndCB0YWtlIG92ZXIgKHN0YXRpYyBwYWdlcyksXG4gICAgICAgIC8vIHdlIGNhbiBzaW1wbHkgcmV0dXJuIHRoZSB0ZXh0IGFzIGl0IGlzLlxuICAgICAgICByZXR1cm4gZXNjYXBlZFRleHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnPHNwYW4gJyArIERPTVByb3BlcnR5T3BlcmF0aW9ucy5jcmVhdGVNYXJrdXBGb3JJRChyb290SUQpICsgJz4nICsgZXNjYXBlZFRleHQgKyAnPC9zcGFuPic7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoaXMgY29tcG9uZW50IGJ5IHVwZGF0aW5nIHRoZSB0ZXh0IGNvbnRlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RUZXh0fSBuZXh0VGV4dCBUaGUgbmV4dCB0ZXh0IGNvbnRlbnRcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHJlY2VpdmVDb21wb25lbnQ6IGZ1bmN0aW9uIChuZXh0VGV4dCwgdHJhbnNhY3Rpb24pIHtcbiAgICBpZiAobmV4dFRleHQgIT09IHRoaXMuX2N1cnJlbnRFbGVtZW50KSB7XG4gICAgICB0aGlzLl9jdXJyZW50RWxlbWVudCA9IG5leHRUZXh0O1xuICAgICAgdmFyIG5leHRTdHJpbmdUZXh0ID0gJycgKyBuZXh0VGV4dDtcbiAgICAgIGlmIChuZXh0U3RyaW5nVGV4dCAhPT0gdGhpcy5fc3RyaW5nVGV4dCkge1xuICAgICAgICAvLyBUT0RPOiBTYXZlIHRoaXMgYXMgcGVuZGluZyBwcm9wcyBhbmQgdXNlIHBlcmZvcm1VcGRhdGVJZk5lY2Vzc2FyeVxuICAgICAgICAvLyBhbmQvb3IgdXBkYXRlQ29tcG9uZW50IHRvIGRvIHRoZSBhY3R1YWwgdXBkYXRlIGZvciBjb25zaXN0ZW5jeSB3aXRoXG4gICAgICAgIC8vIG90aGVyIGNvbXBvbmVudCB0eXBlcz9cbiAgICAgICAgdGhpcy5fc3RyaW5nVGV4dCA9IG5leHRTdHJpbmdUZXh0O1xuICAgICAgICB2YXIgbm9kZSA9IFJlYWN0TW91bnQuZ2V0Tm9kZSh0aGlzLl9yb290Tm9kZUlEKTtcbiAgICAgICAgRE9NQ2hpbGRyZW5PcGVyYXRpb25zLnVwZGF0ZVRleHRDb250ZW50KG5vZGUsIG5leHRTdHJpbmdUZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgdW5tb3VudENvbXBvbmVudDogZnVuY3Rpb24gKCkge1xuICAgIFJlYWN0Q29tcG9uZW50QnJvd3NlckVudmlyb25tZW50LnVubW91bnRJREZyb21FbnZpcm9ubWVudCh0aGlzLl9yb290Tm9kZUlEKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTVRleHRDb21wb25lbnQ7Il19