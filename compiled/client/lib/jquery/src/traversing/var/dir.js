"use strict";

define(["../../core"], function (jQuery) {

	return function (elem, dir, until) {
		var matched = [],
		    truncate = until !== undefined;

		while ((elem = elem[dir]) && elem.nodeType !== 9) {
			if (elem.nodeType === 1) {
				if (truncate && jQuery(elem).is(until)) {
					break;
				}
				matched.push(elem);
			}
		}
		return matched;
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvanF1ZXJ5L3NyYy90cmF2ZXJzaW5nL3Zhci9kaXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFRLENBQ1AsWUFETyxDQUFSLEVBRUcsVUFBVSxNQUFWLEVBQW1COztBQUV0QixRQUFPLFVBQVUsSUFBVixFQUFnQixHQUFoQixFQUFxQixLQUFyQixFQUE2QjtBQUNuQyxNQUFJLFVBQVUsRUFBZDtNQUNDLFdBQVcsVUFBVSxTQUR0Qjs7QUFHQSxTQUFRLENBQUUsT0FBTyxLQUFNLEdBQU4sQ0FBVCxLQUEwQixLQUFLLFFBQUwsS0FBa0IsQ0FBcEQsRUFBd0Q7QUFDdkQsT0FBSyxLQUFLLFFBQUwsS0FBa0IsQ0FBdkIsRUFBMkI7QUFDMUIsUUFBSyxZQUFZLE9BQVEsSUFBUixFQUFlLEVBQWYsQ0FBbUIsS0FBbkIsQ0FBakIsRUFBOEM7QUFDN0M7QUFDQTtBQUNELFlBQVEsSUFBUixDQUFjLElBQWQ7QUFDQTtBQUNEO0FBQ0QsU0FBTyxPQUFQO0FBQ0EsRUFiRDtBQWVDLENBbkJEIiwiZmlsZSI6ImRpci5qcyIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZSggW1xuXHRcIi4uLy4uL2NvcmVcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSApIHtcblxucmV0dXJuIGZ1bmN0aW9uKCBlbGVtLCBkaXIsIHVudGlsICkge1xuXHR2YXIgbWF0Y2hlZCA9IFtdLFxuXHRcdHRydW5jYXRlID0gdW50aWwgIT09IHVuZGVmaW5lZDtcblxuXHR3aGlsZSAoICggZWxlbSA9IGVsZW1bIGRpciBdICkgJiYgZWxlbS5ub2RlVHlwZSAhPT0gOSApIHtcblx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRpZiAoIHRydW5jYXRlICYmIGpRdWVyeSggZWxlbSApLmlzKCB1bnRpbCApICkge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdG1hdGNoZWQucHVzaCggZWxlbSApO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbWF0Y2hlZDtcbn07XG5cbn0gKTtcbiJdfQ==