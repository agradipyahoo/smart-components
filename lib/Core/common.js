var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { FormHelperText } from 'material-ui/Form';
import React, { Component } from 'react';
export var ShowIfPropTrue = function (_Component) {
  _inherits(ShowIfPropTrue, _Component);

  function ShowIfPropTrue() {
    _classCallCheck(this, ShowIfPropTrue);

    return _possibleConstructorReturn(this, (ShowIfPropTrue.__proto__ || Object.getPrototypeOf(ShowIfPropTrue)).apply(this, arguments));
  }

  _createClass(ShowIfPropTrue, [{
    key: 'render',
    value: function render() {
      var prop = this.props.prop;

      return prop ? React.cloneElement(this.props.children) : null;
    }
  }]);

  return ShowIfPropTrue;
}(Component);
export var RenderInlineError = function (_Component2) {
  _inherits(RenderInlineError, _Component2);

  function RenderInlineError() {
    _classCallCheck(this, RenderInlineError);

    return _possibleConstructorReturn(this, (RenderInlineError.__proto__ || Object.getPrototypeOf(RenderInlineError)).apply(this, arguments));
  }

  _createClass(RenderInlineError, [{
    key: 'render',
    value: function render() {
      var _props$errors = this.props.errors,
          errors = _props$errors === undefined ? [] : _props$errors;

      return React.createElement(
        ShowIfPropTrue,
        { prop: errors.length > 0 },
        React.createElement(
          FormHelperText,
          null,
          errors[0] && errors[0].message
        )
      );
    }
  }]);

  return RenderInlineError;
}(Component);