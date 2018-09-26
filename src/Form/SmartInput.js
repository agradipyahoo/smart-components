import React, { Component } from 'react';
import FormElement from './FormElement';
import TextInput from './TextInput';
import PropTypes from 'prop-types';
/**
 * Custom Input field for material wrapper.
 */

class SmartInput extends FormElement {
  getDefaultValue(){
    return  this.props.valueStore.get(this.props.name);
  }
  render() {
    const defaultValue = this.getDefaultValue();
    const formClasses = this.getFormClasses();
    const value = defaultValue || '';
    const errors = this.getErrors();
    return React.cloneElement(this.props.children, {error:errors.length > 0, value:value,onChange:this.onChange.bind(this),className:formClasses, name:this.props.name});
  }
}

SmartInput.propTypes ={
  ...FormElement.propTypes,
  name:PropTypes.string.isRequired,
  children:PropTypes.object.isRequired
};
export default SmartInput;
