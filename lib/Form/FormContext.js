var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import SimpleModel from '../Core/SimpleModel';
export var FormContext = React.createContext({
  valueStore: new SimpleModel(),
  valueDetailStore: new SimpleModel(),
  elementIndex: {},
  errorStore: new SimpleModel()
});

export function withFormContext(Component) {
  return function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        return React.createElement(
          FormContext.Consumer,
          null,
          function (_ref) {
            var valueStore = _ref.valueStore,
                valueDetailStore = _ref.valueDetailStore,
                errorStore = _ref.errorStore,
                elementIndex = _ref.elementIndex;

            var _props = _this2.props,
                forwardedRef = _props.forwardedRef,
                rest = _objectWithoutProperties(_props, ['forwardedRef']);

            if (forwardedRef) {
              return React.createElement(Component, _extends({ valueStore: valueStore, valueDetailStore: valueDetailStore, errorStore: errorStore, elementIndex: elementIndex }, rest, { ref: forwardedRef }));
            } else {
              return React.createElement(Component, _extends({ valueStore: valueStore, valueDetailStore: valueDetailStore, errorStore: errorStore, elementIndex: elementIndex }, _this2.props));
            }
          }
        );
      }
    }]);

    return _class;
  }(React.Component);
}