'use strict';

var convert = require('./convert'),
    func = convert('tail', require('../tail'), require('./_falseOptions'));

func.placeholder = require('./placeholder');
module.exports = func;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvbG9kYXNoL2ZwL3RhaWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLFVBQVUsUUFBUSxXQUFSLENBQWQ7SUFDSSxPQUFPLFFBQVEsTUFBUixFQUFnQixRQUFRLFNBQVIsQ0FBaEIsRUFBb0MsUUFBUSxpQkFBUixDQUFwQyxDQURYOztBQUdBLEtBQUssV0FBTCxHQUFtQixRQUFRLGVBQVIsQ0FBbkI7QUFDQSxPQUFPLE9BQVAsR0FBaUIsSUFBakIiLCJmaWxlIjoidGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjb252ZXJ0ID0gcmVxdWlyZSgnLi9jb252ZXJ0JyksXG4gICAgZnVuYyA9IGNvbnZlcnQoJ3RhaWwnLCByZXF1aXJlKCcuLi90YWlsJyksIHJlcXVpcmUoJy4vX2ZhbHNlT3B0aW9ucycpKTtcblxuZnVuYy5wbGFjZWhvbGRlciA9IHJlcXVpcmUoJy4vcGxhY2Vob2xkZXInKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuYztcbiJdfQ==