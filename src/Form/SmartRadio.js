import React, { Component } from 'react';
import FormElement from './FormElement';
import {RenderInlineError} from '../Core/common';
import Radio from 'material-ui/Radio';
import RadioGroup from 'material-ui/Radio/RadioGroup';
import { FormControlLabel } from 'material-ui/Form';
import {FormControl} from 'material-ui/Form/FormControl';
import {FormLabel} from 'material-ui/Form/FormLabel';
import PropTypes from 'prop-types';
/**
 * Custom radio group field for material wrapper.
 */

class SmartRadio extends FormElement {
  getRadioCompontent(name,classes,defaultValue,RadioFieldList){
    return (
      <RadioGroup
        aria-label={name}
        name={name}
        className={classes.group}
        value={defaultValue} onChange={this.onChange.bind(this)}>
        {RadioFieldList}
      </RadioGroup>
    );
  }
  render() {
    const defaultValue = this.getDefaultValue();
    const formClasses = this.getFormClasses();
    const errors = this.getErrors();
    const { name, options = [], classes, disabled = false ,showLabel } = this.props;
    const RadioFieldList = options.map(v => (
      <FormControlLabel key={v.id} value={v.id} disabled={disabled} control={<Radio classes={classes.radio} />} label={v.name} />
    ));

    if(showLabel){
      return <FormControl component="fieldset" error={errors.length > 0}  className={formClasses}>
        <FormLabel component="legend">{this.props.label}</FormLabel>
        {this.getRadioCompontent(name,classes,defaultValue,RadioFieldList)}
        <RenderInlineError errors={errors}/>
      </FormControl>;
    }
    else{
      return this.getRadioCompontent(name,classes,defaultValue,RadioFieldList);
    }
  }
}

SmartRadio.propTypes = {
  ...FormElement.propTypes,
  classes: PropTypes.object.isRequired,
  options:PropTypes.array.isRequired
};

export default SmartRadio;
