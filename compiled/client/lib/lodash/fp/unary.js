'use strict';

var convert = require('./convert'),
    func = convert('unary', require('../unary'), require('./_falseOptions'));

func.placeholder = require('./placeholder');
module.exports = func;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvbG9kYXNoL2ZwL3VuYXJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxVQUFVLFFBQVEsV0FBUixDQUFkO0lBQ0ksT0FBTyxRQUFRLE9BQVIsRUFBaUIsUUFBUSxVQUFSLENBQWpCLEVBQXNDLFFBQVEsaUJBQVIsQ0FBdEMsQ0FEWDs7QUFHQSxLQUFLLFdBQUwsR0FBbUIsUUFBUSxlQUFSLENBQW5CO0FBQ0EsT0FBTyxPQUFQLEdBQWlCLElBQWpCIiwiZmlsZSI6InVuYXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbnZlcnQgPSByZXF1aXJlKCcuL2NvbnZlcnQnKSxcbiAgICBmdW5jID0gY29udmVydCgndW5hcnknLCByZXF1aXJlKCcuLi91bmFyeScpLCByZXF1aXJlKCcuL19mYWxzZU9wdGlvbnMnKSk7XG5cbmZ1bmMucGxhY2Vob2xkZXIgPSByZXF1aXJlKCcuL3BsYWNlaG9sZGVyJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmM7XG4iXX0=