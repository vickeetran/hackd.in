'use strict';

var convert = require('./convert'),
    func = convert('functionsIn', require('../functionsIn'), require('./_falseOptions'));

func.placeholder = require('./placeholder');
module.exports = func;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvbG9kYXNoL2ZwL2Z1bmN0aW9uc0luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxVQUFVLFFBQVEsV0FBUixDQUFkO0lBQ0ksT0FBTyxRQUFRLGFBQVIsRUFBdUIsUUFBUSxnQkFBUixDQUF2QixFQUFrRCxRQUFRLGlCQUFSLENBQWxELENBRFg7O0FBR0EsS0FBSyxXQUFMLEdBQW1CLFFBQVEsZUFBUixDQUFuQjtBQUNBLE9BQU8sT0FBUCxHQUFpQixJQUFqQiIsImZpbGUiOiJmdW5jdGlvbnNJbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjb252ZXJ0ID0gcmVxdWlyZSgnLi9jb252ZXJ0JyksXG4gICAgZnVuYyA9IGNvbnZlcnQoJ2Z1bmN0aW9uc0luJywgcmVxdWlyZSgnLi4vZnVuY3Rpb25zSW4nKSwgcmVxdWlyZSgnLi9fZmFsc2VPcHRpb25zJykpO1xuXG5mdW5jLnBsYWNlaG9sZGVyID0gcmVxdWlyZSgnLi9wbGFjZWhvbGRlcicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jO1xuIl19