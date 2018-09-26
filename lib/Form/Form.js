'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementGroup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SimpleModel = require('../Core/SimpleModel');

var _SimpleModel2 = _interopRequireDefault(_SimpleModel);

var _FormContext = require('./FormContext');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Controlled Form Components
 */
var FormBuilder = function (_PureComponent) {
  _inherits(FormBuilder, _PureComponent);

  function FormBuilder(props) {
    _classCallCheck(this, FormBuilder);

    var _this = _possibleConstructorReturn(this, (FormBuilder.__proto__ || Object.getPrototypeOf(FormBuilder)).call(this, props));

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

      this.props.onSubmitHandler(valueStore.getAll(), valueStore);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!this.store) {
        var store = this.store = this.props.valueStore;
        var defaultValues = this.props.defaultValues || {};
        store.set(defaultValues);
        var detailStore = new _SimpleModel2.default();
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
      return _react2.default.createElement(
        'form',
        { onSubmit: this.onSubmitHandler.bind(this), className: this.props.className, noValidate: true, autoComplete: 'off' },
        _react2.default.createElement(
          _FormContext.FormContext.Provider,
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
}(_react.PureComponent);

var ElementGroup = exports.ElementGroup = function (_FormBuilder) {
  _inherits(ElementGroup, _FormBuilder);

  function ElementGroup() {
    _classCallCheck(this, ElementGroup);

    return _possibleConstructorReturn(this, (ElementGroup.__proto__ || Object.getPrototypeOf(ElementGroup)).apply(this, arguments));
  }

  _createClass(ElementGroup, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement(
          _FormContext.FormContext.Provider,
          { value: this.getContext() },
          this.props.children
        )
      );
    }
  }]);

  return ElementGroup;
}(FormBuilder);

ElementGroup.propTypes = {
  valueStore: _propTypes2.default.object.isRequired,
  errorStore: _propTypes2.default.object.isRequired,
  valueDetailStore: _propTypes2.default.object.isRequired,
  elementIndex: _propTypes2.default.object.isRequired
};

FormBuilder.propTypes = {
  valueStore: _propTypes2.default.object.isRequired,
  errorStore: _propTypes2.default.object.isRequired,
  valueDetailStore: _propTypes2.default.object.isRequired,
  elementIndex: _propTypes2.default.object.isRequired
};

exports.default = FormBuilder;