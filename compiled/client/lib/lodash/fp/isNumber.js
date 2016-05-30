'use strict';

var convert = require('./convert'),
    func = convert('isNumber', require('../isNumber'), require('./_falseOptions'));

func.placeholder = require('./placeholder');
module.exports = func;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvbG9kYXNoL2ZwL2lzTnVtYmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxVQUFVLFFBQVEsV0FBUixDQUFkO0lBQ0ksT0FBTyxRQUFRLFVBQVIsRUFBb0IsUUFBUSxhQUFSLENBQXBCLEVBQTRDLFFBQVEsaUJBQVIsQ0FBNUMsQ0FEWDs7QUFHQSxLQUFLLFdBQUwsR0FBbUIsUUFBUSxlQUFSLENBQW5CO0FBQ0EsT0FBTyxPQUFQLEdBQWlCLElBQWpCIiwiZmlsZSI6ImlzTnVtYmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbnZlcnQgPSByZXF1aXJlKCcuL2NvbnZlcnQnKSxcbiAgICBmdW5jID0gY29udmVydCgnaXNOdW1iZXInLCByZXF1aXJlKCcuLi9pc051bWJlcicpLCByZXF1aXJlKCcuL19mYWxzZU9wdGlvbnMnKSk7XG5cbmZ1bmMucGxhY2Vob2xkZXIgPSByZXF1aXJlKCcuL3BsYWNlaG9sZGVyJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmM7XG4iXX0=