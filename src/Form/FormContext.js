import React from 'react';
import SimpleModel from '../Core/SimpleModel';
export const FormContext = React.createContext({
  valueStore: new SimpleModel(),
  valueDetailStore: new SimpleModel(),
  elementIndex:{},
  errorStore: new SimpleModel()
});

export function withFormContext(Component) {
  return class extends React.Component {
    render() {
      return (
        <FormContext.Consumer>
          {({valueStore, valueDetailStore , errorStore, elementIndex }) => {
            const {forwardedRef, ...rest} = this.props;
            if(forwardedRef){
              return (<Component valueStore={valueStore} valueDetailStore={valueDetailStore} errorStore={errorStore} elementIndex={elementIndex} {...rest} ref={forwardedRef} />);
            }
            else{
              return (<Component valueStore={valueStore} valueDetailStore={valueDetailStore} errorStore={errorStore} elementIndex={elementIndex} {...this.props}/>);
            }
          }}
        </FormContext.Consumer>
      );
    }
  }
}
