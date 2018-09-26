var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import FormElement from './FormElement';
import TextInput from './TextInput';
import PropTypes from 'prop-types';
/**
 * Custom Input field for material wrapper.
 */

var SmartInput = function (_FormElement) {
  _inherits(SmartInput, _FormElement);

  function SmartInput() {
    _classCallCheck(this, SmartInput);

    return _possibleConstructorReturn(this, (SmartInput.__proto__ || Object.getPrototypeOf(SmartInput)).apply(this, arguments));
  }

  _createClass(SmartInput, [{
    key: 'getDefaultValue',
    value: function getDefaultValue() {
      return this.props.valueStore.get(this.props.name);
    }
  }, {
    key: 'render',
    value: function render() {
      var defaultValue = this.getDefaultValue();
      var formClasses = this.getFormClasses();
      var value = defaultValue || '';
      var errors = this.getErrors();
      return React.cloneElement(this.props.children, { error: errors.length > 0, value: value, onChange: this.onChange.bind(this), className: formClasses, name: this.props.name });
    }
  }]);

  return SmartInput;
}(FormElement);

SmartInput.propTypes = _extends({}, FormElement.propTypes, {
  name: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired
});
export default SmartInput;