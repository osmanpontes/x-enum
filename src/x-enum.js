const XEnumElement = require('./x-enum-element');

const _addElement = function (name, value, str, attrs) {
  this['_' + value] =
    this['_' + str] =
      this[name] = new this.type(value, str, attrs);
};

const _specByElemParams = function (name, elemParams, index) {
  let value, str, attrs;
  if (elemParams instanceof Array) {
    for (var j = 0; j < elemParams.length; j++) {
      switch (typeof elemParams[j]) {
        case 'number':
          value = elemParams[j];
          break;
        case 'string':
          str = elemParams[j];
          break;
        case 'object':
          attrs = elemParams[j];
          break;
      }
    }
    if (typeof value === 'undefined') {
      value = +index + 1;
    }
    if (typeof str === 'undefined') {
      str = name;
    }
  } else {
    switch (typeof elemParams) {
      case 'number':
        value = elemParams;
        str = name;
        break;
      case 'string':
        value = +index + 1;
        str = elemParams;
        break;
      case 'object':
        value = +index + 1;
        str = name;
        attrs = elemParams;
        break;
    }
  }

  return {value, str, attrs};
};

function XEnum() {
  let name, value, str, attrs, firstArgument, spec, count;

  // TODO maybe it can conflict with a element defined as Element
  function type() {
    XEnumElement.apply(this, arguments);
  };
  this.type = type;
  this.type.prototype = Object.create(XEnumElement.prototype);
  this.type.prototype.constructor = type;

  if (arguments.length !== 0) {

    if (arguments.length === 1) {

      firstArgument = arguments[0];

      switch (typeof firstArgument) {
        case 'string':
          name = str = firstArgument;
          value = 1;
          _addElement.call(this, name, value, str);
          break;
        case 'object':
          if (Array.isArray(firstArgument)) {
            firstArgument.forEach((item, index) => {
              switch (typeof item) {
                case 'string':
                  name = str = item;
                  value = index + 1;
                  break;
                case 'object':
                  str = item.name || item._str;
                  name = value = item.id || item._value;
                  break;
              }
              this[name] = new XEnumElement(value, str);
              this['_' + str] = this[name];
              this['_' + value] = this[name];
            });
          } else {
            count = 1;
            for (name in firstArgument) {
              spec = _specByElemParams.call(this, name, firstArgument[name], count++);
              _addElement.call(this, name, spec.value, spec.str, spec.attrs);
            }
          }
          break;
      }

    } else {

      for (var i in arguments) {
        switch (typeof arguments[i]) {
          case 'string':
            name = arguments[i];
            value = +i + 1;
            str = name;
            break;

          case 'object':
            var obj = arguments[i];
            name = Object.keys(obj)[0];
            spec = _specByElemParams.call(this, name, obj[name], i);
            value = spec.value;
            str = spec.str;
            attrs = spec.attrs;
            break;
        }

        _addElement.call(this, name, value, str, attrs);
      }

    }
  }
  Object.freeze(this);
}

XEnum.prototype.parse = function (value) {
  if (!Array.isArray(value)) {
    return value !== null && typeof value !== 'undefined' ? this['_' + value.valueOf()] || null : null;
  }
  return value.map(value => this.parse(value));
};

XEnum.prototype.getList = function () {
  const list = [];
  for (let prop in this) {
    if (this.hasOwnProperty(prop) && typeof this[prop] === 'object' && prop.charAt(0) !== '_') {
      list.push(this[prop]);
    }
  }
  return list;
};

XEnum.prototype.getOrderedList = function () {
  return this.getList().sort((o1, o2) => o1 - o2);
};

XEnum.prototype.contains = function (object) {
  return this['_' + +object] === object;
};

module.exports = XEnum;