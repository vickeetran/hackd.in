"use strict";

define(["../var/document", "../var/support"], function (document, support) {

	(function () {
		var fragment = document.createDocumentFragment(),
		    div = fragment.appendChild(document.createElement("div")),
		    input = document.createElement("input");

		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute("type", "radio");
		input.setAttribute("checked", "checked");
		input.setAttribute("name", "t");

		div.appendChild(input);

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
	})();

	return support;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvanF1ZXJ5L3NyYy9tYW5pcHVsYXRpb24vc3VwcG9ydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQVEsQ0FDUCxpQkFETyxFQUVQLGdCQUZPLENBQVIsRUFHRyxVQUFVLFFBQVYsRUFBb0IsT0FBcEIsRUFBOEI7O0FBRWpDLEVBQUUsWUFBVztBQUNaLE1BQUksV0FBVyxTQUFTLHNCQUFULEVBQWY7TUFDQyxNQUFNLFNBQVMsV0FBVCxDQUFzQixTQUFTLGFBQVQsQ0FBd0IsS0FBeEIsQ0FBdEIsQ0FEUDtNQUVDLFFBQVEsU0FBUyxhQUFULENBQXdCLE9BQXhCLENBRlQ7Ozs7OztBQVFBLFFBQU0sWUFBTixDQUFvQixNQUFwQixFQUE0QixPQUE1QjtBQUNBLFFBQU0sWUFBTixDQUFvQixTQUFwQixFQUErQixTQUEvQjtBQUNBLFFBQU0sWUFBTixDQUFvQixNQUFwQixFQUE0QixHQUE1Qjs7QUFFQSxNQUFJLFdBQUosQ0FBaUIsS0FBakI7Ozs7QUFJQSxVQUFRLFVBQVIsR0FBcUIsSUFBSSxTQUFKLENBQWUsSUFBZixFQUFzQixTQUF0QixDQUFpQyxJQUFqQyxFQUF3QyxTQUF4QyxDQUFrRCxPQUF2RTs7OztBQUlBLE1BQUksU0FBSixHQUFnQix3QkFBaEI7QUFDQSxVQUFRLGNBQVIsR0FBeUIsQ0FBQyxDQUFDLElBQUksU0FBSixDQUFlLElBQWYsRUFBc0IsU0FBdEIsQ0FBZ0MsWUFBM0Q7QUFDQSxFQXZCRDs7QUF5QkEsUUFBTyxPQUFQO0FBRUMsQ0FoQ0QiLCJmaWxlIjoic3VwcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZSggW1xuXHRcIi4uL3Zhci9kb2N1bWVudFwiLFxuXHRcIi4uL3Zhci9zdXBwb3J0XCJcbl0sIGZ1bmN0aW9uKCBkb2N1bWVudCwgc3VwcG9ydCApIHtcblxuKCBmdW5jdGlvbigpIHtcblx0dmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuXHRcdGRpdiA9IGZyYWdtZW50LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKSxcblx0XHRpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApO1xuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wLTQuMywgU2FmYXJpPD01LjFcblx0Ly8gQ2hlY2sgc3RhdGUgbG9zdCBpZiB0aGUgbmFtZSBpcyBzZXQgKCMxMTIxNylcblx0Ly8gU3VwcG9ydDogV2luZG93cyBXZWIgQXBwcyAoV1dBKVxuXHQvLyBgbmFtZWAgYW5kIGB0eXBlYCBtdXN0IHVzZSAuc2V0QXR0cmlidXRlIGZvciBXV0EgKCMxNDkwMSlcblx0aW5wdXQuc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgXCJyYWRpb1wiICk7XG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJjaGVja2VkXCIsIFwiY2hlY2tlZFwiICk7XG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJuYW1lXCIsIFwidFwiICk7XG5cblx0ZGl2LmFwcGVuZENoaWxkKCBpbnB1dCApO1xuXG5cdC8vIFN1cHBvcnQ6IFNhZmFyaTw9NS4xLCBBbmRyb2lkPDQuMlxuXHQvLyBPbGRlciBXZWJLaXQgZG9lc24ndCBjbG9uZSBjaGVja2VkIHN0YXRlIGNvcnJlY3RseSBpbiBmcmFnbWVudHNcblx0c3VwcG9ydC5jaGVja0Nsb25lID0gZGl2LmNsb25lTm9kZSggdHJ1ZSApLmNsb25lTm9kZSggdHJ1ZSApLmxhc3RDaGlsZC5jaGVja2VkO1xuXG5cdC8vIFN1cHBvcnQ6IElFPD0xMStcblx0Ly8gTWFrZSBzdXJlIHRleHRhcmVhIChhbmQgY2hlY2tib3gpIGRlZmF1bHRWYWx1ZSBpcyBwcm9wZXJseSBjbG9uZWRcblx0ZGl2LmlubmVySFRNTCA9IFwiPHRleHRhcmVhPng8L3RleHRhcmVhPlwiO1xuXHRzdXBwb3J0Lm5vQ2xvbmVDaGVja2VkID0gISFkaXYuY2xvbmVOb2RlKCB0cnVlICkubGFzdENoaWxkLmRlZmF1bHRWYWx1ZTtcbn0gKSgpO1xuXG5yZXR1cm4gc3VwcG9ydDtcblxufSApO1xuIl19