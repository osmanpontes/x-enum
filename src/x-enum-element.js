function XEnumElement(value, str, attrs) {
  this._value = value;
  this._str = str;
  if (typeof attrs === 'object') {
    for (var prop in attrs) {
      if (!attrs.hasOwnProperty(prop)) {
        continue;
      }
      if (prop === '_value' || prop === '_str') {
        throw new TypeError('The object of extra attributes can\'t have any attribute called \'_str\' or \'_value\' ' +
          'but in ' + JSON.stringify(attrs) + ' has a property called ' + prop);
      }
      this[prop] = attrs[prop];
    }
  }
  Object.freeze(this);
}

XEnumElement.prototype.valueOf = function () {
  return this._value;
};
XEnumElement.prototype.toString = function () {
  return this._str;
};

module.exports = XEnumElement;