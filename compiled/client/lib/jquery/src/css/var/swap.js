"use strict";

define(function () {

	// A method for quickly swapping in/out CSS properties to get correct calculations.
	return function (elem, options, callback, args) {
		var ret,
		    name,
		    old = {};

		// Remember the old values, and insert the new ones
		for (name in options) {
			old[name] = elem.style[name];
			elem.style[name] = options[name];
		}

		ret = callback.apply(elem, args || []);

		// Revert the old values
		for (name in options) {
			elem.style[name] = old[name];
		}

		return ret;
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvanF1ZXJ5L3NyYy9jc3MvdmFyL3N3YXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFRLFlBQVc7OztBQUduQixRQUFPLFVBQVUsSUFBVixFQUFnQixPQUFoQixFQUF5QixRQUF6QixFQUFtQyxJQUFuQyxFQUEwQztBQUNoRCxNQUFJLEdBQUo7TUFBUyxJQUFUO01BQ0MsTUFBTSxFQURQOzs7QUFJQSxPQUFNLElBQU4sSUFBYyxPQUFkLEVBQXdCO0FBQ3ZCLE9BQUssSUFBTCxJQUFjLEtBQUssS0FBTCxDQUFZLElBQVosQ0FBZDtBQUNBLFFBQUssS0FBTCxDQUFZLElBQVosSUFBcUIsUUFBUyxJQUFULENBQXJCO0FBQ0E7O0FBRUQsUUFBTSxTQUFTLEtBQVQsQ0FBZ0IsSUFBaEIsRUFBc0IsUUFBUSxFQUE5QixDQUFOOzs7QUFHQSxPQUFNLElBQU4sSUFBYyxPQUFkLEVBQXdCO0FBQ3ZCLFFBQUssS0FBTCxDQUFZLElBQVosSUFBcUIsSUFBSyxJQUFMLENBQXJCO0FBQ0E7O0FBRUQsU0FBTyxHQUFQO0FBQ0EsRUFsQkQ7QUFvQkMsQ0F2QkQiLCJmaWxlIjoic3dhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZSggZnVuY3Rpb24oKSB7XG5cbi8vIEEgbWV0aG9kIGZvciBxdWlja2x5IHN3YXBwaW5nIGluL291dCBDU1MgcHJvcGVydGllcyB0byBnZXQgY29ycmVjdCBjYWxjdWxhdGlvbnMuXG5yZXR1cm4gZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIGNhbGxiYWNrLCBhcmdzICkge1xuXHR2YXIgcmV0LCBuYW1lLFxuXHRcdG9sZCA9IHt9O1xuXG5cdC8vIFJlbWVtYmVyIHRoZSBvbGQgdmFsdWVzLCBhbmQgaW5zZXJ0IHRoZSBuZXcgb25lc1xuXHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0b2xkWyBuYW1lIF0gPSBlbGVtLnN0eWxlWyBuYW1lIF07XG5cdFx0ZWxlbS5zdHlsZVsgbmFtZSBdID0gb3B0aW9uc1sgbmFtZSBdO1xuXHR9XG5cblx0cmV0ID0gY2FsbGJhY2suYXBwbHkoIGVsZW0sIGFyZ3MgfHwgW10gKTtcblxuXHQvLyBSZXZlcnQgdGhlIG9sZCB2YWx1ZXNcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuXHRcdGVsZW0uc3R5bGVbIG5hbWUgXSA9IG9sZFsgbmFtZSBdO1xuXHR9XG5cblx0cmV0dXJuIHJldDtcbn07XG5cbn0gKTtcbiJdfQ==