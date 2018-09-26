var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import FormElement from './FormElement';
import { RenderInlineError } from '../Core/common';
import Radio from 'material-ui/Radio';
import RadioGroup from 'material-ui/Radio/RadioGroup';
import { FormControlLabel } from 'material-ui/Form';
import { FormControl } from 'material-ui/Form/FormControl';
import { FormLabel } from 'material-ui/Form/FormLabel';
import PropTypes from 'prop-types';
/**
 * Custom radio group field for material wrapper.
 */

var SmartRadio = function (_FormElement) {
  _inherits(SmartRadio, _FormElement);

  function SmartRadio() {
    _classCallCheck(this, SmartRadio);

    return _possibleConstructorReturn(this, (SmartRadio.__proto__ || Object.getPrototypeOf(SmartRadio)).apply(this, arguments));
  }

  _createClass(SmartRadio, [{
    key: 'getRadioCompontent',
    value: function getRadioCompontent(name, classes, defaultValue, RadioFieldList) {
      return React.createElement(
        RadioGroup,
        {
          'aria-label': name,
          name: name,
          className: classes.group,
          value: defaultValue, onChange: this.onChange.bind(this) },
        RadioFieldList
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var defaultValue = this.getDefaultValue();
      var formClasses = this.getFormClasses();
      var errors = this.getErrors();
      var _props = this.props,
          name = _props.name,
          _props$options = _props.options,
          options = _props$options === undefined ? [] : _props$options,
          classes = _props.classes,
          _props$disabled = _props.disabled,
          disabled = _props$disabled === undefined ? false : _props$disabled,
          showLabel = _props.showLabel;

      var RadioFieldList = options.map(function (v) {
        return React.createElement(FormControlLabel, { key: v.id, value: v.id, disabled: disabled, control: React.createElement(Radio, { classes: classes.radio }), label: v.name });
      });

      if (showLabel) {
        return React.createElement(
          FormControl,
          { component: 'fieldset', error: errors.length > 0, className: formClasses },
          React.createElement(
            FormLabel,
            { component: 'legend' },
            this.props.label
          ),
          this.getRadioCompontent(name, classes, defaultValue, RadioFieldList),
          React.createElement(RenderInlineError, { errors: errors })
        );
      } else {
        return this.getRadioCompontent(name, classes, defaultValue, RadioFieldList);
      }
    }
  }]);

  return SmartRadio;
}(FormElement);

SmartRadio.propTypes = _extends({}, FormElement.propTypes, {
  classes: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
});

export default SmartRadio;