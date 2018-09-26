import { withFormContext } from './FormContext';
import DropDown from './DropDown';
import FormBuilder from './FormBuilder';
import ElementGroup from './ElementGroup';
import SmartRadio from './SmartRadio';
import SmartCheckbox from './SmartCheckbox';
import TextInput from './TextInput';
import SmartInput from './SmartInput';

var FormCompontents = {
  DropDown: withFormContext(DropDown),
  FormBuilder: withFormContext(FormBuilder),
  ElementGroup: withFormContext(ElementGroup),
  SmartInput: withFormContext(SmartInput),
  SmartRadio: withFormContext(SmartRadio),
  TextInput: withFormContext(TextInput),
  SmartCheckbox: withFormContext(SmartCheckbox)
};
export default FormCompontents;