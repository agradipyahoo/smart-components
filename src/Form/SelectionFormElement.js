import FormElement from './FormElement';
import SelectionManager from '../Core/SelectionManager';

export default class SelectionFormElement  extends FormElement {
  constructor(props){
    super(props);
    this.multiSelect = this.props.multiSelect === true;
    this.selectionManager = new SelectionManager({multiSelect: this.multiSelect});
    this.changeSubscription = this.selectionManager.on('change', this.onChange.bind(this));
  }

  componentWillMount(){
    super.componentWillMount();
    let defaultValue = this.getDefaultValue();
    this.applyValue(defaultValue)
  }

  componentWillReceiveProps(newProps){
    if(newProps.options && newProps.options !== this.props.options){
      this.selectionManager.clear();
    }
  }

  onChange(selection) {
    let valueToSet;
    if(!this.selectionManager.isEmpty()){
      if (this.multiSelect) {
        valueToSet = selection.map(v=>v.id);
      } else {
        valueToSet = (selection.id);
      }
    }else{
      valueToSet = this.props.emptyValue !== undefined ? this.props.emptyValue : selection;
    }
    this.setValue(valueToSet);
    this.onChangeUpdates(valueToSet);
  }

  onChangeUpdates(){
    // to be overridden by components
  }

  applyValue(value) {
    if (this.multiSelect) {
      value = value || [];
      value.forEach((valueId) => {
        this.selectById(valueId)
      })
    } else {
      this.selectById(value)
    }
  }

  reset(){
    this.selectionManager.clear();
  }

  selectById(value) {
    let options = this.props.options;
    let {selectionManager} = this;
    let toSelectItem = options.find((item) => item.id === value);
    if (toSelectItem) {
      if (this.multiSelect) {
        selectionManager.toggle(toSelectItem)
      } else {
        let isAlreadySelected = selectionManager.isSelected(toSelectItem);
        if(!isAlreadySelected){
          selectionManager.select(toSelectItem)
        }else{
          selectionManager.trigger('change', toSelectItem, toSelectItem);
        }

      }
    }
  }

  clickHandler(event) {
    let target = event.target;
    if (target.classList.contains('list-item')) {
      let dataId = target.dataset.id;
      this.selectById(dataId);
    }
  }
}
