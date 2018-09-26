import React, { PureComponent } from 'react';
import SimpleModel from '../Core/SimpleModel';
import { FormContext } from './FormContext';
import PropTypes from 'prop-types';
/*
 * Controlled Form Components
 */
class FormBuilder extends PureComponent {
  constructor(props) {
    super(props);
    this._valueChangeHandler = this.onValueChange.bind(this);
    this._errorHandler = this.onError.bind(this);
    this.elementIndex = {};
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.isFormValid();
    let context = this.getContext();
    let { valueStore, errorStore } = context;
    this.props.onSubmitHandler(valueStore.getAll(), errorStore);
  }
  componentWillMount(){
    if (!this.store) {
      let store = (this.store = this.props.valueStore);
      let defaultValues = this.props.defaultValues || {};
      store.set(defaultValues);
      let detailStore = new SimpleModel();
      if (this._unsubscribeChange) {
        this._unsubscribeChange();
      }
      this._unsubscribeChange = store.on('change', this._valueChangeHandler);
      store.detailStore = detailStore;

      let errorStore = (this.errorStore = this.props.errorStore);
      if (this._unsubscribeErrorChange) {
        this._unsubscribeErrorChange();
      }

      this._unsubscribeErrorChange = errorStore.on('change', this._errorHandler);
    }
  }
  isFormValid() {
    const context = this.getContext();
    const { valueStore, errorStore } = context;
    errorStore.trigger('forceValidate');
    const hasErrors =
      Object.values(errorStore.getAll()).filter(function(item) {
        return item.length > 0;
      }).length > 0;

    return !hasErrors;
  }

  render() {
    return (
      <form onSubmit={this.onSubmitHandler.bind(this)} className={this.props.className} noValidate autoComplete="off" onReset={this.onReset}>
        <FormContext.Provider value={this.getContext()}>
          {this.props.children}
        </FormContext.Provider>
      </form>
    );
  }

  onValueChange(changed, allData) {
    if (this.props.onValueChange) {
      this.props.onValueChange(changed, allData);
    }
  }

  onReset=()=>{
    if (this.props.onReset) {
      this.props.onReset();
    }
    else {
      const elementIndexes =  this.props.elementIndex;
      const resetMap = this.props.defaultValues;
      Object.keys(resetMap).forEach(elementName => {
        if(elementIndexes[elementName] && elementIndexes[elementName].reset){
          elementIndexes[elementName].reset();
        }
        else {
          this.setValue(elementName, this.props.defaultValues[elementName], true);
        }
      });
    }
  }

  onError(error) {
    // console.log(error);
  }

  setValues(map, skipValidate) {
    Object.keys(map).forEach(elementName => this.setValue(elementName, map[elementName], skipValidate));
  }

  setValue(elementName, value, skipValidate) {
    if (this.props.elementIndex[elementName]) {
      this.props.elementIndex[elementName].setValue(value, skipValidate);
    } else {
      console.log('no element by name', elementName, value);
    }
  }

  getContext() {
    const {valueStore, errorStore, valueDetailStore, elementIndex} = this.props;
    return {
      valueStore,
      errorStore,
      valueDetailStore,
      elementIndex,
    };
  }

  componentWillUnmount() {
    if (this._unsubscribeChange) {
      this._unsubscribeChange();
    }
    if (this._unsubscribeErrorChange) {
      this._unsubscribeErrorChange();
    }
  }
}


FormBuilder.propTypes = {
  valueStore: PropTypes.object,
  errorStore: PropTypes.object,
  valueDetailStore: PropTypes.object,
  elementIndex: PropTypes.object
};



export default FormBuilder;
