/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DOMProperty
 * @typechecks static-only
 */

'use strict';

var invariant = require('fbjs/lib/invariant');

function checkMask(value, bitmask) {
  return (value & bitmask) === bitmask;
}

var DOMPropertyInjection = {
  /**
   * Mapping from normalized, camelcased property names to a configuration that
   * specifies how the associated DOM property should be accessed or rendered.
   */
  MUST_USE_ATTRIBUTE: 0x1,
  MUST_USE_PROPERTY: 0x2,
  HAS_SIDE_EFFECTS: 0x4,
  HAS_BOOLEAN_VALUE: 0x8,
  HAS_NUMERIC_VALUE: 0x10,
  HAS_POSITIVE_NUMERIC_VALUE: 0x20 | 0x10,
  HAS_OVERLOADED_BOOLEAN_VALUE: 0x40,

  /**
   * Inject some specialized knowledge about the DOM. This takes a config object
   * with the following properties:
   *
   * isCustomAttribute: function that given an attribute name will return true
   * if it can be inserted into the DOM verbatim. Useful for data-* or aria-*
   * attributes where it's impossible to enumerate all of the possible
   * attribute names,
   *
   * Properties: object mapping DOM property name to one of the
   * DOMPropertyInjection constants or null. If your attribute isn't in here,
   * it won't get written to the DOM.
   *
   * DOMAttributeNames: object mapping React attribute name to the DOM
   * attribute name. Attribute names not specified use the **lowercase**
   * normalized name.
   *
   * DOMAttributeNamespaces: object mapping React attribute name to the DOM
   * attribute namespace URL. (Attribute names not specified use no namespace.)
   *
   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
   * Property names not specified use the normalized name.
   *
   * DOMMutationMethods: Properties that require special mutation methods. If
   * `value` is undefined, the mutation method should unset the property.
   *
   * @param {object} domPropertyConfig the config as described above.
   */
  injectDOMPropertyConfig: function injectDOMPropertyConfig(domPropertyConfig) {
    var Injection = DOMPropertyInjection;
    var Properties = domPropertyConfig.Properties || {};
    var DOMAttributeNamespaces = domPropertyConfig.DOMAttributeNamespaces || {};
    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
    var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

    if (domPropertyConfig.isCustomAttribute) {
      DOMProperty._isCustomAttributeFunctions.push(domPropertyConfig.isCustomAttribute);
    }

    for (var propName in Properties) {
      !!DOMProperty.properties.hasOwnProperty(propName) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'injectDOMPropertyConfig(...): You\'re trying to inject DOM property ' + '\'%s\' which has already been injected. You may be accidentally ' + 'injecting the same DOM property config twice, or you may be ' + 'injecting two configs that have conflicting property names.', propName) : invariant(false) : undefined;

      var lowerCased = propName.toLowerCase();
      var propConfig = Properties[propName];

      var propertyInfo = {
        attributeName: lowerCased,
        attributeNamespace: null,
        propertyName: propName,
        mutationMethod: null,

        mustUseAttribute: checkMask(propConfig, Injection.MUST_USE_ATTRIBUTE),
        mustUseProperty: checkMask(propConfig, Injection.MUST_USE_PROPERTY),
        hasSideEffects: checkMask(propConfig, Injection.HAS_SIDE_EFFECTS),
        hasBooleanValue: checkMask(propConfig, Injection.HAS_BOOLEAN_VALUE),
        hasNumericValue: checkMask(propConfig, Injection.HAS_NUMERIC_VALUE),
        hasPositiveNumericValue: checkMask(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
        hasOverloadedBooleanValue: checkMask(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE)
      };

      !(!propertyInfo.mustUseAttribute || !propertyInfo.mustUseProperty) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'DOMProperty: Cannot require using both attribute and property: %s', propName) : invariant(false) : undefined;
      !(propertyInfo.mustUseProperty || !propertyInfo.hasSideEffects) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'DOMProperty: Properties that have side effects must use property: %s', propName) : invariant(false) : undefined;
      !(propertyInfo.hasBooleanValue + propertyInfo.hasNumericValue + propertyInfo.hasOverloadedBooleanValue <= 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'DOMProperty: Value can be one of boolean, overloaded boolean, or ' + 'numeric value, but not a combination: %s', propName) : invariant(false) : undefined;

      if (process.env.NODE_ENV !== 'production') {
        DOMProperty.getPossibleStandardName[lowerCased] = propName;
      }

      if (DOMAttributeNames.hasOwnProperty(propName)) {
        var attributeName = DOMAttributeNames[propName];
        propertyInfo.attributeName = attributeName;
        if (process.env.NODE_ENV !== 'production') {
          DOMProperty.getPossibleStandardName[attributeName] = propName;
        }
      }

      if (DOMAttributeNamespaces.hasOwnProperty(propName)) {
        propertyInfo.attributeNamespace = DOMAttributeNamespaces[propName];
      }

      if (DOMPropertyNames.hasOwnProperty(propName)) {
        propertyInfo.propertyName = DOMPropertyNames[propName];
      }

      if (DOMMutationMethods.hasOwnProperty(propName)) {
        propertyInfo.mutationMethod = DOMMutationMethods[propName];
      }

      DOMProperty.properties[propName] = propertyInfo;
    }
  }
};
var defaultValueCache = {};

/**
 * DOMProperty exports lookup objects that can be used like functions:
 *
 *   > DOMProperty.isValid['id']
 *   true
 *   > DOMProperty.isValid['foobar']
 *   undefined
 *
 * Although this may be confusing, it performs better in general.
 *
 * @see http://jsperf.com/key-exists
 * @see http://jsperf.com/key-missing
 */
var DOMProperty = {

  ID_ATTRIBUTE_NAME: 'data-reactid',

  /**
   * Map from property "standard name" to an object with info about how to set
   * the property in the DOM. Each object contains:
   *
   * attributeName:
   *   Used when rendering markup or with `*Attribute()`.
   * attributeNamespace
   * propertyName:
   *   Used on DOM node instances. (This includes properties that mutate due to
   *   external factors.)
   * mutationMethod:
   *   If non-null, used instead of the property or `setAttribute()` after
   *   initial render.
   * mustUseAttribute:
   *   Whether the property must be accessed and mutated using `*Attribute()`.
   *   (This includes anything that fails `<propName> in <element>`.)
   * mustUseProperty:
   *   Whether the property must be accessed and mutated as an object property.
   * hasSideEffects:
   *   Whether or not setting a value causes side effects such as triggering
   *   resources to be loaded or text selection changes. If true, we read from
   *   the DOM before updating to ensure that the value is only set if it has
   *   changed.
   * hasBooleanValue:
   *   Whether the property should be removed when set to a falsey value.
   * hasNumericValue:
   *   Whether the property must be numeric or parse as a numeric and should be
   *   removed when set to a falsey value.
   * hasPositiveNumericValue:
   *   Whether the property must be positive numeric or parse as a positive
   *   numeric and should be removed when set to a falsey value.
   * hasOverloadedBooleanValue:
   *   Whether the property can be used as a flag as well as with a value.
   *   Removed when strictly equal to false; present without a value when
   *   strictly equal to true; present with a value otherwise.
   */
  properties: {},

  /**
   * Mapping from lowercase property names to the properly cased version, used
   * to warn in the case of missing properties. Available only in __DEV__.
   * @type {Object}
   */
  getPossibleStandardName: process.env.NODE_ENV !== 'production' ? {} : null,

  /**
   * All of the isCustomAttribute() functions that have been injected.
   */
  _isCustomAttributeFunctions: [],

  /**
   * Checks whether a property name is a custom attribute.
   * @method
   */
  isCustomAttribute: function isCustomAttribute(attributeName) {
    for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
      var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
      if (isCustomAttributeFn(attributeName)) {
        return true;
      }
    }
    return false;
  },

  /**
   * Returns the default property value for a DOM property (i.e., not an
   * attribute). Most default values are '' or false, but not all. Worse yet,
   * some (in particular, `type`) vary depending on the type of element.
   *
   * TODO: Is it better to grab all the possible properties when creating an
   * element to avoid having to create the same element twice?
   */
  getDefaultValueForProperty: function getDefaultValueForProperty(nodeName, prop) {
    var nodeDefaults = defaultValueCache[nodeName];
    var testElement;
    if (!nodeDefaults) {
      defaultValueCache[nodeName] = nodeDefaults = {};
    }
    if (!(prop in nodeDefaults)) {
      testElement = document.createElement(nodeName);
      nodeDefaults[prop] = testElement[prop];
    }
    return nodeDefaults[prop];
  },

  injection: DOMPropertyInjection
};

module.exports = DOMProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL0RPTVByb3BlcnR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVlBOztBQUVBLElBQUksWUFBWSxRQUFRLG9CQUFSLENBQWhCOztBQUVBLFNBQVMsU0FBVCxDQUFtQixLQUFuQixFQUEwQixPQUExQixFQUFtQztBQUNqQyxTQUFPLENBQUMsUUFBUSxPQUFULE1BQXNCLE9BQTdCO0FBQ0Q7O0FBRUQsSUFBSSx1QkFBdUI7Ozs7O0FBS3pCLHNCQUFvQixHQUxLO0FBTXpCLHFCQUFtQixHQU5NO0FBT3pCLG9CQUFrQixHQVBPO0FBUXpCLHFCQUFtQixHQVJNO0FBU3pCLHFCQUFtQixJQVRNO0FBVXpCLDhCQUE0QixPQUFPLElBVlY7QUFXekIsZ0NBQThCLElBWEw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlDekIsMkJBQXlCLGlDQUFVLGlCQUFWLEVBQTZCO0FBQ3BELFFBQUksWUFBWSxvQkFBaEI7QUFDQSxRQUFJLGFBQWEsa0JBQWtCLFVBQWxCLElBQWdDLEVBQWpEO0FBQ0EsUUFBSSx5QkFBeUIsa0JBQWtCLHNCQUFsQixJQUE0QyxFQUF6RTtBQUNBLFFBQUksb0JBQW9CLGtCQUFrQixpQkFBbEIsSUFBdUMsRUFBL0Q7QUFDQSxRQUFJLG1CQUFtQixrQkFBa0IsZ0JBQWxCLElBQXNDLEVBQTdEO0FBQ0EsUUFBSSxxQkFBcUIsa0JBQWtCLGtCQUFsQixJQUF3QyxFQUFqRTs7QUFFQSxRQUFJLGtCQUFrQixpQkFBdEIsRUFBeUM7QUFDdkMsa0JBQVksMkJBQVosQ0FBd0MsSUFBeEMsQ0FBNkMsa0JBQWtCLGlCQUEvRDtBQUNEOztBQUVELFNBQUssSUFBSSxRQUFULElBQXFCLFVBQXJCLEVBQWlDO0FBQy9CLE9BQUMsQ0FBQyxZQUFZLFVBQVosQ0FBdUIsY0FBdkIsQ0FBc0MsUUFBdEMsQ0FBRixHQUFvRCxRQUFRLEdBQVIsQ0FBWSxRQUFaLEtBQXlC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Ozs7Ozs7Ozs7Ozs7OztBQWVBLElBQUksY0FBYzs7QUFFaEIscUJBQW1CLGNBRkg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0NoQixjQUFZLEVBeENJOzs7Ozs7O0FBK0NoQiwyQkFBeUIsUUFBUSxHQUFSLENBQVksUUFBWixLQUF5QixZQUF6QixHQUF3QyxFQUF4QyxHQUE2QyxJQS9DdEQ7Ozs7O0FBb0RoQiwrQkFBNkIsRUFwRGI7Ozs7OztBQTBEaEIscUJBQW1CLDJCQUFVLGFBQVYsRUFBeUI7QUFDMUMsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFlBQVksMkJBQVosQ0FBd0MsTUFBNUQsRUFBb0UsR0FBcEUsRUFBeUU7QUFDdkUsVUFBSSxzQkFBc0IsWUFBWSwyQkFBWixDQUF3QyxDQUF4QyxDQUExQjtBQUNBLFVBQUksb0JBQW9CLGFBQXBCLENBQUosRUFBd0M7QUFDdEMsZUFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNELFdBQU8sS0FBUDtBQUNELEdBbEVlOzs7Ozs7Ozs7O0FBNEVoQiw4QkFBNEIsb0NBQVUsUUFBVixFQUFvQixJQUFwQixFQUEwQjtBQUNwRCxRQUFJLGVBQWUsa0JBQWtCLFFBQWxCLENBQW5CO0FBQ0EsUUFBSSxXQUFKO0FBQ0EsUUFBSSxDQUFDLFlBQUwsRUFBbUI7QUFDakIsd0JBQWtCLFFBQWxCLElBQThCLGVBQWUsRUFBN0M7QUFDRDtBQUNELFFBQUksRUFBRSxRQUFRLFlBQVYsQ0FBSixFQUE2QjtBQUMzQixvQkFBYyxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZDtBQUNBLG1CQUFhLElBQWIsSUFBcUIsWUFBWSxJQUFaLENBQXJCO0FBQ0Q7QUFDRCxXQUFPLGFBQWEsSUFBYixDQUFQO0FBQ0QsR0F2RmU7O0FBeUZoQixhQUFXO0FBekZLLENBQWxCOztBQTRGQSxPQUFPLE9BQVAsR0FBaUIsV0FBakIiLCJmaWxlIjoiRE9NUHJvcGVydHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgRE9NUHJvcGVydHlcbiAqIEB0eXBlY2hlY2tzIHN0YXRpYy1vbmx5XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbmZ1bmN0aW9uIGNoZWNrTWFzayh2YWx1ZSwgYml0bWFzaykge1xuICByZXR1cm4gKHZhbHVlICYgYml0bWFzaykgPT09IGJpdG1hc2s7XG59XG5cbnZhciBET01Qcm9wZXJ0eUluamVjdGlvbiA9IHtcbiAgLyoqXG4gICAqIE1hcHBpbmcgZnJvbSBub3JtYWxpemVkLCBjYW1lbGNhc2VkIHByb3BlcnR5IG5hbWVzIHRvIGEgY29uZmlndXJhdGlvbiB0aGF0XG4gICAqIHNwZWNpZmllcyBob3cgdGhlIGFzc29jaWF0ZWQgRE9NIHByb3BlcnR5IHNob3VsZCBiZSBhY2Nlc3NlZCBvciByZW5kZXJlZC5cbiAgICovXG4gIE1VU1RfVVNFX0FUVFJJQlVURTogMHgxLFxuICBNVVNUX1VTRV9QUk9QRVJUWTogMHgyLFxuICBIQVNfU0lERV9FRkZFQ1RTOiAweDQsXG4gIEhBU19CT09MRUFOX1ZBTFVFOiAweDgsXG4gIEhBU19OVU1FUklDX1ZBTFVFOiAweDEwLFxuICBIQVNfUE9TSVRJVkVfTlVNRVJJQ19WQUxVRTogMHgyMCB8IDB4MTAsXG4gIEhBU19PVkVSTE9BREVEX0JPT0xFQU5fVkFMVUU6IDB4NDAsXG5cbiAgLyoqXG4gICAqIEluamVjdCBzb21lIHNwZWNpYWxpemVkIGtub3dsZWRnZSBhYm91dCB0aGUgRE9NLiBUaGlzIHRha2VzIGEgY29uZmlnIG9iamVjdFxuICAgKiB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAgICpcbiAgICogaXNDdXN0b21BdHRyaWJ1dGU6IGZ1bmN0aW9uIHRoYXQgZ2l2ZW4gYW4gYXR0cmlidXRlIG5hbWUgd2lsbCByZXR1cm4gdHJ1ZVxuICAgKiBpZiBpdCBjYW4gYmUgaW5zZXJ0ZWQgaW50byB0aGUgRE9NIHZlcmJhdGltLiBVc2VmdWwgZm9yIGRhdGEtKiBvciBhcmlhLSpcbiAgICogYXR0cmlidXRlcyB3aGVyZSBpdCdzIGltcG9zc2libGUgdG8gZW51bWVyYXRlIGFsbCBvZiB0aGUgcG9zc2libGVcbiAgICogYXR0cmlidXRlIG5hbWVzLFxuICAgKlxuICAgKiBQcm9wZXJ0aWVzOiBvYmplY3QgbWFwcGluZyBET00gcHJvcGVydHkgbmFtZSB0byBvbmUgb2YgdGhlXG4gICAqIERPTVByb3BlcnR5SW5qZWN0aW9uIGNvbnN0YW50cyBvciBudWxsLiBJZiB5b3VyIGF0dHJpYnV0ZSBpc24ndCBpbiBoZXJlLFxuICAgKiBpdCB3b24ndCBnZXQgd3JpdHRlbiB0byB0aGUgRE9NLlxuICAgKlxuICAgKiBET01BdHRyaWJ1dGVOYW1lczogb2JqZWN0IG1hcHBpbmcgUmVhY3QgYXR0cmlidXRlIG5hbWUgdG8gdGhlIERPTVxuICAgKiBhdHRyaWJ1dGUgbmFtZS4gQXR0cmlidXRlIG5hbWVzIG5vdCBzcGVjaWZpZWQgdXNlIHRoZSAqKmxvd2VyY2FzZSoqXG4gICAqIG5vcm1hbGl6ZWQgbmFtZS5cbiAgICpcbiAgICogRE9NQXR0cmlidXRlTmFtZXNwYWNlczogb2JqZWN0IG1hcHBpbmcgUmVhY3QgYXR0cmlidXRlIG5hbWUgdG8gdGhlIERPTVxuICAgKiBhdHRyaWJ1dGUgbmFtZXNwYWNlIFVSTC4gKEF0dHJpYnV0ZSBuYW1lcyBub3Qgc3BlY2lmaWVkIHVzZSBubyBuYW1lc3BhY2UuKVxuICAgKlxuICAgKiBET01Qcm9wZXJ0eU5hbWVzOiBzaW1pbGFyIHRvIERPTUF0dHJpYnV0ZU5hbWVzIGJ1dCBmb3IgRE9NIHByb3BlcnRpZXMuXG4gICAqIFByb3BlcnR5IG5hbWVzIG5vdCBzcGVjaWZpZWQgdXNlIHRoZSBub3JtYWxpemVkIG5hbWUuXG4gICAqXG4gICAqIERPTU11dGF0aW9uTWV0aG9kczogUHJvcGVydGllcyB0aGF0IHJlcXVpcmUgc3BlY2lhbCBtdXRhdGlvbiBtZXRob2RzLiBJZlxuICAgKiBgdmFsdWVgIGlzIHVuZGVmaW5lZCwgdGhlIG11dGF0aW9uIG1ldGhvZCBzaG91bGQgdW5zZXQgdGhlIHByb3BlcnR5LlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZG9tUHJvcGVydHlDb25maWcgdGhlIGNvbmZpZyBhcyBkZXNjcmliZWQgYWJvdmUuXG4gICAqL1xuICBpbmplY3RET01Qcm9wZXJ0eUNvbmZpZzogZnVuY3Rpb24gKGRvbVByb3BlcnR5Q29uZmlnKSB7XG4gICAgdmFyIEluamVjdGlvbiA9IERPTVByb3BlcnR5SW5qZWN0aW9uO1xuICAgIHZhciBQcm9wZXJ0aWVzID0gZG9tUHJvcGVydHlDb25maWcuUHJvcGVydGllcyB8fCB7fTtcbiAgICB2YXIgRE9NQXR0cmlidXRlTmFtZXNwYWNlcyA9IGRvbVByb3BlcnR5Q29uZmlnLkRPTUF0dHJpYnV0ZU5hbWVzcGFjZXMgfHwge307XG4gICAgdmFyIERPTUF0dHJpYnV0ZU5hbWVzID0gZG9tUHJvcGVydHlDb25maWcuRE9NQXR0cmlidXRlTmFtZXMgfHwge307XG4gICAgdmFyIERPTVByb3BlcnR5TmFtZXMgPSBkb21Qcm9wZXJ0eUNvbmZpZy5ET01Qcm9wZXJ0eU5hbWVzIHx8IHt9O1xuICAgIHZhciBET01NdXRhdGlvbk1ldGhvZHMgPSBkb21Qcm9wZXJ0eUNvbmZpZy5ET01NdXRhdGlvbk1ldGhvZHMgfHwge307XG5cbiAgICBpZiAoZG9tUHJvcGVydHlDb25maWcuaXNDdXN0b21BdHRyaWJ1dGUpIHtcbiAgICAgIERPTVByb3BlcnR5Ll9pc0N1c3RvbUF0dHJpYnV0ZUZ1bmN0aW9ucy5wdXNoKGRvbVByb3BlcnR5Q29uZmlnLmlzQ3VzdG9tQXR0cmlidXRlKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBwcm9wTmFtZSBpbiBQcm9wZXJ0aWVzKSB7XG4gICAgICAhIURPTVByb3BlcnR5LnByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ2luamVjdERPTVByb3BlcnR5Q29uZmlnKC4uLik6IFlvdVxcJ3JlIHRyeWluZyB0byBpbmplY3QgRE9NIHByb3BlcnR5ICcgKyAnXFwnJXNcXCcgd2hpY2ggaGFzIGFscmVhZHkgYmVlbiBpbmplY3RlZC4gWW91IG1heSBiZSBhY2NpZGVudGFsbHkgJyArICdpbmplY3RpbmcgdGhlIHNhbWUgRE9NIHByb3BlcnR5IGNvbmZpZyB0d2ljZSwgb3IgeW91IG1heSBiZSAnICsgJ2luamVjdGluZyB0d28gY29uZmlncyB0aGF0IGhhdmUgY29uZmxpY3RpbmcgcHJvcGVydHkgbmFtZXMuJywgcHJvcE5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcblxuICAgICAgdmFyIGxvd2VyQ2FzZWQgPSBwcm9wTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdmFyIHByb3BDb25maWcgPSBQcm9wZXJ0aWVzW3Byb3BOYW1lXTtcblxuICAgICAgdmFyIHByb3BlcnR5SW5mbyA9IHtcbiAgICAgICAgYXR0cmlidXRlTmFtZTogbG93ZXJDYXNlZCxcbiAgICAgICAgYXR0cmlidXRlTmFtZXNwYWNlOiBudWxsLFxuICAgICAgICBwcm9wZXJ0eU5hbWU6IHByb3BOYW1lLFxuICAgICAgICBtdXRhdGlvbk1ldGhvZDogbnVsbCxcblxuICAgICAgICBtdXN0VXNlQXR0cmlidXRlOiBjaGVja01hc2socHJvcENvbmZpZywgSW5qZWN0aW9uLk1VU1RfVVNFX0FUVFJJQlVURSksXG4gICAgICAgIG11c3RVc2VQcm9wZXJ0eTogY2hlY2tNYXNrKHByb3BDb25maWcsIEluamVjdGlvbi5NVVNUX1VTRV9QUk9QRVJUWSksXG4gICAgICAgIGhhc1NpZGVFZmZlY3RzOiBjaGVja01hc2socHJvcENvbmZpZywgSW5qZWN0aW9uLkhBU19TSURFX0VGRkVDVFMpLFxuICAgICAgICBoYXNCb29sZWFuVmFsdWU6IGNoZWNrTWFzayhwcm9wQ29uZmlnLCBJbmplY3Rpb24uSEFTX0JPT0xFQU5fVkFMVUUpLFxuICAgICAgICBoYXNOdW1lcmljVmFsdWU6IGNoZWNrTWFzayhwcm9wQ29uZmlnLCBJbmplY3Rpb24uSEFTX05VTUVSSUNfVkFMVUUpLFxuICAgICAgICBoYXNQb3NpdGl2ZU51bWVyaWNWYWx1ZTogY2hlY2tNYXNrKHByb3BDb25maWcsIEluamVjdGlvbi5IQVNfUE9TSVRJVkVfTlVNRVJJQ19WQUxVRSksXG4gICAgICAgIGhhc092ZXJsb2FkZWRCb29sZWFuVmFsdWU6IGNoZWNrTWFzayhwcm9wQ29uZmlnLCBJbmplY3Rpb24uSEFTX09WRVJMT0FERURfQk9PTEVBTl9WQUxVRSlcbiAgICAgIH07XG5cbiAgICAgICEoIXByb3BlcnR5SW5mby5tdXN0VXNlQXR0cmlidXRlIHx8ICFwcm9wZXJ0eUluZm8ubXVzdFVzZVByb3BlcnR5KSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdET01Qcm9wZXJ0eTogQ2Fubm90IHJlcXVpcmUgdXNpbmcgYm90aCBhdHRyaWJ1dGUgYW5kIHByb3BlcnR5OiAlcycsIHByb3BOYW1lKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgICAhKHByb3BlcnR5SW5mby5tdXN0VXNlUHJvcGVydHkgfHwgIXByb3BlcnR5SW5mby5oYXNTaWRlRWZmZWN0cykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRE9NUHJvcGVydHk6IFByb3BlcnRpZXMgdGhhdCBoYXZlIHNpZGUgZWZmZWN0cyBtdXN0IHVzZSBwcm9wZXJ0eTogJXMnLCBwcm9wTmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgICAgIShwcm9wZXJ0eUluZm8uaGFzQm9vbGVhblZhbHVlICsgcHJvcGVydHlJbmZvLmhhc051bWVyaWNWYWx1ZSArIHByb3BlcnR5SW5mby5oYXNPdmVybG9hZGVkQm9vbGVhblZhbHVlIDw9IDEpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0RPTVByb3BlcnR5OiBWYWx1ZSBjYW4gYmUgb25lIG9mIGJvb2xlYW4sIG92ZXJsb2FkZWQgYm9vbGVhbiwgb3IgJyArICdudW1lcmljIHZhbHVlLCBidXQgbm90IGEgY29tYmluYXRpb246ICVzJywgcHJvcE5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgRE9NUHJvcGVydHkuZ2V0UG9zc2libGVTdGFuZGFyZE5hbWVbbG93ZXJDYXNlZF0gPSBwcm9wTmFtZTtcbiAgICAgIH1cblxuICAgICAgaWYgKERPTUF0dHJpYnV0ZU5hbWVzLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICB2YXIgYXR0cmlidXRlTmFtZSA9IERPTUF0dHJpYnV0ZU5hbWVzW3Byb3BOYW1lXTtcbiAgICAgICAgcHJvcGVydHlJbmZvLmF0dHJpYnV0ZU5hbWUgPSBhdHRyaWJ1dGVOYW1lO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIERPTVByb3BlcnR5LmdldFBvc3NpYmxlU3RhbmRhcmROYW1lW2F0dHJpYnV0ZU5hbWVdID0gcHJvcE5hbWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKERPTUF0dHJpYnV0ZU5hbWVzcGFjZXMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIHByb3BlcnR5SW5mby5hdHRyaWJ1dGVOYW1lc3BhY2UgPSBET01BdHRyaWJ1dGVOYW1lc3BhY2VzW3Byb3BOYW1lXTtcbiAgICAgIH1cblxuICAgICAgaWYgKERPTVByb3BlcnR5TmFtZXMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIHByb3BlcnR5SW5mby5wcm9wZXJ0eU5hbWUgPSBET01Qcm9wZXJ0eU5hbWVzW3Byb3BOYW1lXTtcbiAgICAgIH1cblxuICAgICAgaWYgKERPTU11dGF0aW9uTWV0aG9kcy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgcHJvcGVydHlJbmZvLm11dGF0aW9uTWV0aG9kID0gRE9NTXV0YXRpb25NZXRob2RzW3Byb3BOYW1lXTtcbiAgICAgIH1cblxuICAgICAgRE9NUHJvcGVydHkucHJvcGVydGllc1twcm9wTmFtZV0gPSBwcm9wZXJ0eUluZm87XG4gICAgfVxuICB9XG59O1xudmFyIGRlZmF1bHRWYWx1ZUNhY2hlID0ge307XG5cbi8qKlxuICogRE9NUHJvcGVydHkgZXhwb3J0cyBsb29rdXAgb2JqZWN0cyB0aGF0IGNhbiBiZSB1c2VkIGxpa2UgZnVuY3Rpb25zOlxuICpcbiAqICAgPiBET01Qcm9wZXJ0eS5pc1ZhbGlkWydpZCddXG4gKiAgIHRydWVcbiAqICAgPiBET01Qcm9wZXJ0eS5pc1ZhbGlkWydmb29iYXInXVxuICogICB1bmRlZmluZWRcbiAqXG4gKiBBbHRob3VnaCB0aGlzIG1heSBiZSBjb25mdXNpbmcsIGl0IHBlcmZvcm1zIGJldHRlciBpbiBnZW5lcmFsLlxuICpcbiAqIEBzZWUgaHR0cDovL2pzcGVyZi5jb20va2V5LWV4aXN0c1xuICogQHNlZSBodHRwOi8vanNwZXJmLmNvbS9rZXktbWlzc2luZ1xuICovXG52YXIgRE9NUHJvcGVydHkgPSB7XG5cbiAgSURfQVRUUklCVVRFX05BTUU6ICdkYXRhLXJlYWN0aWQnLFxuXG4gIC8qKlxuICAgKiBNYXAgZnJvbSBwcm9wZXJ0eSBcInN0YW5kYXJkIG5hbWVcIiB0byBhbiBvYmplY3Qgd2l0aCBpbmZvIGFib3V0IGhvdyB0byBzZXRcbiAgICogdGhlIHByb3BlcnR5IGluIHRoZSBET00uIEVhY2ggb2JqZWN0IGNvbnRhaW5zOlxuICAgKlxuICAgKiBhdHRyaWJ1dGVOYW1lOlxuICAgKiAgIFVzZWQgd2hlbiByZW5kZXJpbmcgbWFya3VwIG9yIHdpdGggYCpBdHRyaWJ1dGUoKWAuXG4gICAqIGF0dHJpYnV0ZU5hbWVzcGFjZVxuICAgKiBwcm9wZXJ0eU5hbWU6XG4gICAqICAgVXNlZCBvbiBET00gbm9kZSBpbnN0YW5jZXMuIChUaGlzIGluY2x1ZGVzIHByb3BlcnRpZXMgdGhhdCBtdXRhdGUgZHVlIHRvXG4gICAqICAgZXh0ZXJuYWwgZmFjdG9ycy4pXG4gICAqIG11dGF0aW9uTWV0aG9kOlxuICAgKiAgIElmIG5vbi1udWxsLCB1c2VkIGluc3RlYWQgb2YgdGhlIHByb3BlcnR5IG9yIGBzZXRBdHRyaWJ1dGUoKWAgYWZ0ZXJcbiAgICogICBpbml0aWFsIHJlbmRlci5cbiAgICogbXVzdFVzZUF0dHJpYnV0ZTpcbiAgICogICBXaGV0aGVyIHRoZSBwcm9wZXJ0eSBtdXN0IGJlIGFjY2Vzc2VkIGFuZCBtdXRhdGVkIHVzaW5nIGAqQXR0cmlidXRlKClgLlxuICAgKiAgIChUaGlzIGluY2x1ZGVzIGFueXRoaW5nIHRoYXQgZmFpbHMgYDxwcm9wTmFtZT4gaW4gPGVsZW1lbnQ+YC4pXG4gICAqIG11c3RVc2VQcm9wZXJ0eTpcbiAgICogICBXaGV0aGVyIHRoZSBwcm9wZXJ0eSBtdXN0IGJlIGFjY2Vzc2VkIGFuZCBtdXRhdGVkIGFzIGFuIG9iamVjdCBwcm9wZXJ0eS5cbiAgICogaGFzU2lkZUVmZmVjdHM6XG4gICAqICAgV2hldGhlciBvciBub3Qgc2V0dGluZyBhIHZhbHVlIGNhdXNlcyBzaWRlIGVmZmVjdHMgc3VjaCBhcyB0cmlnZ2VyaW5nXG4gICAqICAgcmVzb3VyY2VzIHRvIGJlIGxvYWRlZCBvciB0ZXh0IHNlbGVjdGlvbiBjaGFuZ2VzLiBJZiB0cnVlLCB3ZSByZWFkIGZyb21cbiAgICogICB0aGUgRE9NIGJlZm9yZSB1cGRhdGluZyB0byBlbnN1cmUgdGhhdCB0aGUgdmFsdWUgaXMgb25seSBzZXQgaWYgaXQgaGFzXG4gICAqICAgY2hhbmdlZC5cbiAgICogaGFzQm9vbGVhblZhbHVlOlxuICAgKiAgIFdoZXRoZXIgdGhlIHByb3BlcnR5IHNob3VsZCBiZSByZW1vdmVkIHdoZW4gc2V0IHRvIGEgZmFsc2V5IHZhbHVlLlxuICAgKiBoYXNOdW1lcmljVmFsdWU6XG4gICAqICAgV2hldGhlciB0aGUgcHJvcGVydHkgbXVzdCBiZSBudW1lcmljIG9yIHBhcnNlIGFzIGEgbnVtZXJpYyBhbmQgc2hvdWxkIGJlXG4gICAqICAgcmVtb3ZlZCB3aGVuIHNldCB0byBhIGZhbHNleSB2YWx1ZS5cbiAgICogaGFzUG9zaXRpdmVOdW1lcmljVmFsdWU6XG4gICAqICAgV2hldGhlciB0aGUgcHJvcGVydHkgbXVzdCBiZSBwb3NpdGl2ZSBudW1lcmljIG9yIHBhcnNlIGFzIGEgcG9zaXRpdmVcbiAgICogICBudW1lcmljIGFuZCBzaG91bGQgYmUgcmVtb3ZlZCB3aGVuIHNldCB0byBhIGZhbHNleSB2YWx1ZS5cbiAgICogaGFzT3ZlcmxvYWRlZEJvb2xlYW5WYWx1ZTpcbiAgICogICBXaGV0aGVyIHRoZSBwcm9wZXJ0eSBjYW4gYmUgdXNlZCBhcyBhIGZsYWcgYXMgd2VsbCBhcyB3aXRoIGEgdmFsdWUuXG4gICAqICAgUmVtb3ZlZCB3aGVuIHN0cmljdGx5IGVxdWFsIHRvIGZhbHNlOyBwcmVzZW50IHdpdGhvdXQgYSB2YWx1ZSB3aGVuXG4gICAqICAgc3RyaWN0bHkgZXF1YWwgdG8gdHJ1ZTsgcHJlc2VudCB3aXRoIGEgdmFsdWUgb3RoZXJ3aXNlLlxuICAgKi9cbiAgcHJvcGVydGllczoge30sXG5cbiAgLyoqXG4gICAqIE1hcHBpbmcgZnJvbSBsb3dlcmNhc2UgcHJvcGVydHkgbmFtZXMgdG8gdGhlIHByb3Blcmx5IGNhc2VkIHZlcnNpb24sIHVzZWRcbiAgICogdG8gd2FybiBpbiB0aGUgY2FzZSBvZiBtaXNzaW5nIHByb3BlcnRpZXMuIEF2YWlsYWJsZSBvbmx5IGluIF9fREVWX18uXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBnZXRQb3NzaWJsZVN0YW5kYXJkTmFtZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHt9IDogbnVsbCxcblxuICAvKipcbiAgICogQWxsIG9mIHRoZSBpc0N1c3RvbUF0dHJpYnV0ZSgpIGZ1bmN0aW9ucyB0aGF0IGhhdmUgYmVlbiBpbmplY3RlZC5cbiAgICovXG4gIF9pc0N1c3RvbUF0dHJpYnV0ZUZ1bmN0aW9uczogW10sXG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIGEgcHJvcGVydHkgbmFtZSBpcyBhIGN1c3RvbSBhdHRyaWJ1dGUuXG4gICAqIEBtZXRob2RcbiAgICovXG4gIGlzQ3VzdG9tQXR0cmlidXRlOiBmdW5jdGlvbiAoYXR0cmlidXRlTmFtZSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgRE9NUHJvcGVydHkuX2lzQ3VzdG9tQXR0cmlidXRlRnVuY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXNDdXN0b21BdHRyaWJ1dGVGbiA9IERPTVByb3BlcnR5Ll9pc0N1c3RvbUF0dHJpYnV0ZUZ1bmN0aW9uc1tpXTtcbiAgICAgIGlmIChpc0N1c3RvbUF0dHJpYnV0ZUZuKGF0dHJpYnV0ZU5hbWUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRlZmF1bHQgcHJvcGVydHkgdmFsdWUgZm9yIGEgRE9NIHByb3BlcnR5IChpLmUuLCBub3QgYW5cbiAgICogYXR0cmlidXRlKS4gTW9zdCBkZWZhdWx0IHZhbHVlcyBhcmUgJycgb3IgZmFsc2UsIGJ1dCBub3QgYWxsLiBXb3JzZSB5ZXQsXG4gICAqIHNvbWUgKGluIHBhcnRpY3VsYXIsIGB0eXBlYCkgdmFyeSBkZXBlbmRpbmcgb24gdGhlIHR5cGUgb2YgZWxlbWVudC5cbiAgICpcbiAgICogVE9ETzogSXMgaXQgYmV0dGVyIHRvIGdyYWIgYWxsIHRoZSBwb3NzaWJsZSBwcm9wZXJ0aWVzIHdoZW4gY3JlYXRpbmcgYW5cbiAgICogZWxlbWVudCB0byBhdm9pZCBoYXZpbmcgdG8gY3JlYXRlIHRoZSBzYW1lIGVsZW1lbnQgdHdpY2U/XG4gICAqL1xuICBnZXREZWZhdWx0VmFsdWVGb3JQcm9wZXJ0eTogZnVuY3Rpb24gKG5vZGVOYW1lLCBwcm9wKSB7XG4gICAgdmFyIG5vZGVEZWZhdWx0cyA9IGRlZmF1bHRWYWx1ZUNhY2hlW25vZGVOYW1lXTtcbiAgICB2YXIgdGVzdEVsZW1lbnQ7XG4gICAgaWYgKCFub2RlRGVmYXVsdHMpIHtcbiAgICAgIGRlZmF1bHRWYWx1ZUNhY2hlW25vZGVOYW1lXSA9IG5vZGVEZWZhdWx0cyA9IHt9O1xuICAgIH1cbiAgICBpZiAoIShwcm9wIGluIG5vZGVEZWZhdWx0cykpIHtcbiAgICAgIHRlc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlTmFtZSk7XG4gICAgICBub2RlRGVmYXVsdHNbcHJvcF0gPSB0ZXN0RWxlbWVudFtwcm9wXTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGVEZWZhdWx0c1twcm9wXTtcbiAgfSxcblxuICBpbmplY3Rpb246IERPTVByb3BlcnR5SW5qZWN0aW9uXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERPTVByb3BlcnR5OyJdfQ==