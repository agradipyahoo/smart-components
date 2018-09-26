import React, { Component } from 'react';
import FormElement from './FormElement';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
/**
 * Custom Input field for material wrapper.
 */

class TextInput extends FormElement {
  getDefaultValue(){
    return  this.props.valueStore.get(this.props.name);
  }
  render() {
    const defaultValue = this.getDefaultValue();
    const formClasses = this.getFormClasses();
    const value = defaultValue || '';
    const errors = this.getErrors();
    return <TextField {...this.props} error={errors.length > 0} value={value} disabled={this.props.disabled} onChange={this.onChange.bind(this)} className={formClasses} />;
  }
}

TextInput.propTypes ={
  ...FormElement.propTypes,
  name:PropTypes.string.isRequired
}
export default TextInput;
