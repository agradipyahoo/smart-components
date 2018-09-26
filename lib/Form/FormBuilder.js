var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import SimpleModel from '../Core/SimpleModel';
import { FormContext } from './FormContext';
import PropTypes from 'prop-types';
/*
 * Controlled Form Components
 */

var FormBuilder = function (_PureComponent) {
  _inherits(FormBuilder, _PureComponent);

  function FormBuilder(props) {
    _classCallCheck(this, FormBuilder);

    var _this = _possibleConstructorReturn(this, (FormBuilder.__proto__ || Object.getPrototypeOf(FormBuilder)).call(this, props));

    _this.onReset = function () {
      if (_this.props.onReset) {
        _this.props.onReset();
      } else {
        var elementIndexes = _this.props.elementIndex;
        var resetMap = _this.props.defaultValues;
        Object.keys(resetMap).forEach(function (elementName) {
          if (elementIndexes[elementName] && elementIndexes[elementName].reset) {
            elementIndexes[elementName].reset();
          } else {
            _this.setValue(elementName, _this.props.defaultValues[elementName], true);
          }
        });
      }
    };

    _this._valueChangeHandler = _this.onValueChange.bind(_this);
    _this._errorHandler = _this.onError.bind(_this);
    _this.elementIndex = {};
    return _this;
  }

  _createClass(FormBuilder, [{
    key: 'onSubmitHandler',
    value: function onSubmitHandler(event) {
      event.preventDefault();
      this.isFormValid();
      var context = this.getContext();
      var valueStore = context.valueStore,
          errorStore = context.errorStore;

      this.props.onSubmitHandler(valueStore.getAll(), errorStore);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!this.store) {
        var store = this.store = this.props.valueStore;
        var defaultValues = this.props.defaultValues || {};
        store.set(defaultValues);
        var detailStore = new SimpleModel();
        if (this._unsubscribeChange) {
          this._unsubscribeChange();
        }
        this._unsubscribeChange = store.on('change', this._valueChangeHandler);
        store.detailStore = detailStore;

        var errorStore = this.errorStore = this.props.errorStore;
        if (this._unsubscribeErrorChange) {
          this._unsubscribeErrorChange();
        }

        this._unsubscribeErrorChange = errorStore.on('change', this._errorHandler);
      }
    }
  }, {
    key: 'isFormValid',
    value: function isFormValid() {
      var context = this.getContext();
      var valueStore = context.valueStore,
          errorStore = context.errorStore;

      errorStore.trigger('forceValidate');
      var hasErrors = Object.values(errorStore.getAll()).filter(function (item) {
        return item.length > 0;
      }).length > 0;

      return !hasErrors;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        { onSubmit: this.onSubmitHandler.bind(this), className: this.props.className, noValidate: true, autoComplete: 'off', onReset: this.onReset },
        React.createElement(
          FormContext.Provider,
          { value: this.getContext() },
          this.props.children
        )
      );
    }
  }, {
    key: 'onValueChange',
    value: function onValueChange(changed, allData) {
      if (this.props.onValueChange) {
        this.props.onValueChange(changed, allData);
      }
    }
  }, {
    key: 'onError',
    value: function onError(error) {
      // console.log(error);
    }
  }, {
    key: 'setValues',
    value: function setValues(map, skipValidate) {
      var _this2 = this;

      Object.keys(map).forEach(function (elementName) {
        return _this2.setValue(elementName, map[elementName], skipValidate);
      });
    }
  }, {
    key: 'setValue',
    value: function setValue(elementName, value, skipValidate) {
      if (this.props.elementIndex[elementName]) {
        this.props.elementIndex[elementName].setValue(value, skipValidate);
      } else {
        console.log('no element by name', elementName, value);
      }
    }
  }, {
    key: 'getContext',
    value: function getContext() {
      var _props = this.props,
          valueStore = _props.valueStore,
          errorStore = _props.errorStore,
          valueDetailStore = _props.valueDetailStore,
          elementIndex = _props.elementIndex;

      return {
        valueStore: valueStore,
        errorStore: errorStore,
        valueDetailStore: valueDetailStore,
        elementIndex: elementIndex
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._unsubscribeChange) {
        this._unsubscribeChange();
      }
      if (this._unsubscribeErrorChange) {
        this._unsubscribeErrorChange();
      }
    }
  }]);

  return FormBuilder;
}(PureComponent);

FormBuilder.propTypes = {
  valueStore: PropTypes.object,
  errorStore: PropTypes.object,
  valueDetailStore: PropTypes.object,
  elementIndex: PropTypes.object
};

export default FormBuilder;