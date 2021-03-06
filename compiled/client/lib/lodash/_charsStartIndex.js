'use strict';

var baseIndexOf = require('./_baseIndexOf');

/**
 * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the first unmatched string symbol.
 */
function charsStartIndex(strSymbols, chrSymbols) {
  var index = -1,
      length = strSymbols.length;

  while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

module.exports = charsStartIndex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9saWIvbG9kYXNoL19jaGFyc1N0YXJ0SW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLGNBQWMsUUFBUSxnQkFBUixDQUFsQjs7Ozs7Ozs7Ozs7QUFXQSxTQUFTLGVBQVQsQ0FBeUIsVUFBekIsRUFBcUMsVUFBckMsRUFBaUQ7QUFDL0MsTUFBSSxRQUFRLENBQUMsQ0FBYjtNQUNJLFNBQVMsV0FBVyxNQUR4Qjs7QUFHQSxTQUFPLEVBQUUsS0FBRixHQUFVLE1BQVYsSUFBb0IsWUFBWSxVQUFaLEVBQXdCLFdBQVcsS0FBWCxDQUF4QixFQUEyQyxDQUEzQyxJQUFnRCxDQUFDLENBQTVFLEVBQStFLENBQUU7QUFDakYsU0FBTyxLQUFQO0FBQ0Q7O0FBRUQsT0FBTyxPQUFQLEdBQWlCLGVBQWpCIiwiZmlsZSI6Il9jaGFyc1N0YXJ0SW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUluZGV4T2YgPSByZXF1aXJlKCcuL19iYXNlSW5kZXhPZicpO1xuXG4vKipcbiAqIFVzZWQgYnkgYF8udHJpbWAgYW5kIGBfLnRyaW1TdGFydGAgdG8gZ2V0IHRoZSBpbmRleCBvZiB0aGUgZmlyc3Qgc3RyaW5nIHN5bWJvbFxuICogdGhhdCBpcyBub3QgZm91bmQgaW4gdGhlIGNoYXJhY3RlciBzeW1ib2xzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzdHJTeW1ib2xzIFRoZSBzdHJpbmcgc3ltYm9scyB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtBcnJheX0gY2hyU3ltYm9scyBUaGUgY2hhcmFjdGVyIHN5bWJvbHMgdG8gZmluZC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCB1bm1hdGNoZWQgc3RyaW5nIHN5bWJvbC5cbiAqL1xuZnVuY3Rpb24gY2hhcnNTdGFydEluZGV4KHN0clN5bWJvbHMsIGNoclN5bWJvbHMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzdHJTeW1ib2xzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCAmJiBiYXNlSW5kZXhPZihjaHJTeW1ib2xzLCBzdHJTeW1ib2xzW2luZGV4XSwgMCkgPiAtMSkge31cbiAgcmV0dXJuIGluZGV4O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYXJzU3RhcnRJbmRleDtcbiJdfQ==