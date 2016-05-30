'use strict';

var LazyWrapper = require('./_LazyWrapper'),
    LodashWrapper = require('./_LodashWrapper'),
    copyArray = require('./_copyArray');

/**
 * Creates a clone of `wrapper`.
 *
 * @private
 * @param {Object} wrapper The wrapper to clone.
 * @returns {Object} Returns the cloned wrapper.
 */
function wrapperClone(wrapper) {
  if (wrapper instanceof LazyWrapper) {
    return wrapper.clone();
  }
  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
  result.__actions__ = copyArray(wrapper.__actions__);
  result.__index__ = wrapper.__index__;
  result.__values__ = wrapper.__values__;
  return result;
}

module.exports = wrapperClone;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9saWIvbG9kYXNoL193cmFwcGVyQ2xvbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLGNBQWMsUUFBUSxnQkFBUixDQUFsQjtJQUNJLGdCQUFnQixRQUFRLGtCQUFSLENBRHBCO0lBRUksWUFBWSxRQUFRLGNBQVIsQ0FGaEI7Ozs7Ozs7OztBQVdBLFNBQVMsWUFBVCxDQUFzQixPQUF0QixFQUErQjtBQUM3QixNQUFJLG1CQUFtQixXQUF2QixFQUFvQztBQUNsQyxXQUFPLFFBQVEsS0FBUixFQUFQO0FBQ0Q7QUFDRCxNQUFJLFNBQVMsSUFBSSxhQUFKLENBQWtCLFFBQVEsV0FBMUIsRUFBdUMsUUFBUSxTQUEvQyxDQUFiO0FBQ0EsU0FBTyxXQUFQLEdBQXFCLFVBQVUsUUFBUSxXQUFsQixDQUFyQjtBQUNBLFNBQU8sU0FBUCxHQUFvQixRQUFRLFNBQTVCO0FBQ0EsU0FBTyxVQUFQLEdBQW9CLFFBQVEsVUFBNUI7QUFDQSxTQUFPLE1BQVA7QUFDRDs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsWUFBakIiLCJmaWxlIjoiX3dyYXBwZXJDbG9uZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBMYXp5V3JhcHBlciA9IHJlcXVpcmUoJy4vX0xhenlXcmFwcGVyJyksXG4gICAgTG9kYXNoV3JhcHBlciA9IHJlcXVpcmUoJy4vX0xvZGFzaFdyYXBwZXInKSxcbiAgICBjb3B5QXJyYXkgPSByZXF1aXJlKCcuL19jb3B5QXJyYXknKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHdyYXBwZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gd3JhcHBlciBUaGUgd3JhcHBlciB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCB3cmFwcGVyLlxuICovXG5mdW5jdGlvbiB3cmFwcGVyQ2xvbmUod3JhcHBlcikge1xuICBpZiAod3JhcHBlciBpbnN0YW5jZW9mIExhenlXcmFwcGVyKSB7XG4gICAgcmV0dXJuIHdyYXBwZXIuY2xvbmUoKTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gbmV3IExvZGFzaFdyYXBwZXIod3JhcHBlci5fX3dyYXBwZWRfXywgd3JhcHBlci5fX2NoYWluX18pO1xuICByZXN1bHQuX19hY3Rpb25zX18gPSBjb3B5QXJyYXkod3JhcHBlci5fX2FjdGlvbnNfXyk7XG4gIHJlc3VsdC5fX2luZGV4X18gID0gd3JhcHBlci5fX2luZGV4X187XG4gIHJlc3VsdC5fX3ZhbHVlc19fID0gd3JhcHBlci5fX3ZhbHVlc19fO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXBwZXJDbG9uZTtcbiJdfQ==