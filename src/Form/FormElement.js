import React, {  PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Subject } from 'rxjs/Subject';
import {getRuleValue} from './validators';
class FormElement extends PureComponent {
  constructor(props) {
    super(props);
    let { validations = [], propRules = [] } = this.props;
    this.change$ = new Subject();
    this._changing = false;
    this.state = {
      errors: [],
    };

    this.validations = validations.filter(item => item.element === undefined).map(function(rule, index) {
      return getRuleValue(rule);
    });

    this.siblingValidations = validations.filter(item => item.element !== undefined).map(function(rule, index) {
      return getRuleValue(rule);
    });

    this.propRules = propRules.map(function(rule, index) {
      return getRuleValue(rule);
    });
  }

  subscribeToChange() {
    let debounceTime = this.props.debounceTime;
    if (debounceTime !== undefined) {
      this.changeSubscription = this.change$.debounceTime(debounceTime).subscribe(value => {
        this.updateValueStore(value);
        this._changing = false;
      });
    } else {
      this.changeSubscription = this.change$.subscribe(value => this.updateValueStore(value));
    }
  }

  subscribeToValidation() {
    let siblingsToBeValidated = this.siblingValidations;
    if (siblingsToBeValidated.length === 0) {
      return;
    }
    let self = this;
    this.validationSubscription = this.props.valueStore.on('change', (changed, fullObject) => {
      self.validateSiblingsOnChange(changed);
      self.handlePropRules(changed, fullObject);
    });
  }

  onChange(event) {
    this.setValue(this.getValueFromNode(event.target));
  }

  setValue(value, skipValidate) {
    let name = this.props.name;
    let toSet = { [name]: value };

    if (this.props.options) {
      let multiSelect = this.multiSelect;
      let selectedOption = multiSelect ? this.props.options.filter(item => value.indexOf(item.id) > -1) : this.props.options.find(item => item.id === value);
      this.props.valueDetailStore.set({ [name]: selectedOption });
      if (this.props.exposeSelection) {
        toSet[name + '_selection'] = selectedOption;
      }
      if (this.props.exposeName && selectedOption) {
        toSet[name + '_name'] = multiSelect ? selectedOption.map(v => v.name) : selectedOption.name;
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

  updateValueStore(toSet) {
    this.props.valueStore.set(toSet);
  }

  validateSiblingsOnChange(changed) {
    let toValidateIds = this.siblingValidations.map(item => item.element);
    let changedKey = Object.keys(changed)[0];
    if (toValidateIds.indexOf(changedKey) > -1) {
      let errors = this.siblingValidations.filter(item => {
        return item.element === changedKey && item.func.call(this, item, changed[changedKey]) === false;
      });
      this.props.errorStore.set({ [changedKey]: errors });
      this.setState({ siblingErrors: errors });
    }
  }

  handlePropRules(changed, fullObjecdt) {
    let toValidateIds = this.propRules.map(item => item.element);
    let changedKey = Object.keys(changed)[0];
    if (toValidateIds.indexOf(changedKey) > -1) {
      let propValue = this.propRules.reduce((memo, rule) => {
        return !memo && rule.func.call(this, { value: fullObjecdt[rule.element] }, rule) === true;
      }, false);
    }
  }

  validateSiblings() {
    let changedKey = this.props.name;
    let valueStore = this.props.valueStore;
    let errors = this.siblingValidations.filter(item => {
      return item.func.call(this, item, valueStore.get(item.element)) === false;
    });
    this.props.errorStore.set({ [changedKey]: errors });
    this.setState({ errors: errors });
  }

  validateValue(value) {
    let name = this.props.name;
    let errors = this.validations.filter(item => {
      return item.func.call(this, item, value) === false;
    });
    this.props.errorStore.set({ [name]: errors });
    this.setState({ errors: errors });
    if (errors.length === 0) {
      this.validateSiblings();
    }
  }

  getValueFromNode(node) {
    return node.value;
  }

  componentWillMount() {
    let self = this;
    let name = self.props.name;
    let valueStoreValue = this.props.valueStore.get(this.props.name);
    if (valueStoreValue === undefined) {
      self.props.valueStore.set({ [name]: self.props.defaultValue });
    }
    self.props.elementIndex[name] = self;
    this.unsubscribeErrorStore = this.props.errorStore.on('forceValidate', function() {
      self.validateValue(self.props.valueStore.get(name));
    });
    this.subscribeToChange();
    this.subscribeToValidation();
  }

  componentWillUnmount() {
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

  getDefaultValue() {
    return this._changing ? this.state.defaultValue : this.props.valueStore.get(this.props.name);
  }

  getFormClasses() {
    let classArray = ['form-group'];
    classArray.push('element');
    classArray.push('element-type-' + this.props.type);
    classArray.push('element-' + this.props.name);
    let errors = this.getErrors();
    if (errors.length > 0) {
      classArray.push('has-error');
    }
    if (this.props.disabled) {
      classArray.push('disabled');
    }
    return classArray.join(' ');
  }

  getErrors() {
    let errors = (this.state && this.state.errors) || [];
    let siblingErrors = (this.state && this.state.siblingErrors) || [];
    return errors.concat(siblingErrors);
  }

  getSiblingValue(siblingName) {
    return this.props.valueStore.get(siblingName);
  }

  render() {
    return <div>Base Element</div>;
  }
}

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
  label: 'Text Input',
};

export default FormElement;
