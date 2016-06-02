"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import React, { PropTypes } from 'react'
// import ProjectList from './ProjectList'

var Projects = function (_React$Component) {
  _inherits(Projects, _React$Component);

  function Projects(props) {
    _classCallCheck(this, Projects);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Projects).call(this, props));

    _this.viewBlurb = _this.viewBlurb.bind(_this);

    _this.state = {
      projects: [],
      blurb: null
    };
    return _this;
  }

  // componentDidMount() {
  //   this.getProjectsFromDatabase();
  // }

  _createClass(Projects, [{
    key: "viewBlurb",
    value: function viewBlurb(project) {
      if (this.state.blurb === null) {
        this.setState({
          blurb: project
        });
      } else {
        this.setState({
          blurb: null
        });
      }
      console.log(project, this.state.blurb);
      // console.log('blurb is', this.state.blurb)
    }

    // getProjectsFromDatabase() {
    //   let context = this;
    //   console.log('getProjects function called');
    //   this.props.getProjects( projects => {
    //     context.setState({
    //       projects: JSON.parse(projects)
    //     });
    //   });
    // }

  }, {
    key: "render",
    value: function render() {
      return(
        // {<div>
        //   <ProjectList projects={this.state.projects} />
        // </div>}
        React.createElement(
          "div",
          null,
          React.createElement(ProjectList, { projects: window.fakeData, viewBlurb: this.viewBlurb, blurb: this.state.blurb })
        )
      );
    }
  }]);

  return Projects;
}(React.Component);

// export default App


window.Projects = Projects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9zcmMvY29tcG9uZW50cy9Qcm9qZWN0cy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUdNLFE7OztBQUNKLG9CQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSw0RkFDWCxLQURXOztBQUdqQixVQUFLLFNBQUwsR0FBaUIsTUFBSyxTQUFMLENBQWUsSUFBZixPQUFqQjs7QUFFQSxVQUFLLEtBQUwsR0FBYTtBQUNYLGdCQUFVLEVBREM7QUFFWCxhQUFPO0FBRkksS0FBYjtBQUxpQjtBQVNsQjs7Ozs7Ozs7OEJBTVMsTyxFQUFTO0FBQ2pCLFVBQUksS0FBSyxLQUFMLENBQVcsS0FBWCxLQUFxQixJQUF6QixFQUErQjtBQUM3QixhQUFLLFFBQUwsQ0FBYztBQUNaLGlCQUFPO0FBREssU0FBZDtBQUdELE9BSkQsTUFJTztBQUNMLGFBQUssUUFBTCxDQUFjO0FBQ1osaUJBQU87QUFESyxTQUFkO0FBR0Q7QUFDRCxjQUFRLEdBQVIsQ0FBWSxPQUFaLEVBQXFCLEtBQUssS0FBTCxDQUFXLEtBQWhDOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs2QkFZUTtBQUNQLFk7Ozs7QUFJRTtBQUFBO1VBQUE7VUFDRSxvQkFBQyxXQUFELElBQWEsVUFBVSxPQUFPLFFBQTlCLEVBQXdDLFdBQVcsS0FBSyxTQUF4RCxFQUFtRSxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQXJGO0FBREY7QUFKRjtBQVFEOzs7O0VBakRvQixNQUFNLFM7Ozs7O0FBcUQ3QixPQUFPLFFBQVAsR0FBa0IsUUFBbEIiLCJmaWxlIjoiUHJvamVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG4vLyBpbXBvcnQgUHJvamVjdExpc3QgZnJvbSAnLi9Qcm9qZWN0TGlzdCdcblxuY2xhc3MgUHJvamVjdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMudmlld0JsdXJiID0gdGhpcy52aWV3Qmx1cmIuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBwcm9qZWN0czogW10sXG4gICAgICBibHVyYjogbnVsbFxuICAgIH07XG4gIH1cblxuICAvLyBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgLy8gICB0aGlzLmdldFByb2plY3RzRnJvbURhdGFiYXNlKCk7XG4gIC8vIH1cblxuICB2aWV3Qmx1cmIocHJvamVjdCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmJsdXJiID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgYmx1cmI6IHByb2plY3RcbiAgICAgIH0pOyAgICAgIFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgYmx1cmI6IG51bGxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0LCB0aGlzLnN0YXRlLmJsdXJiKTtcbiAgICAvLyBjb25zb2xlLmxvZygnYmx1cmIgaXMnLCB0aGlzLnN0YXRlLmJsdXJiKVxuICB9XG5cbiAgLy8gZ2V0UHJvamVjdHNGcm9tRGF0YWJhc2UoKSB7XG4gIC8vICAgbGV0IGNvbnRleHQgPSB0aGlzO1xuICAvLyAgIGNvbnNvbGUubG9nKCdnZXRQcm9qZWN0cyBmdW5jdGlvbiBjYWxsZWQnKTtcbiAgLy8gICB0aGlzLnByb3BzLmdldFByb2plY3RzKCBwcm9qZWN0cyA9PiB7XG4gIC8vICAgICBjb250ZXh0LnNldFN0YXRlKHtcbiAgLy8gICAgICAgcHJvamVjdHM6IEpTT04ucGFyc2UocHJvamVjdHMpXG4gIC8vICAgICB9KTtcbiAgLy8gICB9KTtcbiAgLy8gfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLy8gezxkaXY+XG4gICAgICAvLyAgIDxQcm9qZWN0TGlzdCBwcm9qZWN0cz17dGhpcy5zdGF0ZS5wcm9qZWN0c30gLz5cbiAgICAgIC8vIDwvZGl2Pn1cbiAgICAgIDxkaXY+XG4gICAgICAgIDxQcm9qZWN0TGlzdCBwcm9qZWN0cz17d2luZG93LmZha2VEYXRhfSB2aWV3Qmx1cmI9e3RoaXMudmlld0JsdXJifSBibHVyYj17dGhpcy5zdGF0ZS5ibHVyYn0vPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG4vLyBleHBvcnQgZGVmYXVsdCBBcHBcbndpbmRvdy5Qcm9qZWN0cyA9IFByb2plY3RzO1xuIl19