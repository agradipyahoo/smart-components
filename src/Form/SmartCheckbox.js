import React, { Component } from 'react';
import FormElement from './FormElement';
import {RenderInlineError} from '../Core/common';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel, FormControl, FormLabel, FormHelperText } from 'material-ui/Form';
import PropTypes from 'prop-types';


/**
 * Custom checkbox group field for material wrapper.
 */

class SmartCheckbox extends FormElement {
  getValueFromNode(node) {
    return node.checked;
  }
  getCheckBoxComponent(disabled,defaultValue,name,value){
    return (
      <FormControlLabel
        control={
          <Checkbox
            disabled={disabled}
            checked={defaultValue}
            onChange={this.onChange.bind(this)}
            name={name}
            value="1"
          />
        }
        label={value}
      />
    );
  }
  render() {
    const defaultValue = this.getDefaultValue();
    const formClasses = this.getFormClasses();
    const errors = this.getErrors();
    const { name, classes, disabled = false,label, showLabel=false,value } = this.props;

    if(showLabel){
      return <FormControl component="fieldset" error={errors.length > 0}  className={formClasses + ' ' + classes.formControl}>
        <FormLabel component="legend">{this.props.label}</FormLabel>
        {this.getRadioCompontent(disabled,defaultValue,name,value)}
        <RenderInlineError errors={errors}/>
      </FormControl>;
    }
    else{
      return this.getRadioCompontent(disabled,defaultValue,name,value);
    }

  }
}

SmartCheckbox.propTypes = {
  ...FormElement.propTypes,
  classes: PropTypes.object.isRequired,
  name:PropTypes.string.isRequired,
  value:PropTypes.string
};

export default SmartCheckbox;


