'use strict';

var toNumber = require('./toNumber');

/**
 * Creates a function that performs a relational operation on two values.
 *
 * @private
 * @param {Function} operator The function to perform the operation.
 * @returns {Function} Returns the new relational operation function.
 */
function createRelationalOperation(operator) {
  return function (value, other) {
    if (!(typeof value == 'string' && typeof other == 'string')) {
      value = toNumber(value);
      other = toNumber(other);
    }
    return operator(value, other);
  };
}

module.exports = createRelationalOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9saWIvbG9kYXNoL19jcmVhdGVSZWxhdGlvbmFsT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxXQUFXLFFBQVEsWUFBUixDQUFmOzs7Ozs7Ozs7QUFTQSxTQUFTLHlCQUFULENBQW1DLFFBQW5DLEVBQTZDO0FBQzNDLFNBQU8sVUFBUyxLQUFULEVBQWdCLEtBQWhCLEVBQXVCO0FBQzVCLFFBQUksRUFBRSxPQUFPLEtBQVAsSUFBZ0IsUUFBaEIsSUFBNEIsT0FBTyxLQUFQLElBQWdCLFFBQTlDLENBQUosRUFBNkQ7QUFDM0QsY0FBUSxTQUFTLEtBQVQsQ0FBUjtBQUNBLGNBQVEsU0FBUyxLQUFULENBQVI7QUFDRDtBQUNELFdBQU8sU0FBUyxLQUFULEVBQWdCLEtBQWhCLENBQVA7QUFDRCxHQU5EO0FBT0Q7O0FBRUQsT0FBTyxPQUFQLEdBQWlCLHlCQUFqQiIsImZpbGUiOiJfY3JlYXRlUmVsYXRpb25hbE9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB0b051bWJlciA9IHJlcXVpcmUoJy4vdG9OdW1iZXInKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBwZXJmb3JtcyBhIHJlbGF0aW9uYWwgb3BlcmF0aW9uIG9uIHR3byB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wZXJhdG9yIFRoZSBmdW5jdGlvbiB0byBwZXJmb3JtIHRoZSBvcGVyYXRpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyByZWxhdGlvbmFsIG9wZXJhdGlvbiBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlUmVsYXRpb25hbE9wZXJhdGlvbihvcGVyYXRvcikge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gICAgaWYgKCEodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnICYmIHR5cGVvZiBvdGhlciA9PSAnc3RyaW5nJykpIHtcbiAgICAgIHZhbHVlID0gdG9OdW1iZXIodmFsdWUpO1xuICAgICAgb3RoZXIgPSB0b051bWJlcihvdGhlcik7XG4gICAgfVxuICAgIHJldHVybiBvcGVyYXRvcih2YWx1ZSwgb3RoZXIpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVJlbGF0aW9uYWxPcGVyYXRpb247XG4iXX0=