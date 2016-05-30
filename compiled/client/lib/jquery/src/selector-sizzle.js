"use strict";

define(["./core", "../external/sizzle/dist/sizzle"], function (jQuery, Sizzle) {

	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvanF1ZXJ5L3NyYy9zZWxlY3Rvci1zaXp6bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFRLENBQ1AsUUFETyxFQUVQLGdDQUZPLENBQVIsRUFHRyxVQUFVLE1BQVYsRUFBa0IsTUFBbEIsRUFBMkI7O0FBRTlCLFFBQU8sSUFBUCxHQUFjLE1BQWQ7QUFDQSxRQUFPLElBQVAsR0FBYyxPQUFPLFNBQXJCO0FBQ0EsUUFBTyxJQUFQLENBQWEsR0FBYixJQUFxQixPQUFPLElBQVAsQ0FBWSxPQUFqQztBQUNBLFFBQU8sVUFBUCxHQUFvQixPQUFPLE1BQVAsR0FBZ0IsT0FBTyxVQUEzQztBQUNBLFFBQU8sSUFBUCxHQUFjLE9BQU8sT0FBckI7QUFDQSxRQUFPLFFBQVAsR0FBa0IsT0FBTyxLQUF6QjtBQUNBLFFBQU8sUUFBUCxHQUFrQixPQUFPLFFBQXpCO0FBRUMsQ0FiRCIsImZpbGUiOiJzZWxlY3Rvci1zaXp6bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoIFtcblx0XCIuL2NvcmVcIixcblx0XCIuLi9leHRlcm5hbC9zaXp6bGUvZGlzdC9zaXp6bGVcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSwgU2l6emxlICkge1xuXG5qUXVlcnkuZmluZCA9IFNpenpsZTtcbmpRdWVyeS5leHByID0gU2l6emxlLnNlbGVjdG9ycztcbmpRdWVyeS5leHByWyBcIjpcIiBdID0galF1ZXJ5LmV4cHIucHNldWRvcztcbmpRdWVyeS51bmlxdWVTb3J0ID0galF1ZXJ5LnVuaXF1ZSA9IFNpenpsZS51bmlxdWVTb3J0O1xualF1ZXJ5LnRleHQgPSBTaXp6bGUuZ2V0VGV4dDtcbmpRdWVyeS5pc1hNTERvYyA9IFNpenpsZS5pc1hNTDtcbmpRdWVyeS5jb250YWlucyA9IFNpenpsZS5jb250YWlucztcblxufSApO1xuIl19