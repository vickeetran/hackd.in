'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewProject = function (_React$Component) {
  _inherits(NewProject, _React$Component);

  function NewProject(props) {
    _classCallCheck(this, NewProject);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NewProject).call(this, props));

    _this.submitForm = _this.submitForm.bind(_this);

    _this.state = {
      engineers: []
    };

    _this.submitForm = _this.submitForm.bind(_this);
    return _this;
  }

  _createClass(NewProject, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getEngineersFromDatabase();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.selectizeContributors();
    }
  }, {
    key: 'getEngineersFromDatabase',
    value: function getEngineersFromDatabase() {
      var _this2 = this;

      console.log('getEngineers function called');
      getEngineer('all', function (engineers) {
        _this2.setState({
          engineers: JSON.parse(engineers)
        });
        console.log(_this2.state.engineers);
      });
    }
  }, {
    key: 'selectizeContributors',
    value: function selectizeContributors() {
      var options = this.state.engineers.map(function (engineer) {
        return { gitHandle: engineer.gitHandle, name: engineer.name };
      });
      $('#contributors-form').selectize({
        persist: false,
        maxItems: null,
        valueField: 'gitHandle',
        labelField: 'name',
        searchField: ['gitHandle', 'name'],
        options: options,
        render: {
          item: function item(_item, escape) {
            return '<div>' + (_item.name ? '<span class="name">' + escape(_item.name) + '</span>' : '') +
            // (item.gitHandle ? '<span class="name">' + escape(item.gitHandle) + '</span>' : '') +
            '</div>';
          },
          option: function option(item, escape) {
            var label = item.name || item.gitHandle;
            var caption = item.name ? item.gitHandle : null;
            return '<div>' + '<span class="label">' + escape(label) + '</span>' + (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') + '</div>';
          }
        }
      });
    }
  }, {
    key: 'selectizeTechnologies',
    value: function selectizeTechnologies() {}
  }, {
    key: 'submitForm',
    value: function submitForm(e) {
      var data = {
        title: $('#projectTitle-form').val(),
        engineers: $('#contributors-form').val(),
        technologies: $('#technologies-form').val(),
        description: $('#projectDescription-form').val(),
        image: $('#image-form').val(),
        school: this.props.school
      };

      postProject(data);
      this.props.buttonClick();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'form-container w3-container w3-center w3-animate-opacity' },
        React.createElement(
          'div',
          { id: 'form-input' },
          React.createElement(
            'form',
            { className: 'form', id: 'form1' },
            React.createElement(
              'p',
              { className: 'projectTitle' },
              React.createElement('input', { name: 'projectTitle', type: 'text', className: 'formInput', placeholder: 'Project Title', id: 'projectTitle-form' })
            ),
            React.createElement(
              'p',
              { className: 'contributors' },
              React.createElement('select', { name: 'contributors', className: 'formInput', id: 'contributors-form', placeholder: 'Contributors' })
            ),
            React.createElement(
              'p',
              { className: 'technologies' },
              React.createElement('input', { name: 'technologies', type: 'text', className: 'formInput', id: 'technologies-form', placeholder: 'Technologies' })
            ),
            React.createElement(
              'p',
              { className: 'image' },
              React.createElement('input', { name: 'image', type: 'text', className: 'formInput', id: 'image-form', placeholder: 'Image' })
            ),
            React.createElement(
              'p',
              { className: 'projectDescription' },
              React.createElement('textarea', { name: 'projectDescription', className: 'formInput', id: 'projectDescription-form', placeholder: 'Project Description' })
            )
          ),
          React.createElement(
            'div',
            { className: 'submit' },
            React.createElement('input', { type: 'button', value: 'SUBMIT', onClick: this.submitForm, id: 'button-blue' })
          )
        )
      );
    }
  }]);

  return NewProject;
}(React.Component);

// export default App


window.NewProject = NewProject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9zcmMvY29tcG9uZW50cy9uZXdQcm9qZWN0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sVTs7O0FBQ0osc0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDhGQUNYLEtBRFc7O0FBR2pCLFVBQUssVUFBTCxHQUFrQixNQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsT0FBbEI7O0FBRUEsVUFBSyxLQUFMLEdBQWE7QUFDWCxpQkFBVztBQURBLEtBQWI7O0FBSUEsVUFBSyxVQUFMLEdBQWtCLE1BQUssVUFBTCxDQUFnQixJQUFoQixPQUFsQjtBQVRpQjtBQVVsQjs7Ozt3Q0FFbUI7QUFDbEIsV0FBSyx3QkFBTDtBQUNEOzs7eUNBRW9CO0FBQ25CLFdBQUsscUJBQUw7QUFDRDs7OytDQUMwQjtBQUFBOztBQUN6QixjQUFRLEdBQVIsQ0FBWSw4QkFBWjtBQUNBLGtCQUFhLEtBQWIsRUFBb0IscUJBQWE7QUFDL0IsZUFBSyxRQUFMLENBQWM7QUFDWixxQkFBVyxLQUFLLEtBQUwsQ0FBVyxTQUFYO0FBREMsU0FBZDtBQUdBLGdCQUFRLEdBQVIsQ0FBWSxPQUFLLEtBQUwsQ0FBVyxTQUF2QjtBQUNELE9BTEQ7QUFNRDs7OzRDQUV1QjtBQUN0QixVQUFJLFVBQVUsS0FBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixHQUFyQixDQUEwQixvQkFBWTtBQUNsRCxlQUFPLEVBQUMsV0FBVyxTQUFTLFNBQXJCLEVBQWdDLE1BQU0sU0FBUyxJQUEvQyxFQUFQO0FBQ0QsT0FGYSxDQUFkO0FBR0EsUUFBRSxvQkFBRixFQUF3QixTQUF4QixDQUFrQztBQUNoQyxpQkFBUyxLQUR1QjtBQUVoQyxrQkFBVSxJQUZzQjtBQUdoQyxvQkFBWSxXQUhvQjtBQUloQyxvQkFBWSxNQUpvQjtBQUtoQyxxQkFBYSxDQUFDLFdBQUQsRUFBYyxNQUFkLENBTG1CO0FBTWhDLGlCQUFTLE9BTnVCO0FBT2hDLGdCQUFRO0FBQ04sZ0JBQU0sY0FBUyxLQUFULEVBQWUsTUFBZixFQUF1QjtBQUN6QixtQkFBTyxXQUNGLE1BQUssSUFBTCxHQUFZLHdCQUF3QixPQUFPLE1BQUssSUFBWixDQUF4QixHQUE0QyxTQUF4RCxHQUFvRSxFQURsRTs7QUFHUCxvQkFIQTtBQUlILFdBTks7QUFPTixrQkFBUSxnQkFBUyxJQUFULEVBQWUsTUFBZixFQUF1QjtBQUMzQixnQkFBSSxRQUFRLEtBQUssSUFBTCxJQUFhLEtBQUssU0FBOUI7QUFDQSxnQkFBSSxVQUFVLEtBQUssSUFBTCxHQUFZLEtBQUssU0FBakIsR0FBNkIsSUFBM0M7QUFDQSxtQkFBTyxVQUNILHNCQURHLEdBQ3NCLE9BQU8sS0FBUCxDQUR0QixHQUNzQyxTQUR0QyxJQUVGLFVBQVUsMkJBQTJCLE9BQU8sT0FBUCxDQUEzQixHQUE2QyxTQUF2RCxHQUFtRSxFQUZqRSxJQUdQLFFBSEE7QUFJSDtBQWRLO0FBUHdCLE9BQWxDO0FBd0JEOzs7NENBRXVCLENBRXZCOzs7K0JBRVUsQyxFQUFHO0FBQ1osVUFBSSxPQUFPO0FBQ1QsZUFBTyxFQUFFLG9CQUFGLEVBQXdCLEdBQXhCLEVBREU7QUFFVCxtQkFBVyxFQUFFLG9CQUFGLEVBQXdCLEdBQXhCLEVBRkY7QUFHVCxzQkFBYyxFQUFFLG9CQUFGLEVBQXdCLEdBQXhCLEVBSEw7QUFJVCxxQkFBYSxFQUFFLDBCQUFGLEVBQThCLEdBQTlCLEVBSko7QUFLVCxlQUFPLEVBQUUsYUFBRixFQUFpQixHQUFqQixFQUxFO0FBTVQsZ0JBQVEsS0FBSyxLQUFMLENBQVc7QUFOVixPQUFYOztBQVNBLGtCQUFZLElBQVo7QUFDQSxXQUFLLEtBQUwsQ0FBVyxXQUFYO0FBQ0Q7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtRQUFBLEVBQUssV0FBVSwwREFBZjtRQUNFO0FBQUE7VUFBQSxFQUFLLElBQUcsWUFBUjtVQUNFO0FBQUE7WUFBQSxFQUFNLFdBQVUsTUFBaEIsRUFBdUIsSUFBRyxPQUExQjtZQUNFO0FBQUE7Y0FBQSxFQUFHLFdBQVUsY0FBYjtjQUNFLCtCQUFPLE1BQUssY0FBWixFQUEyQixNQUFLLE1BQWhDLEVBQXVDLFdBQVUsV0FBakQsRUFBNkQsYUFBWSxlQUF6RSxFQUF5RixJQUFHLG1CQUE1RjtBQURGLGFBREY7WUFJRTtBQUFBO2NBQUEsRUFBRyxXQUFVLGNBQWI7Y0FDRSxnQ0FBUSxNQUFLLGNBQWIsRUFBNEIsV0FBVSxXQUF0QyxFQUFrRCxJQUFHLG1CQUFyRCxFQUF5RSxhQUFZLGNBQXJGO0FBREYsYUFKRjtZQVNFO0FBQUE7Y0FBQSxFQUFHLFdBQVUsY0FBYjtjQUNFLCtCQUFPLE1BQUssY0FBWixFQUEyQixNQUFLLE1BQWhDLEVBQXVDLFdBQVUsV0FBakQsRUFBNkQsSUFBRyxtQkFBaEUsRUFBb0YsYUFBWSxjQUFoRztBQURGLGFBVEY7WUFhRTtBQUFBO2NBQUEsRUFBRyxXQUFVLE9BQWI7Y0FDRSwrQkFBTyxNQUFLLE9BQVosRUFBb0IsTUFBSyxNQUF6QixFQUFnQyxXQUFVLFdBQTFDLEVBQXNELElBQUcsWUFBekQsRUFBc0UsYUFBWSxPQUFsRjtBQURGLGFBYkY7WUFpQkU7QUFBQTtjQUFBLEVBQUcsV0FBVSxvQkFBYjtjQUNFLGtDQUFVLE1BQUssb0JBQWYsRUFBb0MsV0FBVSxXQUE5QyxFQUEwRCxJQUFHLHlCQUE3RCxFQUF1RixhQUFZLHFCQUFuRztBQURGO0FBakJGLFdBREY7VUFzQkU7QUFBQTtZQUFBLEVBQUssV0FBVSxRQUFmO1lBQ0UsK0JBQU8sTUFBSyxRQUFaLEVBQXFCLE9BQU0sUUFBM0IsRUFBb0MsU0FBUyxLQUFLLFVBQWxELEVBQThELElBQUcsYUFBakU7QUFERjtBQXRCRjtBQURGLE9BREY7QUE4QkQ7Ozs7RUE3R3NCLE1BQU0sUzs7Ozs7QUFpSC9CLE9BQU8sVUFBUCxHQUFvQixVQUFwQiIsImZpbGUiOiJuZXdQcm9qZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTmV3UHJvamVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdWJtaXRGb3JtID0gdGhpcy5zdWJtaXRGb3JtLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZW5naW5lZXJzOiBbXVxuICAgIH07XG5cbiAgICB0aGlzLnN1Ym1pdEZvcm0gPSB0aGlzLnN1Ym1pdEZvcm0uYmluZCh0aGlzKVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5nZXRFbmdpbmVlcnNGcm9tRGF0YWJhc2UoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLnNlbGVjdGl6ZUNvbnRyaWJ1dG9ycygpO1xuICB9XG4gIGdldEVuZ2luZWVyc0Zyb21EYXRhYmFzZSgpIHtcbiAgICBjb25zb2xlLmxvZygnZ2V0RW5naW5lZXJzIGZ1bmN0aW9uIGNhbGxlZCcpO1xuICAgIGdldEVuZ2luZWVyKCAnYWxsJywgZW5naW5lZXJzID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBlbmdpbmVlcnM6IEpTT04ucGFyc2UoZW5naW5lZXJzKSxcbiAgICAgIH0pO1xuICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZS5lbmdpbmVlcnMpXG4gICAgfSk7XG4gIH1cblxuICBzZWxlY3RpemVDb250cmlidXRvcnMoKSB7XG4gICAgbGV0IG9wdGlvbnMgPSB0aGlzLnN0YXRlLmVuZ2luZWVycy5tYXAoIGVuZ2luZWVyID0+IHtcbiAgICAgIHJldHVybiB7Z2l0SGFuZGxlOiBlbmdpbmVlci5naXRIYW5kbGUsIG5hbWU6IGVuZ2luZWVyLm5hbWV9XG4gICAgfSlcbiAgICAkKCcjY29udHJpYnV0b3JzLWZvcm0nKS5zZWxlY3RpemUoe1xuICAgICAgcGVyc2lzdDogZmFsc2UsXG4gICAgICBtYXhJdGVtczogbnVsbCxcbiAgICAgIHZhbHVlRmllbGQ6ICdnaXRIYW5kbGUnLFxuICAgICAgbGFiZWxGaWVsZDogJ25hbWUnLFxuICAgICAgc2VhcmNoRmllbGQ6IFsnZ2l0SGFuZGxlJywgJ25hbWUnXSxcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICByZW5kZXI6IHtcbiAgICAgICAgaXRlbTogZnVuY3Rpb24oaXRlbSwgZXNjYXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gJzxkaXY+JyArXG4gICAgICAgICAgICAgICAgKGl0ZW0ubmFtZSA/ICc8c3BhbiBjbGFzcz1cIm5hbWVcIj4nICsgZXNjYXBlKGl0ZW0ubmFtZSkgKyAnPC9zcGFuPicgOiAnJykgK1xuICAgICAgICAgICAgICAgIC8vIChpdGVtLmdpdEhhbmRsZSA/ICc8c3BhbiBjbGFzcz1cIm5hbWVcIj4nICsgZXNjYXBlKGl0ZW0uZ2l0SGFuZGxlKSArICc8L3NwYW4+JyA6ICcnKSArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uOiBmdW5jdGlvbihpdGVtLCBlc2NhcGUpIHtcbiAgICAgICAgICAgIHZhciBsYWJlbCA9IGl0ZW0ubmFtZSB8fCBpdGVtLmdpdEhhbmRsZTtcbiAgICAgICAgICAgIHZhciBjYXB0aW9uID0gaXRlbS5uYW1lID8gaXRlbS5naXRIYW5kbGUgOiBudWxsO1xuICAgICAgICAgICAgcmV0dXJuICc8ZGl2PicgK1xuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImxhYmVsXCI+JyArIGVzY2FwZShsYWJlbCkgKyAnPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgIChjYXB0aW9uID8gJzxzcGFuIGNsYXNzPVwiY2FwdGlvblwiPicgKyBlc2NhcGUoY2FwdGlvbikgKyAnPC9zcGFuPicgOiAnJykgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNlbGVjdGl6ZVRlY2hub2xvZ2llcygpIHtcbiAgICBcbiAgfVxuXG4gIHN1Ym1pdEZvcm0oZSkge1xuICAgIGxldCBkYXRhID0ge1xuICAgICAgdGl0bGU6ICQoJyNwcm9qZWN0VGl0bGUtZm9ybScpLnZhbCgpLFxuICAgICAgZW5naW5lZXJzOiAkKCcjY29udHJpYnV0b3JzLWZvcm0nKS52YWwoKSxcbiAgICAgIHRlY2hub2xvZ2llczogJCgnI3RlY2hub2xvZ2llcy1mb3JtJykudmFsKCksXG4gICAgICBkZXNjcmlwdGlvbjogJCgnI3Byb2plY3REZXNjcmlwdGlvbi1mb3JtJykudmFsKCksXG4gICAgICBpbWFnZTogJCgnI2ltYWdlLWZvcm0nKS52YWwoKSxcbiAgICAgIHNjaG9vbDogdGhpcy5wcm9wcy5zY2hvb2xcbiAgICB9O1xuXG4gICAgcG9zdFByb2plY3QoZGF0YSk7XG4gICAgdGhpcy5wcm9wcy5idXR0b25DbGljaygpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tY29udGFpbmVyIHczLWNvbnRhaW5lciB3My1jZW50ZXIgdzMtYW5pbWF0ZS1vcGFjaXR5XCI+XG4gICAgICAgIDxkaXYgaWQ9XCJmb3JtLWlucHV0XCI+XG4gICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiZm9ybVwiIGlkPVwiZm9ybTFcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInByb2plY3RUaXRsZVwiPlxuICAgICAgICAgICAgICA8aW5wdXQgbmFtZT1cInByb2plY3RUaXRsZVwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybUlucHV0XCIgcGxhY2Vob2xkZXI9XCJQcm9qZWN0IFRpdGxlXCIgaWQ9XCJwcm9qZWN0VGl0bGUtZm9ybVwiIC8+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJjb250cmlidXRvcnNcIj5cbiAgICAgICAgICAgICAgPHNlbGVjdCBuYW1lPVwiY29udHJpYnV0b3JzXCIgY2xhc3NOYW1lPVwiZm9ybUlucHV0XCIgaWQ9XCJjb250cmlidXRvcnMtZm9ybVwiIHBsYWNlaG9sZGVyPVwiQ29udHJpYnV0b3JzXCI+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZWNobm9sb2dpZXNcIj5cbiAgICAgICAgICAgICAgPGlucHV0IG5hbWU9XCJ0ZWNobm9sb2dpZXNcIiB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm1JbnB1dFwiIGlkPVwidGVjaG5vbG9naWVzLWZvcm1cIiBwbGFjZWhvbGRlcj1cIlRlY2hub2xvZ2llc1wiIC8+XG4gICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImltYWdlXCI+XG4gICAgICAgICAgICAgIDxpbnB1dCBuYW1lPVwiaW1hZ2VcIiB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm1JbnB1dFwiIGlkPVwiaW1hZ2UtZm9ybVwiIHBsYWNlaG9sZGVyPVwiSW1hZ2VcIiAvPlxuICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwcm9qZWN0RGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgPHRleHRhcmVhIG5hbWU9XCJwcm9qZWN0RGVzY3JpcHRpb25cIiBjbGFzc05hbWU9XCJmb3JtSW5wdXRcIiBpZD1cInByb2plY3REZXNjcmlwdGlvbi1mb3JtXCIgcGxhY2Vob2xkZXI9XCJQcm9qZWN0IERlc2NyaXB0aW9uXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCJTVUJNSVRcIiBvbkNsaWNrPXt0aGlzLnN1Ym1pdEZvcm19IGlkPVwiYnV0dG9uLWJsdWVcIi8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbi8vIGV4cG9ydCBkZWZhdWx0IEFwcFxud2luZG93Lk5ld1Byb2plY3QgPSBOZXdQcm9qZWN0O1xuIl19