"use strict";

var ProjectList = function ProjectList(_ref) {
  var projects = _ref.projects;
  return React.createElement(
    "div",
    { className: "actual-content" },
    projects.map(function (project, index) {
      return React.createElement(ProjectEntry, { key: index, project: project });
    })
  );
};

ProjectList.propTypes = {
  projects: React.PropTypes.array.isRequired
};

window.ProjectList = ProjectList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9zcmMvY29tcG9uZW50cy9Qcm9qZWN0TGlzdC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLGNBQWMsU0FBZCxXQUFjO0FBQUEsTUFBRSxRQUFGLFFBQUUsUUFBRjtBQUFBLFNBQ2xCO0FBQUE7SUFBQSxFQUFLLFdBQVUsZ0JBQWY7SUFDSSxTQUFTLEdBQVQsQ0FBYyxVQUFDLE9BQUQsRUFBVSxLQUFWO0FBQUEsYUFDZCxvQkFBQyxZQUFELElBQWMsS0FBSyxLQUFuQixFQUEwQixTQUFTLE9BQW5DLEdBRGM7QUFBQSxLQUFkO0FBREosR0FEa0I7QUFBQSxDQUFwQjs7QUFTQSxZQUFZLFNBQVosR0FBd0I7QUFDdEIsWUFBVSxNQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0I7QUFEVixDQUF4Qjs7QUFJQSxPQUFPLFdBQVAsR0FBcUIsV0FBckIiLCJmaWxlIjoiUHJvamVjdExpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBQcm9qZWN0TGlzdCA9ICh7cHJvamVjdHN9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwiYWN0dWFsLWNvbnRlbnRcIj5cbiAgICB7IHByb2plY3RzLm1hcCggKHByb2plY3QsIGluZGV4KSA9PlxuICAgICAgPFByb2plY3RFbnRyeSBrZXk9e2luZGV4fSBwcm9qZWN0PXtwcm9qZWN0fSAvPlxuICAgICl9XG4gIDwvZGl2PlxuXG4pO1xuXG5Qcm9qZWN0TGlzdC5wcm9wVHlwZXMgPSB7XG4gIHByb2plY3RzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxufTtcblxud2luZG93LlByb2plY3RMaXN0ID0gUHJvamVjdExpc3Q7XG4iXX0=