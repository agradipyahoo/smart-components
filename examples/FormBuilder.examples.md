FormBuilder example:
```jsx static
import React from 'react';
import {SmartRadio, FormBuilder, TextInput, SimpleModel} from 'smart-components';

```
 Form Field with radio button and input box and validations
```js
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    background:'#ffffff',
    width:'100%'
  },
  group:{
    flexDirection:'row'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  buttonContainer:{
    display: 'flex',
    justifyContent:'flex-end',
    flex:'1 0 auto'
  },

  root: {

  },
  checked: {},
});

const commaSeparatedNumbers =(object,value ='' ,cidRegex = /(\d|\s)+/)=>{
    value = value.replace(/\s+/ig, ',');
    let cids = value.split(',');
    cids = cids.filter(cid =>{
      return cidRegex.test(cid) || cid.length ==0;
    });
    return cids.length === value.split(',').length;
  }
class AdvancedSearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.$formRef = React.createRef();
    this._valueStore = new SimpleModel();
    this.getFieldLabel = this.getFieldLabel.bind(this);
    this.getPlaceholder = this.getPlaceholder.bind(this);
    this.onValueChange =this.onValueChange.bind(this);
    this.isTextFieldEnabled =this.isTextFieldEnabled.bind(this);
    this.isSearchEnabled = this.isSearchEnabled.bind(this);
    this.isAdvanceFormValid = this.isAdvanceFormValid.bind(this);
    this.reset = this.reset.bind(this);
  }
  getDefaultState(){
    return {
      targetType :'',
      cids:'',
      targetIds:''
    }
  }
  componentDidMount(){
    let {cids='', targetType='', targetIds=''} = this.props;
    if(targetType ==="corporate"){
      targetType ='';
    }
    this.setState({
      cids,
      targetType,
      targetIds
    });
  }
  reset () {
    const state = this.getDefaultState();
    this.setState({...state});
  }
  isAdvanceFormValid  (){
    if(this.$formRef.current){
      return this.$formRef.current.isFormValid() && this.isSearchEnabled();
    }
    return this.isSearchEnabled();
  }
  isSearchEnabled (){
    const {targetType='',cids='',targetIds=''} = this.state;
    if(targetType.length>0){
      return targetType.length && cids.trim().length && targetIds.trim().length;
    }
    return cids.trim().length;
  }
  isTextFieldEnabled (){
    const {targetType=''} = this.state;
    return targetType.length>0;
  }
  onValueChange(changed, allData){
    /**
     * Value change handler
     */
    if(changed.targetType && !changed.targetIds){
      allData.targetIds ='';
    }
    this.setState({ ...allData });
  }

  onSubmitHandler(passedValues){
      /*
        Trigger Action
      */

    console.log(passedValues);
  }

  getPlaceholder (){
    switch (this.state.targetType) {
      case 'stores':
        return 'Eg.1000,1001';
      case 'dcs':
        return 'Eg.06037,06047';
      case 'states':
        return 'Eg.LA,AK';
      default:
        return 'Eg.1000,1001';
    }
  }

  getFieldLabel () {
    switch (this.state.targetType) {
      case 'stores':
        return 'Enter Stores';
      case 'dcs':
        return 'Enter DCs';
      case 'states':
        return 'Enter States';
      default:
        return 'Select a type';
    }
  }

  render(){

    const { classes } = this.props;
    const {cids='', targetType='', targetIds=''} = this.state;
    const formValues ={cids,targetType,targetIds};
    this._valueStore.set(formValues);
    return (
          <ElementGroup className={classes.container}
            onValueChange={this.onValueChange}
            onSubmitHandler={this.onSubmitHandler} forwardedRef={this.$formRef} valueStore={this._valueStore}>
            <TextInput
              id="cids"
              name={"cids"}
              InputLabelProps={{
                shrink: true,
              }}
              label="CIDs"
              placeholder="Eg.9939391,16162316"
              fullWidth
              margin="dense"
              validations={[{expr:'function', func:commaSeparatedNumbers}]}
            />

            <SmartRadio
              name="targetType"
              options={
                [{ id: 'stores', name: 'Stores' }, { id: 'dcs', name: 'DCs' }, { id: 'states', name: 'States' }]
              }
              classes={{
                group: classes.group,
                radio: {
                  root: classes.root,
                  checked: classes.checked,
                }
              }}
            />



              <TextInput
                id="targetIds"
                name={"targetIds"}
                label={this.getFieldLabel()}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder={this.getPlaceholder()}
                fullWidth
                margin="dense"
                disabled={!this.isTextFieldEnabled()}
                validations={[{expr:'function', func: (object,value) =>{
                    if(this.state.targetType){
                      if(this.state.targetType ==='states'){
                        return commaSeparatedNumbers(object, value, /([A-Za-z]|\s)+/);
                      }
                      else{
                        return commaSeparatedNumbers(object,value);
                      }
                    }
                    else {
                      return true;
                    }

                  }}]}
              />

            <div className={classes.buttonContainer}>
              <Button size="large" className="reg-adv-search-cancel" onClick={this.reset}>
                Cancel
            </Button>
              <Button type={"submit"} color="primary" size="large" variant="raised" className="reg-adv-search" disabled={!this.isAdvanceFormValid()}>
                Search
            </Button>
            </div>
          </ElementGroup>
    );
  }
}

const   AdvancedSearchModalView = withStyles(styles)(AdvancedSearchModal);

<AdvancedSearchModalView></AdvancedSearchModalView>;
```

