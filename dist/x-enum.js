(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Xenum = require('./src/xenum');

module.exports = Xenum;
},{"./src/xenum":3}],2:[function(require,module,exports){
function XenumElement(value, str, attrs) {
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

XenumElement.prototype.valueOf = function () {
  return this._value;
};
XenumElement.prototype.toString = function () {
  return this._str;
};

module.exports = XenumElement;
},{}],3:[function(require,module,exports){
var XenumElement = require('./xenum-element');

function Xenum() {
  var name, value, str, attrs, firstArgument, spec, count;

  if (arguments.length !== 0) {

    if (arguments.length === 1) {

      firstArgument = arguments[0];

      switch (typeof firstArgument) {
        case 'string':
          name = str = firstArgument;
          value = 1;
          this._addElement(name, value, str);
          break;
        case 'object':
          if (Array.isArray(firstArgument)) {
            firstArgument.forEach(function (item, index) {
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
              this[name] = new XenumElement(value, str);
              this['_' + str] = this[name];
              this['_' + value] = this[name];
            }.bind(this));
          } else {
            count = 1;
            for (name in firstArgument) {
              spec = this._specByElemParams(name, firstArgument[name], count++);
              this._addElement(name, spec.value, spec.str, spec.attrs);
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
            spec = this._specByElemParams(name, obj[name], i);
            value = spec.value;
            str = spec.str;
            attrs = spec.attrs;
            break;
        }

        this._addElement(name, value, str, attrs);
      }

    }
  }
  Object.freeze(this);
}

Xenum.prototype._addElement = function (name, value, str, attrs) {
  this['_' + value] =
    this['_' + str] =
      this[name] = new XenumElement(value, str, attrs);
};

Xenum.prototype._specByElemParams = function (name, elemParams, index) {
  if (elemParams instanceof Array) {
    var value, str, attrs;
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

  return {
    value: value,
    str: str,
    attrs: attrs
  };
};

Xenum.prototype.parse = function (value) {
  if (!Array.isArray(value)) {
    return value !== null && typeof value !== 'undefined' ? this['_' + value.valueOf()] || null : null;
  }
  return value.map(function (value) {
    return this.parse(value);
  }.bind(this));
};

Xenum.prototype.getList = function () {
  var list = [];
  for (var prop in this) {
    if (this.hasOwnProperty(prop) && typeof this[prop] === 'object' && prop.charAt(0) !== '_') {
      list.push(this[prop]);
    }
  }
  list.sort(function (o1, o2) {
    return o1 - o2;
  });
  return list;
};

Xenum.prototype.contains = function (object) {
  return this['_' + +object] === object;
};

module.exports = Xenum;
},{"./xenum-element":2}]},{},[1]);
