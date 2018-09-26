var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Subject } from 'rxjs/Subject';
import { getRuleValue } from './validators';

var FormElement = function (_PureComponent) {
  _inherits(FormElement, _PureComponent);

  function FormElement(props) {
    _classCallCheck(this, FormElement);

    var _this = _possibleConstructorReturn(this, (FormElement.__proto__ || Object.getPrototypeOf(FormElement)).call(this, props));

    var _this$props = _this.props,
        _this$props$validatio = _this$props.validations,
        validations = _this$props$validatio === undefined ? [] : _this$props$validatio,
        _this$props$propRules = _this$props.propRules,
        propRules = _this$props$propRules === undefined ? [] : _this$props$propRules;

    _this.change$ = new Subject();
    _this._changing = false;
    _this.state = {
      errors: []
    };

    _this.validations = validations.filter(function (item) {
      return item.element === undefined;
    }).map(function (rule, index) {
      return getRuleValue(rule);
    });

    _this.siblingValidations = validations.filter(function (item) {
      return item.element !== undefined;
    }).map(function (rule, index) {
      return getRuleValue(rule);
    });

    _this.propRules = propRules.map(function (rule, index) {
      return getRuleValue(rule);
    });
    return _this;
  }

  _createClass(FormElement, [{
    key: 'subscribeToChange',
    value: function subscribeToChange() {
      var _this2 = this;

      var debounceTime = this.props.debounceTime;
      if (debounceTime !== undefined) {
        this.changeSubscription = this.change$.debounceTime(debounceTime).subscribe(function (value) {
          _this2.updateValueStore(value);
          _this2._changing = false;
        });
      } else {
        this.changeSubscription = this.change$.subscribe(function (value) {
          return _this2.updateValueStore(value);
        });
      }
    }
  }, {
    key: 'subscribeToValidation',
    value: function subscribeToValidation() {
      var siblingsToBeValidated = this.siblingValidations;
      if (siblingsToBeValidated.length === 0) {
        return;
      }
      var self = this;
      this.validationSubscription = this.props.valueStore.on('change', function (changed, fullObject) {
        self.validateSiblingsOnChange(changed);
        self.handlePropRules(changed, fullObject);
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      this.setValue(this.getValueFromNode(event.target));
    }
  }, {
    key: 'setValue',
    value: function setValue(value, skipValidate) {
      var name = this.props.name;
      var toSet = _defineProperty({}, name, value);

      if (this.props.options) {
        var multiSelect = this.multiSelect;
        var selectedOption = multiSelect ? this.props.options.filter(function (item) {
          return value.indexOf(item.id) > -1;
        }) : this.props.options.find(function (item) {
          return item.id === value;
        });
        this.props.valueDetailStore.set(_defineProperty({}, name, selectedOption));
        if (this.props.exposeSelection) {
          toSet[name + '_selection'] = selectedOption;
        }
        if (this.props.exposeName && selectedOption) {
          toSet[name + '_name'] = multiSelect ? selectedOption.map(function (v) {
            return v.name;
          }) : selectedOption.name;
        }
      }

      if (value === null) {
        if (this.props.exposeSelection) {
          toSet[name + '_selection'] = undefined;
        }
        if (this.props.exposename) {
          toSet[name + '_name'] = undefined;
        }
      }

      this._changing = true;
      this.change$.next(toSet);
      if (skipValidate !== true) {
        this.validateValue(value);
      }
      this.setState({ defaultValue: value });
    }
  }, {
    key: 'updateValueStore',
    value: function updateValueStore(toSet) {
      this.props.valueStore.set(toSet);
    }
  }, {
    key: 'validateSiblingsOnChange',
    value: function validateSiblingsOnChange(changed) {
      var _this3 = this;

      var toValidateIds = this.siblingValidations.map(function (item) {
        return item.element;
      });
      var changedKey = Object.keys(changed)[0];
      if (toValidateIds.indexOf(changedKey) > -1) {
        var errors = this.siblingValidations.filter(function (item) {
          return item.element === changedKey && item.func.call(_this3, item, changed[changedKey]) === false;
        });
        this.props.errorStore.set(_defineProperty({}, changedKey, errors));
        this.setState({ siblingErrors: errors });
      }
    }
  }, {
    key: 'handlePropRules',
    value: function handlePropRules(changed, fullObjecdt) {
      var _this4 = this;

      var toValidateIds = this.propRules.map(function (item) {
        return item.element;
      });
      var changedKey = Object.keys(changed)[0];
      if (toValidateIds.indexOf(changedKey) > -1) {
        var propValue = this.propRules.reduce(function (memo, rule) {
          return !memo && rule.func.call(_this4, { value: fullObjecdt[rule.element] }, rule) === true;
        }, false);
      }
    }
  }, {
    key: 'validateSiblings',
    value: function validateSiblings() {
      var _this5 = this;

      var changedKey = this.props.name;
      var valueStore = this.props.valueStore;
      var errors = this.siblingValidations.filter(function (item) {
        return item.func.call(_this5, item, valueStore.get(item.element)) === false;
      });
      this.props.errorStore.set(_defineProperty({}, changedKey, errors));
      this.setState({ errors: errors });
    }
  }, {
    key: 'validateValue',
    value: function validateValue(value) {
      var _this6 = this;

      var name = this.props.name;
      var errors = this.validations.filter(function (item) {
        return item.func.call(_this6, item, value) === false;
      });
      this.props.errorStore.set(_defineProperty({}, name, errors));
      this.setState({ errors: errors });
      if (errors.length === 0) {
        this.validateSiblings();
      }
    }
  }, {
    key: 'getValueFromNode',
    value: function getValueFromNode(node) {
      return node.value;
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;
      var name = self.props.name;
      var valueStoreValue = this.props.valueStore.get(this.props.name);
      if (valueStoreValue === undefined) {
        self.props.valueStore.set(_defineProperty({}, name, self.props.defaultValue));
      }
      self.props.elementIndex[name] = self;
      this.unsubscribeErrorStore = this.props.errorStore.on('forceValidate', function () {
        self.validateValue(self.props.valueStore.get(name));
      });
      this.subscribeToChange();
      this.subscribeToValidation();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.unsubscribeErrorStore) {
        this.unsubscribeErrorStore();
      }
      if (this.validationSubscription) {
        this.validationSubscription();
      }
      if (this.changeSubscription) {
        this.changeSubscription.unsubscribe();
      }
    }
  }, {
    key: 'getDefaultValue',
    value: function getDefaultValue() {
      return this._changing ? this.state.defaultValue : this.props.valueStore.get(this.props.name);
    }
  }, {
    key: 'getFormClasses',
    value: function getFormClasses() {
      var classArray = ['form-group'];
      classArray.push('element');
      classArray.push('element-type-' + this.props.type);
      classArray.push('element-' + this.props.name);
      var errors = this.getErrors();
      if (errors.length > 0) {
        classArray.push('has-error');
      }
      if (this.props.disabled) {
        classArray.push('disabled');
      }
      return classArray.join(' ');
    }
  }, {
    key: 'getErrors',
    value: function getErrors() {
      var errors = this.state && this.state.errors || [];
      var siblingErrors = this.state && this.state.siblingErrors || [];
      return errors.concat(siblingErrors);
    }
  }, {
    key: 'getSiblingValue',
    value: function getSiblingValue(siblingName) {
      return this.props.valueStore.get(siblingName);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        'Base Element'
      );
    }
  }]);

  return FormElement;
}(PureComponent);

FormElement.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  options: PropTypes.array,
  valueStore: PropTypes.object.isRequired,
  errorStore: PropTypes.object.isRequired,
  valueDetailStore: PropTypes.object.isRequired,
  elementIndex: PropTypes.object.isRequired
};

FormElement.defaultProps = {
  type: 'text',
  placeholder: 'Enter Text',
  label: 'Text Input'
};

export default FormElement;