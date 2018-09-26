var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import FormElement from './FormElement';
import { RenderInlineError } from '../Core/common';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel, FormControl, FormLabel, FormHelperText } from 'material-ui/Form';
import PropTypes from 'prop-types';

/**
 * Custom checkbox group field for material wrapper.
 */

var SmartCheckbox = function (_FormElement) {
  _inherits(SmartCheckbox, _FormElement);

  function SmartCheckbox() {
    _classCallCheck(this, SmartCheckbox);

    return _possibleConstructorReturn(this, (SmartCheckbox.__proto__ || Object.getPrototypeOf(SmartCheckbox)).apply(this, arguments));
  }

  _createClass(SmartCheckbox, [{
    key: 'getValueFromNode',
    value: function getValueFromNode(node) {
      return node.checked;
    }
  }, {
    key: 'getCheckBoxComponent',
    value: function getCheckBoxComponent(disabled, defaultValue, name, value) {
      return React.createElement(FormControlLabel, {
        control: React.createElement(Checkbox, {
          disabled: disabled,
          checked: defaultValue,
          onChange: this.onChange.bind(this),
          name: name,
          value: '1'
        }),
        label: value
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var defaultValue = this.getDefaultValue();
      var formClasses = this.getFormClasses();
      var errors = this.getErrors();
      var _props = this.props,
          name = _props.name,
          classes = _props.classes,
          _props$disabled = _props.disabled,
          disabled = _props$disabled === undefined ? false : _props$disabled,
          label = _props.label,
          _props$showLabel = _props.showLabel,
          showLabel = _props$showLabel === undefined ? false : _props$showLabel,
          value = _props.value;


      if (showLabel) {
        return React.createElement(
          FormControl,
          { component: 'fieldset', error: errors.length > 0, className: formClasses + ' ' + classes.formControl },
          React.createElement(
            FormLabel,
            { component: 'legend' },
            this.props.label
          ),
          this.getRadioCompontent(disabled, defaultValue, name, value),
          React.createElement(RenderInlineError, { errors: errors })
        );
      } else {
        return this.getRadioCompontent(disabled, defaultValue, name, value);
      }
    }
  }]);

  return SmartCheckbox;
}(FormElement);

SmartCheckbox.propTypes = _extends({}, FormElement.propTypes, {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string
});

export default SmartCheckbox;