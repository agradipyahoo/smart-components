import { FormHelperText } from 'material-ui/Form';
import React ,{Component} from 'react';
export class ShowIfPropTrue extends Component {
  render() {
    let { prop } = this.props;
    return prop ? React.cloneElement(this.props.children) : null;
  }
}
export class RenderInlineError extends Component{
  render(){
    const {errors=[]} = this.props;
    return <ShowIfPropTrue prop={errors.length >0}><FormHelperText>{errors[0] && errors[0].message}</FormHelperText></ShowIfPropTrue>;
  }
}
